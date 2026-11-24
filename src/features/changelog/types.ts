// Entry types, as written in an entry's front matter (see
// scripts/generate/changelog.mjs).
export type EntryType = 'feature' | 'improvement' | 'fix' | 'breaking';

// ---- Generated data (src/generated/changelog-components.json) ----

export interface ChangelogComponent {
    title: string;
    category: string;
}
