import CodeSnippet from '@/shared/ui/CodeSnippet';
import { type ComponentProps, isValidElement, type ReactNode } from 'react';

type CodeProps = {
    className?: string;
    children?: ReactNode;
    'data-meta'?: string;
};

const textOf = (node: ReactNode): string => {
    if (typeof node === 'string' || typeof node === 'number')
        return String(node);
    if (Array.isArray(node)) return node.map(textOf).join('');
    if (isValidElement<{ children?: ReactNode }>(node))
        return textOf(node.props.children);
    return '';
};

// Fenced code in MDX pages, rendered with the library CodeBlock.
export default function MdxPre({ children }: ComponentProps<'pre'>) {
    if (!isValidElement<CodeProps>(children)) return <pre>{children}</pre>;

    const { className = '', 'data-meta': meta = '' } = children.props;
    const lang = /language-([\w-]+)/.exec(className)?.[1] ?? 'text';
    const title = /title="([^"]*)"/.exec(meta)?.[1];

    return (
        <CodeSnippet
            code={textOf(children.props.children)}
            lang={lang}
            title={title}
            lineNumbers={/\bshowLineNumbers\b/.test(meta)}
            className="my-6"
        />
    );
}
