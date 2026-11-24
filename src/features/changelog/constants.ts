import type { EntryType } from './types';

export const TYPE_LABELS: Record<EntryType, string> = {
    feature: 'New',
    improvement: 'Improved',
    fix: 'Fixed',
    breaking: 'Breaking',
};

// Component links shown on an entry before "+N more".
export const MAX_COMPONENT_LINKS = 6;
