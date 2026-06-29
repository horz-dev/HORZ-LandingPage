import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

/**
 * /robots.txt — deliberately permissive.
 *
 * We let every crawler reach every real page and point them at the sitemap. We
 * do NOT `Disallow` the internal showcase routes (/_kit, /_section, /_tokens):
 * those already carry an authoritative `noindex` meta, and per Google's own
 * guidance a `Disallow` would stop crawlers from *seeing* that noindex (which can
 * leave a URL-only ghost in results). They're also unlinked and absent from the
 * sitemap, so they're effectively undiscoverable. Result: nothing public can be
 * accidentally excluded, and internal routes drop out cleanly via noindex.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
