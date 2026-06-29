import type { Metadata } from "next";
import { SecurityPage, OBJECTIONS } from "@/components/security/security-page";
import { pageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/ui/json-ld";
import { faqPageLd, breadcrumbLd } from "@/lib/structured-data";

/**
 * /security — Security & Trust (content/03). A top-level static route; the footer
 * "Security & Trust" link resolves here. Takes routing precedence over the [slug]
 * function segment (which 404s anything outside the seven layers).
 */
// content/02 §5 lists no crafted SEO title for Security; keep the short
// templated form ("Security & Trust — horz") + the page-derived description.
export const metadata: Metadata = pageMetadata({
  title: "Security & Trust",
  description:
    "Every artifact, signed by a human and traced to its source. The human on the signature line, the audit trail, scoped data, named compliance, and continuity without lock-in.",
  path: "/security",
});

export default function SecurityRoute() {
  return (
    <>
      <JsonLd
        data={[
          faqPageLd(OBJECTIONS),
          breadcrumbLd([
            { name: "Home", path: "/" },
            { name: "Security & Trust", path: "/security" },
          ]),
        ]}
      />
      <SecurityPage />
    </>
  );
}
