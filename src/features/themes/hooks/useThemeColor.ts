import type { ColorKey, ThemeMode } from '@/core/theme/types';
import defaults from '@/generated/theme-defaults.json';
import { useThemeStore } from '@/store/useThemeStore';

// Current hex value of a token: the user's override, else the library default.
export function useThemeColor(mode: ThemeMode, key: ColorKey): string {
    const override = useThemeStore((s) => s.colors[mode][key]);
    return override ?? defaults[mode][key];
}
