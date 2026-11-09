'use client';

import { PRESETS } from '@/core/theme/presets';
import { useThemeStore } from '@/store/useThemeStore';
import { Check } from 'lucide-react';
import { motion } from 'motion/react';

// Clicking a swatch applies that preset to the whole site.
export default function ThemeSwatches() {
    const presetId = useThemeStore((s) => s.presetId);
    const applyPreset = useThemeStore((s) => s.applyPreset);

    return (
        <div className="flex flex-wrap justify-center gap-3">
            {PRESETS.map((preset) => {
                const active = preset.id === presetId;
                return (
                    <motion.button
                        key={preset.id}
                        type="button"
                        aria-label={`${preset.name} theme`}
                        aria-pressed={active}
                        onClick={() => applyPreset(preset.id)}
                        whileHover={{ scale: 1.12 }}
                        whileTap={{ scale: 0.92 }}
                        className="relative flex size-11 items-center justify-center rounded-full shadow-md ring-offset-2 ring-offset-fd-background"
                        style={{ backgroundColor: preset.swatch }}
                    >
                        {active && (
                            <motion.span
                                layoutId="theme-ring"
                                className="absolute -inset-1 rounded-full ring-2 ring-fd-foreground/70"
                            />
                        )}
                        {active && (
                            <Check className="size-4 text-white mix-blend-difference" />
                        )}
                    </motion.button>
                );
            })}
        </div>
    );
}
