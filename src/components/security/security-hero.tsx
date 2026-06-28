"use client";

import { useEffect, useLayoutEffect, useState } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Container, Datum, Eyebrow } from "@/components/ui";
import { Blueprint } from "@/components/function-page/blueprint";
import { ease } from "@/lib/motion";
import { SecurityArt, nodeYFrac } from "./security-art";

type Bezier = [number, number, number, number];
const LINE = ease.line as unknown as Bezier;

/** Pre-paint arm without the SSR warning (and dodges set-state-in-effect). */
const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * SecurityHero (content/03) — the page's signature drawing. Left: the coordinate
 * eyebrow at station −0.0500, the serif headline, the long subhead, the mono
 * footnote. Right: the faint seven-strata section on a blueprint plate, pierced by
 * the one vertical flare core re-read as the human signature line, descending last
 * and lighting a single sign-off node to flare — the place a model's draft becomes
 * a person's word.
 *
 * No CTA here — the page's one flare CTA fill lives at the floor. Set-piece plays
 * once on mount; SSR / no-JS / reduced-motion render it already drawn.
 */
export function SecurityHero() {
  const reduced = useReducedMotion() ?? false;
  const [mounted, setMounted] = useState(false);
  useIsoLayoutEffect(() => {
    setMounted(true);
  }, []);
  const animateIt = mounted && !reduced;

  const drawingV: Variants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.72, ease: LINE, delay: 0.15 } },
  };
  const coreV: Variants = {
    hidden: { scaleY: 0 },
    visible: { scaleY: 1, transition: { duration: 0.8, ease: LINE, delay: 0.6 } },
  };
  const nodeV: Variants = {
    hidden: { opacity: 0, scale: 0.4 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.32, ease: LINE, delay: 1.3 } },
  };
  const seat = (v: Variants) =>
    animateIt ? { initial: "hidden" as const, animate: "visible" as const, variants: v } : {};

  return (
    <header className="relative overflow-hidden">
      <Datum />
      <Container
        width="wide"
        className="grid items-center gap-12 pb-16 pt-32 md:min-h-[82vh] md:grid-cols-12 md:gap-8 md:pb-24 md:pt-40"
      >
        {/* —— LEFT: the verbal stack —— */}
        <div className="md:col-span-5">
          <Eyebrow as="p" className="mb-6">
            STATION −0.0500 · SECURITY &amp; TRUST
          </Eyebrow>

          <h1
            className="serif text-ink"
            style={{
              fontSize: "clamp(2.25rem, 4.4vw, 3.5rem)",
              lineHeight: 1.06,
              letterSpacing: "-0.02em",
            }}
          >
            Every artifact, signed by a human and traced to its source.
          </h1>

          <p className="body mt-7 max-w-[60ch] text-ink-muted">
            A filed Form 1120 carries the licensed CPA who signed it. A signed MSA
            carries the attorney who attested to it. A payroll run carries your
            approval, and a GDPR Article 28 DPA carries the playbook version it was
            checked against. Each one also carries its record: the source document,
            the rule it was measured against, every change with the reason for it,
            who or what approved it, and the timestamp. The draft can be a
            model&apos;s; the signature never is.
          </p>

          <p className="index mt-8 text-ink-faint">
            07 LAYERS · 1 HUMAN PER SIGNED ARTIFACT · 0 SILENT WRITES
          </p>
        </div>

        {/* —— RIGHT: the signature line as the core —— */}
        <div className="relative flex min-h-[320px] items-center justify-center md:col-span-7 md:min-h-[440px]">
          <Blueprint className="opacity-70" />
          <div className="relative w-full">
            <motion.div {...seat(drawingV)}>
              <SecurityArt />
            </motion.div>
            {/* the signature core — descends last on the 5/12 spine */}
            <motion.span
              className="pointer-events-none absolute left-[41.667%] w-[1.5px] origin-top bg-flare"
              style={{ top: "11%", bottom: "8%" }}
              aria-hidden="true"
              {...seat(coreV)}
            />
            {/* the single lit sign-off node — where a draft becomes a signature */}
            <motion.span
              className="pointer-events-none absolute left-[41.667%] size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-flare"
              style={{ top: `${nodeYFrac * 100}%` }}
              aria-hidden="true"
              {...seat(nodeV)}
            />
          </div>
        </div>
      </Container>
    </header>
  );
}
