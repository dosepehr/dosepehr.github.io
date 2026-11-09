'use client';

import { RootProvider } from 'fumadocs-ui/provider/next';
import type { ReactNode } from 'react';
import SearchDialog from './SearchDialog';
import ThemeStyle from './ThemeStyle';

export function DocsProvider({ children }: { children: ReactNode }) {
    return (
        <RootProvider search={{ SearchDialog }}>
            <ThemeStyle />
            {children}
        </RootProvider>
    );
}
