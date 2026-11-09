export type ThemeMode = 'light' | 'dark';

export const COLOR_KEYS = [
    'primary',
    'secondary',
    'accent',
    'destructive',
    'success',
    'warning',
    'info',
] as const;

export type ColorKey = (typeof COLOR_KEYS)[number];

/** Hex colors per token; a missing key keeps the library's default. */
export type ColorOverrides = Partial<Record<ColorKey, string>>;

export interface ThemeConfig {
    colors: Record<ThemeMode, ColorOverrides>;
    /** Corner radius in rem; null keeps the library's default. */
    radius: number | null;
}

export interface ThemePreset {
    id: string;
    name: string;
    swatch: string;
    colors: Record<ThemeMode, ColorOverrides>;
}
