import type { Metadata } from "next";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { SectionShowcase } from "@/components/section-showcase";

export const metadata: Metadata = {
  title: "The Section",
  robots: { index: false, follow: false },
};

/* ===========================================================================
   /_section — the Phase-2 showcase
   Renders the signature artifact (DESIGN_SYSTEM §2 / §7.5.2 / §8.5) twice — the
   homepage rack and the hero cut with the dusk-band bloom — with live theme +
   density toggles and a replay so the set-piece can be graded in both surfaces
   and both densities. Internal route (noindex).
   ========================================================================= */
export default function SectionPage() {
  return (
    <>
      <SiteNav heroOverlay />
      <SectionShowcase />
      <SiteFooter />
    </>
  );
}
