#!/usr/bin/env node
// Generates the component pages of the docs site from the component library:
// one MDX page, one data file and one client module per component folder.
// Run before `next dev` / `next build` (see the docs:* npm scripts).

import fs from 'node:fs';
import path from 'node:path';
import { readComponentContent } from './content.mjs';
import { defaultExportName, discoverComponents } from './discover.mjs';
import {
    CATEGORIES,
    COMPONENT_GROUPS,
    CONTENT,
    GENERATED,
    SRC,
    toTitle,
} from './paths.mjs';
import { extractProps } from './props.mjs';
import { parseStoriesFile } from './stories.mjs';
import { writeThemeDefaults } from './theme.mjs';
import {
    pruneOutput,
    writeCategoryMeta,
    writeClientModule,
    writeData,
    writeIfChanged,
    writePage,
} from './write.mjs';

const pickPlaygroundStory = (storyFiles) => {
    const stories = storyFiles[0]?.stories ?? [];
    const pick =
        stories.find(
            (s) =>
                ['Default', 'Playground'].includes(s.exportName) && s.hasArgs,
        ) ??
        stories.find((s) => s.hasArgs && !s.source) ??
        stories.find((s) => s.hasArgs);
    return pick?.id ?? null;
};

const components = discoverComponents();
const propsByFile = extractProps(
    components.flatMap((c) => [c.entry, c.parts].filter(Boolean)),
);

const missing = [];
const byCategory = new Map();

for (const c of components) {
    const storyFiles = c.storyFiles.map((file, index) => {
        const parsed = parseStoriesFile(file);
        return {
            componentName: parsed.componentName,
            stories: parsed.stories.map((s) => ({
                ...s,
                id: `${index}:${s.exportName}`,
            })),
        };
    });
    const exportName = defaultExportName(c.entry);
    const entryDocs = propsByFile.get(c.entry) ?? [];
    const mainName = storyFiles[0]?.componentName ?? exportName ?? c.folder;
    const main =
        entryDocs.find((d) => d.name === mainName) ??
        entryDocs.find((d) => d.props.length) ??
        null;
    const parts = (c.parts ? (propsByFile.get(c.parts) ?? []) : []).filter(
        (d) => d.props.length && d.name !== main?.name,
    );
    const info = readComponentContent(c.slug);
    if (!info) missing.push(c.slug);

    const entry = {
        slug: c.slug,
        category: c.category.id,
        title: info?.title ?? toTitle(c.folder),
        group: info?.category,
        componentName: mainName,
        importLine: exportName
            ? `import ${exportName} from '${c.publicImport}';`
            : `import { ${mainName} } from '${c.publicImport}';`,
        storyFiles,
        playgroundStory: pickPlaygroundStory(storyFiles),
        props: { main, parts },
    };

    writeData(entry);
    writeClientModule(
        entry,
        c.storyFiles.map((f) => `${c.importBase}/${path.basename(f, '.tsx')}`),
    );
    writePage(entry, info ?? { description: `The ${entry.title} component.` });
    byCategory.set(c.category.id, [
        ...(byCategory.get(c.category.id) ?? []),
        entry,
    ]);
}

writeThemeDefaults();
const counts = Object.fromEntries(
    CATEGORIES.map((c) => [c.id, (byCategory.get(c.id) ?? []).length]),
);
const byGroup = Object.fromEntries(
    COMPONENT_GROUPS.map((group) => [
        group,
        (byCategory.get('components') ?? []).filter((e) => e.group === group)
            .length,
    ]),
);
// Folder names under src/<dir>, for the landing page's project overview.
const listFolders = (dir, skip = []) =>
    fs
        .readdirSync(path.join(SRC, dir), { withFileTypes: true })
        .filter((d) => d.isDirectory() && !skip.includes(d.name))
        .map((d) => d.name)
        .sort();
// MockProvider is dev-only and not published.
const providers = listFolders('components/providers', ['MockProvider']);
writeIfChanged(
    path.join(GENERATED, 'summary.json'),
    `${JSON.stringify(
        {
            total: components.length,
            byCategory: counts,
            byGroup,
            providers,
        },
        null,
        2,
    )}\n`,
);
for (const category of CATEGORIES) {
    const entries = byCategory.get(category.id) ?? [];
    const groups = category.id === 'components' ? COMPONENT_GROUPS : undefined;
    const ungrouped = groups
        ? entries.filter((e) => !groups.includes(e.group))
        : [];
    if (ungrouped.length) {
        throw new Error(
            `Unknown or missing category for: ${ungrouped.map((e) => e.slug).join(', ')}`,
        );
    }
    writeCategoryMeta(category.id, category.title, entries, groups);
}

console.log(`Generated docs for ${components.length} components.`);
if (missing.length)
    console.warn(
        `No content/components/<slug>.md yet for: ${missing.join(', ')}`,
    );

pruneOutput([GENERATED, ...CATEGORIES.map((c) => path.join(CONTENT, c.id))]);
