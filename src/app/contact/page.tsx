import type { Metadata } from "next";
import { ContactPage, OBJECTIONS } from "@/components/contact/contact-page";
import { pageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/ui/json-ld";
import { faqPageLd, breadcrumbLd } from "@/lib/structured-data";

/**
 * /contact — content/08. A top-level static route; the footer "Contact" link
 * resolves here (its `soon` flag is removed in nav-data). Takes routing precedence
 * over the [slug] function segment (which 404s anything outside the seven layers).
 */
// content/02 §5 lists no crafted SEO title for Contact; keep the short
// templated form ("Contact — horz") + the page-derived description.
export const metadata: Metadata = pageMetadata({
  title: "Contact",
  description:
    "Tell us what you're building. We'll tell you what you can put down. Six channels on one board: a self-serve start, a founder on the line for migrations and larger rollouts, security, support, press, and careers.",
  path: "/contact",
});

export default function ContactRoute() {
  return (
    <>
      <JsonLd
        data={[
          faqPageLd(OBJECTIONS),
          breadcrumbLd([
            { name: "Home", path: "/" },
            { name: "Contact", path: "/contact" },
          ]),
        ]}
      />
      <ContactPage />
    </>
  );
}
