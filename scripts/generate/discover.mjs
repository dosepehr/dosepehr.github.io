import fs from 'node:fs';
import path from 'node:path';
import { CATEGORIES, SRC, toKebab } from './paths.mjs';

const isStoriesFile = (f) => f.endsWith('.stories.tsx');

// Finds every component folder, its entry file and its stories files.
export function discoverComponents() {
    const components = [];
    for (const category of CATEGORIES) {
        const base = path.join(SRC, category.dir);
        for (const folder of fs.readdirSync(base).sort()) {
            const dir = path.join(base, folder);
            if (!fs.statSync(dir).isDirectory()) continue;
            const files = fs.readdirSync(dir);
            const entry = files.find(
                (f) => f === 'index.tsx' || f === 'index.ts',
            );
            if (!entry) continue;
            // The folder's own stories first, then variants (e.g. CheckboxWrapper).
            const storyFiles = files
                .filter(isStoriesFile)
                .sort((a, b) =>
                    a === `${folder}.stories.tsx`
                        ? -1
                        : b === `${folder}.stories.tsx`
                          ? 1
                          : a.localeCompare(b),
                )
                .map((f) => path.join(dir, f));
            components.push({
                slug: toKebab(folder),
                folder,
                category,
                dir,
                entry: path.join(dir, entry),
                parts: files.includes('components.tsx')
                    ? path.join(dir, 'components.tsx')
                    : null,
                storyFiles,
                // Import path inside this repo, and the one users write in theirs.
                importBase: `@foundation/${category.dir}/${folder}`,
                publicImport: `@/${category.dir}/${folder}`,
            });
        }
    }
    return components;
}

// Name of the entry file's default export, if it has one.
export function defaultExportName(entryFile) {
    const text = fs.readFileSync(entryFile, 'utf8');
    return text.match(/export default (\w+);?/)?.[1] ?? null;
}
