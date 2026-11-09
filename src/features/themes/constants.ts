import type { ColorKey } from '@/core/theme/types';

export const COLOR_LABELS: Record<ColorKey, { label: string; hint: string }> = {
    primary: { label: 'Primary', hint: 'Buttons, links, focus rings' },
    secondary: { label: 'Secondary', hint: 'Secondary buttons and badges' },
    accent: { label: 'Accent', hint: 'Hover and selected states' },
    destructive: { label: 'Destructive', hint: 'Errors and dangerous actions' },
    success: { label: 'Success', hint: 'Confirmations' },
    warning: { label: 'Warning', hint: 'Cautions' },
    info: { label: 'Info', hint: 'Neutral notices' },
};
