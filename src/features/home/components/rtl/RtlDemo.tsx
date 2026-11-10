'use client';

import { useState } from 'react';
import Reveal from '../Reveal';
import SectionHeading from '../SectionHeading';
import SegmentedToggle from '../SegmentedToggle';
import RtlPreview from './RtlPreview';

const DIRECTIONS = [
    { value: 'ltr', label: 'English · LTR' },
    { value: 'rtl', label: 'فارسی · RTL' },
] as const;

export default function RtlDemo() {
    const [dir, setDir] = useState<'ltr' | 'rtl'>('rtl');

    return (
        <section className="container mx-auto flex max-w-6xl flex-col items-center gap-10 px-4 py-24">
            <SectionHeading
                eyebrow="Right to left"
                title="One prop flips the whole layout"
                description="Components use logical properties, so Persian and Arabic interfaces mirror without extra code."
            />
            <Reveal className="flex w-full flex-col items-center gap-8">
                <SegmentedToggle
                    options={DIRECTIONS}
                    value={dir}
                    onChange={setDir}
                    layoutId="rtl-pill"
                    label="Direction"
                />
                <RtlPreview dir={dir} />
            </Reveal>
        </section>
    );
}
