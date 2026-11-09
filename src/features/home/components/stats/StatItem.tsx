'use client';

import { useInView } from 'motion/react';
import { useRef } from 'react';
import { useCountUp } from '../../hooks/useCountUp';

interface StatItemProps {
    value: number;
    suffix?: string;
    label: string;
}

export default function StatItem({ value, suffix = '', label }: StatItemProps) {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: '-60px' });
    const count = useCountUp(value, inView);

    return (
        <div ref={ref} className="flex flex-col items-center gap-1 text-center">
            <span className="text-4xl font-bold tracking-tight tabular-nums md:text-5xl">
                {count}
                {suffix}
            </span>
            <span className="text-sm text-fd-muted-foreground">{label}</span>
        </div>
    );
}
