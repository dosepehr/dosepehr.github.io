import type { Args, ArgTypes, Control, ControlSpec } from '../types';

const NON_CONTROLS = new Set(['object', 'file', 'date']);

function fromArgType(
    argType: ArgTypes[string],
    value: unknown,
): Control | null {
    const raw = argType.control;
    if (raw === false) return null;
    const type = typeof raw === 'object' ? raw.type : raw;
    const options = argType.options?.map(String);

    if (options?.length && (!type || /select|radio|check/.test(type))) {
        return { kind: 'select', options };
    }
    if (type === 'boolean') return { kind: 'boolean' };
    if (type === 'text') return { kind: 'text' };
    if (type === 'color') return { kind: 'color' };
    if (type === 'number' || type === 'range') {
        const range = typeof raw === 'object' ? raw : undefined;
        return {
            kind: 'number',
            min: range?.min,
            max: range?.max,
            step: range?.step,
        };
    }
    if (type && NON_CONTROLS.has(type)) return null;
    return inferControl(value);
}

function inferControl(value: unknown): Control | null {
    if (typeof value === 'boolean') return { kind: 'boolean' };
    if (typeof value === 'number') return { kind: 'number' };
    if (typeof value === 'string') return { kind: 'text' };
    return null;
}

// Builds the control list for a story from its argTypes and initial args.
export function buildControls(argTypes: ArgTypes, args: Args): ControlSpec[] {
    const names = new Set([...Object.keys(argTypes), ...Object.keys(args)]);
    const specs: ControlSpec[] = [];
    for (const name of names) {
        const argType = argTypes[name] ?? {};
        const control = argTypes[name]
            ? fromArgType(argType, args[name])
            : inferControl(args[name]);
        if (control)
            specs.push({ name, control, description: argType.description });
    }
    return specs;
}
