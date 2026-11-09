'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import Reveal from './Reveal';

export default function CtaBanner() {
    return (
        <section className="container mx-auto max-w-6xl px-4 pb-24">
            <Reveal>
                <motion.div
                    className="relative overflow-hidden rounded-3xl bg-linear-to-r from-primary via-info to-primary bg-size-[200%_100%] px-6 py-16 text-center text-primary-foreground"
                    animate={{
                        backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                    }}
                    transition={{
                        duration: 12,
                        repeat: Infinity,
                        ease: 'linear',
                    }}
                >
                    <h2 className="mb-3 text-3xl font-bold tracking-tight text-balance md:text-4xl">
                        Start building today
                    </h2>
                    <p className="mx-auto mb-8 max-w-xl text-balance opacity-90">
                        Add your first component in under a minute, and keep
                        full control of the code.
                    </p>
                    <div className="flex flex-wrap justify-center gap-3">
                        <motion.div
                            whileHover={{ scale: 1.04 }}
                            whileTap={{ scale: 0.96 }}
                        >
                            <Link
                                href="/docs/installation"
                                className="inline-flex rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-neutral-900 shadow-lg"
                            >
                                Install now
                            </Link>
                        </motion.div>
                        <motion.div
                            whileHover={{ scale: 1.04 }}
                            whileTap={{ scale: 0.96 }}
                        >
                            <Link
                                href="/themes"
                                className="inline-flex rounded-lg border border-white/40 px-5 py-2.5 text-sm font-semibold"
                            >
                                Design a theme
                            </Link>
                        </motion.div>
                    </div>
                </motion.div>
            </Reveal>
        </section>
    );
}
