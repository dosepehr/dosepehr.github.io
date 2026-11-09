import fs from 'node:fs';
import path from 'node:path';
import { DOCS_ROOT } from './paths.mjs';

// Hand-written text for each component page: content/components/<slug>.md,
// with `title` (optional), `description` and `category` (the sidebar group) in
// the front matter and optional usage notes as the body.
export const COMPONENT_CONTENT = path.join(DOCS_ROOT, 'content/components');

const unquote = (value) => {
    const v = value.trim();
    return v.startsWith('"') ? JSON.parse(v) : v.replace(/^'|'$/g, '');
};

export function readComponentContent(slug) {
    const file = path.join(COMPONENT_CONTENT, `${slug}.md`);
    if (!fs.existsSync(file)) return null;
    const text = fs.readFileSync(file, 'utf8');
    const match = text.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
    if (!match) throw new Error(`${file}: missing front matter`);
    const data = {};
    for (const line of match[1].split('\n')) {
        const sep = line.indexOf(':');
        if (sep > 0)
            data[line.slice(0, sep).trim()] = unquote(line.slice(sep + 1));
    }
    if (!data.description)
        throw new Error(`${file}: front matter needs a description`);
    return {
        title: data.title,
        description: data.description,
        category: data.category,
        notes: match[2].trim() || undefined,
    };
}
