'use client';

import { ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import Link from 'next/link';

export default function HeroBadge() {
    return (
        <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <Link
                href="/docs/components/code-block"
                className="group inline-flex items-center gap-2 rounded-full border bg-fd-card/80 py-1 ps-1 pe-3 text-xs font-medium backdrop-blur transition-colors hover:border-primary/40"
            >
                <span className="inline-flex items-center gap-1 rounded-full bg-primary px-2 py-0.5 text-primary-foreground">
                    <Sparkles className="size-3" />
                    New
                </span>
                Code Block with streaming syntax highlighting
                <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5 rtl:rotate-180" />
            </Link>
        </motion.div>
    );
}
