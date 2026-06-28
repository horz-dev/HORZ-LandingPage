import type { SVGProps } from "react";

/**
 * The wordmark glyph — the Section in miniature: four horizontal strata
 * (breadth, in ink) pierced once by the vertical core (the founder, in flare).
 * The single most-repeated instance of the signature.
 */
export function Glyph({
  size = 22,
  ...props
}: { size?: number } & SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth={1.6}
      strokeLinecap="square"
      aria-hidden="true"
      {...props}
    >
      <line x1="2.5" y1="5" x2="21" y2="5" stroke="var(--text-primary)" />
      <line x1="2.5" y1="10" x2="15" y2="10" stroke="var(--text-primary)" />
      <line x1="2.5" y1="15" x2="18" y2="15" stroke="var(--text-primary)" />
      <line x1="2.5" y1="20" x2="12" y2="20" stroke="var(--text-primary)" />
      <line
        x1="10"
        y1="2.5"
        x2="10"
        y2="22.5"
        stroke="var(--flare)"
        strokeWidth={1.8}
      />
    </svg>
  );
}

/** horz wordmark — grotesque "horz" + mono ".dev" namespace tag. */
export function Wordmark() {
  return (
    <span className="flex items-baseline gap-[10px]">
      <Glyph className="translate-y-[3px]" />
      <span
        className="font-grotesk font-medium text-ink"
        style={{ fontSize: 19, letterSpacing: "-0.02em" }}
      >
        horz
        <span
          className="font-mono text-ink-faint"
          style={{ fontSize: 13, letterSpacing: 0, fontWeight: 400 }}
        >
          .dev
        </span>
      </span>
    </span>
  );
}
