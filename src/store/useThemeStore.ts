import { THEME_STORE_KEY } from '@/core/theme/persistence';
import { DEFAULT_PRESET_ID, PRESETS } from '@/core/theme/presets';
import type { ColorKey, ThemeConfig, ThemeMode } from '@/core/theme/types';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface ThemeState extends ThemeConfig {
    /** Selected preset, or 'custom' once a color is edited by hand. */
    presetId: string;
    applyPreset: (id: string) => void;
    setColor: (mode: ThemeMode, key: ColorKey, hex: string) => void;
    setRadius: (radius: number) => void;
    reset: () => void;
}

const initial: ThemeConfig & { presetId: string } = {
    presetId: DEFAULT_PRESET_ID,
    colors: { light: {}, dark: {} },
    radius: null,
};

// The site-wide theme from the Themes page, kept in localStorage. Hydration
// is manual (see ThemeStyle) so the static HTML and the first client render
// match.
export const useThemeStore = create<ThemeState>()(
    devtools(
        persist(
            (set) => ({
                ...initial,
                applyPreset: (id) => {
                    const preset = PRESETS.find((p) => p.id === id);
                    if (!preset) return;
                    set(
                        {
                            presetId: id,
                            colors: structuredClone(preset.colors),
                        },
                        false,
                        'theme/applyPreset',
                    );
                },
                setColor: (mode, key, hex) =>
                    set(
                        (s) => ({
                            presetId: 'custom',
                            colors: {
                                ...s.colors,
                                [mode]: { ...s.colors[mode], [key]: hex },
                            },
                        }),
                        false,
                        'theme/setColor',
                    ),
                setRadius: (radius) =>
                    set({ radius }, false, 'theme/setRadius'),
                reset: () => set(initial, false, 'theme/reset'),
            }),
            {
                name: THEME_STORE_KEY,
                skipHydration: true,
                partialize: ({ presetId, colors, radius }) => ({
                    presetId,
                    colors,
                    radius,
                }),
            },
        ),
        { name: 'ThemeStore', enabled: process.env.NODE_ENV === 'development' },
    ),
);
