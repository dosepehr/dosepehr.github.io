'use client';

import type { ThemeMode } from '@/core/theme/types';
import { cn } from '@foundation/utils/funcs/cn';
import { Moon, Sun } from 'lucide-react';
import { useEditingMode } from '../hooks/useEditingMode';

const MODES: { value: ThemeMode; label: string; Icon: typeof Sun }[] = [
    { value: 'light', label: 'Light', Icon: Sun },
    { value: 'dark', label: 'Dark', Icon: Moon },
];

// Switches the site between light and dark; color edits apply to the
// visible mode.
export default function ModeSwitch() {
    const { mode, setMode } = useEditingMode();

    return (
        <div className="grid grid-cols-2 gap-2">
            {MODES.map(({ value, label, Icon }) => (
                <button
                    key={value}
                    type="button"
                    aria-pressed={mode === value}
                    onClick={() => setMode(value)}
                    className={cn(
                        'flex items-center justify-center gap-2 rounded-md border px-3 py-1.5 text-xs font-medium transition-colors hover:bg-fd-accent',
                        mode === value &&
                            'border-fd-primary ring-1 ring-fd-primary',
                    )}
                >
                    <Icon className="size-3.5" />
                    {label}
                </button>
            ))}
        </div>
    );
}
