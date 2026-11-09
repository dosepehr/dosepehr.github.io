import path from 'node:path';
import docgen from 'react-docgen-typescript';
import { DOCS_ROOT } from './paths.mjs';

const typeLabel = (type) => {
    if (type.name === 'enum' && Array.isArray(type.value)) {
        const values = type.value
            .map((v) => v.value)
            .filter((v) => v !== 'undefined');
        return values.length ? values.join(' | ') : (type.raw ?? 'enum');
    }
    return type.raw && type.raw.length < 80 ? type.raw : type.name;
};

const toRows = (doc) =>
    Object.values(doc.props)
        .filter((p) => !p.name.startsWith('aria-') || p.description)
        .sort(
            (a, b) =>
                Number(b.required) - Number(a.required) ||
                a.name.localeCompare(b.name),
        )
        .map((p) => ({
            name: p.name,
            type: typeLabel(p.type),
            required: p.required,
            default:
                p.defaultValue?.value != null
                    ? String(p.defaultValue.value)
                    : undefined,
            description: p.description || undefined,
        }));

// Extracts props for every component file in one TypeScript program.
export function extractProps(files) {
    const parser = docgen.withCustomConfig(
        path.join(DOCS_ROOT, 'tsconfig.json'),
        {
            savePropValueAsString: true,
            shouldExtractLiteralValuesFromEnum: true,
            shouldRemoveUndefinedFromOptional: true,
            // Own props only: skip inherited DOM / Radix / Base UI attributes.
            propFilter: (prop) =>
                !prop.parent || !prop.parent.fileName.includes('node_modules'),
        },
    );
    const byFile = new Map();
    for (const doc of parser.parse(files)) {
        const list = byFile.get(doc.filePath) ?? [];
        list.push({
            name: doc.displayName,
            description: doc.description || undefined,
            props: toRows(doc),
        });
        byFile.set(doc.filePath, list);
    }
    return byFile;
}
