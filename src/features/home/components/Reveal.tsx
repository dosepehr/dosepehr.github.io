'use client';

import { motion } from 'motion/react';
import type { ReactNode } from 'react';

interface RevealProps {
    children: ReactNode;
    delay?: number;
    className?: string;
}

// Fades and lifts its content in the first time it scrolls into view.
export default function Reveal({
    children,
    delay = 0,
    className,
}: RevealProps) {
    return (
        <motion.div
            className={className}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{
                duration: 0.6,
                ease: [0.21, 0.47, 0.32, 0.98],
                delay,
            }}
        >
            {children}
        </motion.div>
    );
}
