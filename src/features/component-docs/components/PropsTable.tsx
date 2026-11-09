import { TypeTable } from 'fumadocs-ui/components/type-table';
import type { PropsDoc } from '../types';

const toTypeNodes = (doc: PropsDoc) =>
    Object.fromEntries(
        doc.props.map((p) => [
            p.name,
            {
                type: p.type,
                description: p.description,
                default: p.default,
                required: p.required,
            },
        ]),
    );

export default function PropsTable({ doc }: { doc: PropsDoc }) {
    return <TypeTable type={toTypeNodes(doc)} />;
}
