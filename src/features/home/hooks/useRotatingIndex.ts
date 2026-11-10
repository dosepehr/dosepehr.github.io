import { useEffect, useState } from 'react';

// Cycles 0…length-1 every `interval` ms.
export function useRotatingIndex(length: number, interval = 2400) {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(
            () => setIndex((current) => (current + 1) % length),
            interval,
        );
        return () => clearInterval(timer);
    }, [length, interval]);

    return index;
}
