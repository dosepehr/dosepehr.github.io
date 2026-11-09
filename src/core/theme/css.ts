import { readableForeground } from './color';
import {
    COLOR_KEYS,
    type ColorKey,
    type ThemeConfig,
    type ThemeMode,
} from './types';

type Declaration = [token: string, value: string];

// A darker (light mode) or lighter (dark mode) shade for colored text.
const textShade = (hex: string, mode: ThemeMode) =>
    `color-mix(in oklch, ${hex} 80%, ${mode === 'light' ? 'black' : 'white'})`;

// Every CSS variable one edited color drives.
function declarationsFor(
    key: ColorKey,
    hex: string,
    mode: ThemeMode,
): Declaration[] {
    const fg = readableForeground(hex);
    switch (key) {
        case 'primary': {
            return [
                ['primary', hex],
                ['primary-foreground', fg],
                ['primary-text', textShade(hex, mode)],
                ['ring', `color-mix(in oklch, ${hex} 55%, transparent)`],
                ['sidebar-primary', hex],
                ['sidebar-primary-foreground', fg],
            ];
        }
        case 'secondary':
        case 'accent': {
            return [
                [key, hex],
                [`${key}-foreground`, fg],
            ];
        }
        case 'destructive': {
            return [
                ['destructive', hex],
                ['destructive-text', textShade(hex, mode)],
            ];
        }
        default: {
            return [
                [key, hex],
                [`${key}-foreground`, fg],
                [`${key}-text`, textShade(hex, mode)],
            ];
        }
    }
}

const block = (selector: string, declarations: Declaration[]) =>
    declarations.length
        ? `${selector} {\n${declarations.map(([t, v]) => `    --${t}: ${v};`).join('\n')}\n}`
        : '';

function modeDeclarations(theme: ThemeConfig, mode: ThemeMode): Declaration[] {
    return COLOR_KEYS.flatMap((key) => {
        const hex = theme.colors[mode][key];
        return hex ? declarationsFor(key, hex, mode) : [];
    });
}

/**
 * CSS for a theme. `scoped` targets this site (light rules only apply outside
 * `.dark`, so a light override never leaks into dark mode); unscoped output
 * is what users paste into their globals.css.
 */
export function buildThemeCss(
    theme: ThemeConfig,
    { scoped = false } = {},
): string {
    const radius: Declaration[] =
        theme.radius === null ? [] : [['radius', `${theme.radius}rem`]];
    const light = modeDeclarations(theme, 'light');
    const dark = modeDeclarations(theme, 'dark');
    const blocks = scoped
        ? [
              block(':root', radius),
              block(':root:not(.dark)', light),
              block(':root.dark', dark),
          ]
        : [block(':root', [...radius, ...light]), block('.dark', dark)];
    return blocks.filter(Boolean).join('\n\n');
}
