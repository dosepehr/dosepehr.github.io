import { docsRoute } from '@/core/site';
import data from '@/generated/changelog-components.json';
import type { ChangelogComponent } from './types';

const components = data as Record<string, ChangelogComponent>;

export function componentHref(slug: string) {
    const component = components[slug];
    return component ? `${docsRoute}/${component.category}/${slug}` : null;
}

export const componentTitle = (slug: string) => components[slug]?.title ?? slug;

export const formatDate = (date: string) =>
    new Date(`${date}T00:00:00Z`).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        timeZone: 'UTC',
    });

/** Splits text on `backticks` so code spans can render as <code>. */
export const splitCode = (text: string) =>
    text
        .split(/(`[^`]+`)/)
        .filter(Boolean)
        .map((part) =>
            part.length > 1 && part.startsWith('`') && part.endsWith('`')
                ? { text: part.slice(1, -1), code: true }
                : { text: part, code: false },
        );
