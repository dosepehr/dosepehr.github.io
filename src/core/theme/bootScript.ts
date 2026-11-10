import { buildThemeCss } from './css';
import {
    THEME_CSS_KEY,
    THEME_SESSION_KEY,
    THEME_STORE_KEY,
    THEME_STYLE_ID,
} from './persistence';
import { PRESETS } from './presets';
import { RANDOM_RADII } from './random';

// What the boot script needs, prepared at build time: each preset's colors and
// its site CSS (without the radius, which is added per pick).
const data = {
    storeKey: THEME_STORE_KEY,
    cssKey: THEME_CSS_KEY,
    sessionKey: THEME_SESSION_KEY,
    styleId: THEME_STYLE_ID,
    radii: RANDOM_RADII,
    presets: Object.fromEntries(
        PRESETS.map((p) => [
            p.id,
            {
                colors: p.colors,
                css: buildThemeCss(
                    { colors: p.colors, radius: null },
                    { scoped: true },
                ),
            },
        ]),
    ),
};

/**
 * Inline <head> script, run before the first paint:
 * - on the first page of a new visit (no sessionStorage flag yet), picks a
 *   random preset and radius, unless the visitor built a custom theme, and
 *   saves it where the theme store and ThemeStyle read it;
 * - then applies the saved theme CSS, so nothing flashes the default colors.
 * The output must match what ThemeStyle computes from the same state.
 */
export const themeBootScript = `(function(){try{
var d=${JSON.stringify(data)};
var saved=null;try{saved=JSON.parse(localStorage.getItem(d.storeKey)||'null')}catch(e){}
var state=saved&&saved.state;
var css=localStorage.getItem(d.cssKey);
if(!sessionStorage.getItem(d.sessionKey)){
sessionStorage.setItem(d.sessionKey,'1');
if(!state||state.presetId!=='custom'){
var ids=Object.keys(d.presets).filter(function(i){return !state||i!==state.presetId});
var id=ids[Math.floor(Math.random()*ids.length)];
var r=d.radii[Math.floor(Math.random()*d.radii.length)];
var p=d.presets[id];
css=':root {\\n    --radius: '+r+'rem;\\n}'+(p.css?'\\n\\n'+p.css:'');
localStorage.setItem(d.storeKey,JSON.stringify({state:{presetId:id,colors:p.colors,radius:r},version:0}));
localStorage.setItem(d.cssKey,css);
}}
if(css){var s=document.createElement('style');s.id=d.styleId;s.textContent=css;document.head.appendChild(s)}
}catch(e){}})();`;
