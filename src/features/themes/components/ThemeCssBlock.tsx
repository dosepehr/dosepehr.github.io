'use client';

import { buildThemeCss } from '@/core/theme/css';
import CodeSnippet from '@/shared/ui/CodeSnippet';
import { useThemeStore } from '@/store/useThemeStore';

const EMPTY = '/* Pick a preset or edit a color to generate your theme. */';

export default function ThemeCssBlock() {
    const colors = useThemeStore((s) => s.colors);
    const radius = useThemeStore((s) => s.radius);
    const css = buildThemeCss({ colors, radius });

    return (
        <section className="flex flex-col gap-3">
            <h2 className="text-xl font-semibold">Your theme</h2>
            <p className="text-sm text-fd-muted-foreground">
                Paste these variables at the end of your{' '}
                <code>globals.css</code>. They override the defaults installed
                with the <code>theme</code> registry item; every component picks
                them up.
            </p>
            <CodeSnippet code={css || EMPTY} lang="css" title="globals.css" />
        </section>
    );
}
