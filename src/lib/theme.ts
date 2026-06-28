export const THEME_STORAGE_KEY = "horz-theme";
export type Theme = "dark" | "light";

/** Dark "blue hour" is HOME — the default surface. */
export const DEFAULT_THEME: Theme = "dark";

/** The page-ground colour per surface — also the mobile address-bar colour. */
export const SURFACE_COLOR: Record<Theme, string> = {
  dark: "#0D1014",
  light: "#ECEAE4",
};

/**
 * Runs before first paint (injected in <head>) so a returning visitor who
 * chose "day station" never sees a flash of the dark default. :root already
 * holds the dark palette, so the only override this needs to make is → light.
 * It also syncs the theme-color meta so the address bar matches the real
 * surface (which is data-theme/localStorage-driven, not OS-preference-driven).
 */
export const themeInitScript = `(function(){try{var t=localStorage.getItem("${THEME_STORAGE_KEY}");if(t==="light"||t==="dark"){document.documentElement.setAttribute("data-theme",t);}var c=document.documentElement.getAttribute("data-theme")==="light"?"${SURFACE_COLOR.light}":"${SURFACE_COLOR.dark}";var m=document.querySelector('meta[name="theme-color"]');if(m){m.setAttribute("content",c);}}catch(e){}})();`;
