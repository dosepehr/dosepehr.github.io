import { useMotionValueEvent, useScroll } from 'motion/react';
import { useRef, useState } from 'react';

// Splits a tall scroll track into `count` equal steps: the step the reader
// has scrolled to is the active one.
export function useScrollLayer(count: number) {
    const trackRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: trackRef,
        offset: ['start start', 'end end'],
    });
    const [active, setActive] = useState(0);

    useMotionValueEvent(scrollYProgress, 'change', (progress) => {
        const next = Math.min(
            count - 1,
            Math.max(0, Math.floor(progress * count)),
        );
        setActive((current) => (current === next ? current : next));
    });

    // Scrolls to the middle of a step, so buttons and clicks stay in sync
    // with the scroll position.
    const goTo = (index: number) => {
        const track = trackRef.current;
        if (!track) return;
        const top = track.getBoundingClientRect().top + window.scrollY;
        const distance = track.offsetHeight - window.innerHeight;
        window.scrollTo({
            top: top + ((index + 0.5) / count) * distance,
            behavior: 'smooth',
        });
    };

    return { trackRef, active, goTo, progress: scrollYProgress };
}
