import { PRESETS } from './presets';
import type { ThemePreset } from './types';

// Radii a random theme picks from (0 reads as a deliberate choice, not a surprise).
export const RANDOM_RADII = [0.5, 0.625, 0.75, 1] as const;

const pick = <T>(items: readonly T[]): T =>
    items[Math.floor(Math.random() * items.length)];

/** A random preset, never the one currently in use. */
export function pickRandomPreset(excludeId?: string): ThemePreset {
    return pick(PRESETS.filter((preset) => preset.id !== excludeId));
}

export const pickRandomRadius = () => pick(RANDOM_RADII);
