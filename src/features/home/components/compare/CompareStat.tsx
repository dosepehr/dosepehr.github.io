'use client';

import { useCountUp } from '../../hooks/useCountUp';

export default function CompareStat({
    value,
    label,
}: {
    value: number;
    label: string;
}) {
    const count = useCountUp(value, true, 0.6);
    return (
        <div className="flex flex-col">
            <span className="text-3xl font-bold tabular-nums">{count}</span>
            <span className="text-xs text-fd-muted-foreground">{label}</span>
        </div>
    );
}
