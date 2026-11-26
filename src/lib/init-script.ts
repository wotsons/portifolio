import { ACCENT_THEMES, THEME_STORAGE_KEY } from "./theme";

/** Set on <html> before first paint when the boot screen should show. */
export const BOOT_CLASS = "booting";
export const BOOT_STORAGE_KEY = "booted";
/** If React never takes over (JS error), stop covering the page after this long. */
const BOOT_FALLBACK_MS = 8000;

/**
 * Runs in <head> before first paint, so nothing flashes: marks JS as available
 * (for `.reveal`), re-applies the saved accent theme and decides whether the
 * boot screen shows. Kept dependency-free because it's serialized as a string.
 */
export const initScript = `(function(){var r=document.documentElement;r.classList.add('js');try{var t=localStorage.getItem(${JSON.stringify(
  THEME_STORAGE_KEY,
)});var m=${JSON.stringify(ACCENT_THEMES)};if(t&&m[t]){r.style.setProperty('--accent',m[t].accent);r.style.setProperty('--accent-ink',m[t].ink);}}catch(e){}try{if(!sessionStorage.getItem(${JSON.stringify(
  BOOT_STORAGE_KEY,
)})&&!matchMedia('(prefers-reduced-motion: reduce)').matches){r.classList.add(${JSON.stringify(
  BOOT_CLASS,
)});setTimeout(function(){r.classList.remove(${JSON.stringify(BOOT_CLASS)});},${BOOT_FALLBACK_MS});}}catch(e){}})();`;
