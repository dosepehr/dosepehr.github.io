'use client';

import CodeBlock, {
    CodeBlockActions,
    CodeBlockContent,
    CodeBlockCopyButton,
    CodeBlockHeader,
    CodeBlockLine,
    CodeBlockTitle,
} from '@foundation/components/ui/CodeBlock';
import { cn } from '@foundation/utils/funcs/cn';
import { useHighlightedCode } from '@foundation/utils/hooks/useHighlightedCode';

interface CodeSnippetProps {
    code: string;
    /** Language or alias for Shiki (`tsx`, `bash`, `css`, …); unknown ones stay plain. */
    lang?: string;
    /** Shown in a header with the copy button; without it the copy button floats. */
    title?: string;
    lineNumbers?: boolean;
    className?: string;
}

// Every code sample on the site: the library's CodeBlock, highlighted with
// its useHighlightedCode hook.
export default function CodeSnippet({
    code,
    lang = 'text',
    title,
    lineNumbers = false,
    className,
}: CodeSnippetProps) {
    const value = code.replace(/\n$/, '');
    const lines = useHighlightedCode(value, lang);
    const copy = (
        <CodeBlockActions>
            <CodeBlockCopyButton value={value} />
        </CodeBlockActions>
    );

    return (
        <CodeBlock className={cn('not-prose bg-fd-card', className)}>
            {title ? (
                <CodeBlockHeader>
                    <CodeBlockTitle>{title}</CodeBlockTitle>
                    {copy}
                </CodeBlockHeader>
            ) : (
                copy
            )}
            <CodeBlockContent lineNumbers={lineNumbers}>
                {lines.map((line, index) => (
                    <CodeBlockLine key={index}>{line}</CodeBlockLine>
                ))}
            </CodeBlockContent>
        </CodeBlock>
    );
}
