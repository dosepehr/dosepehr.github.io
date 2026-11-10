'use client';

import { cn } from '@foundation/utils/funcs/cn';
import { motion } from 'motion/react';

interface SegmentedToggleProps<T extends string> {
    options: readonly { value: T; label: string }[];
    value: T;
    onChange: (value: T) => void;
    /** Unique per toggle, so each one animates its own pill. */
    layoutId: string;
    label: string;
}

// A pill toggle whose highlight slides between options.
export default function SegmentedToggle<T extends string>({
    options,
    value,
    onChange,
    layoutId,
    label,
}: SegmentedToggleProps<T>) {
    return (
        <div
            className="relative inline-flex rounded-full border bg-fd-card p-1"
            role="group"
            aria-label={label}
        >
            {options.map((option) => (
                <button
                    key={option.value}
                    type="button"
                    aria-pressed={value === option.value}
                    onClick={() => onChange(option.value)}
                    className={cn(
                        'relative z-10 rounded-full px-4 py-1.5 text-sm font-medium transition-colors',
                        value === option.value
                            ? 'text-primary-foreground'
                            : 'text-fd-muted-foreground',
                    )}
                >
                    {value === option.value && (
                        <motion.span
                            layoutId={layoutId}
                            className="absolute inset-0 -z-10 rounded-full bg-primary"
                            transition={{
                                type: 'spring',
                                stiffness: 400,
                                damping: 30,
                            }}
                        />
                    )}
                    {option.label}
                </button>
            ))}
        </div>
    );
}
