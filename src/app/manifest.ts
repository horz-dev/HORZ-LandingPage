import type { MetadataRoute } from "next";
import { SITE_NAME, POSITIONING_ONE_LINER } from "@/lib/seo";
import { SURFACE_COLOR } from "@/lib/theme";

/**
 * /manifest.webmanifest — installability + a correct address-bar colour.
 * Blue-hour ground is HOME, so the manifest theme/background are the dark
 * surface (the in-app toggle still re-syncs theme-color at runtime).
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE_NAME} — the modular backend for everything around your business`,
    short_name: SITE_NAME,
    description: POSITIONING_ONE_LINER,
    id: "/",
    start_url: "/",
    display: "standalone",
    background_color: SURFACE_COLOR.dark,
    theme_color: SURFACE_COLOR.dark,
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml", purpose: "any" },
      { src: "/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
    ],
  };
}
