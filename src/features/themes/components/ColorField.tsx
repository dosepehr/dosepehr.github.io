'use client';

import { isHexColor } from '@/core/theme/color';
import type { ColorKey, ThemeMode } from '@/core/theme/types';
import { useThemeStore } from '@/store/useThemeStore';
import { useState } from 'react';
import { COLOR_LABELS } from '../constants';
import { useThemeColor } from '../hooks/useThemeColor';

interface ColorFieldProps {
    mode: ThemeMode;
    colorKey: ColorKey;
}

// Swatch picker plus a hex text field for one token.
export default function ColorField({ mode, colorKey }: ColorFieldProps) {
    const value = useThemeColor(mode, colorKey);
    const setColor = useThemeStore((s) => s.setColor);
    const [draft, setDraft] = useState<string | null>(null);
    const { label, hint } = COLOR_LABELS[colorKey];
    const id = `color-${colorKey}`;

    const commit = (next: string) => {
        if (isHexColor(next)) setColor(mode, colorKey, next.toLowerCase());
        setDraft(null);
    };

    return (
        <div className="flex items-center gap-3">
            <input
                id={id}
                type="color"
                value={value}
                onChange={(e) => setColor(mode, colorKey, e.target.value)}
                className="size-8 shrink-0 cursor-pointer rounded-md border bg-transparent p-0.5"
                aria-label={`${label} color`}
            />
            <label htmlFor={id} className="flex min-w-0 flex-1 flex-col">
                <span className="text-sm font-medium">{label}</span>
                <span className="truncate text-xs text-fd-muted-foreground">
                    {hint}
                </span>
            </label>
            <input
                value={draft ?? value}
                onChange={(e) => setDraft(e.target.value)}
                onBlur={(e) => commit(e.target.value)}
                onKeyDown={(e) =>
                    e.key === 'Enter' && commit(e.currentTarget.value)
                }
                spellCheck={false}
                aria-label={`${label} hex value`}
                className="w-20 rounded-md border bg-transparent px-2 py-1 font-mono text-xs uppercase"
            />
        </div>
    );
}
