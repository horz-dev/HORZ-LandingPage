import type { Metadata, Viewport } from "next";
import "./globals.css";
import { fontVariables } from "./fonts";
import { DEFAULT_THEME, SURFACE_COLOR, themeInitScript } from "@/lib/theme";
import { MotionProvider } from "@/lib/motion-provider";
import { SmoothScroll } from "@/lib/smooth-scroll";
import { JsonLd } from "@/components/ui/json-ld";
import { organizationLd, websiteLd } from "@/lib/structured-data";
import {
  HOME_TITLE,
  HOME_DESCRIPTION,
  OG_TITLE,
  OG_DESCRIPTION,
  OG_IMAGE,
  SITE_NAME,
  SITE_URL,
  SITE_LOCALE,
} from "@/lib/seo";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    // the homepage sets its own absolute title; this default is the safe
    // fallback for any page that doesn't (and matches content/02 §5 Home).
    default: HOME_TITLE,
    template: `%s — ${SITE_NAME}`,
  },
  description: HOME_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: "technology",
  keywords: [
    "modular backend",
    "managed back office",
    "AI customer service",
    "legal operations",
    "HR and payroll",
    "marketing automation",
    "analytics",
    "corporate tax filing",
    "company brain",
    "startup operations",
  ],
  // never let a phone number / address be auto-linked into our copy
  formatDetection: { email: false, address: false, telephone: false },
  // site-wide defaults; real pages emit their own full OpenGraph via pageMetadata.
  // og:image is supplied by the opengraph-image file convention (applies to all).
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    locale: SITE_LOCALE,
    url: SITE_URL,
    title: OG_TITLE,
    description: OG_DESCRIPTION,
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: OG_TITLE,
    description: OG_DESCRIPTION,
    images: [OG_IMAGE.url],
  },
};

export const viewport: Viewport = {
  // static = the default surface (dark "blue hour"); the init script + toggle
  // keep the meta in sync with the real data-theme, not the OS preference.
  themeColor: SURFACE_COLOR[DEFAULT_THEME],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-theme={DEFAULT_THEME}
      className={fontVariables}
      suppressHydrationWarning
    >
      <head>
        {/* set the chosen surface before first paint — no flash for day-station */}
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="flex min-h-dvh flex-col">
        {/* keyboard / screen-reader bypass: jumps past the nav to the page body */}
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        {/* site-wide machine-readable facts (search + LLM ingestion) */}
        <JsonLd data={[organizationLd(), websiteLd()]} />
        {/* film grain over everything — kills banding, prints the surface */}
        <div className="grain" aria-hidden="true" />
        {/* calm, low-inertia smooth scroll (§8.11); off on touch + reduced-motion */}
        <SmoothScroll />
        {/* reduced-motion is first-class (§8.10): Framer respects the OS query */}
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
