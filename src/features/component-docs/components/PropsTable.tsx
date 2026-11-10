import type { PropsDoc } from '../types';

// A plain props table (prop, type, default, description) with no
// expandable rows; long types wrap and the table scrolls on small screens.
export default function PropsTable({ doc }: { doc: PropsDoc }) {
    return (
        <div className="not-prose overflow-x-auto rounded-xl border">
            <table className="w-full text-start text-sm">
                <thead className="bg-fd-muted/60 text-xs text-fd-muted-foreground">
                    <tr>
                        <th className="px-4 py-2.5 text-start font-medium">
                            Prop
                        </th>
                        <th className="px-4 py-2.5 text-start font-medium">
                            Type
                        </th>
                        <th className="px-4 py-2.5 text-start font-medium">
                            Default
                        </th>
                        <th className="px-4 py-2.5 text-start font-medium">
                            Description
                        </th>
                    </tr>
                </thead>
                <tbody className="divide-y">
                    {doc.props.map((prop) => (
                        <tr key={prop.name} className="align-top">
                            <td className="px-4 py-3 whitespace-nowrap">
                                <code className="font-mono text-[0.8rem] font-medium text-primary-text">
                                    {prop.name}
                                </code>
                                {prop.required && (
                                    <span
                                        className="ms-1 text-destructive"
                                        title="Required"
                                    >
                                        *
                                    </span>
                                )}
                            </td>
                            <td className="min-w-48 px-4 py-3">
                                <code className="font-mono text-[0.8rem] break-words text-fd-muted-foreground">
                                    {prop.type}
                                </code>
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap">
                                {prop.default === undefined ? (
                                    <span className="text-fd-muted-foreground">
                                        —
                                    </span>
                                ) : (
                                    <code className="font-mono text-[0.8rem]">
                                        {prop.default}
                                    </code>
                                )}
                            </td>
                            <td className="min-w-56 px-4 py-3 text-fd-muted-foreground">
                                {prop.description ?? '—'}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
