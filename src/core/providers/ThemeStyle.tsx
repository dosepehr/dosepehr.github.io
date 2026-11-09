'use client';

import { buildThemeCss } from '@/core/theme/css';
import { applyThemeCss } from '@/core/theme/persistence';
import { useThemeStore } from '@/store/useThemeStore';
import { useEffect, useSyncExternalStore } from 'react';

const subscribeHydration = (onChange: () => void) =>
    useThemeStore.persist.onFinishHydration(onChange);
const getHydrated = () => useThemeStore.persist.hasHydrated();
const getServerHydrated = () => false;

// Applies the custom theme from the Themes page to the whole site. The boot
// script in the root layout applies the saved CSS before the first paint;
// this keeps it in sync once the store has loaded from localStorage.
export default function ThemeStyle() {
    const colors = useThemeStore((s) => s.colors);
    const radius = useThemeStore((s) => s.radius);
    const hydrated = useSyncExternalStore(
        subscribeHydration,
        getHydrated,
        getServerHydrated,
    );

    useEffect(() => {
        void useThemeStore.persist.rehydrate();
    }, []);

    useEffect(() => {
        // Before hydration the store holds the defaults; writing them would
        // wipe the saved theme the boot script just applied.
        if (hydrated)
            applyThemeCss(buildThemeCss({ colors, radius }, { scoped: true }));
    }, [colors, radius, hydrated]);

    return null;
}
