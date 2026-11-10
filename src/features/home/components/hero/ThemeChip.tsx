'use client';

import { PRESETS } from '@/core/theme/presets';
import { useIsClient } from '@/shared/hooks/useIsClient';
import { useThemeStore } from '@/store/useThemeStore';
import { Shuffle } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useState } from 'react';

// Shows the theme picked for this visit and swaps it for another.
export default function ThemeChip() {
    const isClient = useIsClient();
    const presetId = useThemeStore((s) => s.presetId);
    const shuffle = useThemeStore((s) => s.shuffle);
    const [spins, setSpins] = useState(0);
    const preset = PRESETS.find((p) => p.id === presetId);
    const name = presetId === 'custom' ? 'Custom' : (preset?.name ?? 'Default');

    if (!isClient) return <div className="h-9" />;

    return (
        <div className="inline-flex items-center gap-3 rounded-full border bg-fd-card/80 py-1 ps-3 pe-1 text-sm backdrop-blur">
            <span className="text-fd-muted-foreground">Today&apos;s theme</span>
            <AnimatePresence mode="popLayout" initial={false}>
                <motion.span
                    key={name}
                    className="inline-flex items-center gap-1.5 font-medium"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                >
                    <span className="size-3 rounded-full bg-primary" />
                    {name}
                </motion.span>
            </AnimatePresence>
            <motion.button
                type="button"
                onClick={() => {
                    shuffle();
                    setSpins((n) => n + 1);
                }}
                whileTap={{ scale: 0.92 }}
                className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground"
            >
                <motion.span
                    animate={{ rotate: spins * 180 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                >
                    <Shuffle className="size-3.5" />
                </motion.span>
                Shuffle
            </motion.button>
        </div>
    );
}
