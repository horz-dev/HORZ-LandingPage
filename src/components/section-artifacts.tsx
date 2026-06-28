/**
 * Section-language artifacts (§2.4 / §8.5 · cols 8–12 of each stratum).
 *
 * Each function draws its own work *in section* — never a screenshot, never a
 * stock icon. These are hairline glyphs in the survey vocabulary: one ink weight,
 * `currentColor` (so they inherit the row's tertiary→secondary brightening on
 * hover), no fill except hair-thin nodes, and — critically — **no flare**: the
 * vermilion is spent only on the one shared core (§4 flare ledger).
 *
 * They are deliberately restrained drawings, not the Phase-7 illustration pass;
 * that later session enriches/animates them. Here they complete the rack so the
 * Section reads as a company drawn in section, recognizable from a fragment.
 *
 * Geometry sits on a 132×44 box; `vector-effect: non-scaling-stroke` keeps every
 * hairline pin-sharp as the box scales between the editorial and control racks.
 */

import type { ReactNode } from "react";

const VB = { viewBox: "0 0 132 44", fill: "none", "aria-hidden": true } as const;
const stroke = {
  stroke: "currentColor",
  strokeWidth: 1,
  vectorEffect: "non-scaling-stroke" as const,
  strokeLinecap: "square" as const,
};

/** 01 — a ticket queue drawn as stacked mini-strata collapsing to zero. */
function QueueCollapse() {
  // bars shorten top→bottom: the backlog draining to nothing.
  const widths = [104, 80, 56, 34, 16];
  return (
    <svg {...VB}>
      {widths.map((w, i) => (
        <line key={i} x1={132 - w} y1={6 + i * 8} x2={132} y2={6 + i * 8} {...stroke} />
      ))}
    </svg>
  );
}

/** 02 — a contract as a layered redline diagram seated on a mini-datum. */
function Redline() {
  return (
    <svg {...VB}>
      {/* the mini-datum the document hangs from */}
      <line x1={0} y1={4} x2={132} y2={4} {...stroke} strokeWidth={1} opacity={0.5} />
      {/* body lines */}
      {[12, 18, 30, 36].map((y, i) => (
        <line key={i} x1={8} y1={y} x2={i % 2 ? 96 : 118} y2={y} {...stroke} />
      ))}
      {/* the redline: a struck clause + its replacement tick */}
      <line x1={8} y1={24} x2={84} y2={24} {...stroke} />
      <line x1={8} y1={24} x2={84} y2={24} {...stroke} strokeWidth={1} transform="translate(0 -3)" opacity={0.45} />
      <line x1={88} y1={24} x2={104} y2={24} {...stroke} />
    </svg>
  );
}

/** 03 — an org as nested strata: indented hairlines, a hierarchy in section. */
function NestedOrg() {
  const rows = [
    { x: 0, w: 122 },
    { x: 14, w: 92 },
    { x: 14, w: 78 },
    { x: 28, w: 64 },
    { x: 28, w: 50 },
  ];
  return (
    <svg {...VB}>
      {rows.map((r, i) => (
        <line key={i} x1={r.x} y1={6 + i * 8} x2={r.x + r.w} y2={6 + i * 8} {...stroke} />
      ))}
      {/* the connecting spine */}
      <line x1={14} y1={14} x2={14} y2={22} {...stroke} opacity={0.5} />
      <line x1={28} y1={30} x2={28} y2={38} {...stroke} opacity={0.5} />
    </svg>
  );
}

/** 04 — a launch as a timeline of horizontal ticks, one taller mark = ship. */
function LaunchTimeline() {
  const ticks = [6, 26, 46, 66, 86, 106, 126];
  return (
    <svg {...VB}>
      <line x1={0} y1={30} x2={132} y2={30} {...stroke} />
      {ticks.map((x, i) => (
        <line key={i} x1={x} y1={i === 4 ? 12 : 24} x2={x} y2={30} {...stroke} />
      ))}
      {/* the launch marker head */}
      <line x1={82} y1={12} x2={90} y2={12} {...stroke} />
    </svg>
  );
}

/** 05 — a sparkline rack: one metric line over a faint baseline. */
function Sparkline() {
  const pts = "0,30 18,22 36,26 54,12 72,18 90,8 108,20 132,6";
  return (
    <svg {...VB}>
      <line x1={0} y1={38} x2={132} y2={38} {...stroke} opacity={0.4} />
      <polyline points={pts} {...stroke} strokeLinejoin="round" />
      <circle cx={132} cy={6} r={1.6} fill="currentColor" />
    </svg>
  );
}

/** 06 — the Company Brain: a knowledge graph drawn into the stratum. */
function KnowledgeGraph() {
  const nodes = [
    { x: 12, y: 22 },
    { x: 44, y: 8 },
    { x: 52, y: 34 },
    { x: 84, y: 20 },
    { x: 110, y: 10 },
    { x: 118, y: 36 },
  ];
  const edges: [number, number][] = [
    [0, 1],
    [0, 2],
    [1, 3],
    [2, 3],
    [3, 4],
    [3, 5],
    [4, 5],
  ];
  return (
    <svg {...VB}>
      {edges.map(([a, b], i) => (
        <line
          key={i}
          x1={nodes[a].x}
          y1={nodes[a].y}
          x2={nodes[b].x}
          y2={nodes[b].y}
          {...stroke}
          opacity={0.55}
        />
      ))}
      {nodes.map((n, i) => (
        <circle key={i} cx={n.x} cy={n.y} r={2} fill="currentColor" />
      ))}
    </svg>
  );
}

/** 07 — a filing as labeled line-items, each with a mono index tick. */
function FilingItems() {
  const rows = [8, 18, 28, 38];
  return (
    <svg {...VB}>
      {rows.map((y, i) => (
        <g key={i}>
          {/* the index tick */}
          <line x1={0} y1={y} x2={8} y2={y} {...stroke} />
          {/* the line-item */}
          <line x1={16} y1={y} x2={i === rows.length - 1 ? 132 : 100} y2={y} {...stroke} />
          {/* the right-aligned figure */}
          <line x1={112} y1={y} x2={128} y2={y} {...stroke} opacity={0.6} />
        </g>
      ))}
    </svg>
  );
}

/** Registry keyed by the stratum index — the homepage rack maps over this. */
export const SECTION_ARTIFACTS: Record<string, () => ReactNode> = {
  "01": QueueCollapse,
  "02": Redline,
  "03": NestedOrg,
  "04": LaunchTimeline,
  "05": Sparkline,
  "06": KnowledgeGraph,
  "07": FilingItems,
};
