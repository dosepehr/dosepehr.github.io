import { DocsProvider } from '@/core/providers/DocsProvider';
import { siteName, siteUrl } from '@/core/site';
import { themeBootScript } from '@/core/theme/bootScript';
import { estedad, lato } from '@foundation-public/fonts';
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
        <html
            lang="en"
            className={`${lato.variable} ${estedad.variable}`}
            suppressHydrationWarning
        >
            <head>
                {/* Picks a random theme on each page load and applies the saved one before the first paint. */}
                <script dangerouslySetInnerHTML={{ __html: themeBootScript }} />
            </head>
            <body className="flex min-h-screen flex-col">
                <DocsProvider>{children}</DocsProvider>
            </body>
        </html>
    );
}
