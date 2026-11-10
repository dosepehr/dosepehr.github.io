import { useEffect, useState } from 'react';

// Reveals chat messages one by one, showing a typing indicator before each.
export function useChatPlayback(count: number, start: boolean) {
    const [shown, setShown] = useState(0);
    const [typing, setTyping] = useState(false);

    useEffect(() => {
        if (!start || shown >= count) return;
        const typingTimer = setTimeout(() => setTyping(true), 500);
        const messageTimer = setTimeout(() => {
            setTyping(false);
            setShown((n) => n + 1);
        }, 1500);
        return () => {
            clearTimeout(typingTimer);
            clearTimeout(messageTimer);
        };
    }, [start, shown, count]);

    const replay = () => setShown(0);
    return { shown, typing, replay, finished: shown >= count };
}
