'use client';

import { AnimatePresence, type MotionValue, motion } from 'motion/react';
import InstallLine from '../InstallLine';
import LayerItems from '../LayerItems';
import type { Layer } from '../layersData';
import LayerStepper from './LayerStepper';

interface LayerDetailProps {
    layer: Layer;
    step: number;
    total: number;
    onSelect: (index: number) => void;
    progress: MotionValue<number>;
}

// What the active layer contains and how to install a piece of it. The
// stepper stays put while the content below it swaps.
export default function LayerDetail({
    layer,
    step,
    total,
    onSelect,
    progress,
}: LayerDetailProps) {
    return (
        <div className="flex min-w-0 flex-col gap-5">
            <LayerStepper
                step={step}
                total={total}
                onSelect={onSelect}
                progress={progress}
            />
            <AnimatePresence mode="wait" initial={false}>
                <motion.div
                    key={layer.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -16 }}
                    transition={{ duration: 0.2 }}
                    className="flex min-w-0 flex-col gap-5"
                >
                    <div className="flex flex-col gap-1">
                        <h3 className="text-2xl font-bold tracking-tight">
                            {layer.name}
                        </h3>
                        <p className="text-fd-muted-foreground">
                            {layer.tagline}
                        </p>
                    </div>
                    <LayerItems items={layer.items} />
                    <InstallLine item={layer.install} />
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
