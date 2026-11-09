import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { BookOpen, Component, Palette } from 'lucide-react';
import { githubUrl, siteName } from './site';

// Shared nav options for the home and docs layouts. Docs and Components only
// appear in the top nav: in the docs sidebar they would duplicate the page
// tree (and "Components" would look active on every component page).
export function baseOptions(): BaseLayoutProps {
    return {
        nav: { title: <span className="font-semibold">{siteName}</span> },
        githubUrl,
        links: [
            { text: 'Docs', url: '/docs', icon: <BookOpen />, on: 'nav' },
            {
                text: 'Components',
                url: '/docs/components/button',
                icon: <Component />,
                on: 'nav',
            },
            { text: 'Themes', url: '/themes', icon: <Palette /> },
        ],
    };
}
