'use client';

import { cn } from '@foundation/utils/funcs/cn';

interface DirectionToggleProps {
    value: 'ltr' | 'rtl';
    onChange: (value: 'ltr' | 'rtl') => void;
}

const OPTIONS = ['ltr', 'rtl'] as const;

export default function DirectionToggle({
    value,
    onChange,
}: DirectionToggleProps) {
    return (
        <div
            className="flex rounded-md border bg-fd-background p-0.5 text-xs"
            role="group"
            aria-label="Text direction"
        >
            {OPTIONS.map((option) => (
                <button
                    key={option}
                    type="button"
                    aria-pressed={value === option}
                    onClick={() => onChange(option)}
                    className={cn(
                        'rounded px-2 py-0.5 font-medium text-fd-muted-foreground uppercase transition-colors',
                        value === option &&
                            'bg-fd-accent text-fd-accent-foreground',
                    )}
                >
                    {option}
                </button>
            ))}
        </div>
    );
}
