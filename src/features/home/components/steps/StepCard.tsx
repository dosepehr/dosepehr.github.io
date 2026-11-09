'use client';

import CodeSnippet from '@/shared/ui/CodeSnippet';
import { motion } from 'motion/react';

interface StepCardProps {
    step: number;
    title: string;
    description: string;
    code: string;
    lang: string;
}

export default function StepCard({
    step,
    title,
    description,
    code,
    lang,
}: StepCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: step * 0.12 }}
            className="relative flex min-w-0 flex-col gap-4"
        >
            <span className="flex size-10 items-center justify-center rounded-full border-2 border-primary bg-fd-background font-bold text-primary-text">
                {step}
            </span>
            <div className="flex flex-col gap-1">
                <h3 className="font-semibold">{title}</h3>
                <p className="text-sm text-fd-muted-foreground">
                    {description}
                </p>
            </div>
            <CodeSnippet code={code} lang={lang} />
        </motion.div>
    );
}
