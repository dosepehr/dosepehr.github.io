#!/usr/bin/env node
// `npm run dev`: syncs the component library, generates the component pages,
// starts `next dev`, and keeps both in sync while you edit a local
// frontend-foundation checkout.

import { execFileSync, spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import {
    ROOT,
    SYNCED_DIRS,
    resolveSource,
    syncFoundation,
} from './foundation/sync.mjs';

const PORT = process.env.PORT ?? '4000';
const generate = () =>
    execFileSync('node', ['scripts/generate/index.mjs'], {
        cwd: ROOT,
        stdio: 'inherit',
    });

const { dir, local } = resolveSource();
const first = syncFoundation(dir);
console.log(`Synced frontend-foundation@${first.commit} from ${dir}.`);
generate();

const next = spawn('npx', ['next', 'dev', '--port', PORT], {
    cwd: ROOT,
    stdio: 'inherit',
});
next.on('exit', (code) => process.exit(code ?? 0));
for (const signal of ['SIGINT', 'SIGTERM'])
    process.on(signal, () => next.kill(signal));

if (local) {
    let timer;
    const resync = () => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            try {
                const { written, removed } = syncFoundation(dir);
                if (written || removed) {
                    console.log(
                        `frontend-foundation changed: ${written} updated, ${removed} removed.`,
                    );
                    generate();
                }
            } catch (error) {
                console.error('Sync failed:', error.message);
            }
        }, 200);
    };
    for (const sub of SYNCED_DIRS) {
        const watched = path.join(dir, sub);
        if (fs.existsSync(watched))
            fs.watch(watched, { recursive: true }, resync);
    }
    console.log(`Watching ${dir} for changes.`);
}
