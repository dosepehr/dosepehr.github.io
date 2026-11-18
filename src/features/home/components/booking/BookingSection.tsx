import Reveal from '../Reveal';
import SectionHeading from '../SectionHeading';
import BookingParts from './BookingParts';
import BookingWizard from './BookingWizard';

export default function BookingSection() {
    return (
        <section className="container mx-auto flex max-w-6xl flex-col gap-12 px-4 py-24">
            <SectionHeading
                eyebrow="Multi-step forms"
                title="A whole booking flow, wired in minutes"
                description="A Stepper on top, react-hook-form underneath, and a field for every kind of input. Try to skip a step without filling it in."
            />
            <Reveal className="grid w-full items-start gap-8 lg:grid-cols-5">
                <div className="rounded-3xl border bg-card p-6 text-card-foreground shadow-sm md:p-8 lg:col-span-3">
                    <BookingWizard />
                </div>
                <div className="lg:col-span-2 lg:pt-4">
                    <BookingParts />
                </div>
            </Reveal>
        </section>
    );
}
