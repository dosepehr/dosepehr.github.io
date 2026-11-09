'use client';

import { FEATURES } from '../../constants';
import SectionHeading from '../SectionHeading';
import FeatureCard from './FeatureCard';

export default function FeatureGrid() {
    return (
        <section className="container mx-auto flex max-w-6xl flex-col gap-12 px-4 py-24">
            <SectionHeading
                eyebrow="Features"
                title="Everything a product team needs"
                description="From buttons to data tables and chat UI: accessible, themeable and right-to-left ready."
            />
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {FEATURES.map((feature, index) => (
                    <FeatureCard
                        key={feature.title}
                        {...feature}
                        index={index}
                    />
                ))}
            </div>
        </section>
    );
}
