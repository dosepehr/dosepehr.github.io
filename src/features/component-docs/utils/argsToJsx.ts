import { isValidElement } from 'react';
import type { Args } from '../types';

const MAX_INLINE = 60;

function attribute(name: string, value: unknown): string | null {
    if (value === undefined || value === null || typeof value === 'function')
        return null;
    if (isValidElement(value)) return null;
    if (typeof value === 'boolean') return value ? name : null;
    if (typeof value === 'string')
        return `${name}="${value.replaceAll('"', '&quot;')}"`;
    if (typeof value === 'number') return `${name}={${value}}`;
    const json = JSON.stringify(value);
    return json && json.length <= MAX_INLINE ? `${name}={${json}}` : null;
}

// JSX snippet for a component rendered with the given args.
export function argsToJsx(componentName: string, args: Args): string {
    const { children, ...rest } = args;
    const attrs = Object.entries(rest)
        .map(([name, value]) => attribute(name, value))
        .filter((a): a is string => a !== null);
    const multiline = attrs.length > 2;
    const open = multiline
        ? `<${componentName}\n    ${attrs.join('\n    ')}\n`
        : `<${componentName}${attrs.length ? ` ${attrs.join(' ')}` : ''}`;
    const hasText =
        typeof children === 'string' || typeof children === 'number';
    if (!hasText) return `${open}${multiline ? '/>' : ' />'}`;
    return multiline
        ? `${open}>\n    ${children}\n</${componentName}>`
        : `${open}>${children}</${componentName}>`;
}
