import Showcase from '@/shared/showcase/Showcase';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';

export default function ShowcaseSection() {
    return (
        <section className="container mx-auto flex max-w-6xl flex-col gap-12 px-4 py-24">
            <SectionHeading
                eyebrow="Live"
                title="Real components, not screenshots"
                description="Everything below is interactive and follows the theme you picked."
            />
            <Reveal>
                <Showcase />
            </Reveal>
        </section>
    );
}
