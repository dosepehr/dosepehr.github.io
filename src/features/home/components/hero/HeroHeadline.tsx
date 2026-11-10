'use client';

import { AnimatePresence, motion } from 'motion/react';
import { useRotatingIndex } from '../../hooks/useRotatingIndex';

const WORDS = ['accessible', 'RTL‑ready', 'themeable', 'beautiful', 'yours'];

// "Build [word] interfaces, faster." with the word swapping in place.
export default function HeroHeadline() {
    const index = useRotatingIndex(WORDS.length);

    return (
        <motion.h1
            className="text-5xl leading-none font-extrabold tracking-tight text-balance md:text-6xl lg:text-7xl"
            initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
        >
            <span className="block">Build</span>
            <span className="relative -my-[0.06em] block h-[1.22em] overflow-hidden">
                <AnimatePresence mode="popLayout" initial={false}>
                    <motion.span
                        key={WORDS[index]}
                        className="absolute inset-x-0 block bg-linear-to-r from-primary to-[color-mix(in_oklch,var(--primary)_45%,#ec4899)] bg-clip-text py-[0.08em] text-transparent"
                        initial={{ y: '100%', opacity: 0, filter: 'blur(6px)' }}
                        animate={{ y: '0%', opacity: 1, filter: 'blur(0px)' }}
                        exit={{ y: '-100%', opacity: 0, filter: 'blur(6px)' }}
                        transition={{
                            duration: 0.55,
                            ease: [0.21, 0.47, 0.32, 0.98],
                        }}
                    >
                        {WORDS[index]}
                    </motion.span>
                </AnimatePresence>
            </span>
            <span className="block">interfaces, faster.</span>
        </motion.h1>
    );
}
