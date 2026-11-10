'use client';

import CodeSnippet from '@/shared/ui/CodeSnippet';
import Button from '@foundation/components/ui/Button';
import { AnimatePresence, motion } from 'motion/react';
import { useState } from 'react';
import { COMPONENT_BUTTON, TAILWIND_BUTTON } from '../../constants';
import { countClasses } from '../../utils';
import Reveal from '../Reveal';
import SectionHeading from '../SectionHeading';
import SegmentedToggle from '../SegmentedToggle';
import CompareStat from './CompareStat';

const MODES = [
    { value: 'tailwind', label: 'Tailwind only' },
    { value: 'component', label: 'Frontend Foundation' },
] as const;

const CODE = { tailwind: TAILWIND_BUTTON, component: COMPONENT_BUTTON };

export default function CodeCompare() {
    const [mode, setMode] = useState<'tailwind' | 'component'>('tailwind');
    const code = CODE[mode];

    return (
        <section className="container mx-auto flex max-w-6xl flex-col items-center gap-10 px-4 py-24">
            <SectionHeading
                eyebrow="Less markup"
                title="Same button. A fraction of the code."
                description="Variants, states, dark mode and RTL are built in, so your markup says what it is, not how it looks."
            />
            <Reveal className="flex w-full flex-col items-center gap-8">
                <SegmentedToggle
                    options={MODES}
                    value={mode}
                    onChange={setMode}
                    layoutId="compare-pill"
                    label="Code style"
                />
                <div className="grid w-full gap-6 lg:grid-cols-[1.4fr_1fr]">
                    <AnimatePresence mode="wait" initial={false}>
                        <motion.div
                            key={mode}
                            className="min-w-0"
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -12 }}
                            transition={{ duration: 0.25 }}
                        >
                            <CodeSnippet
                                code={code}
                                lang="tsx"
                                title={
                                    mode === 'tailwind'
                                        ? 'button.tsx'
                                        : 'page.tsx'
                                }
                            />
                        </motion.div>
                    </AnimatePresence>
                    <div className="flex flex-col justify-between gap-8 rounded-2xl border bg-fd-card p-6">
                        <div className="flex flex-1 items-center justify-center rounded-xl border border-dashed p-10">
                            <Button showArrow>Get started</Button>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                            <CompareStat
                                key={`classes-${mode}`}
                                value={countClasses(code)}
                                label="classes to write"
                            />
                            <CompareStat
                                key={`lines-${mode}`}
                                value={code.split('\n').length}
                                label="lines"
                            />
                            <CompareStat
                                key={`chars-${mode}`}
                                value={code.length}
                                label="characters"
                            />
                        </div>
                    </div>
                </div>
            </Reveal>
        </section>
    );
}
