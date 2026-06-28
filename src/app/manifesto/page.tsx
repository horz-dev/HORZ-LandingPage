import type { Metadata } from "next";
import { AboutPage } from "@/components/about/about-page";

/**
 * /manifesto — the About / Manifesto page (content/05). A top-level static route;
 * the nav and footer "Manifesto" links resolve here. Takes routing precedence over
 * the [slug] function segment (which 404s anything outside the seven layers).
 */
export const metadata: Metadata = {
  title: "Manifesto",
  description:
    "Engineers stopped writing their own auth. Founders should stop running their own back office.",
};

export default function ManifestoRoute() {
  return <AboutPage />;
}
