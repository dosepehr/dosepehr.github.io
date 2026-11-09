#!/usr/bin/env node
// One-off sync of the component library into ./foundation (see
// scripts/foundation/sync.mjs). `npm run dev` keeps it in sync while it runs.

import { resolveSource, syncFoundation } from './foundation/sync.mjs';

const { dir } = resolveSource();
const { commit, total, written, removed } = syncFoundation(dir);
console.log(
    `Synced frontend-foundation@${commit} from ${dir}: ${total} files, ${written} updated, ${removed} removed.`,
);
