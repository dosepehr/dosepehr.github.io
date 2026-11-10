'use client';

import { cn } from '@foundation/utils/funcs/cn';
import { ArrowDown, ArrowUp } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';
import BentoTile from '../BentoTile';
import { LEADERBOARD, type SortKey } from '../bentoData';

const COLUMNS: { key: SortKey; label: string; numeric?: boolean }[] = [
    { key: 'name', label: 'Player' },
    { key: 'country', label: 'Country' },
    { key: 'score', label: 'Score', numeric: true },
];

export default function SortableTableTile({
    index,
    className,
}: {
    index: number;
    className?: string;
}) {
    const [sort, setSort] = useState<{ key: SortKey; desc: boolean }>({
        key: 'score',
        desc: true,
    });
    const rows = [...LEADERBOARD].sort((a, b) => {
        const order = a[sort.key] > b[sort.key] ? 1 : -1;
        return sort.desc ? -order : order;
    });
    const toggle = (key: SortKey) =>
        setSort((s) => ({
            key,
            desc: s.key === key ? !s.desc : key === 'score',
        }));

    return (
        <BentoTile
            title="Table"
            hint="Click a header"
            index={index}
            className={className}
        >
            <table className="w-full text-sm">
                <thead>
                    <tr className="text-xs text-muted-foreground">
                        {COLUMNS.map((column) => (
                            <th
                                key={column.key}
                                className={cn(
                                    'pb-2 font-medium',
                                    column.numeric ? 'text-end' : 'text-start',
                                )}
                            >
                                <button
                                    type="button"
                                    onClick={() => toggle(column.key)}
                                    className={cn(
                                        'inline-flex items-center gap-1 hover:text-foreground',
                                        sort.key === column.key &&
                                            'text-foreground',
                                    )}
                                >
                                    {column.label}
                                    {sort.key === column.key &&
                                        (sort.desc ? (
                                            <ArrowDown className="size-3" />
                                        ) : (
                                            <ArrowUp className="size-3" />
                                        ))}
                                </button>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row, position) => (
                        <motion.tr
                            key={row.name}
                            layout
                            transition={{
                                type: 'spring',
                                stiffness: 500,
                                damping: 40,
                            }}
                            className="border-t"
                        >
                            <td className="py-2 font-medium">
                                <span className="me-2 text-xs text-muted-foreground">
                                    {position + 1}
                                </span>
                                {row.name}
                            </td>
                            <td className="py-2 text-muted-foreground">
                                {row.country}
                            </td>
                            <td className="py-2 text-end tabular-nums">
                                {row.score}
                            </td>
                        </motion.tr>
                    ))}
                </tbody>
            </table>
        </BentoTile>
    );
}
