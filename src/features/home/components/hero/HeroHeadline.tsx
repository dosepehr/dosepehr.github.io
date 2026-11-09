'use client';

import { motion } from 'motion/react';

const WORDS = ['Build', 'accessible,', 'RTL‑ready', 'interfaces', 'faster'];
const HIGHLIGHT = 'RTL‑ready';

// The headline, revealed word by word.
export default function HeroHeadline() {
    return (
        <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-balance md:text-6xl lg:text-7xl">
            {WORDS.map((word, index) => (
                <motion.span
                    key={word}
                    className="inline-block pe-[0.25em]"
                    initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    transition={{
                        duration: 0.6,
                        delay: 0.15 + index * 0.08,
                        ease: [0.21, 0.47, 0.32, 0.98],
                    }}
                >
                    {word === HIGHLIGHT ? (
                        <span className="bg-linear-to-r from-primary to-[color-mix(in_oklch,var(--primary)_45%,#ec4899)] bg-clip-text text-transparent">
                            {word}
                        </span>
                    ) : (
                        word
                    )}
                </motion.span>
            ))}
        </h1>
    );
}
