import { DocsProvider } from '@/core/providers/DocsProvider';
import { siteName, siteUrl } from '@/core/site';
import { themeBootScript } from '@/core/theme/persistence';
import { lato } from '@foundation-public/fonts';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import './global.css';

export const metadata: Metadata = {
    metadataBase: new URL(siteUrl),
    title: { default: siteName, template: `%s – ${siteName}` },
    description:
        'Accessible, RTL-ready React components built on Tailwind CSS, installable with the shadcn CLI.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="en" className={lato.variable} suppressHydrationWarning>
            <head>
                {/* Applies a saved custom theme before the first paint. */}
                <script dangerouslySetInnerHTML={{ __html: themeBootScript }} />
            </head>
            <body className="flex min-h-screen flex-col">
                <DocsProvider>{children}</DocsProvider>
            </body>
        </html>
    );
}
