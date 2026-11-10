'use client';

import { cn } from '@foundation/utils/funcs/cn';
import { motion } from 'motion/react';
import type { ReactNode } from 'react';

interface BentoTileProps {
    title: string;
    hint: string;
    children: ReactNode;
    className?: string;
    index: number;
}

export default function BentoTile({
    title,
    hint,
    children,
    className,
    index,
}: BentoTileProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ y: -4 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: index * 0.07 }}
            className={cn(
                'flex flex-col gap-4 rounded-3xl border bg-card p-5 text-card-foreground shadow-sm',
                className,
            )}
        >
            <div className="flex items-baseline justify-between gap-2">
                <span className="text-sm font-semibold">{title}</span>
                <span className="text-xs text-muted-foreground">{hint}</span>
            </div>
            <div className="flex min-h-0 flex-1 flex-col justify-center">
                {children}
            </div>
        </motion.div>
    );
}
