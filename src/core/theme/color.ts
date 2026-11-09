// Small color helpers for #rrggbb values.

const channel = (hex: string, offset: number) =>
    Number.parseInt(hex.slice(offset, offset + 2), 16) / 255;

const linear = (c: number) =>
    c <= 0.040_45 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;

/** WCAG relative luminance of a #rrggbb color. */
export function luminance(hex: string): number {
    const [r, g, b] = [1, 3, 5].map((offset) => linear(channel(hex, offset)));
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

const contrast = (a: number, b: number) =>
    (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);

const WHITE = '#ffffff';
const INK = '#0a0a0a';

/** White or near-black, whichever reads better on the given background. */
export function readableForeground(background: string): string {
    const l = luminance(background);
    return contrast(l, 1) >= contrast(l, luminance(INK)) ? WHITE : INK;
}

export const isHexColor = (value: string) => /^#[\da-f]{6}$/i.test(value);
