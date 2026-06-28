/**
 * Motion tokens — the JS mirror of DESIGN_SYSTEM.md §8.1–8.3, for Framer Motion.
 * The CSS equivalents (--ease-*, --dur-*) live in globals.css; keep them in sync.
 *
 * The sensibility: decisive entry attenuating to a precise, dead-stop settle —
 * a broad-nib pen that commits to the stroke and arrives exactly on the line
 * with zero rebound. No overshoot, ever.
 */

/** The Scribe family — the only easings allowed (§8.1). Framer cubic-bezier arrays. */
export const ease = {
  /** PRIMARY. Draw-ins, reveals, the seam wipe, the core descent. */
  line: [0.16, 1, 0.3, 1],
  /** Gentle cubic-out. Opacity fades, small UI reveals, tint changes. */
  soft: [0.33, 1, 0.68, 1],
  /** Symmetric in-out. Travel between two committed states; the dusk drift. */
  move: [0.65, 0, 0.35, 1],
  /** In-curve. Elements leaving the viewport / dismissals only. */
  exit: [0.55, 0, 1, 0.45],
  /** The one "fast" curve. Hover & press feedback under 200ms only. */
  micro: [0.4, 0, 0.2, 1],
} as const;

/** Duration ladder in seconds (§8.2) — Framer uses seconds, CSS uses ms. */
export const duration = {
  instant: 0.08,
  fast: 0.12,
  base: 0.22, // the seam wipe (locked)
  mod: 0.32,
  slow: 0.48,
  reveal: 0.64,
  draw: 0.72,
  ambient: 20,
} as const;

/**
 * Springs — reserved, critically damped (§8.3). Tween + Scribe bezier is the
 * default everywhere; springs only where motion is physical / direct-manipulated
 * (magnetic CTA, draggable controls). Every preset lands flat — no visible
 * overshoot. If one bounces in QA, raise damping; never design with the bounce.
 */
export const spring = {
  /** Press / toggle physical feedback — fast, dead-flat landing. */
  snap: { type: "spring", stiffness: 420, damping: 40, mass: 1 },
  /** Drawer / popover with a touch of weight (still no bounce). */
  settle: { type: "spring", stiffness: 260, damping: 32, mass: 1 },
  /** Magnetic cursor follow only — soft, trailing, never arrives hard. */
  follow: { type: "spring", stiffness: 180, damping: 26, mass: 1 },
} as const;

/** The locked scroll-reveal: opacity + a 16px rise on the primary ease. */
export const reveal = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: duration.reveal, ease: ease.line },
} as const;
