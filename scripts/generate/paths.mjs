import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));

export const DOCS_ROOT = path.resolve(here, '../..');
// The component library, copied in by scripts/sync-foundation.mjs.
export const FOUNDATION = path.join(DOCS_ROOT, 'foundation');
export const SRC = path.join(FOUNDATION, 'src');
export const GENERATED = path.join(DOCS_ROOT, 'src/generated');
export const CONTENT = path.join(DOCS_ROOT, 'content/docs');

// Component categories that get a docs page each.
export const CATEGORIES = [
    { id: 'components', dir: 'components/ui', title: 'Components' },
    { id: 'form', dir: 'components/controlled', title: 'Form fields' },
];

// Sidebar groups for the Components section, in display order. A page's group
// is the `category` in its content/components/<slug>.md.
export const COMPONENT_GROUPS = [
    'Actions',
    'Forms',
    'Overlays',
    'Navigation',
    'Data display',
    'Feedback',
    'Layout',
    'Chat',
    'App',
];

export const toKebab = (str) =>
    str
        .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
        .replace(/([A-Z]+)([A-Z][a-z])/g, '$1-$2')
        .toLowerCase();

export const toTitle = (str) =>
    str
        .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
        .replace(/([A-Z]+)([A-Z][a-z])/g, '$1 $2');

export const toSentence = (str) => {
    const words = toTitle(str).split(' ');
    return [
        words[0],
        ...words
            .slice(1)
            .map((w) => (/^[A-Z]{2,}/.test(w) ? w : w.toLowerCase())),
    ].join(' ');
};
