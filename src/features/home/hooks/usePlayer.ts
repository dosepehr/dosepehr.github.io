import { useEffect, useState } from 'react';

// A fake audio player: position advances once per second while playing.
export function usePlayer(duration: number) {
    const [playing, setPlaying] = useState(false);
    const [position, setPosition] = useState(42);

    useEffect(() => {
        if (!playing) return;
        const timer = setInterval(
            () => setPosition((p) => (p + 1 >= duration ? 0 : p + 1)),
            1000,
        );
        return () => clearInterval(timer);
    }, [playing, duration]);

    return {
        playing,
        toggle: () => setPlaying((p) => !p),
        position,
        seek: setPosition,
    };
}
