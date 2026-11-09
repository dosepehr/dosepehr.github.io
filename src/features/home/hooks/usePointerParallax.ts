import { type MotionValue, useMotionValue, useSpring } from 'motion/react';
import type { PointerEvent } from 'react';

// Pointer position over an element as springy -1…1 values, for parallax.
export function usePointerParallax(): {
    x: MotionValue<number>;
    y: MotionValue<number>;
    onPointerMove: (event: PointerEvent<HTMLElement>) => void;
    onPointerLeave: () => void;
} {
    const rawX = useMotionValue(0);
    const rawY = useMotionValue(0);
    const x = useSpring(rawX, { stiffness: 120, damping: 20 });
    const y = useSpring(rawY, { stiffness: 120, damping: 20 });

    const onPointerMove = (event: PointerEvent<HTMLElement>) => {
        const rect = event.currentTarget.getBoundingClientRect();
        rawX.set(((event.clientX - rect.left) / rect.width) * 2 - 1);
        rawY.set(((event.clientY - rect.top) / rect.height) * 2 - 1);
    };
    const onPointerLeave = () => {
        rawX.set(0);
        rawY.set(0);
    };

    return { x, y, onPointerMove, onPointerLeave };
}
