import type { Code, Root } from 'mdast';

type Node = Root | Root['children'][number];

// Keeps a fenced block's meta string (```tsx title="app.tsx" showLineNumbers)
// on the rendered <code> as `data-meta`, since Fumadocs' code highlighter
// (which normally reads it) is turned off in favour of the library CodeBlock.
export function remarkCodeMeta() {
    const visit = (node: Node) => {
        if (node.type === 'code') {
            const code = node as Code;
            if (code.meta) {
                code.data = {
                    ...code.data,
                    hProperties: {
                        ...code.data?.hProperties,
                        'data-meta': code.meta,
                    },
                };
            }
            return;
        }
        if ('children' in node) {
            for (const child of node.children) visit(child as Node);
        }
    };
    return (tree: Root) => visit(tree);
}
