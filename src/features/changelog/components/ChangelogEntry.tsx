import type { ReactNode } from 'react';
import type { EntryType } from '../types';
import ComponentLinks from './ComponentLinks';
import EntryDate from './EntryDate';
import EntryTitle from './EntryTitle';
import TypeBadge from './TypeBadge';

type Props = {
    type: EntryType;
    date: string;
    title: string;
    components: string[];
    /** The component page this is shown on; left out of the links. */
    current?: string;
    /** The entry's Markdown body, rendered by MDX. */
    children?: ReactNode;
};

// One hand-written changelog entry (frontend-foundation/changelog/*.md).
export default function ChangelogEntry({
    type,
    date,
    title,
    components,
    current,
    children,
}: Props) {
    const links = components.filter((slug) => slug !== current);

    return (
        <article className="my-4 flex flex-col gap-2 border-b pb-4 last:border-b-0">
            <header className="not-prose flex flex-wrap items-center justify-between gap-x-4 gap-y-1">
                <div className="flex min-w-0 items-center gap-2">
                    <TypeBadge type={type} />
                    <EntryTitle title={title} />
                </div>
                <EntryDate date={date} />
            </header>
            {children && (
                <div className="text-sm text-fd-muted-foreground [&>:first-child]:mt-0 [&>:last-child]:mb-0">
                    {children}
                </div>
            )}
            <ComponentLinks slugs={links} />
        </article>
    );
}
