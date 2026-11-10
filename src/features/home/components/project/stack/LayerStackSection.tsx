'use client';

import { useScrollLayer } from '../../../hooks/useScrollLayer';
import SectionHeading from '../../SectionHeading';
import { LAYERS } from '../layersData';
import LayerDetail from './LayerDetail';
import StackVisual from './StackVisual';

// Scroll distance per layer, in viewport heights.
const STEP_SVH = 70;

// The whole library as a stack of layers. The stage sticks while the reader
// scrolls through a tall track, and each step of the scroll lifts the next
// layer.
export default function LayerStackSection() {
    const { trackRef, active, goTo, progress } = useScrollLayer(LAYERS.length);
    return (
        <section className="border-t">
            <div className="container mx-auto max-w-6xl px-4 pt-16">
                <SectionHeading
                    eyebrow="The whole stack"
                    title="More than a component kit"
                    description="Theme, components, forms, data, state and the app shell: every layer of a production app, installable one piece at a time. Scroll through it."
                />
            </div>
            <div
                ref={trackRef}
                className="relative"
                style={{ height: `${LAYERS.length * STEP_SVH}svh` }}
            >
                <div className="sticky top-0 flex h-svh items-center">
                    <div className="container mx-auto grid max-w-6xl items-center gap-4 px-4 lg:grid-cols-2 lg:gap-8">
                        <StackVisual active={active} onSelect={goTo} />
                        <LayerDetail
                            layer={LAYERS[active]}
                            step={active}
                            total={LAYERS.length}
                            onSelect={goTo}
                            progress={progress}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
