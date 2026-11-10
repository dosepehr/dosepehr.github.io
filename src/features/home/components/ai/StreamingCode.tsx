'use client';

import CodeBlock, {
    CodeBlockActions,
    CodeBlockContent,
    CodeBlockCopyButton,
    CodeBlockHeader,
    CodeBlockLine,
    CodeBlockTitle,
} from '@foundation/components/ui/CodeBlock';
import { useHighlightedCode } from '@foundation/utils/hooks/useHighlightedCode';

interface StreamingCodeProps {
    code: string;
    complete: boolean;
}

// Code arriving token by token, highlighted as it streams.
export default function StreamingCode({ code, complete }: StreamingCodeProps) {
    const lines = useHighlightedCode(code, 'tsx');

    return (
        <CodeBlock size="sm">
            <CodeBlockHeader>
                <CodeBlockTitle>PricingCard.tsx</CodeBlockTitle>
                <CodeBlockActions>
                    <CodeBlockCopyButton value={code} disabled={!complete} />
                </CodeBlockActions>
            </CodeBlockHeader>
            <CodeBlockContent lineNumbers className="max-h-72">
                {lines.map((line, index) => (
                    <CodeBlockLine key={index}>{line}</CodeBlockLine>
                ))}
            </CodeBlockContent>
        </CodeBlock>
    );
}
