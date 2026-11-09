'use client';

import { cn } from '@foundation/utils/funcs/cn';
import { type MotionValue, motion, useTransform } from 'motion/react';
import type { ReactNode } from 'react';

interface FloatingCardProps {
    children: ReactNode;
    className?: string;
    /** How strongly the card follows the pointer; deeper cards move more. */
    depth: number;
    pointerX: MotionValue<number>;
    pointerY: MotionValue<number>;
    delay?: number;
}

// A card in the hero collage: pops in, bobs gently and follows the pointer.
export default function FloatingCard({
    children,
    className,
    depth,
    pointerX,
    pointerY,
    delay = 0,
}: FloatingCardProps) {
    const x = useTransform(pointerX, (v) => v * depth * 14);
    const y = useTransform(pointerY, (v) => v * depth * 14);

    return (
        <motion.div style={{ x, y }} className={cn('absolute', className)}>
            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: [0, -8, 0] }}
                transition={{
                    opacity: { duration: 0.5, delay },
                    scale: { duration: 0.5, delay },
                    y: {
                        duration: 5 + depth,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay,
                    },
                }}
                className="rounded-xl border bg-card p-4 text-card-foreground shadow-xl shadow-black/5"
            >
                {children}
            </motion.div>
        </motion.div>
    );
}
