import { STRATA } from "@/lib/nav-data";

/**
 * The Security & Trust signature drawing (content/03 drawing brief) — the
 * "signature line as the core." The seven background strata (six functions on
 * one company brain) are drawn faint and edge-to-edge; the single vertical core
 * at the 5/12 line is re-read as the human signature line, landing on one
 * sign-off node per stratum. Down the right margin runs a hairline provenance
 * thread (source tick, playbook-version stamp, a struck change with its reason,
 * an approver initial, a tabular timestamp) so "audit trail" reads as a drawn
 * object, not a claim.
 *
 * Everything here is neutral hairline. The one vermilion flare — the lit sign-off
 * node and the descending signature core — is overlaid by <SecurityHero> so it can
 * animate and so the one-flare-per-viewport law is held in one place. `FLARE_NODE`
 * is the stratum the lit node lands on; `nodeYFrac` is its fraction of the height.
 */
const VB = { viewBox: "0 0 480 400", fill: "none" } as const;
const hair = {
  stroke: "currentColor",
  strokeWidth: 1,
  vectorEffect: "non-scaling-stroke" as const,
  fill: "none",
} as const;

/** the lit sign-off node lands on Legal (02) — the cleanest "signed" image */
export const FLARE_NODE = { index: 1, y: 112 } as const;
export const nodeYFrac = FLARE_NODE.y / 400;
export const SPINE_X = 200; // viewBox 200 / 480 = 41.667% (the 5/12 line)

function L({
  x,
  y,
  children,
  anchor = "start",
  size = 9.5,
  opacity = 0.5,
}: {
  x: number;
  y: number;
  children: string;
  anchor?: "start" | "middle" | "end";
  size?: number;
  opacity?: number;
}) {
  return (
    <text
      x={x}
      y={y}
      fontSize={size}
      fill="currentColor"
      textAnchor={anchor}
      className="font-mono"
      style={{ letterSpacing: "0.06em" }}
      opacity={opacity}
    >
      {children}
    </text>
  );
}

export function SecurityArt() {
  const ys = STRATA.map((_, i) => 64 + i * 48); // 64 … 352, seven strata

  return (
    <svg {...VB} className="block h-auto w-full text-ink-muted">
      {/* the seven faint background strata, each labeled by layer */}
      {STRATA.map((s, i) => {
        const y = ys[i];
        return (
          <g key={s.index} opacity={0.85}>
            <L x={24} y={y + 3} opacity={0.55}>
              {`${s.index} ${s.name.toUpperCase()}`}
            </L>
            <line x1={130} y1={y} x2={356} y2={y} {...hair} opacity={0.4} />
            {/* the sign-off node where the signature core crosses (neutral; the
                lit one is drawn in flare by the hero overlay) */}
            <circle cx={SPINE_X} cy={y} r={4} {...hair} opacity={0.8} />
          </g>
        );
      })}

      {/* a faint mono header for the column */}
      <L x={24} y={40} opacity={0.6}>
        SIGN-OFF · 07 STRATA
      </L>
      <L x={356} y={40} anchor="end" opacity={0.55}>
        PROVENANCE
      </L>

      {/* —— the provenance thread, down the right margin —— */}
      <line x1={388} y1={56} x2={388} y2={360} {...hair} opacity={0.4} />
      {/* source tick (top) */}
      <line x1={382} y1={72} x2={394} y2={72} {...hair} opacity={0.7} />
      <L x={400} y={75} opacity={0.55}>SOURCE</L>
      {/* playbook-version stamp */}
      <L x={400} y={128} opacity={0.55}>PLAYBOOK</L>
      <L x={400} y={140} opacity={0.7}>v3.2</L>
      {/* one struck change, tagged with its reason */}
      <line x1={398} y1={200} x2={438} y2={200} {...hair} opacity={0.6} />
      <line x1={398} y1={197} x2={438} y2={203} {...hair} opacity={0.5} />
      <L x={400} y={216} opacity={0.55}>§7.2</L>
      {/* approver initial */}
      <L x={400} y={284} opacity={0.6}>APPR DJ</L>
      {/* tabular timestamp at the foot */}
      <line x1={388} y1={344} x2={388} y2={356} {...hair} opacity={0.5} />
      <text
        x={400}
        y={352}
        fontSize={9.5}
        fill="currentColor"
        textAnchor="start"
        className="font-mono"
        style={{ letterSpacing: "0.04em", fontVariantNumeric: "tabular-nums" }}
        opacity={0.6}
      >
        14:02:07Z
      </text>
    </svg>
  );
}
