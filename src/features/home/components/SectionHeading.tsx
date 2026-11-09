import type { ReactNode } from 'react';
import Reveal from './Reveal';

interface SectionHeadingProps {
    eyebrow: string;
    title: ReactNode;
    description?: ReactNode;
}

export default function SectionHeading({
    eyebrow,
    title,
    description,
}: SectionHeadingProps) {
    return (
        <Reveal className="mx-auto flex max-w-2xl flex-col items-center gap-3 text-center">
            <span className="text-xs font-semibold tracking-widest text-primary-text uppercase">
                {eyebrow}
            </span>
            <h2 className="text-3xl font-bold tracking-tight text-balance md:text-4xl">
                {title}
            </h2>
            {description && (
                <p className="text-balance text-fd-muted-foreground md:text-lg">
                    {description}
                </p>
            )}
        </Reveal>
    );
}
