import { cn } from '@foundation/utils/funcs/cn';
import Link from 'next/link';
import { MAX_COMPONENT_LINKS } from '../constants';
import { componentHref, componentTitle } from '../utils';

// Links to the component pages an entry is about, capped with "+N more".
export default function ComponentLinks({ slugs }: { slugs: string[] }) {
    if (!slugs.length) return null;
    const shown = slugs.slice(0, MAX_COMPONENT_LINKS);
    const hidden = slugs.length - shown.length;

    return (
        <span className="not-prose flex flex-wrap items-center gap-1.5">
            {shown.map((slug) => {
                const href = componentHref(slug);
                const className =
                    'rounded-full border bg-fd-card px-2 py-0.5 text-[0.7rem] font-medium';
                return href ? (
                    <Link
                        key={slug}
                        href={href}
                        className={cn(
                            className,
                            'transition-colors hover:border-primary hover:text-primary-text',
                        )}
                    >
                        {componentTitle(slug)}
                    </Link>
                ) : (
                    <span key={slug} className={className}>
                        {componentTitle(slug)}
                    </span>
                );
            })}
            {hidden > 0 && (
                <span
                    className="text-[0.7rem] text-fd-muted-foreground"
                    title={slugs
                        .slice(MAX_COMPONENT_LINKS)
                        .map(componentTitle)
                        .join(', ')}
                >
                    +{hidden} more
                </span>
            )}
        </span>
    );
}
