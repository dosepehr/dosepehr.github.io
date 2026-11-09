'use client';

import { RADIUS_OPTIONS } from '@/core/theme/presets';
import defaults from '@/generated/theme-defaults.json';
import { useThemeStore } from '@/store/useThemeStore';
import { cn } from '@foundation/utils/funcs/cn';

export default function RadiusPicker() {
    const radius = useThemeStore((s) => s.radius) ?? defaults.radius;
    const setRadius = useThemeStore((s) => s.setRadius);

    return (
        <div className="grid grid-cols-6 gap-2">
            {RADIUS_OPTIONS.map((option) => (
                <button
                    key={option}
                    type="button"
                    aria-pressed={radius === option}
                    onClick={() => setRadius(option)}
                    className={cn(
                        'rounded-md border py-1.5 text-xs font-medium transition-colors hover:bg-fd-accent',
                        radius === option &&
                            'border-fd-primary ring-1 ring-fd-primary',
                    )}
                >
                    {option}
                </button>
            ))}
        </div>
    );
}
