import type { Theme } from "./theme";

/**
 * Cal.com booking — the "book a slot" channel (content/08 line 02).
 *
 * One constant rules every trigger: CAL_LINK is what contact line 02, the
 * pricing tiers, and founding access all point at. The embed opens as a
 * click-popup (never inline: the month-view calendar is a foreign UI block
 * and would break the strata grammar), themed per the live Night/Day toggle
 * with the flare as Cal's brand colour. Every trigger keeps a plain
 * booking-page href, so no-JS and embed-blocked clicks still land on the
 * booking page in a new tab.
 */
export const CAL_LINK = "horz.dev/30min";

/**
 * The account lives on Cal's EU instance — cal.com 404s for this handle.
 * Must be the www host: bare cal.eu 307s, and a redirected iframe breaks the
 * embed's postMessage origin checks.
 */
export const CAL_ORIGIN = "https://www.cal.eu";

/** the no-JS / embed-blocked fallback — a plain link to the hosted booking page */
export const CAL_BOOKING_URL = `${CAL_ORIGIN}/${CAL_LINK}`;

/**
 * Cal's brand colour per theme. Dark gets the flare; light gets the darker
 * APCA-safe link tone — Cal sets light ink on its brand buttons, and
 * white-on-#FB4D1C fails contrast (the same reason our own light-theme
 * primary CTA runs dark ink, Phase 6).
 */
const CAL_BRAND: Record<Theme, string> = {
  dark: "#FF6F44",
  light: "#BE3613",
};

type CalApi = {
  (...args: unknown[]): void;
  q?: unknown[][];
  ns?: Record<string, unknown>;
  loaded?: boolean;
};

declare global {
  interface Window {
    Cal?: CalApi;
  }
}

let injected = false;
let embedLoaded = false;

/** true once embed.js has actually executed — the click-popup is live */
export function calEmbedReady(): boolean {
  return embedLoaded;
}

/**
 * Idempotent port of Cal's official loader (default namespace only): install
 * a queueing stub at window.Cal, pull in embed.js (which drains the queue and
 * takes over), init against cal.com, then keep the embed's theme seated on
 * whatever data-theme the Night/Day toggle sets. Called on mount by every
 * CalLink, so only pages with a booking trigger load the script.
 */
export function ensureCalEmbed(): void {
  if (injected || typeof window === "undefined") return;
  injected = true;

  if (!window.Cal) {
    const stub: CalApi = (...args: unknown[]) => {
      (stub.q = stub.q ?? []).push(args);
    };
    stub.q = [];
    stub.ns = {};
    window.Cal = stub;

    const script = document.createElement("script");
    script.src = "https://app.cal.eu/embed/embed.js";
    script.onload = () => {
      embedLoaded = true;
    };
    document.head.appendChild(script);
  } else {
    embedLoaded = true;
  }

  window.Cal("init", { origin: CAL_ORIGIN });
  applyCalTheme();

  // the footer toggle flips data-theme on <html>; the modal follows it live
  new MutationObserver(applyCalTheme).observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
}

function applyCalTheme(): void {
  const theme: Theme =
    document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark";
  window.Cal?.("ui", {
    theme,
    cssVarsPerTheme: {
      dark: { "cal-brand": CAL_BRAND.dark },
      light: { "cal-brand": CAL_BRAND.light },
    },
    hideEventTypeDetails: false,
    layout: "month_view",
  });
}
