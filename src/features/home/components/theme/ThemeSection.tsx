import Link from 'next/link';
import Reveal from '../Reveal';
import SectionHeading from '../SectionHeading';
import ThemeMiniPreview from './ThemeMiniPreview';
import ThemeSwatches from './ThemeSwatches';

export default function ThemeSection() {
    return (
        <section className="relative border-y bg-fd-card/40">
            <div className="container mx-auto flex max-w-6xl flex-col items-center gap-10 px-4 py-24">
                <SectionHeading
                    eyebrow="Theming"
                    title="Pick a color. Everything follows."
                    description="Every component reads the same tokens. Try a preset: this whole site recolors."
                />
                <Reveal className="flex w-full flex-col items-center gap-10">
                    <ThemeSwatches />
                    <ThemeMiniPreview />
                    <Link
                        href="/themes"
                        className="text-sm font-medium text-primary-text underline-offset-4 hover:underline"
                    >
                        Build your own theme →
                    </Link>
                </Reveal>
            </div>
        </section>
    );
}
