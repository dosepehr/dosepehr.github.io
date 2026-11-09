'use client';

import { githubUrl } from '@/core/site';
import GithubIcon from '@/shared/ui/GithubIcon';
import { motion } from 'motion/react';
import Link from 'next/link';

export default function HeroActions() {
    return (
        <motion.div
            className="flex flex-wrap justify-center gap-3 lg:justify-start"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
        >
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Link
                    href="/docs"
                    className="inline-flex rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-lg shadow-primary/25"
                >
                    Get started
                </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Link
                    href="/docs/components/button"
                    className="inline-flex rounded-lg border bg-fd-card px-5 py-2.5 text-sm font-medium"
                >
                    Browse components
                </Link>
            </motion.div>
            <motion.a
                href={githubUrl}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium text-fd-muted-foreground hover:text-fd-foreground"
            >
                <GithubIcon className="size-4" />
                GitHub
            </motion.a>
        </motion.div>
    );
}
