import type { Metadata, Viewport } from "next";
import "./globals.css";
import { fontVariables } from "./fonts";
import { DEFAULT_THEME, themeInitScript } from "@/lib/theme";

export const metadata: Metadata = {
  title: {
    default: "horz — Scale Horizontally. Focus Vertically.",
    template: "%s — horz",
  },
  description: "The modular backend for everything around your business.",
  metadataBase: new URL("https://horz.dev"),
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0D1014" },
    { media: "(prefers-color-scheme: light)", color: "#ECEAE4" },
  ],
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
        {/* film grain over everything — kills banding, prints the surface */}
        <div className="grain" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
