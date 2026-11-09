import { animate } from 'motion/react';
import { useEffect, useState } from 'react';

// Counts from 0 to `target` once `start` turns true.
export function useCountUp(target: number, start: boolean, duration = 1.4) {
    const [value, setValue] = useState(0);

    useEffect(() => {
        if (!start) return;
        const controls = animate(0, target, {
            duration,
            ease: [0.16, 1, 0.3, 1],
            onUpdate: (latest) => setValue(Math.round(latest)),
        });
        return () => controls.stop();
    }, [start, target, duration]);

    return value;
}
