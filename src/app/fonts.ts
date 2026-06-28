import { Fraunces, Schibsted_Grotesk, Spline_Sans_Mono } from "next/font/google";

/**
 * The two voices, open-fallback edition.
 *
 * Ship-target faces are GT Sectra (serif) + ABC Diatype / Mono (grotesque),
 * self-hosted under a later licensed-font pass. Until then we ship the
 * metric-matched open fallbacks, also self-hosted — next/font downloads the
 * files at build time and serves them from /_next/static, so there is no
 * runtime call to Google. The `--font-*` variables are consumed by
 * `--serif` / `--grotesk` / `--mono` in globals.css.
 */

// Display / the voice — Fraunces ≈ GT Sectra. Variable, with optical sizing
// driven by `opsz` (auto) so large hero cuts use the Display cut and small
// running serif uses the Text cut.
export const fraunces = Fraunces({
  subsets: ["latin"],
  axes: ["opsz", "SOFT"],
  variable: "--font-fraunces",
  display: "swap",
  fallback: ["Georgia", "serif"],
});

// Body · UI · data — Schibsted Grotesk ≈ ABC Diatype. Weight tops at 500.
export const schibsted = Schibsted_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-schibsted",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});

// The instrument texture — Spline Sans Mono ≈ ABC Diatype Mono.
export const spline = Spline_Sans_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-spline",
  display: "swap",
  fallback: ["ui-monospace", "monospace"],
});

export const fontVariables = `${fraunces.variable} ${schibsted.variable} ${spline.variable}`;
