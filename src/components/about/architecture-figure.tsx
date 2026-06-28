import { STRATA } from "@/lib/nav-data";

/**
 * The page's one static, captioned figure (about §3) — the founder's-core /
 * horz-strata separation diagram (§8.6), frozen at its separated end-state. The
 * seven horizontal layers (the breadth horz owns) read as a stack; the single
 * vertical core (the depth the founder keeps) is lifted out to the right in the
 * one flare line on the page's middle viewport.
 *
 * Server component — no motion, no toggle. The interactive variant lives on the
 * homepage (home/horz-architecture.tsx); here it is a quiet illustration.
 */
const ROW_H = 40; // px per layer row

function Cross({ className }: { className: string }) {
  return (
    <svg
      className={`absolute ${className} text-ink-faint`}
      width={9}
      height={9}
      viewBox="0 0 9 9"
      fill="none"
      aria-hidden="true"
    >
      <line x1="4.5" y1="0" x2="4.5" y2="9" stroke="currentColor" strokeWidth={1} />
      <line x1="0" y1="4.5" x2="9" y2="4.5" stroke="currentColor" strokeWidth={1} />
    </svg>
  );
}

export function ArchitectureFigure() {
  const stackHeight = STRATA.length * ROW_H;
  return (
    <figure
      className="relative mt-12 border border-line px-6 py-10 md:px-12"
      role="img"
      aria-label="The seven horizontal layers horz runs, stacked, with the founder's single vertical core lifted out to the side as the one part they keep."
    >
      <Cross className="left-1.5 top-1.5" />
      <Cross className="right-1.5 top-1.5" />
      <Cross className="bottom-1.5 left-1.5" />
      <Cross className="bottom-1.5 right-1.5" />

      <div className="relative" style={{ minHeight: stackHeight + 24 }}>
        {/* the breadth, labeled (the horizontal horz owns) */}
        <p className="index mb-4 text-ink-faint">
          THE HORIZONTAL — 07 LAYERS, 0 DEPARTMENTS
        </p>

        {/* the strata block — the seven functions read as a section */}
        <div className="relative w-full md:w-[62%]">
          {STRATA.map((s) => (
            <div
              key={s.index}
              className="flex items-center gap-3 border-t border-line"
              style={{ height: ROW_H }}
            >
              <span className="index w-6 text-ink-faint">{s.index}</span>
              <span className="caption font-mono uppercase tracking-[0.06em] text-ink-muted">
                {s.name}
              </span>
              <span className="ml-3 hidden h-px flex-1 bg-line sm:block" />
            </div>
          ))}
        </div>

        {/* the founder's core, lifted out to the right (the depth they keep) —
            the figure's one flare line. Stacks beneath the strata below md. */}
        <div
          className="static mx-auto mt-10 flex flex-col items-center md:absolute md:right-[6%] md:top-2 md:mt-0"
          style={{ height: stackHeight }}
        >
          <span className="serif mb-3 text-[1.25rem] leading-none text-ink">
            You build this.
          </span>
          <span className="w-[1.5px] flex-1 bg-flare" aria-hidden="true" />
          <span className="index mt-3 text-ink-faint">YOUR CORE</span>
        </div>
      </div>

      <figcaption className="caption mt-8 font-mono uppercase tracking-[0.06em] text-ink-faint">
        Breadth you depend on · depth you own
      </figcaption>
    </figure>
  );
}
