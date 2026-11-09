import fs from 'node:fs';
import path from 'node:path';
import { GENERATED, SRC } from './paths.mjs';
import { writeIfChanged } from './write.mjs';

// Tokens the theme customizer edits; their defaults come from globals.css.
const KEYS = [
    'primary',
    'secondary',
    'accent',
    'destructive',
    'success',
    'warning',
    'info',
];

const readBlock = (css, selector) => {
    const start = css.indexOf(`${selector} {`);
    const end = css.indexOf('}', start);
    const vars = {};
    for (const [, name, value] of css
        .slice(start, end)
        .matchAll(/--([\w-]+):\s*([^;]+);/g))
        vars[name] = value.trim();
    return vars;
};

// oklch() -> #rrggbb (via OKLab and linear sRGB), clamped to the sRGB gamut.
function oklchToHex(value) {
    const m = value.match(/oklch\(\s*([\d.]+)(%?)\s+([\d.]+)\s+([\d.]+)/);
    if (!m) return value;
    const L = Number(m[1]) / (m[2] ? 100 : 1);
    const C = Number(m[3]);
    const h = (Number(m[4]) * Math.PI) / 180;
    const a = C * Math.cos(h);
    const b = C * Math.sin(h);
    const l = (L + 0.3963377774 * a + 0.2158037573 * b) ** 3;
    const mm = (L - 0.1055613458 * a - 0.0638541728 * b) ** 3;
    const s = (L - 0.0894841775 * a - 1.291485548 * b) ** 3;
    const linear = [
        4.0767416621 * l - 3.3077115913 * mm + 0.2309699292 * s,
        -1.2684380046 * l + 2.6097574011 * mm - 0.3413193965 * s,
        -0.0041960863 * l - 0.7034186147 * mm + 1.707614701 * s,
    ];
    const toByte = (c) => {
        const v = c <= 0.0031308 ? 12.92 * c : 1.055 * c ** (1 / 2.4) - 0.055;
        return Math.round(Math.min(1, Math.max(0, v)) * 255);
    };
    return `#${linear.map((c) => toByte(c).toString(16).padStart(2, '0')).join('')}`;
}

const pick = (vars, fallback) =>
    Object.fromEntries(
        KEYS.map((k) => [k, oklchToHex(vars[k] ?? fallback[k])]),
    );

export function writeThemeDefaults() {
    const css = fs.readFileSync(path.join(SRC, 'app/globals.css'), 'utf8');
    const light = readBlock(css, ':root');
    const dark = readBlock(css, '.dark');
    const defaults = {
        radius: Number.parseFloat(light.radius ?? '0.625'),
        light: pick(light, light),
        dark: pick(dark, light),
    };
    writeIfChanged(
        path.join(GENERATED, 'theme-defaults.json'),
        `${JSON.stringify(defaults, null, 2)}\n`,
    );
    return defaults;
}
