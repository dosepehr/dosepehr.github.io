'use client';

import { PRESETS } from '@/core/theme/presets';
import { useIsClient } from '@/shared/hooks/useIsClient';
import { useThemeStore } from '@/store/useThemeStore';
import Switch from '@foundation/components/ui/Switch';
import { motion } from 'motion/react';
import { useTheme } from 'next-themes';
import BentoTile from '../BentoTile';

const SWATCHES = PRESETS.filter((p) => p.id !== 'foundation').slice(0, 6);

// These controls change the whole site.
export default function ThemeTile({
    index,
    className,
}: {
    index: number;
    className?: string;
}) {
    const { resolvedTheme, setTheme } = useTheme();
    const isClient = useIsClient();
    const presetId = useThemeStore((s) => s.presetId);
    const applyPreset = useThemeStore((s) => s.applyPreset);

    return (
        <BentoTile
            title="Theme"
            hint="Changes this site"
            index={index}
            className={className}
        >
            <div className="flex flex-col gap-4">
                <Switch
                    label="Dark mode"
                    checked={isClient && resolvedTheme === 'dark'}
                    onCheckedChange={(checked: boolean) =>
                        setTheme(checked ? 'dark' : 'light')
                    }
                    className="w-full"
                />
                <div className="flex flex-wrap gap-2">
                    {SWATCHES.map((preset) => (
                        <motion.button
                            key={preset.id}
                            type="button"
                            aria-label={`${preset.name} theme`}
                            aria-pressed={presetId === preset.id}
                            onClick={() => applyPreset(preset.id)}
                            whileHover={{ scale: 1.15 }}
                            whileTap={{ scale: 0.9 }}
                            className="size-7 rounded-full shadow-sm ring-offset-2 ring-offset-card aria-pressed:ring-2 aria-pressed:ring-foreground/60"
                            style={{ backgroundColor: preset.swatch }}
                        />
                    ))}
                </div>
            </div>
        </BentoTile>
    );
}
