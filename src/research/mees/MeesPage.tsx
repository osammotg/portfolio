import { motion, AnimatePresence, useScroll, useInView, useTransform, type MotionValue } from "framer-motion";
import { Mail, ChevronDown, ChevronUp, Play, MessageCircle, Calendar, HelpCircle } from "lucide-react";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import SplineViewer from "../../components/SplineViewer";
import WaterPoloCard from "./WaterPoloCard";

const SPLINE_SCENE =
  "https://my.spline.design/nexbotrobotcharacterconceptforpersonaluse-ABbfTCXAkIulvE46geZHQMFx/";

// ─── Robot cursor ─────────────────────────────────────────────────────────────

function useRobotCursor() {
  const [dotPos, setDotPos]   = useState({ x: -300, y: -300 });
  const [ringPos, setRingPos] = useState({ x: -300, y: -300 });
  const [visible, setVisible] = useState(false);
  const ring   = useRef({ x: -300, y: -300 });
  const target = useRef({ x: -300, y: -300 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      setVisible(true);
      target.current = { x: e.clientX, y: e.clientY };
      setDotPos({ x: e.clientX, y: e.clientY });
    };
    const onLeave = () => setVisible(false);
    window.addEventListener("mousemove", onMove);
    document.documentElement.addEventListener("mouseleave", onLeave);

    let raf: number;
    const loop = () => {
      ring.current.x += (target.current.x - ring.current.x) * 0.11;
      ring.current.y += (target.current.y - ring.current.y) * 0.11;
      setRingPos({ x: ring.current.x, y: ring.current.y });
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  return { dotPos, ringPos, visible };
}

// ─── Typewriter ───────────────────────────────────────────────────────────────

function useTypewriter(text: string, speed: number, active: boolean) {
  const [displayed, setDisplayed] = useState("");
  useEffect(() => {
    if (!active) { setDisplayed(""); return; }
    let i = 0;
    setDisplayed("");
    const id = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) clearInterval(id);
    }, speed);
    return () => clearInterval(id);
  }, [active, text, speed]);
  return displayed;
}

const WHY_TEXT =
`I want to become an amazing robot learning engineer and you and your research lab seem to be the best in Zurich by far.`;

// ─── Animation helpers ────────────────────────────────────────────────────────

const ease = [0.16, 1, 0.3, 1] as const;

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease },
});

const fadeScale = (delay = 0) => ({
  initial: { opacity: 0, y: 20, scale: 0.97 },
  animate: { opacity: 1, y: 0, scale: 1 },
  transition: { duration: 0.55, delay, ease },
});

// ─── Primitives ───────────────────────────────────────────────────────────────

function GlassCard({
  children,
  className = "",
  bgImage,
  bgPosition = "center",
}: {
  children: React.ReactNode;
  className?: string;
  bgImage?: string;
  bgPosition?: string;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.04] backdrop-blur-2xl ${className}`}
    >
      {bgImage && (
        <>
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url('${bgImage}')`,
              backgroundPosition: bgPosition,
              backgroundSize: "cover",
            }}
          />
          <div className="absolute inset-0 bg-black/75" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        </>
      )}
      <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-b from-white/[0.05] to-transparent" />
      <div
        className="relative"
        style={bgImage ? { textShadow: "0 1px 4px rgba(0,0,0,0.9)" } : undefined}
      >
        {children}
      </div>
    </div>
  );
}

type AccentKey = "default" | "cyan" | "indigo" | "purple" | "fuchsia" | "amber" | "green";
const accentMap: Record<AccentKey, string> = {
  default: "border-white/10 bg-white/5 text-muted",
  cyan: "border-accent-cyan/20 bg-accent-cyan/[0.08] text-accent-cyan",
  indigo: "border-accent-indigo/20 bg-accent-indigo/[0.08] text-accent-indigo",
  purple: "border-accent-purple/20 bg-accent-purple/[0.08] text-accent-purple",
  fuchsia: "border-accent-fuchsia/20 bg-accent-fuchsia/[0.08] text-accent-fuchsia",
  amber: "border-amber-400/20 bg-amber-400/[0.08] text-amber-400",
  green: "border-[#22c55e]/30 bg-[#22c55e]/[0.10] text-[#4ade80]",
};

function Tag({
  children,
  accent = "default",
}: {
  children: React.ReactNode;
  accent?: AccentKey;
}) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-medium uppercase tracking-[0.25em] ${accentMap[accent]}`}
    >
      {children}
    </span>
  );
}

function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[10px] font-medium uppercase tracking-[0.45em] text-accent-cyan mb-4">
      {children}
    </p>
  );
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const LANGUAGES = [
  { flag: "🇮🇹", name: "Italian", level: "Native" },
  { flag: "🇫🇷", name: "French", level: "Native" },
  { flag: "🇩🇪", name: "German", level: "Fluent" },
  { flag: "🇬🇧", name: "English", level: "Fluent" },
  { flag: "🇪🇸", name: "Spanish", level: "Fluent" },
  { flag: "🇷🇺", name: "Russian", level: "Fluent" },
];


const PIPELINE = [
  {
    id: "build",
    step: "01",
    label: "Hardware & Teleop",
    accent: "cyan" as AccentKey,
    headline: "YAMS Bimanual Robot",
    description:
      "Joined a setup that drifted every visit — CAN ports remapped, USB cameras swapped, topdown angle nudged. Each new ML-team session burned ~2 hours debugging what had moved since last time. I wrote check_setup.py: one command verifies CAN buses, leader-arm sync, cameras on the right /dev/video*, and — via OpenCV on table fiducials — whether the topdown camera has rotated enough to invalidate trajectories before you record an hour of garbage. Onboarding is now 10 seconds. Same semester I co-led the bimanual stack itself: control loop rebuilt 30 → 120 Hz, USB latency tuned to 1 ms, threaded 3-camera capture (2 USB wrist + 1 RealSense topdown) — 106 commits, 14 DoF over CAN, forked from i2rt.",
    stats: [
      { value: "10 s", label: "Setup check (was 2 h)" },
      { value: "1 ms", label: "USB latency" },
      { value: "14", label: "DoF bimanual" },
      { value: "120 Hz", label: "Control loop" },
    ],
    tags: ["CAN bus", "RealSense", "OpenCV", "fiducials", "uv", "Python"],
    video: "/yams-setup-check.mp4" as string | null,
    code: null as string | null,
    wideImages: [
      {
        kind: "image" as const,
        src: "/teleop-stack.jpg",
        alt: "YAMS bimanual teleop stack — leader arms, follower arms, USB wrist cameras, RealSense topdown camera mounted above the table",
        caption: "The YAMS bimanual teleop stack — 14 DoF over CAN, 2 USB wrist + 1 RealSense topdown.",
      },
      {
        kind: "video" as const,
        src: "/teleop-performing.mp4",
        alt: "Recording bimanual teleoperation episodes on YAMS",
        caption: "Recording teleoperation episodes with the leader arms.",
      },
    ] as { kind: "image" | "video"; src: string; alt: string; caption?: string }[] | undefined,
  },
  {
    id: "record",
    step: "02",
    label: "Data Pipeline",
    accent: "indigo" as AccentKey,
    headline: "Bimanual Data Pipeline",
    description:
      "The data foundation the team trains on. Raw YAMS teleoperation episodes → quality validation → standard format → train/val/test splits. After 300+ episodes I learned it the hard way: more demos isn't more signal — a wrist camera slipping, the topdown angle drifting between sessions, a calibration nudged mid-batch all silently poison the dataset. So validation now gates the pipeline. 863 demos curated across 9 datasets (347 towel, 516 carton-box), inspected through a LeRobot visualiser, with the same camera-drift checks from stage 01 keeping every batch consistent.",
    stats: [
      { value: "863", label: "Curated demos" },
      { value: "347", label: "Towel demos" },
      { value: "516", label: "Carton-box demos" },
      { value: "9", label: "Datasets curated" },
    ],
    tags: ["zarr", "LeRobot", "Validation", "Splits", "Bimanual"],
    video: "/lerobot-dataset-viz.mp4",
    code: `validate  yams_episode/\nconvert   → standard format\nsplit     → train / val / test\n──────────────────────────\n→ ready to train`,
  },
  {
    id: "train",
    step: "03",
    label: "Training",
    accent: "purple" as AccentKey,
    headline: "ACT Training + Fast Data Pipeline",
    description:
      "ACT training on bimanual data: action chunking (100), CVAE encoder (latent_dim 32), temporal ensembling. Built a fast data pipeline — predecode.py + predecoded_patch.py — that drops data load from 110 ms to 9 ms per step. ~10× faster data, ~3× end-to-end step/s. test_equivalence.py validates the conversion is lossless (mean diff <0.02, p99 <0.10). Trained against an augmentation matrix — color jitter, gaussian noise, gaussian blur, random erasing, random affine — to harden the policy against the lab's wildly different lighting (night with all overhead lights on vs. daytime sun with the lab lights off). Trial-and-error sweeps across iterations (~50 job configs) surfaced which augs actually transferred to the deployed policy.",
    stats: [
      { value: "10×", label: "Data loader speedup" },
      { value: "9 ms", label: "Per-step data load" },
      { value: "ACT", label: "Primary policy" },
      { value: "lossless", label: "Conversion validated" },
    ],
    tags: ["ACT", "PyTorch", "zero-copy", "mp4 prefetch", "Sweeps"],
    video: null,
    code: `# Fast data pipeline\npython predecode.py --workers 8\n# baseline → 110 ms data_s\n# fast    → 9 ms   data_s\n# test_equivalence.py: lossless`,
    wideImages: [
      {
        kind: "image" as const,
        src: "/wandb-training.png",
        alt: "Weights & Biases training run — train/loss decaying from ~25 → ~1, train/l1_loss curve, train/steps and train/samples linearly increasing across 35K steps",
        caption: "W&B run · act_p4_steps_curve_T4_kitchen_sink_holdout — loss / l1_loss / lr / step counters across 35K training steps",
      },
      {
        kind: "image" as const,
        src: "/wandb-gpu.png",
        alt: "Weights & Biases GPU system telemetry — fan speed, memory and SM clock speeds, GPU power usage swinging 0–450 W",
        caption: "GPU telemetry from the same run — power / SM clock / fan speed across 180 minutes of training",
      },
    ] as { kind: "image" | "video"; src: string; alt: string; caption?: string }[] | undefined,
  },
  {
    id: "eval",
    step: "04",
    label: "Eval & Next Step",
    accent: "fuchsia" as AccentKey,
    headline: "Eval Dashboard",
    description:
      "12-panel Plotly dashboard for diagnosing what the model sees before you trust a checkpoint: ACT readiness score, chunk disagreement heatmap, episode×episode DTW similarity, plus a camera-drift analysis surfacing 44 worst-pair comparisons across the dataset.",
    stats: [
      { value: "12", label: "Dashboard panels" },
      { value: "44", label: "Drift pairs flagged" },
      { value: "DTW", label: "Episode similarity" },
      { value: "ACT", label: "Primary policy" },
    ],
    tags: ["Plotly", "DTW", "ACT", "Camera drift"],
    video: "/eval-dashboard.mp4",
    code: null,
  },
];

// ─── Git Timeline data ────────────────────────────────────────────────────────

// Lane geometry — single source of truth shared by SVG path computation
// (in GitTimeline.recompute) and by per-card indent (in EraNode).
// Each branch must have its own lane to avoid visual overlap on the SVG —
// two branches sharing a lane draw on top of each other and the eye reads
// them as a single connected line.
const TIMELINE_LANE_X: Record<number, number> = { 1: 72, 2: 100, 3: 128, 4: 156, 5: 184 };
const TIMELINE_LOOP_X = 60;
const TIMELINE_TRUNK_X = 24;
// How far right of the lane the card sits — leaves room for the commit dot tick.
const CARD_LANE_OFFSET = 32;
// Era main content uses lg:pl-44 (11rem = 176px). Sub-cards must visually
// nest under the era heading, so they're floored to land past the chapter
// content. The horizontal tick stretches per-card to bridge lane → card.
const ERA_CONTENT_LEFT_PX = 176;
const SUBCARD_INDENT_PAST_ERA = 60;
const MIN_SUBCARD_INDENT_PX = ERA_CONTENT_LEFT_PX + SUBCARD_INDENT_PAST_ERA;

function useIsLg() {
  const [isLg, setIsLg] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(min-width: 1024px)").matches;
  });
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(min-width: 1024px)");
    const handler = (e: MediaQueryListEvent) => setIsLg(e.matches);
    setIsLg(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return isLg;
}

function laneOf(branch: BranchData): number {
  const isLoop = branch.forkAt === branch.mergeAt;
  return isLoop ? TIMELINE_LOOP_X : TIMELINE_LANE_X[branch.lane] ?? TIMELINE_LANE_X[1];
}

const accentHex: Record<AccentKey, string> = {
  cyan:    "#06b6d4",
  indigo:  "#6366f1",
  purple:  "#8b5cf6",
  fuchsia: "#d946ef",
  default: "#a5adcb",
  amber:   "#fbbf24",
  green:   "#22c55e",
};

type EraId = "ep01" | "sf" | "ep02" | "ep04";
type BranchAnchor = EraId | "above-ep01" | "origin";

type LogoSpec = { src: string; alt: string };

interface BranchData {
  id: string;
  title: string;
  eyebrow: string;
  accent: AccentKey;
  description: string;
  items: string[];
  /** 1-2 punch bullets shown above "Click to know more". Description + items
      stay collapsed by default — gated behind expand. */
  summary?: string[];
  bgImage?: string;
  stat?: string;
  /** Drop image at /public${src}. Hidden silently if file is missing. */
  logo?: LogoSpec;
  /** Secondary badge (e.g., YC sticker on Stack Auth). */
  badgeLogo?: LogoSpec;
  forkAt: BranchAnchor;
  mergeAt: EraId;
  lane: 1 | 2 | 3 | 4 | 5;
  loopHeight?: number;
  /** Decimal year for fork point. Maps proportionally between forkAt era's
      startYear and the next era's startYear. Defaults to era's startYear. */
  forkYear?: number;
  /** When forkAt === mergeAt and mergeYear is set, the branch runs as a real
      fork→lane→merge in its lane (instead of the LOOP_X excursion). Used by
      Lovable so its lane passes through the card stack. */
  mergeYear?: number;
  /** Label for the fork commit marker on the trunk. Shown next to a small dot. */
  forkLabel?: string;
}

interface EraData {
  id: EraId;
  ep: string;
  year: string;
  /** Decimal year for proportional fork mapping. Use 2024.0 for Jan, 2024.5 for July, etc. */
  startYear: number;
  eyebrow: string;
  accent: AccentKey;
  title: string;
  description: string;
  items: string[];
  /** 1-2 punch bullets shown above "Click to know more". Description + items
      + stat stay collapsed by default — gated behind expand. */
  summary?: string[];
  bgImage?: string;
  stat?: string;
  /** Drop image at /public${src}. Hidden silently if file is missing. */
  logo?: LogoSpec;
  branches?: BranchData[];
  isConvergence?: boolean;
}

const GIT_ERAS: EraData[] = [
  {
    id: "ep01",
    ep: "01",
    year: "2020 – 2023",
    startYear: 2020,
    eyebrow: "EPFL · Lausanne · Lake Geneva campus",
    accent: "cyan",
    title: "BSc Microengineering",
    description: "Three years at EPFL building the engineering foundations. Robotics, electronics, autonomous systems, embedded programming.",
    summary: ["Foundation: robotics, control theory, embedded systems"],
    items: [
      "Autonomous systems & control theory",
      "Embedded C + Python architectures",
      "Robotics, electronics, digital systems",
      "Self-organised exchange — Saint-Petersburg",
    ],
    bgImage: "/epfl-campus.jpg",
    logo: { src: "/logos/epfl.svg", alt: "EPFL" },
    branches: [
      {
        id: "waterpolo",
        title: "Water Polo — 12 Years Semi-Pro",
        eyebrow: "🇨🇭 Geneva 2011 → 2023 · 3rd place 🥉 · closes at SF",
        accent: "cyan",
        description: "Started in 2011 in Geneva. Twelve years competitive, ran through high school and BSc. Won 3rd place in the Swiss National League. Closes when Special Forces opens — the discipline thread continues, just no longer in a pool.",
        summary: [
          "12 years competitive · started 2011 in Geneva",
          "🥉 3rd place — Swiss National League",
        ],
        items: [
          "🇨🇭 Started 2011 — in Geneva",
          "3rd place — Swiss National League",
          "Genève Natation · Carouge · Mira Costa",
          "12 years competitive · closes 2023",
        ],
        bgImage: "/waterpolo-bg.jpg",
        forkAt: "origin",
        // Fork just past the Geneva arrival commit so the line clearly emerges
        // after settling in, not stacked on the trunk dot itself.
        forkYear: 2011.6,
        mergeAt: "sf",
        lane: 1,
      },
      {
        id: "striker",
        title: "Striker — Co-Founder",
        eyebrow: "2022 · Geneva · Zürich · Paris",
        accent: "purple",
        description: "Co-founded Striker in 2022 during BSc. Replaced WhatsApp groups for amateur football leagues. Still running through every chapter that follows.",
        summary: [
          "2.5k+ members · 500+ games organised",
          "Replaced WhatsApp groups for amateur football",
        ],
        items: [
          "2,500+ members · 500+ organised games",
          "React Native + PHP + Stripe",
          "Full-cycle: product, community, ops",
        ],
        bgImage: "/striker-bg.png",
        stat: "2.5k+",
        logo: { src: "/logos/striker.png", alt: "Striker" },
        forkAt: "ep01",
        forkYear: 2022,
        forkLabel: "2022",
        mergeAt: "ep04",
        lane: 2,
      },
    ],
  },
  {
    id: "sf",
    ep: "1.5",
    year: "2024 · Jan – Jul",
    startYear: 2024,
    eyebrow: "🇨🇭 Isone · Swiss Armed Forces · Grenadier corps",
    accent: "green",
    title: "Special Forces — Test the Limits",
    description:
      "Did my military duty between EPFL and ETH. Chose the hardest path in the Swiss army: Special Forces, Grenadier corps in Isone. The point was simple: grow, and find the real edge of my physical and mental limits. Honestly, it was a really nice experience. Came out with a different baseline for what 'hard' actually means and carried it into everything that came next.",
    summary: ["Chose the hardest path on offer to find the real limits"],
    items: [
      "Swiss Special Forces · Grenadier corps · Isone, Ticino",
      "Why: chose the hardest path on offer",
      "Test the limits — physical and mental",
      "Water polo (12 yrs) closes here · Striker keeps running",
    ],
    bgImage: "/military-bg.jpeg",
  },
  {
    id: "ep02",
    ep: "02",
    year: "2024 (Sep) – Present",
    startYear: 2024.7,
    eyebrow: "ETH Zurich · M4 · Focus: Robotics & AI",
    accent: "amber",
    title: "MSc Mechanical Engineering",
    description: "After EPFL and building Striker, I made a decision: go deep. Become a really good robotics engineer. ETH Zurich was the only destination.",
    summary: ["Decision: become a really good robotics engineer"],
    bgImage: "/eth-campus.jpg",
    logo: { src: "/logos/eth.svg", alt: "ETH Zurich" },
    items: [
      "Planning & Decision Making for Autonomous Robots — 6.0",
      "Image Analysis and Computer Vision — 5.0",
      "Mobile Health and Activity Monitoring — 5.5",
      "Visualization, Simulation & VR I — 5.5",
      "Dynamic Programming and Optimal Control — 4.75",
      "Robot Dynamics — 4.5",
      "Introduction to Machine Learning — 4.5",
      "Russian for Insiders (A2-C1) — 5.25",
      "Robot Learning 263-5911-00L — Mees, Spring 2026",
    ],
    branches: [
      {
        id: "ai-side",
        title: "AI Side Projects",
        eyebrow: "2024 – 2025 · Always building",
        accent: "indigo",
        description: "Following every model drop. Shipping tools. Staying hands-on with everything that comes out.",
        summary: [
          "Paperclip AI · OMI hardware · video pipelines",
          "Always shipping — every model drop",
        ],
        items: [
          "Paperclip AI — autonomous task runner",
          "Video & image generation pipelines",
          "OMI hardware — second brain wearable",
          "Dozens of AI tools & experiments",
        ],
        forkAt: "ep02",
        forkYear: 2024.8,
        forkLabel: "Late 2024",
        mergeAt: "ep04",
        lane: 3,
      },
      {
        id: "lovable",
        title: "Lovable — PX Engineer (shipped & merged)",
        eyebrow: "Stockholm · Aug → Sep 2025 · feature branch closed",
        accent: "fuchsia",
        description: "Started my internship at Lovable in August 2025 — cold-messaged the founder after a hackathon, thought it was a cool company, he said yes. Shipped fast. Left in September to go to the U.S.",
        summary: [
          "Cold-messaged the founder · automated 120+ hrs",
          "Stockholm · Aug → Sep 2025",
        ],
        items: [
          "Cold-messaged the founder after the hackathon",
          "Goal Clarification Mode (GCM) design",
          "Automated 120+ hrs of support workflows",
        ],
        logo: { src: "/logos/lovable.png", alt: "Lovable" },
        forkAt: "ep02",
        forkYear: 2025.35,
        forkLabel: "Aug 2025",
        // Self-merging branch with explicit mergeYear runs in its lane
        // (fork → lane → merge-back) so the card stack visibly tethers to it.
        mergeAt: "ep02",
        mergeYear: 2025.55,
        // Lane 5 (not 4) so Lovable's lane doesn't overlap Stack Auth's.
        // Lovable's lane extends down to its card bottom, which sits below
        // the Y where Stack Auth forks — sharing lane 4 made the two paths
        // draw on the same x and read as a single tangled branch.
        lane: 5,
      },
      {
        id: "stackauth",
        title: "Stack Auth — San Francisco Detour",
        eyebrow: "San Francisco · YC S24 · Sep – Dec 2025",
        accent: "indigo",
        description: "Got passionate about entrepreneurship and went to SF. Worked inside the YC S24 ecosystem. Came back knowing exactly what to do next.",
        summary: [
          "Implemented MCP · 4 dev hackathons led",
          "San Francisco · YC S24 detour",
        ],
        items: [
          "Implemented Model Context Protocol (MCP)",
          "4 developer hackathons organised & led",
          "YCombinator S24 cohort — first-hand",
          "Returned: one mission — robotics",
        ],
        stat: "YC S24",
        logo: { src: "/logos/stackauth.png", alt: "Stack Auth" },
        badgeLogo: { src: "/logos/yc.png", alt: "Y Combinator S24" },
        forkAt: "ep02",
        forkYear: 2025.55,
        forkLabel: "Sep 2025",
        mergeAt: "ep04",
        lane: 4,
      },
    ],
  },
  {
    id: "ep04",
    ep: "04",
    year: "Sep 2025 – Present",
    startYear: 2025.7,
    eyebrow: "ETH Robotics Club · Robot Learning · merge commit · all roads",
    accent: "fuchsia",
    title: "Robot Learning Team — 24/7, All In",
    description:
      "Every prior thread merges here. Bought a van and parked it at the lab. Sleep on-site, eat on-site, build on-site. Football, startups, side projects, San Francisco — all of it folded into one mission: become a really good robotics engineer. This is the only thing now.",
    summary: [
      "10× faster training data loader (logged, lossless validated)",
      "All threads merge here — 24/7 on-site at the lab",
    ],
    items: [
      "24/7 on-site at ETH Robotics Club — van as base camp",
      "YAMS: rebuilt control loop 30 → 120 Hz (106 commits)",
      "Bimanual data pipeline: 863 curated demos across 9 datasets",
      "Fast data loader: 110 ms → 9 ms per step, lossless validated",
      "Cosmos fine-tuning started — building toward mimic-video on YAMS",
      "Papers absorbed: ACT, World Models, mimic-video, CoRL 2025",
    ],
    stat: "10×",
    isConvergence: true,
    logo: { src: "/logos/ethrc.jpeg", alt: "ETH Robotics Club" },
  },
];

// Three of Mees's papers Tommaso wants to work on. Sourced from
// https://www.oiermees.com publications list (April 2026).
// URLs default to oiermees.com when the arXiv ID isn't yet confirmed —
// replace each `url` with the canonical arXiv link as it goes up.
const MEES_PAPERS: {
  shortLabel: string;
  title: string;
  venue: string;
  summary: string;
  url: string;
  accent: AccentKey;
}[] = [
  {
    shortLabel: "ECoT",
    title: "Robotic Control via Embodied Chain-of-Thought Reasoning",
    venue: "CoRL 2024",
    summary:
      "VLAs that reason — plans, sub-tasks, motions, grounded features like bounding boxes — before predicting actions. +28% absolute success on OpenVLA generalization, no extra robot data.",
    url: "https://arxiv.org/abs/2407.08693",
    accent: "purple",
  },
  {
    shortLabel: "Training Strategies",
    title: "Training Strategies for Efficient Embodied Reasoning",
    venue: "CoRL 2025 · 28 Jul 2025",
    summary:
      "Follow-up to ECoT: how to actually train embodied reasoners efficiently. Reasoning chains, supervision signals, and what to skip when the model has to run on the robot.",
    url: "https://www.oiermees.com",
    accent: "fuchsia",
  },
  {
    shortLabel: "FAST",
    title:
      "FAST: Efficient Action Tokenization for Vision-Language-Action Models",
    venue: "Preprint · 16 Jan 2025",
    summary:
      "Frequency-domain action tokenization that gets VLAs running fast enough to be useful. The piece a lot of post-FAST work assumes; reframes how action heads are even built.",
    url: "https://www.oiermees.com",
    accent: "indigo",
  },
];

// Featured paper — mimic-video. This is the research direction Tommaso is
// already pursuing at the ETH Robotics Club, so it gets its own larger
// component above the three-card grid (instead of being one card among
// three). The Cosmos fine-tune note signals "we're already in the trench
// with this paper" — Mees's lab repo went public AFTER Tommaso's team had
// already started fine-tuning Cosmos on YAMS bimanual data.
const MIMIC_VIDEO_PAPER = {
  shortLabel: "mimic-video",
  title:
    "mimic-video: Video-Action Models for Generalizable Robot Control Beyond VLAs",
  venue: "Preprint · 17 Dec 2025",
  summary:
    "Video-action models that generalize beyond what current VLAs can do. The architecture maps a video backbone (Cosmos) into action tokens via an inverse-dynamics decoder, sidestepping the VLA bottleneck for long-horizon, contact-rich tasks.",
  alreadyDoing:
    "We started fine-tuning Cosmos on our own YAMS bimanual data before your team's repo went public. The past weeks I've been reading the paper end-to-end, walking the code with the team at the Robotics Club, and lining up the IDM training loop on top of our pipeline. This isn't a direction I'm proposing — it's the one we're already running.",
  url: "https://www.oiermees.com",
};

// ─── Proof section data ───────────────────────────────────────────────────────
// Concrete evidence Tommaso can ship in Spring 2026. Lives in a top-of-page
// section so the professor lands the science before the autobiography.

type ProofPoint = {
  stat: string;
  label: string;
  body: string;
  accent: AccentKey;
};

const PROOF_POINTS: ProofPoint[] = [
  {
    stat: "10×",
    label: "Data loader speedup",
    body: "predecode.py + predecoded_patch.py: 110 ms → 9 ms per step on real training runs. test_equivalence.py validates the conversion is lossless — mean diff <0.02, p99 <0.10. Logged.",
    accent: "cyan",
  },
  {
    stat: "863",
    label: "Curated bimanual demos",
    body: "Validated, converted, split. 9 datasets across towel folding, carton-box, and task variants. The pipeline the team trains on.",
    accent: "indigo",
  },
  {
    stat: "12",
    label: "Eval dashboard panels",
    body: "Plotly diagnostic for ACT: readiness score, chunk disagreement heatmap, episode×episode DTW similarity, camera drift pairs. The thing you check before you trust a checkpoint.",
    accent: "fuchsia",
  },
];

// ETH M4 grades, surfaced visibly on the page (not buried in an expandable).
// Swiss 1–6 scale; 6.0 is the maximum.
type GradeRow = { course: string; grade: string; inProgress?: boolean };

const ETH_GRADES: GradeRow[] = [
  { course: "Planning & Decision Making for Autonomous Robots", grade: "6.0" },
  { course: "Image Analysis and Computer Vision", grade: "5.0" },
  { course: "Mobile Health and Activity Monitoring", grade: "5.5" },
  { course: "Visualization, Simulation & VR I", grade: "5.5" },
  { course: "Dynamic Programming and Optimal Control", grade: "4.75" },
  { course: "Robot Dynamics", grade: "4.5" },
  { course: "Introduction to Machine Learning", grade: "4.5" },
  { course: "Russian for Insiders (A2-C1)", grade: "5.25" },
  { course: "Robot Learning 263-5911-00L · Mees · Spring 2026", grade: "in progress", inProgress: true },
  { course: "Soccer Analytics · Spring 2026", grade: "in progress", inProgress: true },
];

// ─── Proof section ────────────────────────────────────────────────────────────
// Sits between hero and the research interests. Three evidence cards from
// the work at the ETH Robotics Club + a visible grades table for ETH M4.
// The professor lands the science here, before the autobiography (timeline).

function ProofSection() {
  return (
    <section
      id="proof"
      className="relative mx-auto max-w-6xl px-6 py-24 sm:px-10"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_50%_30%,rgba(229,9,20,0.05),transparent)]" />

      <motion.div {...fadeUp(0)} className="mb-12">
        <SectionEyebrow>Proof</SectionEyebrow>
        <h2 className="font-playfair text-4xl font-bold tracking-tight sm:text-5xl mb-4">
          What I&apos;ve already shipped
        </h2>
        <p className="text-muted max-w-2xl text-base leading-relaxed">
          Concrete infrastructure I helped ship at the ETH Robotics Club this
          semester.
        </p>
      </motion.div>

      {/* Evidence pillars — 3 stats with one-line context. No bg images.
          The whole point of this section is fast skim, not decoration. */}
      <div className="grid gap-4 md:grid-cols-3 mb-12">
        {PROOF_POINTS.map((p, i) => {
          const c = accentColors[p.accent];
          return (
            <motion.div
              key={p.label}
              {...fadeScale(0.05 + i * 0.07)}
              className={`relative rounded-2xl border ${c.border} bg-white/[0.025] p-7 h-full`}
            >
              <span
                className={`font-playfair text-5xl font-bold leading-none ${c.text}`}
              >
                {p.stat}
              </span>
              <p
                className={`text-[11px] uppercase tracking-[0.3em] mt-3 ${c.text}`}
              >
                {p.label}
              </p>
              <p className="text-base text-fg/80 leading-relaxed mt-4">
                {p.body}
              </p>
            </motion.div>
          );
        })}
      </div>

      {/* Academic record — visible by default, formatted as a clean table. */}
      <motion.div {...fadeUp(0.1)}>
        <GlassCard className="p-7 sm:p-9">
          <div className="flex items-baseline justify-between flex-wrap gap-3 mb-4">
            <div>
              <p className="text-[11px] uppercase tracking-[0.4em] text-accent-cyan mb-2">
                Academic record
              </p>
              <h3 className="font-playfair text-2xl font-bold">
                MSc Mechanical Engineering · ETH Zurich · M4
              </h3>
            </div>
            <p className="text-xs font-mono text-muted/70">
              Swiss 1–6 scale · 6.0 max
            </p>
          </div>
          <p className="text-sm text-muted leading-relaxed mb-6 max-w-3xl">
            I&apos;ve always been more passionate about building than studying. Robotics is what made me realize you have to deeply understand the theory before the building actually compounds — so this past year I&apos;ve gone deeper into the academic side than ever before. Learning by doing has gotten me much further than learning by reading alone.
          </p>

          <table className="w-full text-left">
            <tbody>
              {ETH_GRADES.map((g, i) => (
                <tr
                  key={g.course}
                  className={
                    i === ETH_GRADES.length - 1
                      ? ""
                      : "border-b border-white/[0.05]"
                  }
                >
                  <td className="py-3 text-base text-fg/85 leading-snug pr-4">
                    {g.course}
                  </td>
                  <td
                    className={`py-3 text-right font-mono tabular-nums whitespace-nowrap ${
                      g.inProgress
                        ? "text-accent-cyan italic"
                        : "text-white font-medium"
                    }`}
                  >
                    {g.grade}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </GlassCard>
      </motion.div>
    </section>
  );
}

type CodeToken = { t: string; s: string } | null;

function CodeLine({ tokens }: { tokens: CodeToken[] }) {
  return (
    <p>
      {tokens.map((tok, i) => {
        if (!tok) return null;
        const colors: Record<string, string> = {
          muted: "text-muted",
          cyan: "text-accent-cyan",
          indigo: "text-accent-indigo",
          purple: "text-accent-purple",
          fuchsia: "text-accent-fuchsia",
          white: "text-white font-medium",
        };
        return (
          <span key={i} className={colors[tok.t] ?? "text-muted"}>
            {tok.s}
          </span>
        );
      })}
    </p>
  );
}

// ─── Robotics Pipeline Section ────────────────────────────────────────────────

const accentColors: Record<AccentKey, { border: string; bg: string; text: string; glow: string }> = {
  cyan:    { border: "border-accent-cyan/40",    bg: "bg-accent-cyan/[0.12]",    text: "text-accent-cyan",    glow: "shadow-[0_0_20px_rgba(6,182,212,0.3)]" },
  indigo:  { border: "border-accent-indigo/40",  bg: "bg-accent-indigo/[0.12]",  text: "text-accent-indigo",  glow: "shadow-[0_0_20px_rgba(99,102,241,0.3)]" },
  purple:  { border: "border-accent-purple/40",  bg: "bg-accent-purple/[0.12]",  text: "text-accent-purple",  glow: "shadow-[0_0_20px_rgba(139,92,246,0.3)]" },
  fuchsia: { border: "border-accent-fuchsia/40", bg: "bg-accent-fuchsia/[0.12]", text: "text-accent-fuchsia", glow: "shadow-[0_0_20px_rgba(217,70,239,0.3)]" },
  default: { border: "border-white/10",          bg: "bg-white/[0.05]",          text: "text-muted",          glow: "" },
  amber:   { border: "border-amber-400/40",       bg: "bg-amber-400/[0.12]",      text: "text-amber-400",      glow: "" },
  green:   { border: "border-[#22c55e]/45",       bg: "bg-[#22c55e]/[0.14]",      text: "text-[#4ade80]",      glow: "shadow-[0_0_24px_rgba(34,197,94,0.35)]" },
};

function RoboticsPipelineSection() {
  return (
    <section className="relative mx-auto max-w-6xl px-6 py-24 sm:px-10">
      <motion.div {...fadeUp(0)} className="mb-12 flex items-start gap-5">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl overflow-hidden border border-white/10 bg-white/[0.04]">
          <img src="/ethrc-logo.jpeg" alt="ETH Robotics Club" width={56} height={56} className="object-cover w-full h-full" />
        </div>
        <div>
          <SectionEyebrow>ETH Robotics Club — this semester</SectionEyebrow>
          <h2 className="font-playfair text-4xl font-bold tracking-tight sm:text-5xl mb-3">
            From Hardware to Deployment
          </h2>
          <p className="text-muted max-w-xl text-base">
            A full robot-learning pipeline I helped build at the club this semester. Four stages, end to end.
          </p>
        </div>
      </motion.div>

      <div className="relative lg:pl-24">
        {/* Gradient rail — runs through every step badge */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-6 top-8 bottom-8 hidden w-px lg:block"
          style={{
            background:
              "linear-gradient(to bottom, rgba(6,182,212,0.45) 0%, rgba(99,102,241,0.45) 33%, rgba(139,92,246,0.45) 66%, rgba(217,70,239,0.45) 100%)",
          }}
        />

        <div className="space-y-10">
          {PIPELINE.map((step, i) => {
            const colors = accentColors[step.accent];
            return (
              <motion.div
                key={step.id}
                {...fadeUp(0.05 + i * 0.05)}
                className="relative"
              >
                {/* Step badge sitting on the rail */}
                <div
                  aria-hidden
                  className={`absolute -left-24 top-7 z-10 hidden h-12 w-12 items-center justify-center rounded-full border bg-black/85 backdrop-blur-sm font-mono text-sm font-bold tabular-nums lg:flex ${colors.border} ${colors.text} ${colors.glow}`}
                >
                  {step.step}
                </div>

                <GlassCard className="p-0 overflow-hidden">
                  {step.video && (
                    <div className="relative bg-black border-b border-white/[0.06]">
                      <video
                        src={step.video}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="block w-full h-auto"
                      />
                    </div>
                  )}

                  <div className="p-7 sm:p-8 flex flex-col gap-6">
                    <div className="flex items-center gap-3">
                      <Tag accent={step.accent}>{step.label}</Tag>
                      <span className="text-xs text-muted/50 font-mono">{step.step} / 04</span>
                    </div>
                    <h3 className="font-playfair text-3xl font-bold">{step.headline}</h3>
                    <p className="text-base text-fg/80 leading-relaxed max-w-3xl">{step.description}</p>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {step.stats.map(({ value, label }) => (
                        <div key={label} className={`rounded-2xl border ${colors.border} bg-black/30 p-4 text-center`}>
                          <p className={`font-playfair text-2xl font-bold ${colors.text} tabular-nums`}>{value}</p>
                          <p className="text-xs text-muted mt-1.5 leading-tight">{label}</p>
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {step.tags.map((t) => (
                        <span key={t} className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-muted">{t}</span>
                      ))}
                    </div>

                    {step.code && (
                      <div className="rounded-xl border border-white/[0.07] bg-black/60 px-5 py-4 font-mono text-xs text-muted/80 leading-relaxed whitespace-pre">
                        {step.code}
                      </div>
                    )}

                    {!step.video && !step.wideImages && (
                      <div className={`flex items-center gap-3 rounded-xl border border-dashed ${colors.border} bg-white/[0.02] px-5 py-4`}>
                        <div className={`flex h-9 w-9 items-center justify-center rounded-full border ${colors.border} ${colors.bg}`}>
                          <Play className={`h-3.5 w-3.5 ml-0.5 ${colors.text}`} />
                        </div>
                        <p className="text-xs text-muted/70">
                          {step.label.toLowerCase()} footage coming
                        </p>
                      </div>
                    )}
                  </div>
                </GlassCard>

                {step.wideImages && step.wideImages.length > 0 && (
                  <div
                    className={`mt-4 grid gap-4 ${
                      step.wideImages.length > 1 ? "md:grid-cols-2" : "md:grid-cols-1"
                    }`}
                  >
                    {step.wideImages.map((m) => (
                      <figure
                        key={m.src}
                        className="rounded-2xl border border-white/[0.07] bg-black/40 overflow-hidden"
                      >
                        {m.kind === "video" ? (
                          <video
                            src={m.src}
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="block w-full h-auto"
                          />
                        ) : (
                          <img
                            src={m.src}
                            alt={m.alt}
                            loading="lazy"
                            className="block w-full h-auto"
                          />
                        )}
                        {m.caption && (
                          <figcaption className="px-4 py-2.5 text-[11px] text-muted/80 border-t border-white/[0.06] font-mono leading-snug">
                            {m.caption}
                          </figcaption>
                        )}
                      </figure>
                    ))}
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── Autonomous Deployments section ───────────────────────────────────────────
// The closing visual proof: ACT policies running unattended on real hardware.
// Sits after the pipeline so the page ends on outcomes rather than tooling.
// Layout uses object-contain + max-h so vertical (portrait) and horizontal
// (landscape) clips both render at their natural aspect — no deformation.

function AutonomousDeploymentsSection() {
  return (
    <section className="relative mx-auto max-w-6xl px-6 py-24 sm:px-10">
      <motion.div {...fadeUp(0)} className="mb-10">
        <SectionEyebrow>Autonomous deployments</SectionEyebrow>
        <h2 className="font-playfair text-4xl font-bold tracking-tight sm:text-5xl mb-5">
          Two ACT policies running on YAMS
        </h2>
        <ol className="text-fg/85 text-base space-y-1.5 font-mono">
          <li><span className="text-muted/60 mr-2">1.</span>Towel folding</li>
          <li><span className="text-muted/60 mr-2">2.</span>GPU ventilator into a carton box and closing it</li>
        </ol>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-2">
        <motion.figure
          {...fadeUp(0.1)}
          className="rounded-2xl border border-white/[0.07] bg-black overflow-hidden flex flex-col"
        >
          <div className="relative w-full aspect-[2/3] overflow-hidden">
            <video
              src="/towel-folding.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover object-top"
            />
          </div>
          <figcaption className="px-4 py-2.5 text-[11px] text-muted/80 border-t border-white/[0.06] font-mono leading-snug">
            01 · Towel folding — deployed ACT policy
          </figcaption>
        </motion.figure>

        <motion.figure
          {...fadeUp(0.18)}
          className="rounded-2xl border border-white/[0.07] bg-black overflow-hidden flex flex-col"
        >
          <div className="relative w-full aspect-[2/3] overflow-hidden">
            <video
              src="/carton-box.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover object-top"
            />
          </div>
          <figcaption className="px-4 py-2.5 text-[11px] text-muted/80 border-t border-white/[0.06] font-mono leading-snug">
            02 · GPU ventilator into a carton box — deployed ACT policy
          </figcaption>
        </motion.figure>
      </div>
    </section>
  );
}

// ─── Git Timeline components ──────────────────────────────────────────────────

// Always-mounted summary bullets — sit above the "Click to know more" toggle.
// Coral leading dots so they read as "the headline take", distinct from the
// items list (which uses accent-colored dots and renders inside the expand).
function PunchBullets({ bullets }: { bullets: string[] }) {
  return (
    <ul className="space-y-1 mb-3">
      {bullets.map((b, i) => (
        <li
          key={i}
          className="flex items-start gap-2 text-[13px] text-fg/85 leading-snug"
        >
          <span className="mt-[7px] h-1 w-1 rounded-full bg-[#ff7043] shrink-0" />
          <span>{b}</span>
        </li>
      ))}
    </ul>
  );
}

// "Click to know more" toggle — quiet by default, coral on hover/active.
function ExpandToggle({
  expanded,
  onClick,
  className = "",
  label,
}: {
  expanded: boolean;
  onClick: () => void;
  className?: string;
  /** Override the default copy. Useful when the expanded view also reveals
   *  an image, so the closed state can read e.g. "See photo + details". */
  label?: { closed: string; open: string };
}) {
  const closed = label?.closed ?? "See photo + more";
  const open = label?.open ?? "Hide details";
  return (
    <button
      type="button"
      onClick={onClick}
      aria-expanded={expanded}
      className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-[11px] font-mono uppercase tracking-[0.2em] transition-all duration-200 ${
        expanded
          ? "border-[#ff7043]/55 bg-[#ff7043]/[0.10] text-[#ff7043]"
          : "border-white/15 bg-white/[0.04] text-fg/70 hover:border-[#ff7043]/40 hover:bg-[#ff7043]/[0.08] hover:text-[#ff7043]"
      } ${className}`}
    >
      <span>{expanded ? open : closed}</span>
      {expanded ? (
        <ChevronUp className="h-3.5 w-3.5" />
      ) : (
        <ChevronDown className="h-3.5 w-3.5" />
      )}
    </button>
  );
}

// Animated container that mounts/unmounts children with a height + opacity
// transition. Cmd+F in collapsed cards won't find content (mount/unmount
// tradeoff for clean animation) — the professor opens what interests him.
function ExpandableSection({
  expanded,
  children,
}: {
  expanded: boolean;
  children: React.ReactNode;
}) {
  return (
    <AnimatePresence initial={false}>
      {expanded && (
        <motion.div
          key="expandable"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          style={{ overflow: "hidden" }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function BranchCard({ branch, delay = 0 }: { branch: BranchData; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-5% 0px" });
  const colors = accentColors[branch.accent];
  const hex = accentHex[branch.accent];
  const [expanded, setExpanded] = useState(false);

  return (
    <div ref={ref}>
      <motion.div
        className={`relative rounded-2xl border ${colors.border} overflow-hidden bg-white/[0.025]`}
        initial={{ opacity: 0, x: 20 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
        transition={{ duration: 0.45, delay, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="relative p-5">
          <div className="flex items-start justify-between gap-2 mb-2">
            <span className={`text-[10px] uppercase tracking-[0.3em] ${colors.text}`}>{branch.eyebrow}</span>
            <div className="flex items-center gap-2 shrink-0">
              <LogoImg spec={branch.badgeLogo} className="h-4 w-auto opacity-90" />
              <LogoImg spec={branch.logo} className="h-5 w-auto opacity-95" />
              {branch.stat && (
                <span className={`font-playfair text-lg font-bold leading-none ${colors.text}`}>{branch.stat}</span>
              )}
            </div>
          </div>
          <h4 className="font-playfair text-lg font-bold text-white mb-2.5 leading-snug">{branch.title}</h4>

          {/* Punch bullets — always visible, the skim path */}
          {branch.summary && branch.summary.length > 0 && (
            <ul className="space-y-1.5 mb-4">
              {branch.summary.map((s, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 text-[14px] text-fg/85 leading-snug"
                >
                  <span className="mt-[7px] h-1 w-1 rounded-full bg-[#ff7043] shrink-0" />
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          )}

          {/* Expand toggle — opens hero photo + full description + items */}
          <ExpandToggle
            expanded={expanded}
            onClick={() => setExpanded((e) => !e)}
          />

          <ExpandableSection expanded={expanded}>
            <div className="pt-4 space-y-4">
              {/* Hero photo — the image is the reward for engaging.
                  Carries the place/feel the bullets can't, without obscuring
                  the skim text in the closed state. */}
              {branch.bgImage && (
                <div className={`relative w-full aspect-[16/9] rounded-xl overflow-hidden border ${colors.border}`}>
                  <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${branch.bgImage}')` }} />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#141414]/70 via-transparent to-transparent" />
                </div>
              )}
              <p className="text-sm text-fg/75 leading-relaxed">{branch.description}</p>
              <ul className="space-y-1.5">
                {branch.items.map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-[13px] text-fg/70">
                    <span className="h-1 w-1 rounded-full shrink-0" style={{ background: hex }} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </ExpandableSection>
        </div>
      </motion.div>
    </div>
  );
}

// ─── Origin story / git init intro ────────────────────────────────────────────

type OriginLang = { lang: string; flag: string; level: string };

type OriginStep = {
  id: string;
  cmd: string;
  output: string[];
  city: string;
  country: string;
  flag: string;
  // Short narrative tag shown next to the trunk commit dot.
  trunkLabel: string;
  languages: OriginLang[];
  // SVG map coordinates in a 320x180 viewBox — roughly Europe-shaped layout.
  coords: { x: number; y: number };
  // Path for the country shape on the map (same viewBox).
  countryPath: string;
  hashColor: string;
  // Year used for branch fork mapping (origin anchor) and ordering.
  year: number;
};

// Hand-drawn country outlines for the 320x180 map viewBox. Stylised silhouettes
// — Italy as a leg/boot, Germany as an irregular hex, Switzerland as a tiny
// kidney, Russia as a wide blob running off the right edge.
const ITALY_PATH =
  "M132 116 L146 112 L158 112 L166 116 L170 124 L172 134 L166 144 L168 152 L172 160 L178 168 L172 172 L162 168 L156 162 L156 170 L160 178 L152 180 L146 174 L142 166 L136 156 L130 144 L126 132 L128 122 Z";
const GERMANY_PATH =
  "M134 80 L142 72 L156 68 L170 68 L182 72 L188 80 L188 90 L186 100 L180 108 L172 114 L160 116 L152 112 L146 104 L140 96 L136 88 Z";
const SWITZERLAND_PATH =
  "M108 110 L118 106 L130 106 L140 110 L142 116 L138 122 L128 124 L116 122 L110 118 Z";
const RUSSIA_PATH =
  "M214 22 L240 16 L270 12 L320 10 L320 50 L320 80 L320 102 L308 106 L290 104 L272 100 L254 92 L238 82 L224 70 L218 56 L214 38 Z";

// Faint context outlines — neighbours so the highlighted countries don't
// float in empty space. Always visible at low opacity, no animation.
// Origin span — used to year-position trunk dots and to map "origin" branch
// fork years onto the same Y. INIT lives at year 2001; EPFL starts at 2020.
const ORIGIN_YEAR_START = 2001;
const ORIGIN_YEAR_END = 2020;
// Pixel buffers carved out of the OriginIntro section before mapping years:
// top buffer clears the INIT dot; bottom buffer leaves a visual gap before EP01.
const ORIGIN_TOP_BUFFER = 60;
const ORIGIN_BOTTOM_BUFFER = 40;

const CONTEXT_PATHS = [
  // France
  "M70 96 L92 92 L108 96 L114 108 L114 122 L106 130 L92 134 L78 134 L66 124 L62 110 Z",
  // Spain
  "M28 138 L60 134 L82 138 L82 156 L74 168 L52 172 L30 168 L20 156 Z",
  // UK
  "M52 52 L70 46 L78 56 L76 70 L66 78 L54 76 L46 66 Z",
  // Austria
  "M150 110 L178 110 L188 116 L182 122 L162 122 L150 118 Z",
  // Poland
  "M188 76 L218 76 L222 92 L216 104 L194 104 L186 92 Z",
  // Benelux blob
  "M118 76 L134 74 L138 84 L134 92 L122 94 L116 86 Z",
];

const ORIGIN_STEPS: OriginStep[] = [
  {
    id: "init",
    cmd: 'git init && git config user.name "Tommaso Gazzini"',
    output: [
      "→ born 1 Feb 2001 · Milan, Italy",
    ],
    city: "Milan",
    country: "Italy",
    flag: "🇮🇹",
    trunkLabel: "2001 · Milan",
    languages: [{ lang: "Italian", flag: "🇮🇹", level: "fluent" }],
    coords: { x: 152, y: 130 },
    countryPath: ITALY_PATH,
    hashColor: "#06b6d4",
    year: 2001,
  },
  {
    id: "germany",
    cmd: 'git commit -m "feat(life): relocated to Frankfurt, Germany"',
    output: [],
    city: "Frankfurt",
    country: "Germany",
    flag: "🇩🇪",
    trunkLabel: "2003 · Frankfurt, Germany",
    languages: [{ lang: "German", flag: "🇩🇪", level: "fluent" }],
    coords: { x: 158, y: 88 },
    countryPath: GERMANY_PATH,
    hashColor: "#f59e0b",
    year: 2003,
  },
  {
    id: "geneva",
    cmd: 'git commit -m "feat(life): moved to Geneva, Switzerland"',
    output: [],
    city: "Geneva",
    country: "Switzerland",
    flag: "🇨🇭",
    trunkLabel: "2010 · Geneva",
    languages: [
      { lang: "French", flag: "🇫🇷", level: "fluent" },
      { lang: "English", flag: "🇬🇧", level: "fluent" },
    ],
    coords: { x: 124, y: 114 },
    countryPath: SWITZERLAND_PATH,
    hashColor: "#e50914",
    year: 2010,
  },
  {
    id: "russia",
    cmd: 'git commit -m "exchange: learn Russian in Saint Petersburg"',
    output: [
      "→ speak fluently",
    ],
    city: "Saint Petersburg",
    country: "Russia",
    flag: "🇷🇺",
    trunkLabel: "2018 · Saint Petersburg",
    languages: [
      { lang: "Russian", flag: "🇷🇺", level: "fluent" },
      { lang: "Spanish", flag: "🇪🇸", level: "fluent" },
    ],
    coords: { x: 258, y: 46 },
    countryPath: RUSSIA_PATH,
    hashColor: "#8b5cf6",
    year: 2018,
  },
];

// Renders a logo image, but silently hides if the file 404s. Lets us wire
// logo paths now and have the user drop assets in /public/logos/ later
// without ugly broken-image icons in the meantime.
function LogoImg({
  spec,
  className,
}: {
  spec?: LogoSpec;
  className?: string;
}) {
  const [errored, setErrored] = useState(false);
  if (!spec || errored) return null;
  return (
    <img
      src={spec.src}
      alt={spec.alt}
      className={className}
      onError={() => setErrored(true)}
      loading="lazy"
    />
  );
}

function PlaneSvg() {
  // Small paper-plane mark, rotates with motion path.
  return (
    <g>
      <path
        d="M-7 -3 L8 0 L-7 3 L-3 0 Z"
        fill="#fbbf24"
        stroke="#f59e0b"
        strokeWidth="0.8"
        strokeLinejoin="round"
      />
    </g>
  );
}

// Keywords in the terminal narrative that should pop. Each one is placed
// in exactly one location (cmd OR output OR trunkLabel within a single scene)
// so it never highlights twice in the same view.
// Order matters for the regex — list longer phrases before single-word ones
// so "Saint Petersburg" matches before "Russian" (which it doesn't contain,
// but Italy/Germany pairs would otherwise be ambiguous).
const ORIGIN_KEYWORDS = [
  "Tommaso Gazzini",
  "Saint Petersburg",
  "Frankfurt",
  "Milan",
  "Germany",
  "Geneva",
  "Russian",
];
const ORIGIN_KEYWORD_PATTERN = new RegExp(`(${ORIGIN_KEYWORDS.join("|")})`, "g");

function highlightKeywords(text: string): React.ReactNode[] {
  const parts = text.split(ORIGIN_KEYWORD_PATTERN);
  return parts.map((part, i) =>
    ORIGIN_KEYWORDS.includes(part) ? (
      // Coral / Netflix-warm — same #ff7043 used as the warm end of the trunk
      // scroll gradient, so highlights feel native to the page palette.
      <span key={i} className="text-[#ff7043] font-semibold">
        {part}
      </span>
    ) : (
      <React.Fragment key={i}>{part}</React.Fragment>
    ),
  );
}

// Preserved for the graveyard — see end-of-file comment block.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function OriginIntro({ setEraRef }: { setEraRef?: (node: HTMLDivElement | null) => void }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  const [step, setStep] = useState(-1);

  const attachRef = useCallback(
    (node: HTMLDivElement | null) => {
      ref.current = node;
      setEraRef?.(node);
    },
    [setEraRef],
  );

  useEffect(() => {
    if (!inView) return;
    const timeouts: number[] = [];
    // 600ms in: first commit. Each subsequent commit ~1.9s later.
    ORIGIN_STEPS.forEach((_, i) => {
      timeouts.push(window.setTimeout(() => setStep(i), 600 + i * 1900));
    });
    return () => timeouts.forEach((t) => window.clearTimeout(t));
  }, [inView]);

  const activeData = step >= 0 ? ORIGIN_STEPS[step] : null;
  const typedCmd = useTypewriter(activeData?.cmd ?? "", 22, !!activeData);
  const cmdComplete = !!activeData && typedCmd.length === activeData.cmd.length;

  const allLangs = useMemo(() => {
    const seen = new Set<string>();
    const out: OriginLang[] = [];
    for (let i = 0; i <= step && i < ORIGIN_STEPS.length; i++) {
      for (const l of ORIGIN_STEPS[i].languages) {
        if (!seen.has(l.lang)) {
          out.push(l);
          seen.add(l.lang);
        }
      }
    }
    return out;
  }, [step]);

  const litCount = Math.max(0, step + 1);
  const litCities = ORIGIN_STEPS.slice(0, litCount);
  const trailPath =
    litCities.length > 1
      ? "M " + litCities.map((c) => `${c.coords.x} ${c.coords.y}`).join(" L ")
      : "";
  const planePos = activeData?.coords ?? ORIGIN_STEPS[0].coords;

  const allLangsDone = step >= ORIGIN_STEPS.length - 1 && cmdComplete;

  // Year fraction within the OriginIntro span: 2001 (init) → 2020 (EPFL start).
  // Used both here (CSS calc) and inside yAtYear("origin") so a fork at year Y
  // lands exactly on the matching trunk dot.
  const yearFraction = (yr: number) =>
    Math.max(0, Math.min(1, (yr - ORIGIN_YEAR_START) / (ORIGIN_YEAR_END - ORIGIN_YEAR_START)));

  return (
    <div ref={attachRef} className="relative mb-20">
      {/* INIT era dot — same geometry as other era dots */}
      <motion.div
        className="absolute left-0 top-0 w-12 h-12 flex items-center justify-center rounded-full bg-[#141414] border-2 z-10"
        style={{ borderColor: "#06b6d4" }}
        initial={{ scale: 0.2, opacity: 0 }}
        animate={inView ? { scale: 1, opacity: 1 } : { scale: 0.2, opacity: 0 }}
        transition={{ duration: 0.45, ease }}
      >
        <span className="text-[9px] font-mono font-bold tracking-wider text-cyan-400">
          INIT
        </span>
      </motion.div>

      {/* Main-branch commit dots — small dots stacked on the trunk, one per
          ORIGIN_STEP. Each appears as the corresponding terminal commit fires.
          Hidden on mobile (no trunk visible). */}
      <div className="hidden lg:block absolute inset-y-0 left-0 z-[8] pointer-events-none">
        {ORIGIN_STEPS.map((s, i) => {
          const f = yearFraction(s.year);
          const lit = i <= step;
          // Year-proportional position: 2001 sits just below INIT (top buffer),
          // 2018 sits near the bottom (clear of EP01), with elapsed years between.
          const top = `calc(${ORIGIN_TOP_BUFFER}px + ${f} * (100% - ${ORIGIN_TOP_BUFFER + ORIGIN_BOTTOM_BUFFER}px))`;
          return (
            <motion.div
              key={`commit-${s.id}`}
              className="absolute flex items-center gap-2"
              style={{ top, left: 18 }}
              initial={{ opacity: 0, scale: 0.3 }}
              animate={lit ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.3 }}
              transition={{ duration: 0.5, ease }}
            >
              <div
                className="w-3 h-3 rounded-full border-2 bg-[#141414]"
                style={{
                  borderColor: "rgba(255,255,255,0.45)",
                  boxShadow: "0 0 6px rgba(255,255,255,0.18)",
                }}
              />
              <span className="text-[9px] font-mono font-medium whitespace-nowrap text-fg/70">
                {s.flag} {highlightKeywords(s.trunkLabel)}
              </span>
            </motion.div>
          );
        })}
      </div>

      <div className="pl-16 sm:pl-20 lg:pl-44">
        <motion.div
          {...fadeUp(0)}
          className="flex flex-wrap items-center gap-3 mb-2"
        >
          <span className="text-[10px] font-mono text-muted/50">2001 – 2017</span>
          <span className="text-[10px] uppercase tracking-[0.3em] text-fg/45">
            Origin · before EPFL
          </span>
        </motion.div>

        <motion.h3
          {...fadeUp(0.05)}
          className="font-playfair text-2xl sm:text-3xl font-bold mb-3"
        >
          <span className="font-mono text-fg/30">~/tommaso $ </span>
          <span className="text-[#ff7043]">git init</span>
        </motion.h3>

        {/* Composite panel: terminal foreground + map background. The map sits
            as a faded backdrop so the country shapes light up *behind* the
            commit messages — one calm canvas instead of two competing panels. */}
        <motion.div
          {...fadeUp(0.12)}
          className="relative rounded-xl border border-white/10 bg-black/85 overflow-hidden shadow-2xl"
        >
          {/* Map background — desaturated, low opacity, no grid noise.
              The country fills + plane animate on top of the dark base. */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: step >= 0 ? 0.32 : 0 }}
            transition={{ duration: 1.0, ease }}
          >
            <svg
              viewBox="0 0 320 180"
              preserveAspectRatio="xMidYMid slice"
              className="w-full h-full"
              style={{ overflow: "visible" }}
            >
              {/* Faint context countries — always on, set the scene */}
              {CONTEXT_PATHS.map((d, i) => (
                <path
                  key={`ctx-${i}`}
                  d={d}
                  fill="rgba(255,255,255,0.025)"
                  stroke="rgba(255,255,255,0.10)"
                  strokeWidth={0.8}
                  strokeLinejoin="round"
                />
              ))}
              {/* Lit countries — outline draws + fill fades in per commit */}
              {ORIGIN_STEPS.map((s, i) => {
                const isLit = i <= step;
                return (
                  <motion.path
                    key={`country-${s.id}`}
                    d={s.countryPath}
                    fill="rgba(255,255,255,0.12)"
                    stroke="rgba(255,255,255,0.65)"
                    strokeWidth={1.3}
                    strokeLinejoin="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={
                      isLit
                        ? { pathLength: 1, opacity: 1 }
                        : { pathLength: 0, opacity: 0 }
                    }
                    transition={{ duration: 0.9, ease }}
                  />
                );
              })}
              {/* Trail (flight path) */}
              {trailPath && (
                <motion.path
                  key={trailPath}
                  d={trailPath}
                  stroke="#ff7043"
                  strokeWidth={1.4}
                  strokeDasharray="3 4"
                  fill="none"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.7 }}
                  transition={{ duration: 1.0, ease }}
                />
              )}
              {/* City dots */}
              {ORIGIN_STEPS.map((s, i) => {
                const isLit = i <= step;
                return (
                  <g key={s.id}>
                    {isLit && (
                      <motion.circle
                        cx={s.coords.x}
                        cy={s.coords.y}
                        r={14}
                        fill="rgba(255,112,67,0.30)"
                        initial={{ scale: 0 }}
                        animate={{ scale: [0, 1.6, 1] }}
                        transition={{ duration: 0.9, ease }}
                      />
                    )}
                    <circle
                      cx={s.coords.x}
                      cy={s.coords.y}
                      r={3.6}
                      fill={isLit ? "#ff7043" : "rgba(255,255,255,0.18)"}
                      stroke={isLit ? "#fff" : "transparent"}
                      strokeWidth={1}
                    />
                  </g>
                );
              })}
              {/* Plane */}
              {step >= 0 && (
                <motion.g
                  animate={{ x: planePos.x, y: planePos.y }}
                  transition={{ duration: 1.4, ease }}
                  initial={{ x: ORIGIN_STEPS[0].coords.x, y: ORIGIN_STEPS[0].coords.y }}
                >
                  <PlaneSvg />
                </motion.g>
              )}
            </svg>
            {/* Vignette so terminal text stays legible across the whole panel */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/35" />
          </motion.div>

          {/* Terminal foreground */}
          <div className="relative z-10 font-mono">
            <div className="flex items-center gap-1.5 border-b border-white/10 px-3 py-2 bg-white/[0.03]">
              <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
              <span className="ml-3 text-[10px] text-muted/45 tracking-wide">
                tommaso@origin: ~ — zsh
              </span>
              <span className="ml-auto text-[9px] uppercase tracking-[0.25em] text-fg/30">
                {activeData ? `${activeData.flag} ${activeData.city}` : ""}
              </span>
            </div>
            <div className="p-5 sm:p-6 min-h-[280px] text-[12.5px] leading-relaxed space-y-3">
              {ORIGIN_STEPS.slice(0, step + 1).map((s, i) => {
                const isCurrent = i === step;
                const echoed = isCurrent ? typedCmd : s.cmd;
                const showOutput = !isCurrent || cmdComplete;
                return (
                  <motion.div
                    key={s.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex flex-wrap items-center">
                      <span className="text-cyan-400/45">~/tommaso</span>
                      <span className="text-fg/25">&nbsp;$&nbsp;</span>
                      <span className="text-fg/55 break-all">{highlightKeywords(echoed)}</span>
                      {isCurrent && !cmdComplete && (
                        <span className="ml-0.5 inline-block w-2 h-3.5 bg-cyan-400/70 align-middle animate-blink" />
                      )}
                    </div>
                    {showOutput && s.output.length > 0 && (
                      <div className="mt-1.5 space-y-0.5 pl-1 text-fg/35">
                        {s.output.map((line, li) => (
                          <motion.div
                            key={li}
                            initial={{ opacity: 0, x: -4 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.25, delay: 0.06 * li }}
                          >
                            {highlightKeywords(line)}
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </motion.div>
                );
              })}
              {step < 0 && (
                <div>
                  <span className="text-cyan-400/45">~/tommaso</span>
                  <span className="text-fg/25">&nbsp;$&nbsp;</span>
                  <span className="ml-0.5 inline-block w-2 h-3.5 bg-cyan-400/70 align-middle animate-blink" />
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Compact languages chip row — fills as commits land */}
        <div className="mt-4 flex flex-wrap gap-1.5">
          <AnimatePresence initial={false}>
            {allLangs.map((l) => (
              <motion.span
                key={l.lang}
                layout
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease }}
                className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.025] px-2.5 py-1 text-[11px] text-fg/70"
              >
                <span className="text-sm leading-none">{l.flag}</span>
                <span>{l.lang}</span>
                <span className="text-[8.5px] font-mono uppercase tracking-wider text-fg/35">
                  {l.level}
                </span>
              </motion.span>
            ))}
          </AnimatePresence>
        </div>

        {/* Why microengineering? — slides in once the cinematic ends.
            Bridges the origin story into the EPFL era below. */}
        {allLangsDone && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease }}
            className="mt-4 rounded-xl border border-white/10 bg-white/[0.025] p-4 max-w-2xl"
          >
            <div className="text-[9px] uppercase tracking-[0.25em] text-fg/45 mb-2">
              why microengineering?
            </div>
            <p className="text-[12.5px] text-fg/80 leading-relaxed">
              Big technology. Passionate entrepreneur. Everything combines into{" "}
              <span className="text-[#ff7043] font-semibold">robotics</span>.
              That&rsquo;s why I chose{" "}
              <span className="text-[#ff7043] font-semibold">microengineering at EPFL</span>.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}

function EraNode({
  era,
  isLast = false,
  setEraRef,
  getBranchCardRef,
}: {
  era: EraData;
  isLast?: boolean;
  setEraRef?: (node: HTMLDivElement | null) => void;
  getBranchCardRef?: (id: string) => (node: HTMLDivElement | null) => void;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });
  const colors = accentColors[era.accent];
  const hex = accentHex[era.accent];
  const hasBranches = (era.branches?.length ?? 0) > 0;
  const isLg = useIsLg();
  const [expanded, setExpanded] = useState(false);

  const attachRef = useCallback(
    (node: HTMLDivElement | null) => {
      ref.current = node;
      setEraRef?.(node);
    },
    [setEraRef],
  );

  return (
    <div ref={attachRef} className={`relative ${isLast ? "" : "mb-20"}`}>
      {/* Episode dot — wide gradient-ring merge commit when isConvergence */}
      {era.isConvergence ? (
        <>
          {/* Converging halo above the merge node — visually pulls the branches in */}
          <div
            className="hidden lg:block absolute -left-12 pointer-events-none"
            style={{
              top: -180,
              width: 200,
              height: 200,
              background:
                "radial-gradient(ellipse 60% 80% at 50% 95%, rgba(229,9,20,0.18), rgba(217,70,239,0.10) 40%, transparent 70%)",
              filter: "blur(6px)",
            }}
          />
          <motion.div
            className="absolute -left-4 -top-4 w-20 h-20 z-10"
            initial={{ scale: 0.2, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.2, opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Outer pulsing aura — the merge commit gravity well */}
            <motion.div
              className="absolute -inset-4 rounded-full"
              style={{
                background:
                  "radial-gradient(circle, rgba(229,9,20,0.35), rgba(217,70,239,0.20) 45%, transparent 75%)",
                filter: "blur(14px)",
              }}
              animate={{ opacity: [0.5, 1, 0.5], scale: [0.95, 1.08, 0.95] }}
              transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
            />
            {/* Conic gradient ring */}
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background:
                  "conic-gradient(from 0deg, #06b6d4, #6366f1, #8b5cf6, #d946ef, #ff7043, #e50914, #06b6d4)",
                filter: "blur(0.5px)",
              }}
            />
            {/* Inner dark disc — year + MERGE label */}
            <div className="absolute inset-[3px] rounded-full bg-[#141414] flex flex-col items-center justify-center">
              <span
                className="text-base font-mono font-bold text-transparent bg-clip-text leading-none"
                style={{
                  backgroundImage:
                    "linear-gradient(135deg, #e50914, #d946ef, #ff7043)",
                }}
              >
                {Math.floor(era.startYear)}
              </span>
              <span className="text-[7px] font-mono font-bold tracking-[0.2em] text-fg/70 mt-1">
                MERGE
              </span>
            </div>
          </motion.div>
          {/* 24/7 robotics pill — anchored to the merge node */}
          <motion.div
            className="absolute -left-4 z-20"
            style={{ top: 76 }}
            initial={{ opacity: 0, y: -6 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -6 }}
            transition={{ duration: 0.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#e50914]/35 bg-[#e50914]/[0.10] px-2.5 py-1 text-[9px] font-mono font-bold tracking-[0.15em] text-[#ff7043] whitespace-nowrap">
              <span className="h-1.5 w-1.5 rounded-full bg-[#e50914] animate-pulse" />
              24/7 · ON-SITE
            </span>
          </motion.div>
        </>
      ) : (
        <motion.div
          className="absolute left-0 top-0 w-12 h-12 flex items-center justify-center rounded-full bg-[#141414] border-2 z-10"
          style={{ borderColor: hex }}
          initial={{ scale: 0.2, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.2, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="text-[11px] font-mono font-bold tabular-nums" style={{ color: hex }}>
            {Math.floor(era.startYear)}
          </span>
        </motion.div>
      )}

      {/* Era main content — full width past the dot; lg+ shifts to clear the SVG lane band */}
      <div className="pl-16 sm:pl-20 lg:pl-44">
        <motion.div
          className="flex flex-wrap items-center gap-3 mb-2"
          initial={{ opacity: 0, y: 8 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
          transition={{ duration: 0.4, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="text-xs font-mono text-muted/60">{era.year}</span>
          <span className={`text-[11px] uppercase tracking-[0.3em] ${colors.text}`}>{era.eyebrow}</span>
        </motion.div>

        <motion.div
          className="flex items-center gap-3 sm:gap-4 mb-3 flex-wrap"
          initial={{ opacity: 0, x: -16 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -16 }}
          transition={{ duration: 0.45, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          <h3 className="font-playfair text-2xl sm:text-3xl font-bold">
            {era.isConvergence ? (
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] via-[#d946ef] to-[#ff7043]">
                {era.title}
              </span>
            ) : era.title}
          </h3>
          <LogoImg spec={era.logo} className="h-7 sm:h-8 w-auto opacity-90" />
        </motion.div>

        {/* Punch bullets — always visible, the skim path */}
        {era.summary && era.summary.length > 0 && (
          <motion.ul
            className="space-y-2 mb-5 max-w-2xl"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.4, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            {era.summary.map((s, i) => (
              <li
                key={i}
                className="flex items-start gap-2.5 text-base text-fg/85 leading-relaxed"
              >
                <span className="mt-[10px] h-1.5 w-1.5 rounded-full bg-[#ff7043] shrink-0" />
                <span>{s}</span>
              </li>
            ))}
          </motion.ul>
        )}

        {/* Expand toggle — opens hero photo + full description + items + stat */}
        <ExpandToggle
          expanded={expanded}
          onClick={() => setExpanded((e) => !e)}
          className="mb-2"
        />

        <ExpandableSection expanded={expanded}>
          <div className="pt-4 max-w-2xl space-y-5">
            {/* Era hero image — revealed on click. The image carries place
                and feel; the bullets above carry the story. */}
            {era.bgImage && (
              <div className={`relative w-full aspect-[16/9] rounded-2xl overflow-hidden border ${colors.border}`}>
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url('${era.bgImage}')` }}
                />
                <div className="absolute inset-0 bg-[#141414]/45" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#141414]/85 via-[#141414]/15 to-transparent" />
                {era.id === "sf" && (
                  <>
                    <div className="absolute top-3 right-3 flex items-center gap-2 rounded-full bg-black/70 backdrop-blur-sm border border-white/15 px-3 py-1.5">
                      <span className="text-base leading-none">🇨🇭</span>
                      <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-white/85">
                        GRENADIER · ISONE
                      </span>
                    </div>
                    <div className="absolute bottom-3 left-3 font-mono text-[11px] text-white/70">
                      <span className="text-[#4ade80]">commit</span> waterpolo →{" "}
                      <span className="text-white/90">main</span>
                    </div>
                  </>
                )}
              </div>
            )}

            <p className="text-base text-muted leading-relaxed">
              {era.description}
            </p>

            <div className="space-y-2">
              {era.items.map((item, j) => (
                <div
                  key={j}
                  className="flex items-center gap-2.5 text-[15px] text-fg/80"
                >
                  <span className="h-1.5 w-1.5 rounded-full shrink-0" style={{ background: hex }} />
                  {item}
                </div>
              ))}
            </div>

            {era.stat && (
              <div
                className={`inline-flex items-center rounded-2xl border ${colors.border} ${colors.bg} px-5 py-3`}
              >
                <span className={`font-playfair text-3xl font-bold ${colors.text}`}>{era.stat}</span>
              </div>
            )}
          </div>
        </ExpandableSection>
      </div>

      {/* Branch cards — indented to their lane on lg+, stacked vertically.
          Each card has a commit dot anchored on its lane line. */}
      {hasBranches && (
        <div className="pl-16 sm:pl-20 lg:pl-0 mt-8 flex flex-col gap-5">
          {era.branches!.map((branch, bi) => {
            const laneX = laneOf(branch);
            const indent = isLg
              ? Math.max(laneX + CARD_LANE_OFFSET, MIN_SUBCARD_INDENT_PX)
              : 0;
            // Distance from the card's left edge back to its lane line — the
            // dot sits on the lane, the tick spans the gap. Varies per branch
            // since cards are floored to a shared indent column.
            const tickReach = isLg ? indent - laneX : 0;
            const branchHex = accentHex[branch.accent];
            return (
              <div
                key={bi}
                ref={getBranchCardRef?.(branch.id)}
                className="relative max-w-[520px]"
                style={{ marginLeft: indent }}
              >
                {/* Horizontal tick from the lane to the card edge — visual tether */}
                {isLg && (
                  <span
                    className="absolute top-[22px] h-px pointer-events-none"
                    style={{
                      left: -tickReach + 6,
                      width: tickReach - 12,
                      background: branchHex,
                      opacity: 0.5,
                    }}
                  />
                )}
                {/* Commit dot on the lane line */}
                {isLg && (
                  <span
                    className="absolute top-[18px] w-2.5 h-2.5 rounded-full border-2 bg-[#141414] z-20"
                    style={{
                      left: -tickReach - 5,
                      borderColor: branchHex,
                      boxShadow: `0 0 10px ${branchHex}88`,
                    }}
                  />
                )}
                <BranchCard branch={branch} delay={0.2 + bi * 0.12} />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

type ComputedPath = {
  id: string;
  d: string;
  color: string;
  // Per-path scroll progress range (in 0..1 of section's scrollYProgress)
  // so each branch finishes drawing as its merge-point area approaches viewport center.
  fadeStart: number;
  fadeEnd: number;
};

type ForkMarker = {
  id: string;
  y: number;
  color: string;
  label: string;
  fadeStart: number;
};

// Small "commit on the trunk" indicator at fork points — shows the year/month
// when a branch was created. Fades in synced with the path's draw animation.
function ForkMarkerView({
  marker,
  scrollYProgress,
}: {
  marker: ForkMarker;
  scrollYProgress: MotionValue<number>;
}) {
  const opacity = useTransform(
    scrollYProgress,
    [Math.max(0, marker.fadeStart - 0.04), marker.fadeStart + 0.02, 1],
    [0, 1, 1],
    { clamp: true },
  );
  return (
    <motion.div
      className="hidden lg:flex absolute z-[8] items-center gap-2 pointer-events-none"
      style={{ left: 18, top: marker.y - 6, opacity }}
    >
      <div
        className="w-3 h-3 rounded-full border-2 bg-[#141414]"
        style={{
          borderColor: marker.color,
          boxShadow: `0 0 8px ${marker.color}88`,
        }}
      />
      <span
        className="text-[9px] font-mono font-bold tracking-wider whitespace-nowrap"
        style={{ color: marker.color }}
      >
        {marker.label}
      </span>
    </motion.div>
  );
}

// One <path> per branch. Each path has its own scroll-progress range so
// short branches (Lovable loop) and long branches (Water Polo) feel paced
// to where the user is currently scrolled.
function BranchPath({
  data,
  scrollYProgress,
}: {
  data: ComputedPath;
  scrollYProgress: MotionValue<number>;
}) {
  const pathLength = useTransform(
    scrollYProgress,
    [data.fadeStart, data.fadeEnd],
    [0, 1],
    { clamp: true },
  );
  return (
    <motion.path
      d={data.d}
      stroke={data.color}
      strokeWidth={2.5}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ pathLength, opacity: 0.92 }}
    />
  );
}

function GitTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const tracksRef = useRef<HTMLDivElement>(null);
  const eraNodes = useRef<Record<string, HTMLDivElement | null>>({});
  const refSetters = useRef<Record<string, (node: HTMLDivElement | null) => void>>({});
  const branchCardNodes = useRef<Record<string, HTMLDivElement | null>>({});
  const branchCardSetters = useRef<Record<string, (node: HTMLDivElement | null) => void>>({});
  const [paths, setPaths] = useState<ComputedPath[]>([]);
  const [forkMarkers, setForkMarkers] = useState<ForkMarker[]>([]);
  const [tracksHeight, setTracksHeight] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end 20%"],
  });

  const getEraRef = useCallback((id: string) => {
    if (!refSetters.current[id]) {
      refSetters.current[id] = (node: HTMLDivElement | null) => {
        eraNodes.current[id] = node;
      };
    }
    return refSetters.current[id];
  }, []);

  const getBranchCardRef = useCallback((id: string) => {
    if (!branchCardSetters.current[id]) {
      branchCardSetters.current[id] = (node: HTMLDivElement | null) => {
        branchCardNodes.current[id] = node;
      };
    }
    return branchCardSetters.current[id];
  }, []);

  const recompute = useCallback(() => {
    const tracks = tracksRef.current;
    if (!tracks) return;
    const cRect = tracks.getBoundingClientRect();
    setTracksHeight(cRect.height);

    const TRUNK_X = TIMELINE_TRUNK_X;
    const LANE_X = TIMELINE_LANE_X;
    const LOOP_X = TIMELINE_LOOP_X;
    const FORK_REACH = 28;
    // Branches that merge into the Robot Learning Team funnel hard over the last
    // ~110px so the eye sees them collapse into a single point.
    const MERGE_FUNNEL = 120;

    const eraY: Record<string, number> = { "above-ep01": 0 };
    for (const era of GIT_ERAS) {
      const node = eraNodes.current[era.id];
      if (!node) continue;
      const r = node.getBoundingClientRect();
      // Convergence node is 80px (centered at -16,-16 → center y = top + 24);
      // standard node is 48px at top:0 → center y = top + 24. Same in both.
      eraY[era.id] = r.top - cRect.top + 24;
    }
    // Origin section's top in tracksRef coords — used by the "origin" anchor
    // to map ORIGIN_STEPS years to the same trunk dot positions rendered in OriginIntro.
    const originNode = eraNodes.current["origin"];
    const originTop = originNode
      ? originNode.getBoundingClientRect().top - cRect.top
      : 0;

    // Map a (forkAt era, year) tuple to a Y position. Year is mapped
    // proportionally between the era's startYear and the next era's startYear.
    // Falls back to the era's dot Y if year is undefined or out of range.
    const yAtYear = (anchor: BranchAnchor, year: number | undefined): number => {
      if (anchor === "above-ep01") return 0;
      if (anchor === "origin") {
        // Mirror the year-fraction CSS calc used by the trunk dots in
        // OriginIntro: a fork at year Y lands at the same Y as the matching
        // commit dot, regardless of how the section's actual height resolves.
        if (!originNode) return originTop + ORIGIN_TOP_BUFFER;
        const sectionH = originNode.getBoundingClientRect().height;
        const usable = Math.max(0, sectionH - ORIGIN_TOP_BUFFER - ORIGIN_BOTTOM_BUFFER);
        const fraction = year === undefined
          ? 0
          : Math.max(0, Math.min(1, (year - ORIGIN_YEAR_START) / (ORIGIN_YEAR_END - ORIGIN_YEAR_START)));
        return originTop + ORIGIN_TOP_BUFFER + fraction * usable;
      }
      const eraIdx = GIT_ERAS.findIndex((e) => e.id === anchor);
      if (eraIdx === -1) return eraY[anchor] ?? 0;
      const era = GIT_ERAS[eraIdx];
      const eraDotY = eraY[era.id] ?? 0;
      if (year === undefined) return eraDotY;
      const nextEra = GIT_ERAS[eraIdx + 1];
      const nextDotY = nextEra ? eraY[nextEra.id] ?? eraDotY + 200 : eraDotY + 200;
      // Map years against the visible card body, not the gap above the next dot.
      // Each era ends with mb-20 (~80px); without subtracting it, ratio=1.0 lands
      // on the next dot itself, leaving fork lanes nowhere to run before merging.
      const eraGap = 80;
      const cardEnd = Math.max(eraDotY + 60, nextDotY - eraGap);
      const startYear = era.startYear;
      const endYear = nextEra ? nextEra.startYear : startYear + 1;
      if (endYear <= startYear) return eraDotY;
      const ratio = Math.max(0, Math.min(1, (year - startYear) / (endYear - startYear)));
      return eraDotY + ratio * (cardEnd - eraDotY);
    };

    const allBranches = GIT_ERAS.flatMap((e) => e.branches ?? []);
    const newPaths: ComputedPath[] = [];
    const newForkMarkers: ForkMarker[] = [];

    // Trunk-synced scroll mapping. The trunk uses `scaleY: scrollYProgress`
    // and fills the section linearly, so its stroke front Y at scroll p
    // equals p * sectionH. Branches use the same mapping so their stroke
    // front advances down the lane at the exact same Y-velocity as the
    // trunk. No lookahead/lookbehind buffers — those decoupled branch rate
    // from trunk rate and caused short branches to "race" past long ones.
    const sectionH = cRect.height;
    const trunkScrollAt = (y: number) =>
      Math.max(0, Math.min(1, y / Math.max(1, sectionH)));

    // Read a branch card's Y range in section coords. Cards are placed by
    // flex layout (not by year), so for branches whose forkYear maps to a
    // Y *below* the card's actual flex-positioned top, the year-derived
    // lane vertical starts below the card and the dot floats with no line
    // beneath it. This helper lets every path computation extend its lane
    // to encompass the card so the dot always lands on a line.
    const CARD_BUFFER = 20;
    const cardYRange = (id: string): { top: number; bottom: number } | null => {
      const node = branchCardNodes.current[id];
      if (!node) return null;
      const r = node.getBoundingClientRect();
      return { top: r.top - cRect.top, bottom: r.bottom - cRect.top };
    };

    for (const b of allBranches) {
      // Use forkYear to position fork point proportionally within the era.
      const fy = yAtYear(b.forkAt, b.forkYear);
      const color = accentHex[b.accent];

      // Self-merging branch with explicit mergeYear (Lovable): runs in its
      // own lane fork→lane→merge. The lane vertical is extended to span the
      // card's actual DOM Y range so the card's commit dot (positioned at
      // top+22) always lands on the lane line, regardless of where the year
      // mapping puts fy/my.
      if (b.forkAt === b.mergeAt && b.mergeYear !== undefined) {
        const lx = LANE_X[b.lane] ?? 72;
        const reach = FORK_REACH;
        const card = cardYRange(b.id);
        let my = yAtYear(b.mergeAt, b.mergeYear);
        // Lane vertical Y range — encompasses both the year-mapped span
        // (fy+R, my-R) AND the card's Y range. Whichever is larger wins.
        const laneTop = card
          ? Math.min(fy + reach, card.top - CARD_BUFFER)
          : fy + reach;
        let laneBottom = card
          ? Math.max(my - reach, card.bottom + CARD_BUFFER)
          : my - reach;
        // If the card's bottom forces the lane past the year-mapped my,
        // push my down so the merge curve still has room to resolve.
        if (card && card.bottom + CARD_BUFFER + reach > my) {
          my = card.bottom + CARD_BUFFER + reach;
          laneBottom = my - reach;
        }
        const d = [
          `M ${TRUNK_X} ${fy}`,
          `C ${TRUNK_X} ${(fy + laneTop) / 2}, ${lx} ${(fy + laneTop) / 2}, ${lx} ${laneTop}`,
          `L ${lx} ${laneBottom}`,
          `C ${lx} ${(laneBottom + my) / 2}, ${TRUNK_X} ${(laneBottom + my) / 2}, ${TRUNK_X} ${my}`,
        ].join(" ");
        // Fade window covers the entire vertical extent (fork year through
        // merge), so the path draws in lockstep with the trunk.
        const fadeStart = trunkScrollAt(Math.min(fy, laneTop));
        const fadeEnd = trunkScrollAt(my);
        newPaths.push({ id: b.id, d, color, fadeStart, fadeEnd });
        if (b.forkLabel) {
          newForkMarkers.push({
            id: b.id,
            y: fy,
            color,
            label: b.forkLabel,
            fadeStart,
          });
        }
        continue;
      }

      const my = eraY[b.mergeAt];
      if (my === undefined) continue;

      // Legacy self-loop fallback (no branch uses this path now, but kept for
      // forward compatibility if a branch wants the small LOOP_X excursion).
      if (b.forkAt === b.mergeAt) {
        const loopH = b.loopHeight ?? 100;
        const startY = fy;
        const endY = startY + loopH;
        const apexY = startY + loopH / 2;
        const d = [
          `M ${TRUNK_X} ${startY}`,
          `C ${TRUNK_X} ${startY + 14}, ${LOOP_X} ${startY + 14}, ${LOOP_X} ${apexY - 14}`,
          `L ${LOOP_X} ${apexY + 14}`,
          `C ${LOOP_X} ${endY - 14}, ${TRUNK_X} ${endY - 14}, ${TRUNK_X} ${endY}`,
        ].join(" ");
        const fadeStart = trunkScrollAt(startY);
        const fadeEnd = trunkScrollAt(endY);
        newPaths.push({ id: b.id, d, color, fadeStart, fadeEnd });
        if (b.forkLabel) {
          newForkMarkers.push({
            id: b.id,
            y: startY,
            color,
            label: b.forkLabel,
            fadeStart,
          });
        }
        continue;
      }

      const lx = LANE_X[b.lane] ?? 72;
      const isFinalMerge = b.mergeAt === "ep04";
      const mergeReach = isFinalMerge ? MERGE_FUNNEL : FORK_REACH;
      const card = cardYRange(b.id);

      // Pre-existing thread (Water Polo): starts at top of section, no fork curve
      if (b.forkAt === "above-ep01") {
        // Lane bottom: at least cover the card; cap before the merge curve
        // so the funnel still has room to pull toward the trunk.
        let laneBottom = my - mergeReach;
        if (card) {
          laneBottom = Math.max(laneBottom, card.bottom + CARD_BUFFER);
          laneBottom = Math.min(laneBottom, my - 32);
        }
        const funnelH = my - laneBottom;
        const c1yWP = laneBottom + funnelH * 0.45;
        const c2yWP = laneBottom + funnelH * 0.6;
        const d = [
          `M ${lx} 0`,
          `L ${lx} ${laneBottom}`,
          `C ${lx} ${c1yWP}, ${TRUNK_X} ${c2yWP}, ${TRUNK_X} ${my}`,
        ].join(" ");
        const fadeStart = 0;
        const fadeEnd = trunkScrollAt(my);
        newPaths.push({ id: b.id, d, color, fadeStart, fadeEnd });
        continue;
      }

      // Clamp fy so the lane has at least a small visible run before the merge
      // funnel begins. Without this, late forkYears produce a backward zig-zag
      // path (lane "runs up" then funnels down) — the "appears from nowhere"
      // bug at the convergence end of the timeline.
      const minLaneRun = 24;
      const maxFy = my - mergeReach - FORK_REACH - minLaneRun;
      const fyDraw = Math.min(fy, Math.max(0, maxFy));

      // Lane vertical Y range — encompasses both the year-mapped fork point
      // (fyDraw + REACH) AND the card's actual flex-positioned Y range, so
      // the card's commit dot always lands on a visible line. Without this,
      // any branch where forkYear maps below the card top (e.g. Stack Auth
      // forking at year 2025.55 while its card sits higher in the flex
      // stack) leaves the card "in the void" with a dot floating above
      // where the lane begins.
      const laneTop = card
        ? Math.min(fyDraw + FORK_REACH, card.top - CARD_BUFFER)
        : fyDraw + FORK_REACH;
      let laneBottom = my - mergeReach;
      if (card) {
        laneBottom = Math.max(laneBottom, card.bottom + CARD_BUFFER);
        // Keep at least 32px of room for the funnel curve to pull back
        // to the trunk; squashing it produces a kinked merge.
        laneBottom = Math.min(laneBottom, my - 32);
      }
      // Recompute funnel control points relative to actual laneBottom, not
      // the year-mapped mergeReach. Otherwise an extended lane would run
      // past where the cubic is anchored and produce a visual kink.
      const funnelH = my - laneBottom;
      const c1y = laneBottom + funnelH * 0.45;
      const c2y = laneBottom + funnelH * 0.6;

      // Standard branch: fork curve from trunk → vertical lane through card
      // → merge funnel back to the trunk.
      const d = [
        `M ${TRUNK_X} ${fyDraw}`,
        `C ${TRUNK_X} ${(fyDraw + laneTop) / 2}, ${lx} ${(fyDraw + laneTop) / 2}, ${lx} ${laneTop}`,
        `L ${lx} ${laneBottom}`,
        `C ${lx} ${c1y}, ${TRUNK_X} ${c2y}, ${TRUNK_X} ${my}`,
      ].join(" ");
      const fadeStart = trunkScrollAt(Math.min(fyDraw, laneTop));
      const fadeEnd = trunkScrollAt(my);
      newPaths.push({ id: b.id, d, color, fadeStart, fadeEnd });

      // Fork commit marker on the trunk — small dot + year label,
      // visible only when branch has explicit forkYear/forkLabel.
      if (b.forkLabel) {
        newForkMarkers.push({
          id: b.id,
          y: fyDraw,
          color,
          label: b.forkLabel,
          fadeStart,
        });
      }
    }

    setPaths(newPaths);
    setForkMarkers(newForkMarkers);
  }, []);

  useEffect(() => {
    recompute();
    const t1 = setTimeout(recompute, 200);
    const t2 = setTimeout(recompute, 800);
    window.addEventListener("resize", recompute);
    let ro: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined" && tracksRef.current) {
      ro = new ResizeObserver(() => recompute());
      ro.observe(tracksRef.current);
    }
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      window.removeEventListener("resize", recompute);
      ro?.disconnect();
    };
  }, [recompute]);

  return (
    <section id="journey" ref={containerRef} className="relative mx-auto max-w-5xl px-6 py-24 sm:px-10">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_20%,rgba(229,9,20,0.04),transparent)]" />

      <motion.div {...fadeUp(0)} className="mb-16">
        <SectionEyebrow>Before the science · who is this guy</SectionEyebrow>
        <h2 className="font-playfair text-5xl font-bold tracking-tight sm:text-6xl leading-[1.05]">
          How I got here
          <br />
          <span className="text-muted/70 font-normal">is my git story.</span>
        </h2>
        <p className="mt-5 text-base text-muted max-w-xl leading-relaxed">
          Every era is a commit. Every parallel thread is a real branch
          (water polo, Striker, Special Forces, Lovable, the YC detour, side
          projects). They diverge, run their course, and merge into the
          ETH Robotics Club, where I am right now.
          <br />
          <span className="font-mono text-xs text-muted/60 mt-2 inline-block">
            git log --graph --all
          </span>
        </p>
        <p className="mt-3 text-xs text-muted/50 max-w-xl">
          Click any era or branch to expand it. The science is below.
        </p>
      </motion.div>

      <div ref={tracksRef} className="relative">
        {/* Trunk track */}
        <div className="absolute left-[23px] top-4 bottom-4 w-[2px] bg-white/[0.07]" />
        {/* Scroll-driven trunk fill */}
        <motion.div
          className="absolute left-[23px] top-4 w-[2px] bg-gradient-to-b from-[#e50914] to-[#ff7043]"
          style={{
            scaleY: scrollYProgress,
            height: "calc(100% - 32px)",
            transformOrigin: "top",
          }}
        />
        {/* SVG branch overlay — lg+ only; paths reveal with scroll */}
        {tracksHeight > 0 && (
          <svg
            className="hidden lg:block pointer-events-none absolute inset-0 z-[5]"
            width="100%"
            height={tracksHeight}
            style={{ overflow: "visible" }}
          >
            {paths.map((p) => (
              <BranchPath key={p.id} data={p} scrollYProgress={scrollYProgress} />
            ))}
          </svg>
        )}
        {/* Fork commit markers — small year-tagged dots on the trunk
            where branches peel off (Striker 2022, Lovable Aug 2025, etc.) */}
        {forkMarkers.map((m) => (
          <ForkMarkerView key={m.id} marker={m} scrollYProgress={scrollYProgress} />
        ))}
        {/* Origin story — git init terminal cinematic before EPFL.
            Commented out during the simplification refactor. The component
            (~600 lines: animated map + paper-plane motion path + typewriter
            terminal) is preserved at the bottom of this file under
            ─── Graveyard ─── for future reuse.
            To revive: uncomment the line below. */}
        {/* <OriginIntro setEraRef={getEraRef("origin")} /> */}
        {GIT_ERAS.map((era, i) => (
          <EraNode
            key={era.id}
            era={era}
            isLast={i === GIT_ERAS.length - 1}
            setEraRef={getEraRef(era.id)}
            getBranchCardRef={getBranchCardRef}
          />
        ))}
      </div>
    </section>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
// Full-bleed Spline robot with a text card pinned to the lower-left. Robot
// stays interactive (cursor-follow works over the open right-and-centre of
// the frame). Scroll over the iframe is captured by Spline — the explicit
// "See what I built" button below is the escape hatch so the professor is
// never stuck. Spline watermark is left visible (free tier TOS).

function Hero() {
  const [showWhy, setShowWhy] = useState(false);
  const whyTyped = useTypewriter(WHY_TEXT, 20, showWhy);

  // Smooth-scroll to the journey section. Used by the "See what I built"
  // button so the professor can skip past the hero in one click instead
  // of fighting the Spline iframe's wheel-capture.
  const scrollToJourney = () => {
    const el = document.getElementById("journey");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Spline fills the viewport. Default pointer-events so the robot
          tracks the cursor across the open frame areas. */}
      <div className="absolute inset-0">
        <SplineViewer url={SPLINE_SCENE} className="w-full h-full" />
      </div>

      {/* Edge gradients for legibility under the text card. Top fade keeps
          the role badge readable; bottom fade keeps the body text crisp. */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-[#141414] via-[#141414]/40 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#141414]/70 to-transparent" />

      {/* "See what I built" — bottom-right of the hero, opposite the text
          card. Sits over the robot's right side. The smooth-scroll handler
          is the explicit escape from Spline's wheel-capture so the
          professor never gets stuck on the hero. */}
      <motion.div
        {...fadeUp(0.4)}
        className="absolute bottom-12 right-6 sm:right-10 lg:right-16 z-10"
      >
        <button
          type="button"
          onClick={scrollToJourney}
          className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/50 backdrop-blur-md px-6 py-3 text-sm font-medium text-fg hover:border-white/40 hover:bg-black/70 transition-colors shadow-[0_8px_24px_rgba(0,0,0,0.4)]"
        >
          See what I built
          <ChevronDown className="h-3.5 w-3.5" />
        </button>
      </motion.div>

      {/* Text card — lower-left. The card itself catches pointer events
          (so its buttons work and scrolling over the card scrolls the
          page). The right-and-centre of the viewport stays open for the
          robot to receive cursor moves. */}
      <div className="absolute inset-x-0 bottom-0 z-10 px-6 sm:px-10 lg:px-16 pb-12 pt-32 max-w-2xl">
        <motion.div {...fadeUp(0.05)} className="mb-4">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#e50914]/30 bg-[#e50914]/[0.10] backdrop-blur-md px-4 py-1.5 text-[11px] uppercase tracking-[0.4em] text-[#e50914]">
            ETH Spring 2026 · Semester Project · CVG — ETH × Microsoft
          </span>
        </motion.div>

        <motion.h1
          {...fadeUp(0.1)}
          className="font-playfair text-5xl font-bold tracking-tight sm:text-6xl xl:text-7xl leading-[1.0] mb-3"
        >
          Tommaso{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#e50914] via-[#ff3d2e] to-[#ff7043]">
            Gazzini
          </span>
        </motion.h1>

        <motion.p {...fadeUp(0.15)} className="text-base text-muted mb-4">
          MSc Mechanical Engineering · ETH Zurich M4 · Robotics &amp; AI
        </motion.p>

        <motion.p {...fadeUp(0.2)} className="text-base text-fg/85 leading-relaxed mb-6 max-w-md">
          For <span className="text-fg font-medium">Professor Oier Mees</span>, I&apos;d like to do my Spring 2026 semester project with you. The past months I&apos;ve been 24/7 at the ETH Robotics Club building the bimanual data pipeline and training ACT, and I&apos;m ready to start day one.
        </motion.p>

        <motion.div {...fadeUp(0.35)}>
          <button
            type="button"
            onClick={() => setShowWhy((v) => !v)}
            aria-expanded={showWhy}
            className="inline-flex items-center gap-2 rounded-full border border-accent-cyan/30 bg-accent-cyan/[0.08] backdrop-blur-md px-5 py-2.5 text-xs font-medium text-accent-cyan hover:border-accent-cyan/55 hover:bg-accent-cyan/[0.14] transition-all duration-200"
          >
            {showWhy ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
            Why do I want to work with you?
          </button>
          <AnimatePresence>
            {showWhy && (
              <motion.div
                key="why-card"
                initial={{ opacity: 0, y: -8, height: 0 }}
                animate={{ opacity: 1, y: 0, height: "auto" }}
                exit={{ opacity: 0, y: -8, height: 0 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="overflow-hidden max-w-md"
              >
                <GlassCard className="mt-3 p-5">
                  <p className="text-[9px] uppercase tracking-[0.45em] text-accent-cyan mb-3">
                    Why do I want to work with you?
                  </p>
                  <div className="font-mono text-xs text-fg/90 leading-relaxed whitespace-pre-wrap">
                    {whyTyped}
                    {whyTyped.length < WHY_TEXT.length && (
                      <span className="animate-blink text-accent-cyan">▌</span>
                    )}
                  </div>
                </GlassCard>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Hero variants (graveyard) ────────────────────────────────────────────────
// Layout proposals A and C from the variant-picker exploration. B was chosen
// (see `Hero` above). Kept here so they can be revived in the future without
// archaeology if a different framing is ever wanted.

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function HeroVariantA() {
  return (
    <section className="relative min-h-screen overflow-hidden">
      <div className="grid min-h-screen grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        {/* LEFT — text column. No overlay, full legibility. */}
        <div className="relative z-10 flex flex-col justify-center px-6 sm:px-12 lg:px-16 xl:px-20 pt-24 pb-16">
          <motion.div {...fadeUp(0.05)} className="mb-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#e50914]/30 bg-[#e50914]/[0.10] px-5 py-2 text-[11px] uppercase tracking-[0.4em] text-[#e50914]">
              ETH Spring 2026 · Semester Project · CVG
            </span>
          </motion.div>
          <motion.h1
            {...fadeUp(0.1)}
            className="font-playfair text-5xl font-bold tracking-tight sm:text-6xl xl:text-7xl leading-[1.05] mb-4"
          >
            Tommaso
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#e50914] via-[#ff3d2e] to-[#ff7043]">
              Gazzini
            </span>
          </motion.h1>
          <motion.p {...fadeUp(0.15)} className="text-lg text-muted mb-5">
            MSc Mechanical Engineering · ETH Zurich M4 · Robotics &amp; AI
          </motion.p>
          <motion.p {...fadeUp(0.2)} className="text-base text-fg/85 leading-relaxed mb-8 max-w-md">
            For <span className="text-fg font-medium">Professor Oier Mees</span> — I&apos;d like to do my Spring 2026 semester project with you. I&apos;ve spent the past months 24/7 at the ETH Robotics Club building the bimanual data pipeline and training ACT, and I&apos;m ready to start day one.
          </motion.p>
          <motion.div {...fadeUp(0.3)} className="flex flex-wrap gap-3">
            <a
              href="mailto:tgazzini@ethz.ch"
              className="inline-flex items-center gap-2 rounded-full bg-[#e50914] px-6 py-3 text-sm font-medium text-white hover:bg-[#f40612] hover:scale-[1.02] active:scale-[0.98] transition-all duration-150 shadow-[0_4px_24px_rgba(229,9,20,0.4)]"
            >
              <Mail className="h-3.5 w-3.5" />
              tgazzini@ethz.ch
            </a>
            <a
              href="#who"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.05] px-6 py-3 text-sm font-medium text-fg hover:border-white/30 transition-colors"
            >
              <ChevronDown className="h-3.5 w-3.5" />
              See what I built
            </a>
          </motion.div>
        </div>

        {/* RIGHT — robot. Contained panel, pointer-events-none for scroll. */}
        <div className="relative hidden lg:block">
          <div className="absolute inset-0 pointer-events-none">
            <SplineViewer url={SPLINE_SCENE} className="w-full h-full" />
          </div>
          {/* Soft fade at the column boundary so the robot blends into the
              text column rather than ending in a hard edge. */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#141414] to-transparent" />
        </div>

        {/* MOBILE — robot below text */}
        <div className="relative lg:hidden h-[60vh]">
          <div className="absolute inset-0 pointer-events-none">
            <SplineViewer url={SPLINE_SCENE} className="w-full h-full" />
          </div>
          <div className="pointer-events-none absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-[#141414] to-transparent" />
        </div>
      </div>
    </section>
  );
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function HeroVariantB() {
  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Spline fills the viewport, behind everything. The pointer-events-none
          wrapper is what unblocks page scroll — the iframe never sees the
          wheel events, they fall through to the document. */}
      <div className="absolute inset-0 pointer-events-none">
        <SplineViewer url={SPLINE_SCENE} className="w-full h-full" />
      </div>

      {/* Edge gradients so the lower-left text card has darker bg behind it
          for legibility, but the centre-right (where the robot lives) is
          fully visible. */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-[#141414] via-[#141414]/30 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#141414]/70 to-transparent" />

      {/* Single condensed text card pinned to the lower-left. Smaller than
          the original hero so the robot has more room to breathe. */}
      <div className="absolute inset-x-0 bottom-0 z-10 px-6 sm:px-10 lg:px-16 pb-16 pt-32 max-w-2xl">
        <motion.div {...fadeUp(0.05)} className="mb-4">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#e50914]/30 bg-[#e50914]/[0.10] backdrop-blur-md px-4 py-1.5 text-[11px] uppercase tracking-[0.4em] text-[#e50914]">
            ETH Spring 2026 · CVG
          </span>
        </motion.div>
        <motion.h1
          {...fadeUp(0.1)}
          className="font-playfair text-5xl font-bold tracking-tight sm:text-6xl leading-[1.0] mb-3"
        >
          Tommaso{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#e50914] via-[#ff3d2e] to-[#ff7043]">
            Gazzini
          </span>
        </motion.h1>
        <motion.p {...fadeUp(0.15)} className="text-base text-muted mb-6">
          MSc Mech Eng · ETH M4 · For{" "}
          <span className="text-fg/90 font-medium">Prof. Mees, Spring 2026</span>
        </motion.p>
        <motion.div {...fadeUp(0.25)} className="flex flex-wrap gap-3">
          <a
            href="mailto:tgazzini@ethz.ch"
            className="inline-flex items-center gap-2 rounded-full bg-[#e50914] px-6 py-3 text-sm font-medium text-white hover:bg-[#f40612] transition-all duration-150 shadow-[0_4px_24px_rgba(229,9,20,0.4)]"
          >
            <Mail className="h-3.5 w-3.5" />
            tgazzini@ethz.ch
          </a>
          <a
            href="#who"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] backdrop-blur-md px-6 py-3 text-sm font-medium text-fg hover:border-white/30 transition-colors"
          >
            <ChevronDown className="h-3.5 w-3.5" />
            See what I built
          </a>
        </motion.div>
      </div>
    </section>
  );
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function HeroVariantC() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-[#141414]">
      {/* TOP — text in a centred narrow column. No robot underneath. */}
      <div className="relative z-10 px-6 sm:px-10 lg:px-16 pt-24 pb-6 max-w-4xl mx-auto text-center">
        <motion.div {...fadeUp(0.05)} className="mb-5">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#e50914]/30 bg-[#e50914]/[0.10] px-5 py-2 text-[11px] uppercase tracking-[0.4em] text-[#e50914]">
            ETH Spring 2026 · Semester Project · CVG
          </span>
        </motion.div>
        <motion.h1
          {...fadeUp(0.1)}
          className="font-playfair text-5xl font-bold tracking-tight sm:text-6xl xl:text-7xl leading-[1.05] mb-3"
        >
          Tommaso{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#e50914] via-[#ff3d2e] to-[#ff7043]">
            Gazzini
          </span>
        </motion.h1>
        <motion.p {...fadeUp(0.15)} className="text-lg text-muted mb-5">
          MSc Mechanical Engineering · ETH Zurich M4 · Robotics &amp; AI
        </motion.p>
        <motion.p {...fadeUp(0.2)} className="text-base text-fg/85 leading-relaxed mb-7 max-w-2xl mx-auto">
          For <span className="text-fg font-medium">Professor Oier Mees</span> — I&apos;d like to do my Spring 2026 semester project with you. The past months I&apos;ve been 24/7 at the ETH Robotics Club building the bimanual data pipeline and training ACT.
        </motion.p>
        <motion.div {...fadeUp(0.3)} className="flex flex-wrap justify-center gap-3">
          <a
            href="mailto:tgazzini@ethz.ch"
            className="inline-flex items-center gap-2 rounded-full bg-[#e50914] px-6 py-3 text-sm font-medium text-white hover:bg-[#f40612] transition-all duration-150 shadow-[0_4px_24px_rgba(229,9,20,0.4)]"
          >
            <Mail className="h-3.5 w-3.5" />
            tgazzini@ethz.ch
          </a>
          <a
            href="#who"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.05] px-6 py-3 text-sm font-medium text-fg hover:border-white/30 transition-colors"
          >
            <ChevronDown className="h-3.5 w-3.5" />
            See what I built
          </a>
        </motion.div>
      </div>

      {/* BOTTOM — robot in a contained widescreen panel. Clean separation
          from the text above. Pointer-events-none for scroll. */}
      <div className="relative h-[55vh] mx-auto max-w-6xl px-6 sm:px-10 lg:px-16 pb-12">
        <div className="relative h-full rounded-3xl overflow-hidden border border-white/[0.08] bg-black/40">
          <div className="absolute inset-0 pointer-events-none">
            <SplineViewer url={SPLINE_SCENE} className="w-full h-full" />
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function MeesPage() {
  return (
    <div className="relative min-h-screen bg-[#141414] overflow-x-hidden font-sans text-fg">

      {/* Background blobs */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-64 -left-64 h-[700px] w-[700px] rounded-full bg-[#e50914] opacity-[0.04] blur-[140px]" />
        <div className="absolute bottom-[15%] left-[5%] h-[500px] w-[500px] rounded-full bg-white opacity-[0.02] blur-[120px]" />
      </div>

      {/* ── Hero — full-bleed Spline robot with text card lower-left.
            Robot stays interactive (cursor-follow). The "See what I built"
            button below smooth-scrolls to #journey so professors can skip
            past the iframe instead of fighting its wheel-capture. */}
      <Hero />

      {/* ── JOURNEY — git timeline ──
          Sits right after the hero. Click any era or branch to expand. */}
      <GitTimeline />

      {/* ── WHAT WE BUILT — Interactive Pipeline ──
          Jump straight to the subject after the timeline: the Robotics Club
          work, end to end. */}
      <RoboticsPipelineSection />

      {/* ── AUTONOMOUS DEPLOYMENTS ──
          Outcomes — the policies actually running on YAMS. */}
      <AutonomousDeploymentsSection />

      {/* ── PROOF — what I've shipped + academic record ──
          Moved down: after the reader has seen the Robotics Club work and
          the deployed policies, this section adds the academic context. */}
      <ProofSection />

      {/* ── RESEARCH INTERESTS ──
          The pitch. mimic-video is featured first as the direction we're
          already pursuing at the ETH Robotics Club; the three-card grid
          below shows the surrounding work I'd be ready to extend. */}
      <section className="relative mx-auto max-w-6xl px-6 py-24 sm:px-10">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_50%_50%,rgba(229,9,20,0.04),transparent)]" />
        <motion.div {...fadeUp(0)} className="mb-4">
          <SectionEyebrow>Research interests</SectionEyebrow>
          <h2 className="font-playfair text-4xl font-bold tracking-tight sm:text-5xl mb-5">
            Your work, and where we&apos;re heading
          </h2>
          <p className="text-muted max-w-2xl text-base leading-relaxed">
            The papers from <span className="text-fg font-medium">Professor Mees&apos;s</span> lab I&apos;ve learned the most from — and the direction we&apos;re already taking at the ETH Robotics Club. He&apos;s the best in Zürich for robot learning; I&apos;m ready to contribute on any of these, and the mimic-video direction is the one we&apos;re already running.
          </p>
        </motion.div>

        {/* Featured: mimic-video. Wider card with a callout block for the
            "we're already on this" beat. Visually loudest of the section. */}
        <motion.a
          {...fadeScale(0.05)}
          href={MIMIC_VIDEO_PAPER.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group block mt-10"
        >
          <div className="relative rounded-3xl border border-[#ff7043]/40 bg-gradient-to-br from-[#e50914]/[0.08] via-[#ff3d2e]/[0.05] to-[#ff7043]/[0.10] p-8 sm:p-10 transition-all duration-200 hover:border-[#ff7043]/60 hover:from-[#e50914]/[0.12] hover:via-[#ff3d2e]/[0.08] hover:to-[#ff7043]/[0.14] shadow-[0_8px_40px_rgba(229,9,20,0.10)]">
            <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">
              {/* Left column: title, venue, summary */}
              <div className="flex-1">
                <div className="flex items-center gap-3 flex-wrap mb-4">
                  <span className="inline-flex items-center gap-2 rounded-full border border-[#ff7043]/40 bg-[#ff7043]/[0.12] px-3 py-1 text-[10px] uppercase tracking-[0.3em] text-[#ff7043] font-semibold">
                    The direction
                  </span>
                  <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-muted/70">
                    {MIMIC_VIDEO_PAPER.venue}
                  </span>
                </div>
                <h3 className="font-playfair text-2xl sm:text-3xl font-bold leading-tight mb-3">
                  {MIMIC_VIDEO_PAPER.title}
                </h3>
                <p className="text-base text-fg/80 leading-relaxed">
                  {MIMIC_VIDEO_PAPER.summary}
                </p>
              </div>

              {/* Right column: the "we're already on this" callout */}
              <div className="lg:w-[40%] lg:max-w-md shrink-0">
                <div className="relative rounded-2xl border border-[#ff7043]/35 bg-black/30 p-5 backdrop-blur-md">
                  <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#ff7043] mb-3">
                    What we&apos;re already doing
                  </p>
                  <p className="text-sm text-fg/85 leading-relaxed">
                    {MIMIC_VIDEO_PAPER.alreadyDoing}
                  </p>
                </div>
              </div>
            </div>

            <p className="mt-6 text-xs font-mono uppercase tracking-[0.25em] text-[#ff7043] group-hover:text-white transition-colors">
              Read the paper →
            </p>
          </div>
        </motion.a>

        {/* The surrounding three papers — context Tommaso has internalized
            and is ready to extend if mimic-video isn't where Mees wants to
            point him. */}
        <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-muted/60 mt-12 mb-5">
          The surrounding work
        </p>
        <div className="grid gap-5 md:grid-cols-3">
          {MEES_PAPERS.map((p, i) => {
            const c = accentColors[p.accent];
            return (
              <motion.a
                key={p.shortLabel}
                {...fadeScale(i * 0.08)}
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group block h-full"
              >
                <GlassCard className={`p-7 h-full flex flex-col gap-4 transition-colors hover:${c.border}`}>
                  <div className="flex items-center gap-3 flex-wrap">
                    <Tag accent={p.accent}>{p.shortLabel}</Tag>
                    <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-muted/60">
                      {p.venue}
                    </span>
                  </div>
                  <h3 className="font-playfair text-lg font-bold leading-snug">{p.title}</h3>
                  <p className="text-sm text-muted leading-relaxed flex-1">{p.summary}</p>
                  <p className={`text-xs font-mono border-t border-white/[0.06] pt-3 ${c.text} group-hover:text-white transition-colors`}>
                    Read the paper →
                  </p>
                </GlassCard>
              </motion.a>
            );
          })}
        </div>
      </section>

      {/* ── CTA — reaction-framed, two-path. ──
          Thumbs-up takes Mees straight to Calendly to book 30 minutes.
          Thumbs-down opens a preset email so he can give honest feedback
          without typing from scratch. Both paths are one click. The
          smaller email/LinkedIn/GitHub trio sits below as a fallback for
          anyone who'd rather contact directly. */}
      <section className="relative mx-auto max-w-3xl px-6 py-32 sm:px-10 text-center">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_80%,rgba(229,9,20,0.06),transparent)]" />
        <motion.div {...fadeUp()} className="space-y-8">
          <SectionEyebrow>Ready to start</SectionEyebrow>
          <h2 className="font-playfair text-5xl font-bold tracking-tight sm:text-6xl leading-tight">
            I can start immediately.
          </h2>
          <p className="text-muted max-w-xl mx-auto text-base leading-relaxed">
            After San Francisco I really understood the importance of finding something I believe in. Robot learning is what I want to become great at, and <span className="text-fg font-medium">Professor Oier Mees</span> is the person who can really help me get there. I&apos;m open to following you into whichever research track makes most sense — my greatest skill is adapting to new situations, and my goal is becoming a great robot learning engineer.
          </p>

          <p className="font-mono text-[11px] uppercase tracking-[0.4em] text-muted/70 pt-4">
            Did this land?
          </p>

          <div className="grid gap-4 sm:grid-cols-3 max-w-3xl mx-auto">
            {/* Lowest-commitment path. Tommaso is in Mees's class this
                semester, so "after class" is a real, casual touchpoint
                Mees can take in the next week. Cyan = friendly. */}
            <a
              href="mailto:tgazzini@ethz.ch?subject=Robot%20Learning%20Spring%202026%20%E2%80%94%20let%27s%20chat%20after%20class&body=Hi%20Tommaso%2C%0D%0A%0D%0ALet%27s%20catch%20up%20after%20class%20%E2%80%94%20I%27ll%20find%20you%20in%20the%20lecture%20room.%0D%0A%0D%0A%E2%80%94%20Professor%20Oier%20Mees"
              className="group flex flex-col items-center justify-center gap-3 rounded-2xl border border-accent-cyan/30 bg-accent-cyan/[0.06] px-5 py-7 transition-all duration-200 hover:border-accent-cyan/55 hover:bg-accent-cyan/[0.12] hover:scale-[1.02] active:scale-[0.99]"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent-cyan/15 border border-accent-cyan/30 group-hover:bg-accent-cyan/25 transition-colors">
                <MessageCircle className="h-6 w-6 text-accent-cyan" />
              </div>
              <div className="text-center">
                <p className="font-playfair text-xl font-semibold text-fg leading-tight">
                  Yes, let&apos;s talk
                  <br />after class
                </p>
                <p className="text-[10px] text-muted/80 mt-2 font-mono uppercase tracking-[0.2em]">
                  Casual chat
                </p>
              </div>
            </a>

            {/* Primary action — orange/red brand gradient. Calendly slot is
                the canonical "let's commit time" CTA. Visually loudest. */}
            <a
              href="https://calendly.com/tom-gazzini/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex flex-col items-center justify-center gap-3 rounded-2xl border border-[#ff7043]/40 bg-gradient-to-br from-[#e50914]/[0.18] via-[#ff3d2e]/[0.14] to-[#ff7043]/[0.14] px-5 py-7 transition-all duration-200 hover:border-[#ff7043]/60 hover:from-[#e50914]/[0.28] hover:via-[#ff3d2e]/[0.22] hover:to-[#ff7043]/[0.22] hover:scale-[1.02] active:scale-[0.99] shadow-[0_4px_24px_rgba(229,9,20,0.15)]"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#ff7043]/20 border border-[#ff7043]/40 group-hover:bg-[#ff7043]/30 transition-colors">
                <Calendar className="h-6 w-6 text-[#ff7043]" />
              </div>
              <div className="text-center">
                <p className="font-playfair text-xl font-semibold text-fg leading-tight">
                  Let&apos;s schedule
                  <br />a meeting
                </p>
                <p className="text-[10px] text-[#ff7043] mt-2 font-mono uppercase tracking-[0.2em]">
                  30 min on Calendly
                </p>
              </div>
            </a>

            {/* Lowest-effort path — for "I want more context first" or an
                honest no thanks. Neutral white styling, no urgency. */}
            <a
              href="mailto:tgazzini@ethz.ch?subject=Robot%20Learning%20Spring%202026%20%E2%80%94%20quick%20feedback&body=Hi%20Tommaso%2C%0D%0A%0D%0A%5B%20what%20I%27d%20like%20to%20know%20more%20about%2C%20or%20honest%20feedback%20%5D%3A%0D%0A%0D%0A%E2%80%94%20Professor%20Oier%20Mees"
              className="group flex flex-col items-center justify-center gap-3 rounded-2xl border border-white/15 bg-white/[0.04] px-5 py-7 transition-all duration-200 hover:border-white/30 hover:bg-white/[0.08]"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/[0.06] border border-white/15 group-hover:bg-white/[0.12] transition-colors">
                <HelpCircle className="h-6 w-6 text-fg/70" />
              </div>
              <div className="text-center">
                <p className="font-playfair text-xl font-semibold text-fg/85 leading-tight">
                  Need more info
                  <br />or quick feedback
                </p>
                <p className="text-[10px] text-muted/80 mt-2 font-mono uppercase tracking-[0.2em]">
                  Reply by email
                </p>
              </div>
            </a>
          </div>

          {/* Fallback contact row — for anyone who'd rather skip the
              reaction framing and just reach out directly. */}
          <div className="flex flex-wrap justify-center items-center gap-x-5 gap-y-2 pt-6 text-sm text-muted">
            <span className="text-muted/50">or reach me directly:</span>
            <a
              href="mailto:tgazzini@ethz.ch"
              className="inline-flex items-center gap-1.5 hover:text-fg transition-colors"
            >
              <Mail className="h-3.5 w-3.5" />
              tgazzini@ethz.ch
            </a>
            <a
              href="https://linkedin.com/in/tommaso-gazzini-2b5517253"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 hover:text-fg transition-colors"
            >
              <FaLinkedin style={{ width: "14px", height: "14px" }} className="text-blue-400" />
              LinkedIn
            </a>
            <a
              href="https://github.com/osammotg"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 hover:text-fg transition-colors"
            >
              <FaGithub style={{ width: "14px", height: "14px" }} />
              GitHub
            </a>
          </div>

          <p className="text-xs text-muted/40 pt-2">
            tom.gazzini@gmail.com · +41 76 635 53 54
          </p>
        </motion.div>
      </section>

      <footer className="border-t border-white/[0.05] px-6 py-8 text-center">
        <p className="text-xs text-muted/40">
          Tommaso Gazzini · ETH Zurich MSc Mechanical Engineering · Spring 2026 ·{" "}
          <a href="/browse" className="hover:text-muted/70 transition-colors">
            Portfolio
          </a>
        </p>
      </footer>
    </div>
  );
}

// ─── Graveyard ────────────────────────────────────────────────────────────────
// Components and sections cut from the page during the simplification refactor,
// preserved here so they can be revived without git archaeology. None of these
// are rendered by MeesPage. To revive any of them, import the function back
// into the main render tree.
//
// Why kept: the visual ideas (animated map, language grid, military/water polo
// cards, Striker stats) might be reusable in a future personal portfolio at
// /browse or a dedicated /about page. The work is done; throwing it away is
// strictly worse than parking it here.

/**
 * "Who am I" section — the original Background grid: Languages / Military /
 * Water Polo / Striker. Cut because it duplicated the journey told by the git
 * timeline and pushed the science further down the page.
 *
 * Revive by adding `<WhoAmISectionGraveyard />` back into MeesPage's render
 * tree, typically right after the Hero.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function WhoAmISectionGraveyard() {
  return (
    <section id="who" className="relative mx-auto max-w-6xl px-6 py-32 sm:px-10">
      <motion.div {...fadeUp(0)} className="mb-16">
        <SectionEyebrow>Background</SectionEyebrow>
        <h2 className="font-playfair text-5xl font-bold tracking-tight sm:text-6xl">
          Who am I?
        </h2>
      </motion.div>

      <div className="grid gap-5 md:grid-cols-2">
        {/* Languages */}
        <motion.div {...fadeScale(0.05)} className="h-full">
          <GlassCard className="p-7 h-full">
            <div className="flex items-start justify-between mb-5">
              <Tag accent="fuchsia">Languages</Tag>
              <span className="font-playfair text-4xl font-bold text-fg leading-none">6</span>
            </div>
            <h3 className="font-playfair text-2xl font-semibold mb-6">Six Languages</h3>
            <div className="grid grid-cols-2 gap-2.5">
              {LANGUAGES.map(({ flag, name, level }) => (
                <div key={name} className="flex items-center gap-3 rounded-2xl border border-white/[0.06] bg-white/[0.03] px-3.5 py-3">
                  <span className="text-2xl leading-none">{flag}</span>
                  <div>
                    <p className="text-sm font-medium text-fg leading-tight">{name}</p>
                    <p className="text-[11px] text-muted mt-0.5">{level}</p>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </motion.div>

        {/* Military */}
        <motion.div {...fadeScale(0.12)} className="h-full">
          <GlassCard className="p-7 h-full" bgImage="/military-bg.jpeg" bgPosition="center 40%">
            <div className="mb-5"><Tag accent="indigo">Military</Tag></div>
            <h3 className="font-playfair text-2xl font-semibold mb-4 leading-snug text-white">
              Swiss Special Forces<br />Grenadier
            </h3>
            <p className="text-sm text-fg/85 leading-relaxed mb-6">
              Isone, Switzerland. Completed the full selection and training cycle for the Swiss Armed Forces Grenadier corps — one of the most physically and mentally demanding military programs in Switzerland.
            </p>
            <div className="flex flex-wrap gap-2">
              {["Physical elite", "High-pressure decisions", "Team operations", "Isone"].map((t) => (
                <span key={t} className="rounded-full border border-white/20 bg-black/30 px-3 py-1 text-xs text-fg/80">{t}</span>
              ))}
            </div>
            <p className="text-xs text-fg/55 mt-5 pt-5 border-t border-white/10">
              Also: 12 years competitive water polo · national team level
            </p>
          </GlassCard>
        </motion.div>

        {/* Water Polo */}
        <motion.div {...fadeScale(0.18)} className="h-full">
          <WaterPoloCard />
        </motion.div>

        {/* Striker */}
        <motion.div {...fadeScale(0.24)} className="h-full">
          <GlassCard className="p-7 h-full" bgImage="/striker-bg.png" bgPosition="center top">
            <div className="flex items-start justify-between mb-5">
              <Tag accent="purple">Startup</Tag>
            </div>
            <h3 className="font-playfair text-2xl font-semibold mb-4 text-white">Striker</h3>
            <p className="text-sm text-fg/85 leading-relaxed mb-6">
              Football match-organizing platform across Geneva, Zurich &amp; Paris. Replaces WhatsApp groups for amateur leagues. React Native mobile + PHP backend + Stripe payments.
            </p>
            <div className="grid grid-cols-2 gap-3 mb-5">
              <div className="rounded-2xl border border-white/20 bg-black/50 p-4 text-center">
                <p className="font-playfair text-3xl font-bold text-white tabular-nums">2.5k+</p>
                <p className="text-xs text-fg/70 mt-1.5">Members</p>
              </div>
              <div className="rounded-2xl border border-white/20 bg-black/50 p-4 text-center">
                <p className="font-playfair text-3xl font-bold text-white">500+</p>
                <p className="text-xs text-fg/70 mt-1.5">Games organized</p>
              </div>
            </div>
            <p className="text-xs text-fg/50">Previously co-founded as FuzeFoot.</p>
          </GlassCard>
        </motion.div>
      </div>
    </section>
  );
}

// `OriginIntro` is still defined further up this file (the git-init terminal
// cinematic + animated Europe map with paper-plane motion path). It's just no
// longer rendered. Revive by uncommenting the `<OriginIntro setEraRef={...} />`
// line inside `GitTimeline` (search "Origin story — git init terminal").
