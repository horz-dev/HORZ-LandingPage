import type { Metadata } from "next";
import { AboutPage } from "@/components/about/about-page";
import { pageMetadata, MANIFESTO_SEO } from "@/lib/seo";
import { JsonLd } from "@/components/ui/json-ld";
import { breadcrumbLd } from "@/lib/structured-data";

/**
 * /manifesto — the About / Manifesto page (content/05). A top-level static route;
 * the nav and footer "Manifesto" links resolve here. Takes routing precedence over
 * the [slug] function segment (which 404s anything outside the seven layers).
 */
export const metadata: Metadata = pageMetadata({
  title: MANIFESTO_SEO.title,
  titleAbsolute: true,
  description: MANIFESTO_SEO.description,
  path: "/manifesto",
});

export default function ManifestoRoute() {
  return (
    <>
      <JsonLd
        data={breadcrumbLd([
          { name: "Home", path: "/" },
          { name: "Manifesto", path: "/manifesto" },
        ])}
      />
      <AboutPage />
    </>
  );
}
