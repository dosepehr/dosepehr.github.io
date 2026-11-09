'use client';

import type { ComponentDocsData } from '../types';
import PropsTable from './PropsTable';

// API reference: the main component's own props, then its sub-components'.
// Inherited native / Radix props are left out and mentioned instead.
export default function PropsView({ data }: { data: ComponentDocsData }) {
    const { main, parts } = data.props;

    return (
        <div className="flex flex-col gap-6">
            {main?.props.length ? (
                <PropsTable doc={main} />
            ) : (
                <p>
                    <code>{data.componentName}</code> has no props of its own:
                    it accepts the props of the element or primitive it wraps.
                </p>
            )}
            {parts.map((part) => (
                <div key={part.name}>
                    <p className="font-medium">
                        <code>{part.name}</code>
                    </p>
                    <PropsTable doc={part} />
                </div>
            ))}
            <p className="text-sm text-fd-muted-foreground">
                Props inherited from the underlying element or primitive (HTML
                attributes, Radix / Base UI props) are passed through and not
                listed here.
            </p>
        </div>
    );
}
