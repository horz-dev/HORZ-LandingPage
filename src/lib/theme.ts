export const THEME_STORAGE_KEY = "horz-theme";
export type Theme = "dark" | "light";

/** Dark "blue hour" is HOME — the default surface. */
export const DEFAULT_THEME: Theme = "dark";

/**
 * Runs before first paint (injected in <head>) so a returning visitor who
 * chose "day station" never sees a flash of the dark default. :root already
 * holds the dark palette, so the only override this needs to make is → light.
 */
export const themeInitScript = `(function(){try{var t=localStorage.getItem("${THEME_STORAGE_KEY}");if(t==="light"||t==="dark"){document.documentElement.setAttribute("data-theme",t);}}catch(e){}})();`;
