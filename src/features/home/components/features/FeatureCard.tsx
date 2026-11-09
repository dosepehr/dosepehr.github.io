'use client';

import { cn } from '@foundation/utils/funcs/cn';
import { motion } from 'motion/react';
import type { PointerEvent } from 'react';
import type { Feature } from '../../constants';

interface FeatureCardProps extends Feature {
    index: number;
}

// Moves the hover spotlight to the pointer.
const trackPointer = (event: PointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty(
        '--x',
        `${event.clientX - rect.left}px`,
    );
    event.currentTarget.style.setProperty(
        '--y',
        `${event.clientY - rect.top}px`,
    );
};

export default function FeatureCard({
    title,
    description,
    Icon,
    wide,
    index,
}: FeatureCardProps) {
    return (
        <motion.div
            onPointerMove={trackPointer}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ y: -4 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: (index % 3) * 0.08 }}
            className={cn(
                'group relative overflow-hidden rounded-2xl border bg-fd-card p-6',
                'before:pointer-events-none before:absolute before:inset-0 before:opacity-0 before:transition-opacity before:duration-300 hover:before:opacity-100',
                'before:bg-[radial-gradient(400px_circle_at_var(--x)_var(--y),color-mix(in_oklch,var(--primary)_12%,transparent),transparent_70%)]',
                wide && 'lg:col-span-2',
            )}
        >
            <span className="mb-4 inline-flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6">
                <Icon className="size-5" />
            </span>
            <h3 className="mb-2 font-semibold">{title}</h3>
            <p className="text-sm leading-relaxed text-fd-muted-foreground">
                {description}
            </p>
        </motion.div>
    );
}
