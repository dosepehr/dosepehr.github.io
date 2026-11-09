'use client';

import { motion } from 'motion/react';
import { STEPS } from '../../constants';
import SectionHeading from '../SectionHeading';
import StepCard from './StepCard';

export default function InstallSteps() {
    return (
        <section className="container mx-auto flex max-w-6xl flex-col gap-12 px-4 py-24">
            <SectionHeading
                eyebrow="Get started"
                title="Three steps to your first component"
                description="No package to keep in sync: the code lands in your project, ready to change."
            />
            <div className="relative grid gap-10 md:grid-cols-3">
                {/* The line connecting the step numbers draws in on scroll. */}
                <motion.div
                    aria-hidden
                    className="absolute start-5 end-5 top-5 hidden h-0.5 origin-left bg-linear-to-r from-primary to-info md:block rtl:origin-right"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 1, ease: 'easeInOut' }}
                />
                {STEPS.map((step, index) => (
                    <StepCard key={step.title} step={index + 1} {...step} />
                ))}
            </div>
        </section>
    );
}
