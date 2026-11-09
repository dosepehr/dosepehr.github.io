'use client';

import { motion } from 'motion/react';

// A faded grid with two slowly drifting glows in the theme's primary color.
export default function HeroBackground() {
    return (
        <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
        >
            <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-fd-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-fd-border)_1px,transparent_1px)] mask-[radial-gradient(ellipse_70%_60%_at_50%_0%,black,transparent)] bg-size-[48px_48px] opacity-60" />
            <motion.div
                className="absolute -top-32 left-1/4 size-[28rem] rounded-full bg-primary/25 blur-3xl"
                animate={{ x: [0, 60, -20, 0], y: [0, 30, 60, 0] }}
                transition={{
                    duration: 18,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
            />
            <motion.div
                className="absolute top-20 right-1/5 size-[22rem] rounded-full bg-info/20 blur-3xl"
                animate={{ x: [0, -50, 30, 0], y: [0, 50, -20, 0] }}
                transition={{
                    duration: 22,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
            />
        </div>
    );
}
