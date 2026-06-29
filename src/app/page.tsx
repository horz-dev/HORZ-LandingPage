import type { Metadata } from "next";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import {
  pageMetadata,
  HOME_TITLE,
  HOME_DESCRIPTION,
  OG_TITLE,
  OG_DESCRIPTION,
} from "@/lib/seo";
import { Hero } from "@/components/home/hero";
import { ProofLog } from "@/components/home/proof-log";
import { Thesis } from "@/components/home/thesis";
import { StrataSection } from "@/components/home/strata-section";
import { HorzArchitecture } from "@/components/home/horz-architecture";
import { VsYourself } from "@/components/home/vs-yourself";
import { PricingTeaser } from "@/components/home/pricing-teaser";
import { ManifestoFloor } from "@/components/home/manifesto-floor";

/**
 * The homepage (DESIGN_SYSTEM Part 5) — one section cut, read top to bottom.
 * The visitor arrives at the survey station at dusk, watches the company drawn as
 * strata (hero), descends through proof → thesis → the rack → the interactive
 * separation → the comparison → pricing, and steps off at the warm floor.
 *
 * Eight datums, eight sections, one core threading the column (§8.0). The nav
 * overlays the hero (heroOverlay) so the page's one above-the-fold flare CTA lives
 * in the hero, not the bar. Footer closes the cut.
 */
// content/02 §5 title/desc for the <title>/<meta>, §6 copy for the social card.
export const metadata: Metadata = pageMetadata({
  title: HOME_TITLE,
  titleAbsolute: true,
  description: HOME_DESCRIPTION,
  path: "/",
  ogTitle: OG_TITLE,
  ogDescription: OG_DESCRIPTION,
});

export default function Home() {
  return (
    <>
      <SiteNav heroOverlay />
      <main id="main-content" tabIndex={-1}>
        <Hero />
        <ProofLog />
        <Thesis />
        <StrataSection />
        <HorzArchitecture />
        <VsYourself />
        <PricingTeaser />
        <ManifestoFloor />
      </main>
      <SiteFooter />
    </>
  );
}
