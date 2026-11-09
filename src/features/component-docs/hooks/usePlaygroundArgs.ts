import { useCallback, useState } from 'react';
import type { Args } from '../types';

// Editable args for the playground, resettable to the story's defaults.
export function usePlaygroundArgs(initial: Args) {
    const [args, setArgs] = useState<Args>(initial);
    const setArg = useCallback((name: string, value: unknown) => {
        setArgs((current) => ({ ...current, [name]: value }));
    }, []);
    const reset = useCallback(() => setArgs(initial), [initial]);
    return { args, setArg, reset };
}
