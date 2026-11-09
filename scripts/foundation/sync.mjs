// Copies the Frontend Foundation component library into ./foundation so the
// docs render the real components and stories.
//
// Copied files resolve their packages from this repo's node_modules (one
// React), and their `@/` imports are rewritten to `@foundation/`. The copy is
// incremental: only changed files are written and only removed files are
// deleted, so the dev server's watchers (Tailwind included) see ordinary file
// edits instead of a folder that disappears and comes back.

import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
export const DEST = path.join(ROOT, 'foundation');
const REPO = 'https://github.com/dosepehr/frontend-foundation.git';
const SKIP = /\.(test|spec)\.[jt]sx?$|[/\\](e2e|test|mocks)([/\\]|$)/;
// Folders copied from the library, relative to its root.
export const SYNCED_DIRS = ['src', 'public/fonts'];

/** $FOUNDATION_DIR, a sibling ../frontend-foundation checkout, or a fresh clone. */
export function resolveSource() {
    if (process.env.FOUNDATION_DIR) return { dir: path.resolve(process.env.FOUNDATION_DIR), local: true };
    const sibling = path.resolve(ROOT, '../frontend-foundation');
    if (fs.existsSync(path.join(sibling, 'src/components'))) return { dir: sibling, local: true };
    const cache = path.join(ROOT, '.cache/frontend-foundation');
    fs.rmSync(cache, { recursive: true, force: true });
    execFileSync('git', ['clone', '--depth', '1', REPO, cache], { stdio: 'inherit' });
    return { dir: cache, local: false };
}

const rewriteImports = (code) =>
    code
        .replaceAll("'@/hooks/", "'@foundation/utils/hooks/")
        .replaceAll("'@/public/", "'@foundation-public/")
        .replaceAll("'@/", "'@foundation/");

// Every file the copy should contain: destination path -> contents.
function plan(source) {
    const files = new Map();
    for (const dir of SYNCED_DIRS) {
        const from = path.join(source, dir);
        if (!fs.existsSync(from)) continue;
        for (const rel of fs.readdirSync(from, { recursive: true })) {
            const file = path.join(from, rel);
            if (SKIP.test(`/${rel}`) || !fs.statSync(file).isFile()) continue;
            const contents = fs.readFileSync(file);
            files.set(
                path.join(DEST, dir, rel),
                /\.(ts|tsx)$/.test(rel) ? Buffer.from(rewriteImports(contents.toString('utf8'))) : contents,
            );
        }
    }
    return files;
}

function listFiles(dir) {
    if (!fs.existsSync(dir)) return [];
    return fs
        .readdirSync(dir, { recursive: true })
        .map((rel) => path.join(dir, rel))
        .filter((file) => fs.statSync(file).isFile());
}

function removeEmptyDirs(dir) {
    if (!fs.existsSync(dir)) return;
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        if (entry.isDirectory()) removeEmptyDirs(path.join(dir, entry.name));
    }
    if (dir !== DEST && fs.readdirSync(dir).length === 0) fs.rmdirSync(dir);
}

/** Brings ./foundation in line with `source`. Returns what changed. */
export function syncFoundation(source) {
    const files = plan(source);
    let written = 0;
    for (const [file, contents] of files) {
        if (fs.existsSync(file) && fs.readFileSync(file).equals(contents)) continue;
        fs.mkdirSync(path.dirname(file), { recursive: true });
        fs.writeFileSync(file, contents);
        written += 1;
    }
    let removed = 0;
    for (const dir of SYNCED_DIRS) {
        for (const file of listFiles(path.join(DEST, dir))) {
            if (!files.has(file)) {
                fs.rmSync(file);
                removed += 1;
            }
        }
    }
    removeEmptyDirs(DEST);

    let commit = 'unknown';
    try {
        commit = execFileSync('git', ['-C', source, 'rev-parse', '--short', 'HEAD']).toString().trim();
    } catch {
        // Not a git checkout (e.g. FOUNDATION_DIR pointing at an export).
    }
    const meta = `${JSON.stringify({ source, commit }, null, 2)}\n`;
    const metaFile = path.join(DEST, 'source.json');
    if (!fs.existsSync(metaFile) || fs.readFileSync(metaFile, 'utf8') !== meta) fs.writeFileSync(metaFile, meta);
    return { commit, total: files.size, written, removed };
}
