import { useState } from 'react';

const MIN = 2000;
const MAX = 14000;
const STEP = 500;

// A daily step goal nudged up and down within sensible bounds.
export function useGoal(initial = 8000) {
    const [goal, setGoal] = useState(initial);
    const change = (direction: 1 | -1) =>
        setGoal((current) =>
            Math.min(MAX, Math.max(MIN, current + direction * STEP)),
        );
    return {
        goal,
        increase: () => change(1),
        decrease: () => change(-1),
        canIncrease: goal < MAX,
        canDecrease: goal > MIN,
    };
}
