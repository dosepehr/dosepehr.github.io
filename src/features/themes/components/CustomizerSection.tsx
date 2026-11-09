import type { ReactNode } from 'react';

export default function CustomizerSection({
    title,
    children,
}: {
    title: string;
    children: ReactNode;
}) {
    return (
        <section className="flex flex-col gap-3">
            <h2 className="text-xs font-semibold tracking-wide text-fd-muted-foreground uppercase">
                {title}
            </h2>
            {children}
        </section>
    );
}
