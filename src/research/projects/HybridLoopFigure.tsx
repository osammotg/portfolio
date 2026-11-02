import React from "react";

// Fig. 1 of the kitting card: the hybrid supervisory loop from the ETH × Bühler
// semester report (report-v13, figs/archify/hybrid-loop). Redrawn as a
// paper-style swim-lane diagram for the dark research page. Every number here
// is copied from that report figure / paper text (site-loop facts c30–c39).

type Lane = "learned" | "checks" | "scripted";
type Node = { id: string; n: number; lane: Lane; col: number; kicker: string; label: string; sub: string[] };

const NODES: Node[] = [
  { id: "bin", n: 1, lane: "scripted", col: 0, kicker: "SOURCE", label: "Source bin", sub: ["packets in a heap"] },
  { id: "vla", n: 2, lane: "learned", col: 1, kicker: "LEARNED · VLA", label: "MolmoAct2", sub: ["make space, isolate,", "reposition, grasp, lift"] },
  { id: "handover", n: 3, lane: "scripted", col: 2, kicker: "BOUNDARY", label: "Rim hand-over", sub: ["packet crosses", "the bin rim"] },
  { id: "jawnet", n: 4, lane: "checks", col: 3, kicker: "CHECK", label: "JawNet", sub: ["is a packet", "in the jaws?"] },
  { id: "ocr", n: 5, lane: "checks", col: 4, kicker: "CHECK", label: "Label read", sub: ["wrist OCR: part", "number or abstain"] },
  { id: "place", n: 6, lane: "scripted", col: 5, kicker: "SCRIPTED", label: "Place", sub: ["part no. → bay,", "scripted IK"] },
];
const FORWARD: [string, string, string][] = [
  ["bin", "vla", "hand off"],
  ["vla", "handover", "jaws shut"],
  ["handover", "jawnet", "verify"],
  ["jawnet", "ocr", ""],
  ["ocr", "place", ""],
];
const RETURNS: [string, string][] = [
  ["vla", "budget 100 s spent → abort"],
  ["jawnet", "empty jaws → retry"],
  ["ocr", "unreadable → put back"],
];

const LANE_Y: Record<Lane, number> = { learned: 70, checks: 184, scripted: 298 };
const LANE_LABEL: Record<Lane, string> = { learned: "LEARNED", checks: "CHECKS", scripted: "SCRIPTED" };
const W = 134, H = 80, X0 = 72, DX = 152, BUS = 400;
const nx = (c: number) => X0 + c * DX;
const LAST = Math.max(...NODES.map((n) => n.col));
const VB_W = nx(LAST) + W + 40; // viewBox width follows the node count
const byId = Object.fromEntries(NODES.map((n) => [n.id, n]));
const C = { learned: "#ff7043", checks: "#5ec8d8", scripted: "rgba(255,255,255,0.55)", ink: "rgba(255,255,255,0.88)", mute: "rgba(255,255,255,0.45)", amber: "#f5b942" };

function edgePath(a: Node, b: Node) {
  const x1 = nx(a.col) + W, y1 = LANE_Y[a.lane], x2 = nx(b.col), y2 = LANE_Y[b.lane];
  if (y1 === y2) return { d: `M${x1},${y1} H${x2 - 2}`, lx: (x1 + x2) / 2, ly: y1 - 8 };
  const mx = (x1 + x2) / 2;
  // label sits beside the vertical segment, clear of both nodes
  return { d: `M${x1},${y1} H${mx} V${y2} H${x2 - 2}`, lx: mx + 7, ly: (y1 + y2) / 2 + 4 };
}

function Diagram() {
  return (
    <svg viewBox={`0 0 ${VB_W} 440`} className="w-full min-w-[760px] h-auto" role="img"
      aria-label="Hybrid supervisory loop: one learned MolmoAct2 stage, rim hand-over, JawNet grasp check, label read, scripted place; every failure returns to the bin.">
      <defs>
        <marker id="hl-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" fill={C.ink} />
        </marker>
        <marker id="hl-arrow-mute" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" fill={C.mute} />
        </marker>
      </defs>

      {/* swim lanes */}
      {(Object.keys(LANE_Y) as Lane[]).map((l) => (
        <g key={l}>
          <rect x={56} y={LANE_Y[l] - 54} width={VB_W - 62} height={108} fill={l === "learned" ? "rgba(255,112,67,0.05)" : "rgba(255,255,255,0.015)"}
            stroke="rgba(255,255,255,0.06)" />
          <text x={36} y={LANE_Y[l]} transform={`rotate(-90 36 ${LANE_Y[l]})`} textAnchor="middle"
            fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace" fontSize={11} letterSpacing={2} fill={C.mute}>
            {LANE_LABEL[l]}
          </text>
        </g>
      ))}

      {/* forward edges */}
      {FORWARD.map(([a, b, label]) => {
        const p = edgePath(byId[a], byId[b]);
        return (
          <g key={a + b}>
            <path d={p.d} fill="none" stroke={C.ink} strokeWidth={1.3} markerEnd="url(#hl-arrow)" />
            {label && <text x={p.lx} y={p.ly} fontFamily="ui-monospace, Menlo, monospace" fontSize={11.5} fill={C.mute}>{label}</text>}
          </g>
        );
      })}

      {/* recovery returns → bus → bin */}
      {RETURNS.map(([id, label], i) => {
        const n = byId[id], x = nx(n.col) + W / 2, y = LANE_Y[n.lane] + H / 2;
        return (
          <g key={id}>
            <path d={`M${x},${y} V${BUS}`} fill="none" stroke={C.mute} strokeWidth={1.1} strokeDasharray="4 4" />
            <text x={x + 6} y={BUS - 14 - (i % 2) * 0} fontFamily="ui-monospace, Menlo, monospace" fontSize={11.5} fill={C.mute}>{label}</text>
          </g>
        );
      })}
      <path d={`M${nx(byId.ocr.col) + W / 2},${BUS} H${nx(0) + W / 2} V${LANE_Y.scripted + H / 2 + 2}`} fill="none" stroke={C.mute}
        strokeWidth={1.1} strokeDasharray="4 4" markerEnd="url(#hl-arrow-mute)" />
      <text x={nx(0) + W / 2 + 8} y={BUS + 18} fontFamily="ui-monospace, Menlo, monospace" fontSize={11.5} fill={C.mute}>
        every failure returns to the bin · the run ends only when the bin is empty
      </text>

      {/* not built: verification at the bay */}
      <path d={`M${nx(byId.place.col) + W / 2},${LANE_Y.scripted + H / 2} V${BUS - 8}`} fill="none" stroke={C.amber} strokeWidth={1.2} strokeDasharray="2 4" />
      <text x={nx(byId.place.col) + W / 2} y={BUS + 4} textAnchor="middle" fontFamily="ui-monospace, Menlo, monospace" fontSize={11.5} fill={C.amber}>no bay check</text>
      <text x={nx(byId.place.col) + W / 2} y={BUS + 17} textAnchor="middle" fontFamily="ui-monospace, Menlo, monospace" fontSize={11.5} fill={C.amber}>(not built)</text>

      {/* nodes */}
      {NODES.map((n) => {
        const x = nx(n.col), y = LANE_Y[n.lane] - H / 2, col = C[n.lane];
        const learned = n.lane === "learned";
        return (
          <g key={n.id}>
            <rect x={x} y={y} width={W} height={H} rx={6} fill={learned ? "rgba(255,112,67,0.12)" : "#151515"} stroke={col} strokeWidth={learned ? 1.6 : 1} />
            <circle cx={x + W - 12} cy={y + 12} r={7.5} fill="none" stroke={col} strokeWidth={1} />
            <text x={x + W - 12} y={y + 15.5} textAnchor="middle" fontFamily="ui-monospace, Menlo, monospace" fontSize={9.5} fill={col}>{n.n}</text>
            <text x={x + 9} y={y + 16} fontFamily="ui-monospace, Menlo, monospace" fontSize={9.5} letterSpacing={1.2} fill={col}>{n.kicker}</text>
            <text x={x + 9} y={y + 36} fontFamily="Georgia, 'Times New Roman', serif" fontSize={16} fontWeight={600} fill={C.ink}>{n.label}</text>
            {n.sub.map((s, i) => (
              <text key={i} x={x + 9} y={y + 54 + i * 13} fontFamily="ui-sans-serif, system-ui, sans-serif" fontSize={11.5} fill={C.mute}>{s}</text>
            ))}
          </g>
        );
      })}
    </svg>
  );
}

export default function HybridLoopFigure() {
  return (
    <figure className="mt-10 rounded-2xl border border-white/[0.08] bg-[#0f0f0f] p-5 sm:p-7">
      <div className="flex flex-wrap items-baseline justify-between gap-2 mb-4">
        <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-muted/70">Fig. 1 · System architecture</p>
        <div className="flex flex-wrap gap-x-4 gap-y-1 font-mono text-[10px] text-muted/70">
          <span><span className="inline-block w-3 h-2 mr-1.5 align-middle rounded-sm border border-[#ff7043] bg-[#ff7043]/20" />learned</span>
          <span><span className="inline-block w-3 h-2 mr-1.5 align-middle rounded-sm border border-[#5ec8d8]" />verification</span>
          <span><span className="inline-block w-3 h-2 mr-1.5 align-middle rounded-sm border border-white/50" />scripted</span>
          <span><span className="inline-block w-4 mr-1.5 align-middle border-t border-dashed border-white/50" />recovery</span>
          <span className="text-[#f5b942]"><span className="inline-block w-4 mr-1.5 align-middle border-t border-dotted border-[#f5b942]" />not built</span>
        </div>
      </div>
      <h4 className="font-playfair text-xl sm:text-2xl font-bold leading-snug mb-5">
        Imperfect manipulation, finished task: one learned stage inside a deterministic supervisory loop
      </h4>
      <div className="overflow-x-auto -mx-1 px-1">
        <Diagram />
      </div>
      <figcaption className="mt-5 text-[13.5px] leading-relaxed text-fg/70" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>
        <span className="font-semibold text-fg/90">Fig. 1 | The hybrid loop.</span> The learned policy owns one stage: making
        space in a heap of thin, poly-bagged packets, isolating one, repositioning it and grasping it. It hands control back the
        moment the held packet crosses the bin rim; everything after that line is ordinary code that can be tested without the
        robot. A failed grasp or an unreadable label costs an attempt, not a packet, because the bin is the retry buffer. A packet
        placed in the wrong bay has already left that buffer, and identity and placement verification at the bay is proposed, not built.
      </figcaption>
    </figure>
  );
}
