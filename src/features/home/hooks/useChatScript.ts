import { useEffect, useState } from 'react';

export type ChatStage = 'idle' | 'question' | 'thinking' | 'answering' | 'done';

const CHARS_PER_TICK = 6;
const TICK_MS = 30;

// Plays the scripted conversation: question, "thinking", then the answer's
// code streaming in. `replay` starts it again.
export function useChatScript(start: boolean, answerLength: number) {
    const [stage, setStage] = useState<ChatStage>('idle');
    const [streamed, setStreamed] = useState(0);
    const [run, setRun] = useState(0);

    useEffect(() => {
        if (!start) return;
        const timers = [
            setTimeout(() => setStage('question'), 300),
            setTimeout(() => setStage('thinking'), 1100),
            setTimeout(() => setStage('answering'), 2600),
        ];
        return () => {
            for (const timer of timers) clearTimeout(timer);
        };
    }, [start, run]);

    useEffect(() => {
        if (stage !== 'answering') return;
        const timer = setInterval(() => {
            setStreamed((current) => {
                const next = Math.min(current + CHARS_PER_TICK, answerLength);
                if (next === answerLength) setStage('done');
                return next;
            });
        }, TICK_MS);
        return () => clearInterval(timer);
    }, [stage, answerLength]);

    const replay = () => {
        setStage('idle');
        setStreamed(0);
        setRun((n) => n + 1);
    };

    return { stage, streamed, replay };
}
