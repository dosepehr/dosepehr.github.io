import fs from 'node:fs';
import path from 'node:path';
import ts from 'typescript';
import { SRC, toSentence } from './paths.mjs';

const unwrap = (node) => {
    let n = node;
    while (
        n &&
        (ts.isSatisfiesExpression(n) ||
            ts.isAsExpression(n) ||
            ts.isParenthesizedExpression(n))
    )
        n = n.expression;
    return n;
};

const getProp = (obj, key) =>
    obj.properties.find(
        (p) =>
            (ts.isPropertyAssignment(p) || ts.isMethodDeclaration(p)) &&
            p.name.getText() === key,
    );

const dedent = (code) => {
    const lines = code.replace(/^\n+|\s+$/g, '').split('\n');
    const indents = lines
        .slice(1)
        .filter((l) => l.trim())
        .map((l) => l.match(/^ */)[0].length);
    const min = indents.length ? Math.min(...indents) : 0;
    return [lines[0], ...lines.slice(1).map((l) => l.slice(min))]
        .join('\n')
        .trim();
};

// Source shown in an example's Code tab: the JSX a render function returns,
// or the whole function when it does more than return markup.
function renderSource(prop, sf) {
    const fn = ts.isPropertyAssignment(prop) ? unwrap(prop.initializer) : prop;
    if (!fn) return null;
    if (ts.isArrowFunction(fn) && !ts.isBlock(fn.body))
        return dedent(unwrap(fn.body).getText(sf));
    const body = fn.body;
    if (
        body &&
        ts.isBlock(body) &&
        body.statements.length === 1 &&
        ts.isReturnStatement(body.statements[0])
    ) {
        return dedent(unwrap(body.statements[0].expression).getText(sf));
    }
    return dedent(fn.getText(sf));
}

// Default imports of local helper components, as paths relative to SRC:
// `@foundation/…` aliases and relative imports (e.g. a component's own
// `./stories/Demo`).
function localImports(sf, file) {
    const map = new Map();
    for (const statement of sf.statements) {
        if (!ts.isImportDeclaration(statement)) continue;
        const name = statement.importClause?.name?.getText(sf);
        const spec = statement.moduleSpecifier.text;
        if (!name) continue;
        if (spec.startsWith('@foundation/'))
            map.set(name, spec.slice('@foundation/'.length));
        else if (spec.startsWith('.'))
            map.set(
                name,
                path.relative(SRC, path.resolve(path.dirname(file), spec)),
            );
    }
    return map;
}

// A story that only renders a helper (`<WrapToggleDemo />`) shows the
// helper's source instead, so the Code tab has something to copy.
function expandHelper(source, imports) {
    const match = source?.match(/^<(\w+)\s*\/>$/);
    const rel = match && imports.get(match[1]);
    if (!rel) return source;
    const file = ['.tsx', '.ts']
        .map((ext) => path.join(SRC, rel + ext))
        .find((f) => fs.existsSync(f));
    if (!file) return source;
    return fs
        .readFileSync(file, 'utf8')
        .replace(/^\/\/ @ts-nocheck[^\n]*\n/, '')
        .replace(/^'use client';\n+/, '')
        .replaceAll("'@foundation/", "'@/")
        .trim();
}

// Reads a CSF stories file: the meta's component name and each story.
export function parseStoriesFile(file) {
    const sf = ts.createSourceFile(
        file,
        fs.readFileSync(file, 'utf8'),
        ts.ScriptTarget.Latest,
        true,
        ts.ScriptKind.TSX,
    );
    let componentName = null;
    const stories = [];
    const imports = localImports(sf, file);
    for (const statement of sf.statements) {
        if (!ts.isVariableStatement(statement)) continue;
        const exported = statement.modifiers?.some(
            (m) => m.kind === ts.SyntaxKind.ExportKeyword,
        );
        for (const decl of statement.declarationList.declarations) {
            const init = unwrap(decl.initializer);
            if (!init || !ts.isObjectLiteralExpression(init)) continue;
            const name = decl.name.getText(sf);
            if (!exported && name === 'meta') {
                const component = getProp(init, 'component');
                componentName = component
                    ? unwrap(component.initializer).getText(sf)
                    : null;
            } else if (exported) {
                const render = getProp(init, 'render');
                const label = getProp(init, 'name');
                const hasArgs = Boolean(getProp(init, 'args'));
                stories.push({
                    exportName: name,
                    title:
                        label && ts.isStringLiteral(unwrap(label.initializer))
                            ? unwrap(label.initializer).text
                            : toSentence(name),
                    source: render
                        ? expandHelper(renderSource(render, sf), imports)
                        : null,
                    hasArgs,
                });
            }
        }
    }
    return { componentName, stories };
}
