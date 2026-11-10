'use client';

import { cn } from '@foundation/utils/funcs/cn';
import { motion } from 'motion/react';
import type { Layer } from '../layersData';
import { slabPlacement, type StackSpacing } from './stackLayout';

interface StackSlabProps {
    layer: Layer;
    level: number;
    active: number;
    spacing: StackSpacing;
    onSelect: () => void;
}

// One floor of the isometric stack. The layers above the active one lift
// away and fade, so the active slab is always uncovered and readable.
export default function StackSlab({
    layer,
    level,
    active,
    spacing,
    onSelect,
}: StackSlabProps) {
    const { Icon } = layer;
    const isActive = level === active;
    return (
        <motion.button
            type="button"
            onClick={onSelect}
            aria-pressed={isActive}
            aria-label={layer.name}
            initial={false}
            animate={slabPlacement(level, active, spacing)}
            transition={{ type: 'spring', stiffness: 200, damping: 26 }}
            className={cn(
                'absolute inset-0 flex items-center gap-3 rounded-2xl border p-4 text-start shadow-lg transition-colors sm:p-5',
                isActive
                    ? 'border-primary bg-primary text-primary-foreground shadow-primary/30'
                    : 'bg-card text-card-foreground',
            )}
        >
            <Icon className="size-5 shrink-0 sm:size-6" />
            <span className="flex flex-col">
                <span className="text-sm font-semibold sm:text-base">
                    {layer.name}
                </span>
                <span
                    className={cn(
                        'hidden text-xs sm:block',
                        isActive
                            ? 'text-primary-foreground/80'
                            : 'text-muted-foreground',
                    )}
                >
                    {layer.tagline}
                </span>
            </span>
        </motion.button>
    );
}
