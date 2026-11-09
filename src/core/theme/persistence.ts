// Where the custom theme is kept between visits.

export const THEME_STORE_KEY = 'ff-docs-theme';
export const THEME_CSS_KEY = 'ff-docs-theme-css';
export const THEME_STYLE_ID = 'ff-theme';

/**
 * Inline <head> script: re-applies the last saved theme CSS before the first
 * paint, so a custom theme doesn't flash the default colors on load.
 */
export const themeBootScript = `try{var c=localStorage.getItem('${THEME_CSS_KEY}');if(c){var s=document.createElement('style');s.id='${THEME_STYLE_ID}';s.textContent=c;document.head.appendChild(s)}}catch(e){}`;

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
