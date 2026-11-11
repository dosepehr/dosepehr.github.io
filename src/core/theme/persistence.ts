// Where the custom theme is kept between visits.

export const THEME_STORE_KEY = 'ff-docs-theme';
export const THEME_CSS_KEY = 'ff-docs-theme-css';
export const THEME_STYLE_ID = 'ff-theme';

/** Writes the theme CSS into the page and remembers it for the boot script. */
export function applyThemeCss(css: string) {
    let style = document.getElementById(THEME_STYLE_ID);
    if (!style) {
        style = document.createElement('style');
        style.id = THEME_STYLE_ID;
        document.head.append(style);
    }
    style.textContent = css;
    try {
        if (css) localStorage.setItem(THEME_CSS_KEY, css);
        else localStorage.removeItem(THEME_CSS_KEY);
    } catch {
        // Storage can be unavailable (private mode); the theme still applies for this visit.
    }
}
