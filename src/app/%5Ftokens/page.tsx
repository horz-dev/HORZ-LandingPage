import type { Metadata } from "next";
import { Wordmark } from "@/components/brand";
import { ThemeToggle } from "@/components/theme-toggle";

export const metadata: Metadata = {
  title: "Token Foundation",
  robots: { index: false, follow: false },
};

/* ===========================================================================
   /_tokens — the survey sheet
   A throwaway internal page that renders the entire token foundation so it
   can be graded against DESIGN_SYSTEM.md §4–6 and the locked preview, and so
   the day/night toggle can be proven to flip every surface. Not a real route.
   ========================================================================= */

type Token = {
  name: string;
  cssVar: string;
  dark: string;
  light: string;
  role: string;
  /** chips near the page ground need a hairline to read */
  faint?: boolean;
};

const COLOR_GROUPS: { label: string; index: string; tokens: Token[] }[] = [
  {
    label: "Surface",
    index: "01",
    tokens: [
      { name: "bg", cssVar: "--bg", dark: "#0D1014", light: "#ECEAE4", role: "Page ground", faint: true },
      { name: "horizon-floor", cssVar: "--horizon-floor", dark: "#161310", light: "#E4DFD3", role: "Warm floor at the datum", faint: true },
      { name: "surface", cssVar: "--surface", dark: "#161B22", light: "#F3F1EB", role: "Cards, panels", faint: true },
      { name: "surface-raised", cssVar: "--surface-raised", dark: "#1E242E", light: "#F8F6F1", role: "Modals, popovers", faint: true },
      { name: "border", cssVar: "--border", dark: "#283039", light: "#DCD8CF", role: "Hairline", faint: true },
      { name: "datum", cssVar: "--datum", dark: "rgba(255,255,255,.12)", light: "rgba(21,20,15,.10)", role: "Structural section line", faint: true },
    ],
  },
  {
    label: "Text",
    index: "02",
    tokens: [
      { name: "text-primary", cssVar: "--text-primary", dark: "#F2EFE8", light: "#15140F", role: "Body / ink · ~Lc 92" },
      { name: "text-secondary", cssVar: "--text-secondary", dark: "#A4AAB5", light: "#66605A", role: "Secondary · ~Lc 62" },
      { name: "text-tertiary", cssVar: "--text-tertiary", dark: "#697079", light: "#97928A", role: "Metadata, mono eyebrows · ~Lc 45" },
    ],
  },
  {
    label: "Flare",
    index: "03",
    tokens: [
      { name: "flare", cssVar: "--flare", dark: "#FF6F44", light: "#FB4D1C", role: "CTA · core · live datum · status" },
      { name: "flare-link", cssVar: "--flare-link", dark: "#FF855F", light: "#BE3613", role: "Inline links (APCA-safe)" },
      { name: "flare-hover", cssVar: "--flare-hover", dark: "#FF855F", light: "#E23E12", role: "Hover / active · dark focus ring" },
      { name: "flare-muted", cssVar: "--flare-muted", dark: "#33231A", light: "#F1D9CD", role: "Badge / track tint", faint: true },
    ],
  },
  {
    label: "Status",
    index: "04",
    tokens: [
      { name: "success", cssVar: "--success", dark: "#7FA06F", light: "#5F7856", role: "Muted sage" },
      { name: "warning", cssVar: "--warning", dark: "#E0AE5A", light: "#B8861F", role: "Amber-ochre" },
      { name: "danger", cssVar: "--danger", dark: "#D26A52", light: "#A82F22", role: "Brick — never collides with flare" },
    ],
  },
];

type TypeStep = {
  cls: string;
  name: string;
  sample: string;
  meta: string;
  serif?: boolean;
};

const TYPE_STEPS: TypeStep[] = [
  { cls: "display-xl", name: "display-xl", sample: "Scale Horizontally.", meta: "serif · 400 · clamp(52–96) · 1.04 · −0.025em", serif: true },
  { cls: "display-l", name: "display-l", sample: "Focus Vertically.", meta: "serif · 400 · 64 / 68 · −0.022em", serif: true },
  { cls: "display-m", name: "display-m", sample: "Seven layers, one brain.", meta: "serif · 400 · 44 / 48 · −0.018em", serif: true },
  { cls: "h1", name: "h1-product", sample: "The modular backend", meta: "grotesk · 500 · 44 / 48 · −0.018em" },
  { cls: "h2", name: "h2", sample: "Customer Service, offloaded", meta: "grotesk · 500 · 34 / 40 · −0.018em" },
  { cls: "h3", name: "h3", sample: "Read the whole width", meta: "grotesk · 500 · 26 / 32 · −0.014em" },
  { cls: "h4", name: "h4", sample: "One instrument", meta: "grotesk · 500 · 21 / 28 · −0.01em" },
  { cls: "lead", name: "lead", sample: "You keep the one part only you can build.", meta: "grotesk · 400 · 20 / 32 · −0.008em" },
  { cls: "body", name: "body", sample: "Engineers stopped writing their own auth. Founders should stop running their own back office.", meta: "grotesk · 400 · 17 / 28 · −0.003em · max 66ch" },
  { cls: "body-sm", name: "body-sm", sample: "Secondary copy and dense UI captions sit here.", meta: "grotesk · 400 · 15 / 24 · 0" },
  { cls: "ui-label", name: "ui-label", sample: "Start building", meta: "grotesk · 500 · 15 / 16 · +0.004em" },
  { cls: "caption", name: "caption", sample: "Captions and footnotes, tertiary.", meta: "grotesk · 400 · 13 / 20 · 0" },
  { cls: "eyebrow", name: "eyebrow", sample: "HORZ-ARCHITECTURE", meta: "mono · 500 · 12 / 16 · +0.10em · UPPERCASE" },
  { cls: "index", name: "index", sample: "01 · 02 · 03 · 04 · 05 · 06 · 07", meta: "mono · 400 · 13 / 16 · +0.04em · tabular-nums" },
];

const SPACE_SCALE = [4, 8, 16, 24, 32, 48, 64, 96, 128, 192, 256];

const EASES = [
  { name: "ease-scribe", value: "cubic-bezier(0.16, 1, 0.3, 1)", role: "The house ease — every hover, every seam-in" },
  { name: "ease-scribe-out", value: "cubic-bezier(0.22, 1, 0.36, 1)", role: "Scroll-reveal / fade-up variant" },
];

const CONTAINERS = [
  { name: "w-prose", px: 680, role: "Reading measure (~66ch)" },
  { name: "w-content", px: 1200, role: "Default editorial frame" },
  { name: "w-wide", px: 1440, role: "Control-panel rack" },
];

function Sidehead({ index, label }: { index: string; label: string }) {
  return (
    <div className="flex items-baseline gap-3 md:flex-col md:gap-2">
      <span className="index text-flare">{index}</span>
      <span className="eyebrow">{label}</span>
    </div>
  );
}

function Section({
  index,
  label,
  children,
}: {
  index: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-t border-line">
      <div className="frame py-16 md:py-24">
        <div className="md:grid md:grid-cols-[180px_1fr] md:gap-12">
          <div className="mb-8 md:mb-0">
            <Sidehead index={index} label={label} />
          </div>
          <div>{children}</div>
        </div>
      </div>
    </section>
  );
}

function Swatch({ token }: { token: Token }) {
  return (
    <div className="flex flex-col gap-3">
      <div
        className="h-16 w-full rounded-control"
        style={{
          background: `var(${token.cssVar})`,
          boxShadow: token.faint ? "inset 0 0 0 1px var(--border)" : undefined,
        }}
      />
      <div className="flex flex-col gap-1">
        <span className="mono text-[13px] text-ink">{token.name}</span>
        <span className="body-sm text-ink-muted">{token.role}</span>
        <span className="mono text-[11px] text-ink-faint">
          D {token.dark} · L {token.light}
        </span>
      </div>
    </div>
  );
}

export default function TokensPage() {
  return (
    <main>
      {/* —— top datum bar —— */}
      <header className="sticky top-0 z-50 border-b border-line bg-bg/80 backdrop-blur-md">
        <div className="frame flex h-16 items-center justify-between">
          <Wordmark />
          <div className="flex items-center gap-4">
            <span className="index hidden text-ink-faint sm:inline">
              STATION 0.0000 · TOKEN FOUNDATION
            </span>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* —— the one gradient —— */}
      <div className="dusk-band" />
      <div className="datum" />

      {/* —— title —— */}
      <div className="frame py-16 md:py-24">
        <p className="eyebrow mb-6">
          PHASE 0 <span className="dot">·</span> DESIGN TOKEN FOUNDATION
        </p>
        <h1 className="display-l max-w-[18ch] text-ink">
          The foundation, drawn as a survey sheet.
        </h1>
        <p className="lead mt-6 max-w-[60ch] text-ink-muted">
          Every colour, type step, space unit, radius, and ease resolved from
          the design system. Toggle day / night to prove the surface flips.
          Internal — not a shipped route.
        </p>
      </div>

      {/* —— COLOUR —— */}
      <Section index="01" label="Colour · 70 / 25 / 5">
        <div className="flex flex-col gap-12">
          {COLOR_GROUPS.map((group) => (
            <div key={group.label}>
              <p className="eyebrow mb-5">
                {group.index} <span className="dot">·</span> {group.label}
              </p>
              <div className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3 lg:grid-cols-4">
                {group.tokens.map((token) => (
                  <Swatch key={token.name} token={token} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* —— TYPE —— */}
      <Section index="02" label="Type · two voices">
        <div className="flex flex-col divide-y divide-line">
          {TYPE_STEPS.map((step) => (
            <div
              key={step.name}
              className="flex flex-col gap-3 py-7 md:flex-row md:items-baseline md:justify-between md:gap-10"
            >
              <div className="min-w-0 flex-1">
                <span className={`${step.cls} block text-ink`}>
                  {step.sample}
                </span>
              </div>
              <div className="flex shrink-0 flex-col gap-1 md:w-[300px] md:text-right">
                <span className="mono text-[13px] text-ink">{step.name}</span>
                <span className="mono text-[11px] text-ink-faint">
                  {step.meta}
                </span>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* —— SPACE —— */}
      <Section index="03" label="Space · 8px base">
        <p className="body mb-8 max-w-[60ch] text-ink-muted">
          4 · 8 · 16 · 24 · 32 · 48 · 64 · 96 · 128 · 192 · 256. Nothing outside
          the scale. The macro rhythm between sections runs large.
        </p>
        <div className="flex flex-col gap-3">
          {SPACE_SCALE.map((unit) => (
            <div key={unit} className="flex items-center gap-4">
              <span className="mono w-12 shrink-0 text-right text-[13px] text-ink-faint">
                {unit}
              </span>
              <div
                className="h-4 bg-flare/80"
                style={{ width: `${unit}px` }}
              />
            </div>
          ))}
        </div>
      </Section>

      {/* —— RADIUS —— */}
      <Section index="04" label="Radius · 0 or 2">
        <div className="flex flex-wrap gap-8">
          <div className="flex flex-col gap-3">
            <div className="size-24 rounded-strata border border-line bg-surface" />
            <span className="mono text-[13px] text-ink">radius-strata</span>
            <span className="body-sm text-ink-muted">0px · structural strata</span>
          </div>
          <div className="flex flex-col gap-3">
            <div className="size-24 rounded-control border border-line bg-surface" />
            <span className="mono text-[13px] text-ink">radius-control</span>
            <span className="body-sm text-ink-muted">2px · buttons, cards, inputs</span>
          </div>
        </div>
      </Section>

      {/* —— MOTION —— */}
      <Section index="05" label="Motion · one ease family">
        <div className="flex flex-col gap-8">
          {EASES.map((ease) => (
            <div key={ease.name} className="flex flex-col gap-2">
              <span className="mono text-[13px] text-ink">{ease.name}</span>
              <span className="mono text-[11px] text-ink-faint">
                {ease.value}
              </span>
              <span className="body-sm text-ink-muted">{ease.role}</span>
            </div>
          ))}
          <p className="caption max-w-[60ch] text-ink-faint">
            All motion collapses to ≤0.001ms under prefers-reduced-motion — the
            dusk band stops drifting, every seam-in resolves to its end state.
          </p>
        </div>
      </Section>

      {/* —— CONTAINERS —— */}
      <Section index="06" label="Containers · four widths">
        <div className="flex flex-col gap-6">
          {CONTAINERS.map((c) => (
            <div key={c.name} className="flex flex-col gap-2">
              <div className="flex items-baseline justify-between">
                <span className="mono text-[13px] text-ink">{c.name}</span>
                <span className="mono text-[11px] text-ink-faint">
                  {c.px}px · {c.role}
                </span>
              </div>
              <div className="datum" style={{ maxWidth: `${c.px / 2}px` }} />
            </div>
          ))}
          <p className="caption text-ink-faint">
            Rules shown at half scale. The fifth is w-bleed (100vw) — the datum,
            the dusk band, full-bleed strata.
          </p>
        </div>
      </Section>

      {/* —— baseplate —— */}
      <footer className="border-t border-line">
        <div className="frame flex flex-wrap items-center justify-between gap-4 py-12">
          <span className="mono text-[12px] text-ink-faint">
            © 2026 horz · Scale Horizontally. Focus Vertically.
          </span>
          <span className="mono text-[12px] text-ink-faint">STATION 0.0000</span>
        </div>
      </footer>
    </main>
  );
}
