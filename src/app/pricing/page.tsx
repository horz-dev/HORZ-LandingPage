import type { Metadata } from "next";
import { PricingPage, QUESTIONS } from "@/components/pricing/pricing-page";
import { pageMetadata, PRICING_SEO } from "@/lib/seo";
import { JsonLd } from "@/components/ui/json-ld";
import { faqPageLd, breadcrumbLd } from "@/lib/structured-data";

/**
 * /pricing — content/04. A top-level static route; the nav + footer "Pricing"
 * links resolve here. Takes routing precedence over the [slug] function segment
 * (which 404s anything outside the seven layers). SEO from content/02.
 */
export const metadata: Metadata = pageMetadata({
  title: PRICING_SEO.title,
  titleAbsolute: true,
  description: PRICING_SEO.description,
  path: "/pricing",
});

export default function PricingRoute() {
  return (
    <>
      <JsonLd
        data={[
          faqPageLd(QUESTIONS),
          breadcrumbLd([
            { name: "Home", path: "/" },
            { name: "Pricing", path: "/pricing" },
          ]),
        ]}
      />
      <PricingPage />
    </>
  );
}
