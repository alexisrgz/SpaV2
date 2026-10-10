import type { CSSProperties } from "react";

/**
 * Ramas botánicas dibujadas con geometría determinista (sin assets).
 * Se usan en los placeholders de foto y como ornamento del sitio.
 */

export type SprigMotif = "eucalipto" | "helecho" | "olivo";

type Point = { x: number; y: number };

const STEM: [Point, Point, Point, Point] = [
  { x: 96, y: 300 },
  { x: 70, y: 210 },
  { x: 130, y: 110 },
  { x: 104, y: 8 },
];

const r1 = (n: number) => Math.round(n * 10) / 10;

function bezier(t: number): Point {
  const [p0, p1, p2, p3] = STEM;
  const u = 1 - t;
  return {
    x: u * u * u * p0.x + 3 * u * u * t * p1.x + 3 * u * t * t * p2.x + t * t * t * p3.x,
    y: u * u * u * p0.y + 3 * u * u * t * p1.y + 3 * u * t * t * p2.y + t * t * t * p3.y,
  };
}

/** Ángulo (grados) de la tangente del tallo en t. */
function tangent(t: number): number {
  const [p0, p1, p2, p3] = STEM;
  const u = 1 - t;
  const dx = 3 * u * u * (p1.x - p0.x) + 6 * u * t * (p2.x - p1.x) + 3 * t * t * (p3.x - p2.x);
  const dy = 3 * u * u * (p1.y - p0.y) + 6 * u * t * (p2.y - p1.y) + 3 * t * t * (p3.y - p2.y);
  return (Math.atan2(dy, dx) * 180) / Math.PI;
}

type Leaf = { cx: number; cy: number; rx: number; ry: number; rotate: number };

function buildLeaves(motif: SprigMotif): Leaf[] {
  const leaves: Leaf[] = [];
  const count = motif === "helecho" ? 16 : motif === "eucalipto" ? 11 : 12;
  for (let i = 0; i < count; i++) {
    const t = 0.08 + (i / count) * 0.88;
    const p = bezier(t);
    const angle = tangent(t);
    const taper = 1 - t * 0.55;
    const sides = motif === "helecho" ? [-1, 1] : [i % 2 === 0 ? -1 : 1];
    for (const side of sides) {
      if (motif === "eucalipto") {
        const r = 15 * taper;
        const rad = ((angle + side * 90) * Math.PI) / 180;
        leaves.push({
          cx: r1(p.x + Math.cos(rad) * (r + 3)),
          cy: r1(p.y + Math.sin(rad) * (r + 3)),
          rx: r1(r),
          ry: r1(r * 0.86),
          rotate: r1(angle),
        });
      } else {
        const len = (motif === "helecho" ? 30 : 24) * taper;
        const spread = motif === "helecho" ? 62 : 38;
        const dir = angle + side * spread;
        const rad = (dir * Math.PI) / 180;
        leaves.push({
          cx: r1(p.x + Math.cos(rad) * len * 0.55),
          cy: r1(p.y + Math.sin(rad) * len * 0.55),
          rx: r1(len * 0.55),
          ry: r1(motif === "helecho" ? 3.2 * taper + 1 : 5.5 * taper + 1.5),
          rotate: r1(dir),
        });
      }
    }
  }
  return leaves;
}

const STEM_PATH = `M${STEM[0].x} ${STEM[0].y} C${STEM[1].x} ${STEM[1].y} ${STEM[2].x} ${STEM[2].y} ${STEM[3].x} ${STEM[3].y}`;
const LEAVES: Record<SprigMotif, Leaf[]> = {
  eucalipto: buildLeaves("eucalipto"),
  helecho: buildLeaves("helecho"),
  olivo: buildLeaves("olivo"),
};

export function Sprig({
  motif = "eucalipto",
  className,
  style,
  strokeWidth = 1.1,
}: {
  motif?: SprigMotif;
  className?: string;
  style?: CSSProperties;
  strokeWidth?: number;
}) {
  return (
    <svg
      viewBox="0 0 200 310"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      className={className}
      style={style}
      aria-hidden="true"
      focusable="false"
    >
      <path d={STEM_PATH} />
      {LEAVES[motif].map((leaf, i) => (
        <ellipse
          key={i}
          cx={leaf.cx}
          cy={leaf.cy}
          rx={leaf.rx}
          ry={leaf.ry}
          transform={`rotate(${leaf.rotate} ${leaf.cx} ${leaf.cy})`}
        />
      ))}
    </svg>
  );
}
