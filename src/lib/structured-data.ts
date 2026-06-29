/**
 * JSON-LD structured data (Phase 6 · the "LLM visibility" layer).
 *
 * Machine-readable facts about horz for search engines and LLMs. A connected
 * graph via @id: Organization ←publisher— WebSite; per-page FAQPage / Service /
 * BreadcrumbList reference the Organization. Everything here is grounded in the
 * canonical positioning (content/00 / content/02) — no fabricated facts (no
 * invented social profiles, no claimed certifications), so what an LLM ingests
 * is true. Q&A markup mirrors Q&A that is actually visible on the page.
 */

import { SITE_NAME, SITE_URL, POSITIONING_ONE_LINER, TAGLINE } from "./seo";

const ORG_ID = `${SITE_URL}/#organization`;
const SITE_ID = `${SITE_URL}/#website`;

/** A JSON-serialisable node. */
type Json = Record<string, unknown>;

/** Organization — the company, the same node every page references. */
export function organizationLd(): Json {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORG_ID,
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    description:
      "horz is the modular backend for everything around your business — the six functions every company runs (customer service, legal, HR, marketing, analytics, and tax) delivered as managed layers on one shared company brain, so the founder keeps only their core product.",
    slogan: TAGLINE,
    email: "talk@horz.dev",
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "sales",
        email: "talk@horz.dev",
      },
      {
        "@type": "ContactPoint",
        contactType: "customer support",
        email: "support@horz.dev",
      },
    ],
    knowsAbout: [
      "Customer support automation",
      "Legal operations",
      "Human resources and payroll",
      "Marketing and SEO",
      "Business analytics",
      "Corporate tax filing",
      "Managed back-office operations",
    ],
  };
}

/** WebSite — the site itself, published by the Organization. */
export function websiteLd(): Json {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": SITE_ID,
    name: SITE_NAME,
    url: SITE_URL,
    description: POSITIONING_ONE_LINER,
    inLanguage: "en-US",
    publisher: { "@id": ORG_ID },
  };
}

/** FAQPage — for any page with visible Q&A (objections / pricing FAQ). The
 *  markup only ever describes Q&A the visitor can actually read on the page. */
export function faqPageLd(items: { q: string; a: string }[]): Json {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };
}

/** Service — one of the seven managed layers, provided by horz. */
export function serviceLd(input: {
  name: string;
  description: string;
  path: string;
  serviceType: string;
}): Json {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${input.name} — a managed layer by horz`,
    serviceType: input.serviceType,
    description: input.description,
    url: `${SITE_URL}${input.path}`,
    provider: { "@id": ORG_ID },
    areaServed: "US",
  };
}

/** BreadcrumbList — Home › Page (no product-overview page ships, so it's flat). */
export function breadcrumbLd(items: { name: string; path: string }[]): Json {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.path === "/" ? SITE_URL : `${SITE_URL}${item.path}`,
    })),
  };
}
