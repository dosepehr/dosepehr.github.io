'use client';

import Button from '@foundation/components/ui/Button';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { type MotionValue, motion } from 'motion/react';

interface LayerStepperProps {
    step: number;
    total: number;
    onSelect: (index: number) => void;
    /** Scroll progress through the stack, 0–1. */
    progress: MotionValue<number>;
}

// "Layer 3 of 6", a bar that fills as the reader scrolls, and buttons to
// jump up and down the stack.
export default function LayerStepper({
    step,
    total,
    onSelect,
    progress,
}: LayerStepperProps) {
    return (
        <div className="flex items-center gap-3">
            <Button
                size="icon-sm"
                variant="outline"
                disabled={step === 0}
                onClick={() => onSelect(step - 1)}
                aria-label="Layer below"
            >
                <ChevronDown />
            </Button>
            <Button
                size="icon-sm"
                variant="outline"
                disabled={step === total - 1}
                onClick={() => onSelect(step + 1)}
                aria-label="Layer above"
            >
                <ChevronUp />
            </Button>
            <span className="font-mono text-xs whitespace-nowrap text-fd-muted-foreground">
                Layer {step + 1} of {total}
            </span>
            <div
                className="h-1 flex-1 overflow-hidden rounded-full bg-muted"
                aria-hidden
            >
                <motion.div
                    className="h-full origin-left rounded-full bg-primary rtl:origin-right"
                    style={{ scaleX: progress }}
                />
            </div>
        </div>
    );
}
