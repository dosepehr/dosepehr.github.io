---
category: 'Data display'
title: 'Code Block'
description: 'Displays code, terminal output and diffs with an optional header, line numbers and a copy button.'
---

`CodeBlockContent` takes a string or a list of `CodeBlockLine`. Use lines when you need line variants or highlighted tokens.

```text
CodeBlock
├── CodeBlockHeader
│   ├── CodeBlockTitle
│   └── CodeBlockActions
│       └── CodeBlockCopyButton
├── CodeBlockActions (floating, when there is no header)
├── CodeBlockContent
│   └── CodeBlockLine
└── CodeBlockFooter
```

- **It streams cheaply.** A string child renders as one text node, and the highlighter tokenizes only the new lines as code arrives.
- **It copies cleanly.** Line numbers and diff markers are left out of a selection, and blank lines survive the copy.
- **It reads left to right.** The content is always `dir="ltr"`; the header follows the page direction.
- **It scrolls by keyboard.** The content is focusable, and floating actions show on focus as well as on hover.

### Syntax highlighting

Installing `code-block` also installs `useHighlightedCode` (and the Shiki-based `highlighter`). The hook returns one React node per line for `CodeBlockLine`, with plain lines until the language has loaded:

```tsx
import { useHighlightedCode } from '@/hooks/useHighlightedCode';

const lines = useHighlightedCode(code, 'tsx');

<CodeBlock>
    <CodeBlockContent>
        {lines.map((line, index) => (
            <CodeBlockLine key={index}>{line}</CodeBlockLine>
        ))}
    </CodeBlockContent>
</CodeBlock>;
```

Shiki runs on its JavaScript regex engine (no WASM), and each language loads the first time it's used. Pass `"ansi"` to render the colors in terminal output. In a Server Component, `highlightCode(code, language)` from the highlighter keeps Shiki out of the client bundle. Every code sample on this site is rendered this way.
