import type { ThemePreset } from './types';

const accent = (
    id: string,
    name: string,
    light: string,
    dark: string,
): ThemePreset => ({
    id,
    name,
    swatch: light,
    colors: { light: { primary: light }, dark: { primary: dark } },
});

export const DEFAULT_PRESET_ID = 'foundation';

// Primary-color presets; every other token keeps the library default until
// it is edited by hand.
export const PRESETS: ThemePreset[] = [
    {
        id: DEFAULT_PRESET_ID,
        name: 'Foundation',
        swatch: '#155dfc',
        colors: { light: {}, dark: {} },
    },
    accent('neutral', 'Neutral', '#171717', '#fafafa'),
    accent('indigo', 'Indigo', '#4f46e5', '#6366f1'),
    accent('violet', 'Violet', '#7c3aed', '#8b5cf6'),
    accent('rose', 'Rose', '#e11d48', '#f43f5e'),
    accent('orange', 'Orange', '#ea580c', '#f97316'),
    accent('amber', 'Amber', '#d97706', '#f59e0b'),
    accent('green', 'Green', '#16a34a', '#22c55e'),
    accent('teal', 'Teal', '#0d9488', '#14b8a6'),
];

export const RADIUS_OPTIONS = [0, 0.3, 0.5, 0.625, 0.75, 1] as const;
