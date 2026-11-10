import Reveal from '../Reveal';
import SectionHeading from '../SectionHeading';
import ChatWindow from './ChatWindow';

export default function AiSection() {
    return (
        <section className="relative border-y bg-fd-card/40">
            <div className="container mx-auto flex max-w-4xl flex-col gap-10 px-4 py-24">
                <SectionHeading
                    eyebrow="AI interfaces"
                    title="Built for chat and streaming UIs"
                    description="Messages, status markers and code blocks that highlight as tokens arrive."
                />
                <Reveal>
                    <ChatWindow />
                </Reveal>
            </div>
        </section>
    );
}
