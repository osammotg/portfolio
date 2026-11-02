import { motion } from "framer-motion";
import React from "react";
import posthog from "posthog-js";
import projects from "./projects.json";
import HybridLoopFigure from "./HybridLoopFigure";

// "Selected projects" — one card per robotics project, rendered on the general
// research page (/research, /research/stanford). Content lives in projects.json;
// every number there is grounded in Tommaso's own reports/repos by the
// site-loop verifier (~/Documents/ETH/Stanford/site-loop).

// `w`/`h`: native pixel size, so each frame takes the media's own shape before
// it loads (never cropped, no letterbox bars).
type Media = { src: string; kind: "image" | "video"; caption: string; credit?: string; w: number; h: number };
// A narrated explainer (with sound, user-started) shown under a project card.
// Kept out of `media` because those tiles are short muted loops.
type Explainer = { src: string; poster: string; caption: string };
type Project = {
  id: string;
  title: string;
  when: string;
  role: string;
  paragraph: string;
  stats: { value: string; label: string }[];
  media: Media[];
  links?: { label: string; url: string }[];
  explainer?: Explainer;
  logo?: { src: string; alt: string; credit?: string };
  figure?: "hybrid-loop";
  featured?: boolean;
  /** Hidden from the card grid; content shown elsewhere on the page. */
  hidden?: boolean;
  // media grouped into rows by count, e.g. [1, 2] = one full-width tile, then a
  // pair; tiles in a row share one height. Default: one tile per row.
  rows?: number[];
  rowHeight?: number; // max row height in px (default ROW_H)
};

const ROW_H = 440;
const GAP = 16;

const ease = [0.16, 1, 0.3, 1] as const;
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.7, delay, ease },
});

// One frame per media item, shaped by its native aspect ratio (object-contain
// inside an exact-ratio box, so nothing is cropped and no bars appear).
function Tile({ m, style, className = "" }: { m: Media; style?: React.CSSProperties; className?: string }) {
  const cls = "absolute inset-0 w-full h-full object-contain";
  return (
    <figure className={`min-w-0 ${className}`} style={style}>
      <div
        className="relative overflow-hidden rounded-xl border border-white/[0.08] bg-[#0b0b0d]"
        style={{ aspectRatio: `${m.w} / ${m.h}` }}
      >
        {m.kind === "video" ? (
          <video src={m.src} autoPlay loop muted playsInline preload="metadata" className={cls} />
        ) : (
          <img src={m.src} alt={m.caption} loading="lazy" className={cls} />
        )}
      </div>
      <figcaption className="mt-2 text-xs text-muted/75 leading-snug">
        {m.caption}
        {m.credit && <span className="block mt-0.5 text-muted/45">{m.credit}</span>}
      </figcaption>
    </figure>
  );
}

// Tiles in a row grow in proportion to their aspect ratio, so they all end up
// the same height; the row is capped so that height never exceeds maxH.
// Rows mixing very different shapes (landscape + portrait) stack on phones,
// where a shared height would shrink the narrow tile to a sliver.
function MediaRow({ items, maxH }: { items: Media[]; maxH: number }) {
  const ratios = items.map((m) => m.w / m.h);
  const sum = ratios.reduce((a, r) => a + r, 0);
  const mixed = Math.max(...ratios) / Math.min(...ratios) > 2;
  return (
    <div
      className={`mx-auto flex w-full ${mixed ? "flex-col sm:flex-row sm:items-start" : "items-start"}`}
      style={{ gap: GAP, maxWidth: maxH * sum + GAP * (items.length - 1) }}
    >
      {items.map((m, i) =>
        mixed ? (
          <Tile
            key={m.src}
            m={m}
            className="w-full mx-auto sm:[flex:var(--g)_1_0%]"
            style={{ ["--g" as string]: ratios[i], maxWidth: maxH * ratios[i] } as React.CSSProperties}
          />
        ) : (
          <Tile key={m.src} m={m} style={{ flexGrow: ratios[i], flexBasis: 0 }} />
        )
      )}
    </div>
  );
}

function MediaRail({ p }: { p: Project }) {
  if (!p.media.length) return null;
  const sizes = p.rows ?? p.media.map(() => 1);
  const groups: Media[][] = [];
  let i = 0;
  for (const n of sizes) {
    groups.push(p.media.slice(i, i + n));
    i += n;
  }
  if (i < p.media.length) p.media.slice(i).forEach((m) => groups.push([m]));
  return (
    <div className="mt-8 flex flex-col gap-6">
      {groups.map((g) => (
        <MediaRow key={g[0].src} items={g} maxH={p.rowHeight ?? ROW_H} />
      ))}
    </div>
  );
}

function ExplainerVideo({ p }: { p: Project }) {
  const e = p.explainer;
  if (!e) return null;
  return (
    <figure className="mt-8 mx-auto max-w-3xl">
      <video
        src={e.src}
        poster={e.poster}
        controls
        playsInline
        preload="none"
        className="block w-full h-auto rounded-xl border border-white/[0.08] bg-[#0b0b0d]"
        onPlay={() => posthog.capture("project_explainer_played", { project: p.id })}
      />
      <figcaption className="mt-2 text-xs text-muted/75 leading-snug">
        {e.caption}
      </figcaption>
    </figure>
  );
}

function Stats({ stats, stacked = false }: { stats: Project["stats"]; stacked?: boolean }) {
  return (
    <div className={`grid grid-cols-2 sm:grid-cols-3 gap-3 ${stacked ? "lg:grid-cols-1 lg:mt-0 mt-6" : "mt-6"}`}>
      {stats.map((s) => (
        <div key={s.label} className="min-w-0 rounded-xl border border-white/[0.07] bg-white/[0.03] px-3 py-3">
          <p className="font-playfair text-2xl font-bold text-fg leading-none">{s.value}</p>
          <p className="text-[10px] uppercase tracking-[0.08em] text-muted/70 mt-2 leading-snug break-words">{s.label}</p>
        </div>
      ))}
    </div>
  );
}

function Links({ p }: { p: Project }) {
  if (!p.links?.length) return null;
  return (
    <div className="flex flex-wrap gap-x-5 gap-y-2 mt-5">
      {p.links.map((l) => (
        <a
          key={l.url}
          href={l.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-mono uppercase tracking-[0.2em] text-[#ff7043] hover:text-white transition-colors"
          onClick={() => posthog.capture("project_link_clicked", { project: p.id, link: l.label })}
        >
          {l.label} →
        </a>
      ))}
    </div>
  );
}

function Header({ p }: { p: Project }) {
  return (
    <>
      {p.logo && (
        <span className="inline-flex rounded-lg bg-white px-3 py-2 mb-4">
          <img src={p.logo.src} alt={p.logo.alt} title={p.logo.credit} className="h-7 w-auto" />
        </span>
      )}
      <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-muted/70 mb-3">
        {p.when} · {p.role}
      </p>
      <h3 className={`font-playfair font-bold leading-tight mb-4 ${p.featured ? "text-3xl sm:text-4xl" : "text-2xl sm:text-3xl"}`}>
        {p.title}
      </h3>
    </>
  );
}

function FeaturedCard({ p }: { p: Project }) {
  const [first, ...rest] = p.media;
  return (
    <motion.article
      {...fadeUp(0)}
      data-project-id={p.id}
      className="rounded-3xl border border-[#ff7043]/40 bg-gradient-to-br from-[#e50914]/[0.08] via-[#ff3d2e]/[0.05] to-[#ff7043]/[0.10] p-6 sm:p-10 shadow-[0_8px_40px_rgba(229,9,20,0.10)]"
    >
      <span className="inline-flex items-center rounded-full border border-[#ff7043]/40 bg-[#ff7043]/[0.12] px-3 py-1 text-[10px] uppercase tracking-[0.3em] text-[#ff7043] font-semibold mb-5">
        Now
      </span>
      <div className="grid gap-8 lg:grid-cols-2 lg:gap-10">
        <div>
          <Header p={p} />
          <p className="text-base text-fg/85 leading-relaxed">{p.paragraph}</p>
          <Stats stats={p.stats} />
          <Links p={p} />
        </div>
        <div className="flex flex-col gap-6">
          {first && <Tile m={first} />}
          {rest.length > 0 && <MediaRow items={rest} maxH={ROW_H} />}
        </div>
      </div>
    </motion.article>
  );
}

// Text on top (paragraph left, stats right), media rail full width below.
function ProjectCard({ p }: { p: Project }) {
  return (
    <motion.article
      {...fadeUp(0.05)}
      data-project-id={p.id}
      className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.04] backdrop-blur-2xl p-6 sm:p-9"
    >
      <div className="grid gap-x-10 lg:grid-cols-[1.6fr_1fr] lg:items-end">
        <div>
          <Header p={p} />
          <p className="text-base text-fg/80 leading-relaxed max-w-[68ch]">{p.paragraph}</p>
          <Links p={p} />
        </div>
        <Stats stats={p.stats} stacked />
      </div>
      <MediaRail p={p} />
      {p.figure === "hybrid-loop" && <HybridLoopFigure />}
      <ExplainerVideo p={p} />
    </motion.article>
  );
}

export default function ProjectsSection() {
  const list = (projects as Project[]).filter((p) => !p.hidden);
  const featured = list.filter((p) => p.featured);
  const rest = list.filter((p) => !p.featured);
  return (
    <section id="projects" className="relative mx-auto max-w-6xl px-6 py-24 sm:px-10">
      <motion.div {...fadeUp(0)} className="mb-10">
        <p className="text-[10px] font-medium uppercase tracking-[0.45em] text-accent-cyan mb-4">Selected projects</p>
        <h2 className="font-playfair text-4xl font-bold tracking-tight sm:text-5xl mb-5">What I have built</h2>
        <p className="text-muted max-w-2xl text-base leading-relaxed">
          Robots I have built, trained and deployed, from coursework at ETH to a production floor at Bühler.
        </p>
      </motion.div>
      <div className="flex flex-col gap-8">
        {featured.map((p) => (
          <FeaturedCard key={p.id} p={p} />
        ))}
        {rest.map((p) => (
          <ProjectCard key={p.id} p={p} />
        ))}
      </div>
    </section>
  );
}
