import type { ThemePreset } from '@/core/theme/types';
import { cn } from '@foundation/utils/funcs/cn';
import { Check } from 'lucide-react';

interface PresetSwatchProps {
    preset: ThemePreset;
    active: boolean;
    onSelect: () => void;
}

export default function PresetSwatch({
    preset,
    active,
    onSelect,
}: PresetSwatchProps) {
    return (
        <button
            type="button"
            onClick={onSelect}
            aria-pressed={active}
            className={cn(
                'flex items-center gap-2 rounded-md border px-2.5 py-1.5 text-start text-xs font-medium transition-colors hover:bg-fd-accent',
                active && 'border-fd-primary ring-1 ring-fd-primary',
            )}
        >
            <span
                className="flex size-4 shrink-0 items-center justify-center rounded-full"
                style={{ backgroundColor: preset.swatch }}
            >
                {active && (
                    <Check className="size-3 text-white mix-blend-difference" />
                )}
            </span>
            {preset.name}
        </button>
    );
}
