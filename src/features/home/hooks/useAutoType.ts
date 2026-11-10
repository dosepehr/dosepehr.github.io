import { useEffect, useState } from 'react';

// Types `text` out once, character by character, after `start` turns true;
// afterwards the value is freely editable.
export function useAutoType(text: string, start: boolean, delay = 140) {
    const [value, setValue] = useState('');
    const [done, setDone] = useState(false);

    useEffect(() => {
        if (!start || done) return;
        let index = 0;
        const timer = setInterval(() => {
            index += 1;
            setValue(text.slice(0, index));
            if (index >= text.length) {
                clearInterval(timer);
                setDone(true);
            }
        }, delay);
        return () => clearInterval(timer);
    }, [start, done, text, delay]);

    return { value, setValue, done };
}
