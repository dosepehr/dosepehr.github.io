import defaultMdxComponents from 'fumadocs-ui/mdx';
import type { MDXComponents } from 'mdx/types';
import MdxPre from './MdxPre';

export function getMDXComponents(components?: MDXComponents) {
    return {
        ...defaultMdxComponents,
        pre: MdxPre,
        ...components,
    } satisfies MDXComponents;
}

export const useMDXComponents = getMDXComponents;

declare global {
    type MDXProvidedComponents = ReturnType<typeof getMDXComponents>;
}
