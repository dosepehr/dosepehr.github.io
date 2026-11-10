import { parseAsBoolean, parseAsFloat, parseAsString } from 'nuqs';
import type { ControlSpec } from '../types';

// The URL parser for each playground control, so edited props live in the
// query string (?variant=outline&showArrow=true) with their real types.
export function parserFor({ control }: ControlSpec) {
    switch (control.kind) {
        case 'boolean': {
            return parseAsBoolean;
        }
        case 'number': {
            return parseAsFloat;
        }
        default: {
            return parseAsString;
        }
    }
}
