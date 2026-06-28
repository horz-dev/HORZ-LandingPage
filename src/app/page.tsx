import Link from "next/link";
import { Wordmark } from "@/components/brand";
import { ThemeToggle } from "@/components/theme-toggle";

/**
 * Phase-0 holding page. The real homepage (DESIGN_SYSTEM Part 5) is assembled
 * in Phase 3 — this is the scaffold that proves the token foundation, fonts,
 * and day/night surface are live. Intentionally plain.
 */
export default function Home() {
  return (
    <main className="flex min-h-dvh flex-col">
      <header className="border-b border-line">
        <div className="frame flex h-16 items-center justify-between">
          <Wordmark />
          <ThemeToggle />
        </div>
      </header>

      <div className="dusk-band" />
      <div className="datum" />

      <div className="frame flex flex-1 items-center py-24">
        <div className="max-w-[60ch]">
          <p className="eyebrow mb-6">
            FOUNDATION <span className="dot">·</span> PHASE 0
          </p>
          <h1 className="display-m text-ink">Token foundation is live.</h1>
          <p className="lead mt-6 text-ink-muted">
            The horz frontend is being built in phases against the design
            system. This is the scaffold — fonts, the two surfaces, and every
            design token, wired and switchable.
          </p>
          <Link
            href="/_tokens"
            className="ui-label mt-10 inline-flex items-center gap-2 text-flare-link underline-offset-4 hover:underline"
          >
            View the token survey sheet
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>

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
