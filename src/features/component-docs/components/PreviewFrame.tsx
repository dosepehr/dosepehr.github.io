'use client';

import { useIsClient } from '@/shared/hooks/useIsClient';
import { DirectionProvider } from '@foundation/components/ui/Direction';
import { cn } from '@foundation/utils/funcs/cn';
import { type ReactNode, useState } from 'react';
import type { ResolvedStory } from '../types';
import DirectionToggle from './DirectionToggle';

const LAYOUT: Record<ResolvedStory['layout'], string> = {
    centered: 'flex items-center justify-center p-10',
    padded: 'p-6',
    fullscreen: 'p-0',
};

interface PreviewFrameProps {
    layout: ResolvedStory['layout'];
    children: ReactNode;
}

// Canvas a component preview renders in: the library's own background and
// tokens (not the docs chrome), with an LTR/RTL switch. Previews render on
// the client only: the static export keeps the page text and code, while
// components that need the browser (portals, window, error boundaries)
// never run during the build.
export default function PreviewFrame({ layout, children }: PreviewFrameProps) {
    const [dir, setDir] = useState<'ltr' | 'rtl'>('ltr');
    const isClient = useIsClient();

    return (
        <div className="not-prose relative overflow-hidden rounded-xl border bg-background text-foreground">
            <div className="absolute end-3 top-3 z-10">
                <DirectionToggle value={dir} onChange={setDir} />
            </div>
            <div
                dir={dir}
                data-preview-canvas=""
                className={cn(
                    'min-h-40 w-full overflow-x-auto',
                    LAYOUT[layout],
                )}
            >
                {isClient && (
                    <DirectionProvider dir={dir}>{children}</DirectionProvider>
                )}
            </div>
        </div>
    );
}
