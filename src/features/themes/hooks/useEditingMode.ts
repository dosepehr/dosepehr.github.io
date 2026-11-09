import type { ThemeMode } from '@/core/theme/types';
import { useIsClient } from '@/shared/hooks/useIsClient';
import { useTheme } from 'next-themes';

// The mode color edits apply to: whichever mode the site is showing.
export function useEditingMode() {
    const { resolvedTheme, setTheme } = useTheme();
    const isClient = useIsClient();
    const mode: ThemeMode =
        isClient && resolvedTheme === 'dark' ? 'dark' : 'light';
    return { mode, setMode: (next: ThemeMode) => setTheme(next) };
}
