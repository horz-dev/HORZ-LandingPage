import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FUNCTION_SLUGS, getFunction } from "@/lib/functions";
import { FunctionPageView } from "@/components/function-page/function-page";
import { JsonLd } from "@/components/ui/json-ld";
import { pageMetadata, FUNCTION_SEO } from "@/lib/seo";
import { serviceLd, breadcrumbLd, faqPageLd } from "@/lib/structured-data";

/**
 * The seven function detail pages, served from one data-driven route (§8.12).
 * `generateStaticParams` + `dynamicParams = false` prerenders exactly the seven
 * layer slugs and 404s everything else — so future top-level routes (/pricing,
 * /manifesto, added in Phase 5 as their own static folders) take precedence and
 * are never shadowed by this dynamic segment.
 */
export function generateStaticParams() {
  return FUNCTION_SLUGS.map((slug) => ({ slug }));
}

export const dynamicParams = false;

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const fn = getFunction(slug);
  if (!fn) return {};
  // content/02 §5 crafted title + description (verbatim); falls back to the
  // page's own copy only if a slug ever lacks a §5 entry.
  const seo = FUNCTION_SEO[slug];
  return pageMetadata({
    title: seo?.title ?? `${fn.name} · horz`,
    titleAbsolute: true,
    description: seo?.description ?? fn.seo,
    path: `/${slug}`,
  });
}

export default async function FunctionRoute({ params }: Params) {
  const { slug } = await params;
  const fn = getFunction(slug);
  if (!fn) notFound();

  // LLM / search structured data: this layer as a Service, its place in the
  // breadcrumb trail, and its visible objection Q&A as an FAQPage.
  const structuredData = [
    serviceLd({
      name: fn.name,
      description: FUNCTION_SEO[slug]?.description ?? fn.seo,
      path: `/${slug}`,
      serviceType: fn.name,
    }),
    breadcrumbLd([
      { name: "Home", path: "/" },
      { name: fn.name, path: `/${slug}` },
    ]),
    faqPageLd(fn.objections.map((o) => ({ q: o.q, a: o.a }))),
  ];

  return (
    <>
      <JsonLd data={structuredData} />
      <FunctionPageView fn={fn} />
    </>
  );
}
