import { cn } from '@foundation/utils/funcs/cn';
import { TYPE_LABELS } from '../constants';
import type { EntryType } from '../types';

const STYLES: Record<EntryType, string> = {
    feature: 'border-primary/40 bg-primary/10 text-primary-text',
    improvement: 'bg-fd-muted text-fd-foreground',
    fix: 'bg-fd-muted text-fd-muted-foreground',
    breaking: 'border-destructive/40 bg-destructive/10 text-destructive',
};

// The kind of change, as a small pill.
export default function TypeBadge({ type }: { type: EntryType }) {
    return (
        <span
            className={cn(
                'inline-flex shrink-0 items-center rounded-full border px-2 py-0.5 text-[0.7rem] font-medium',
                STYLES[type],
            )}
        >
            {TYPE_LABELS[type]}
        </span>
    );
}
