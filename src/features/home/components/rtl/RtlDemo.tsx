'use client';

import { cn } from '@foundation/utils/funcs/cn';
import { motion } from 'motion/react';
import { useState } from 'react';
import Reveal from '../Reveal';
import SectionHeading from '../SectionHeading';
import RtlPreview from './RtlPreview';

const DIRECTIONS = [
    { value: 'ltr', label: 'English · LTR' },
    { value: 'rtl', label: 'فارسی · RTL' },
] as const;

export default function RtlDemo() {
    const [dir, setDir] = useState<'ltr' | 'rtl'>('rtl');

    return (
        <section className="container mx-auto flex max-w-6xl flex-col items-center gap-10 px-4 py-24">
            <SectionHeading
                eyebrow="Right to left"
                title="One prop flips the whole layout"
                description="Components use logical properties, so Persian and Arabic interfaces mirror without extra code."
            />
            <Reveal className="flex w-full flex-col items-center gap-8">
                <div
                    className="relative flex rounded-full border bg-fd-card p-1"
                    role="group"
                    aria-label="Direction"
                >
                    {DIRECTIONS.map(({ value, label }) => (
                        <button
                            key={value}
                            type="button"
                            aria-pressed={dir === value}
                            onClick={() => setDir(value)}
                            className={cn(
                                'relative z-10 rounded-full px-4 py-1.5 text-sm font-medium transition-colors',
                                dir === value
                                    ? 'text-primary-foreground'
                                    : 'text-fd-muted-foreground',
                            )}
                        >
                            {dir === value && (
                                <motion.span
                                    layoutId="rtl-pill"
                                    className="absolute inset-0 -z-10 rounded-full bg-primary"
                                    transition={{
                                        type: 'spring',
                                        stiffness: 400,
                                        damping: 30,
                                    }}
                                />
                            )}
                            {label}
                        </button>
                    ))}
                </div>
                <RtlPreview dir={dir} />
            </Reveal>
        </section>
    );
}
