import { useQueryStates } from 'nuqs';
import { useCallback, useMemo } from 'react';
import type { Args, ControlSpec } from '../types';
import { parserFor } from '../utils/queryParsers';

// Editable playground args, kept in the URL so a configured preview can be
// shared or reloaded. Values equal to the story's defaults stay out of it.
export function usePlaygroundArgs(initial: Args, controls: ControlSpec[]) {
    const parsers = useMemo(
        () =>
            Object.fromEntries(
                controls.map((spec) => [spec.name, parserFor(spec)]),
            ),
        [controls],
    );
    const [query, setQuery] = useQueryStates(parsers, { history: 'replace' });

    const args = useMemo(() => {
        const merged: Args = { ...initial };
        for (const [name, value] of Object.entries(query)) {
            if (value !== null) merged[name] = value;
        }
        return merged;
    }, [initial, query]);

    const setArg = useCallback(
        (name: string, value: unknown) => {
            const isDefault = value === undefined || value === initial[name];
            void setQuery({
                [name]: isDefault ? null : (value as string | number | boolean),
            });
        },
        [initial, setQuery],
    );

    const reset = useCallback(
        () =>
            void setQuery(
                Object.fromEntries(controls.map((spec) => [spec.name, null])),
            ),
        [controls, setQuery],
    );

    return { args, setArg, reset };
}
