"use client";

import { motion } from "framer-motion";

const ORCHID = "#e9a2f2";
const PURPLE = "#7e49f2";

interface VisualProps {
  kind: string;
  reduce: boolean | null;
}

/**
 * Bespoke animated mini-visual per feature, rendered inside the dark product
 * panel. Mounted fresh on each tab switch so the entrance animations replay.
 */
export function ShowcaseVisual({ kind, reduce }: VisualProps) {
  switch (kind) {
    case "channels":
      return <Channels reduce={reduce} />;
    case "offers":
      return <Offers reduce={reduce} />;
    case "ab":
      return <AbTest reduce={reduce} />;
    case "insights":
      return <Insights reduce={reduce} />;
    case "radar":
    default:
      return <Radar reduce={reduce} />;
  }
}

function Radar({ reduce }: { reduce: boolean | null }) {
  const dots = [
    { x: 170, y: 62 },
    { x: 82, y: 132 },
    { x: 160, y: 128 },
  ];
  return (
    <svg viewBox="0 0 240 170" className="h-full w-full">
      <defs>
        <linearGradient id="radSweep" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={ORCHID} stopOpacity="0.9" />
          <stop offset="100%" stopColor={PURPLE} stopOpacity="0" />
        </linearGradient>
      </defs>
      {[34, 58, 82].map((r) => (
        <circle key={r} cx="120" cy="92" r={r} fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
      ))}
      <motion.line
        x1="120"
        y1="92"
        x2="120"
        y2="10"
        stroke="url(#radSweep)"
        strokeWidth="2.5"
        strokeLinecap="round"
        style={{ transformOrigin: "120px 92px" }}
        animate={reduce ? undefined : { rotate: 360 }}
        transition={reduce ? undefined : { duration: 3.6, repeat: Infinity, ease: "linear" }}
      />
      <circle cx="120" cy="92" r="3.5" fill={ORCHID} />
      {dots.map((p, i) => (
        <motion.circle
          key={i}
          cx={p.x}
          cy={p.y}
          r="4.5"
          fill={ORCHID}
          style={{ transformOrigin: `${p.x}px ${p.y}px` }}
          animate={reduce ? undefined : { opacity: [0.25, 1, 0.25], scale: [0.8, 1.15, 0.8] }}
          transition={reduce ? undefined : { duration: 2.2, repeat: Infinity, delay: i * 0.5 }}
        />
      ))}
    </svg>
  );
}

function Channels({ reduce }: { reduce: boolean | null }) {
  const nodes = [
    { x: 60, y: 42 },
    { x: 180, y: 42 },
    { x: 60, y: 142 },
    { x: 180, y: 142 },
  ];
  const hub = { x: 120, y: 92 };
  return (
    <svg viewBox="0 0 240 184" className="h-full w-full">
      {nodes.map((n, i) => (
        <line key={`l${i}`} x1={hub.x} y1={hub.y} x2={n.x} y2={n.y} stroke="rgba(255,255,255,0.16)" strokeWidth="1.5" />
      ))}
      {nodes.map((n, i) => (
        <g key={`n${i}`}>
          <circle cx={n.x} cy={n.y} r="14" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.22)" />
          <circle cx={n.x} cy={n.y} r="4" fill={ORCHID} />
          {!reduce ? (
            <motion.circle
              r="3.5"
              fill="#fff"
              initial={{ cx: hub.x, cy: hub.y, opacity: 0 }}
              animate={{ cx: [hub.x, n.x], cy: [hub.y, n.y], opacity: [0, 1, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.35, ease: "easeInOut" }}
            />
          ) : null}
        </g>
      ))}
      <circle cx={hub.x} cy={hub.y} r="18" fill={PURPLE} />
      <circle cx={hub.x} cy={hub.y} r="18" fill="none" stroke={ORCHID} strokeOpacity="0.5" />
      <circle cx={hub.x} cy={hub.y} r="6" fill="#fff" />
    </svg>
  );
}

function Offers({ reduce }: { reduce: boolean | null }) {
  const cards = [0, 1, 2];
  return (
    <svg viewBox="0 0 240 170" className="h-full w-full">
      <defs>
        <linearGradient id="offCard" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={PURPLE} stopOpacity="0.55" />
          <stop offset="100%" stopColor={ORCHID} stopOpacity="0.2" />
        </linearGradient>
      </defs>
      {cards.map((c) => {
        const y = 36 + c * 40;
        return (
          <motion.g
            key={c}
            initial={reduce ? false : { opacity: 0, x: 26 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: c * 0.12, ease: [0.16, 1, 0.3, 1] }}
          >
            <rect x="40" y={y} width="160" height="30" rx="8" fill="url(#offCard)" stroke="rgba(255,255,255,0.18)" />
            <circle cx="58" cy={y + 15} r="7" fill={ORCHID} />
            <rect x="74" y={y + 9} width="70" height="5" rx="2.5" fill="rgba(255,255,255,0.5)" />
            <rect x="74" y={y + 18} width="44" height="4" rx="2" fill="rgba(255,255,255,0.28)" />
          </motion.g>
        );
      })}
      <motion.path
        d="M205 26 l3 8 8 3 -8 3 -3 8 -3 -8 -8 -3 8 -3 z"
        fill={ORCHID}
        style={{ transformOrigin: "208px 37px" }}
        animate={reduce ? undefined : { scale: [0.7, 1.1, 0.7], opacity: [0.5, 1, 0.5] }}
        transition={reduce ? undefined : { duration: 2, repeat: Infinity }}
      />
    </svg>
  );
}

function AbTest({ reduce }: { reduce: boolean | null }) {
  const base = 140;
  return (
    <svg viewBox="0 0 240 170" className="h-full w-full">
      <defs>
        <linearGradient id="abWin" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={ORCHID} />
          <stop offset="100%" stopColor={PURPLE} />
        </linearGradient>
      </defs>
      <line x1="40" y1={base} x2="200" y2={base} stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
      <motion.rect
        x="78"
        y={base - 58}
        width="36"
        height="58"
        rx="6"
        fill="rgba(255,255,255,0.18)"
        style={{ transformOrigin: `96px ${base}px` }}
        initial={reduce ? false : { scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      />
      <motion.rect
        x="128"
        y={base - 96}
        width="36"
        height="96"
        rx="6"
        fill="url(#abWin)"
        style={{ transformOrigin: `146px ${base}px` }}
        initial={reduce ? false : { scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 0.6, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
      />
      <text x="96" y={base + 18} textAnchor="middle" fontSize="13" fontWeight="700" fill="rgba(255,255,255,0.55)">
        A
      </text>
      <text x="146" y={base + 18} textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">
        B
      </text>
      <motion.circle
        cx="146"
        cy={base - 96}
        r="9"
        fill={ORCHID}
        initial={reduce ? false : { scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.7, type: reduce ? "tween" : "spring", stiffness: 300 }}
      />
      <path d="M142 -96.5 l3 3 5 -6" transform={`translate(0 ${base})`} fill="none" stroke="#1A1426" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Insights({ reduce }: { reduce: boolean | null }) {
  const base = 140;
  const bars = [
    { x: 44, h: 38 },
    { x: 82, h: 62 },
    { x: 120, h: 50 },
    { x: 158, h: 84 },
    { x: 196, h: 70 },
  ];
  const pts = bars.map((b) => `${b.x + 13},${base - b.h - 8}`).join(" ");
  return (
    <svg viewBox="0 0 240 170" className="h-full w-full">
      <defs>
        <linearGradient id="insBar" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={ORCHID} stopOpacity="0.9" />
          <stop offset="100%" stopColor={PURPLE} stopOpacity="0.55" />
        </linearGradient>
      </defs>
      <line x1="34" y1={base} x2="214" y2={base} stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
      {bars.map((b, i) => (
        <motion.rect
          key={i}
          x={b.x}
          y={base - b.h}
          width="26"
          height={b.h}
          rx="5"
          fill="url(#insBar)"
          style={{ transformOrigin: `${b.x + 13}px ${base}px` }}
          initial={reduce ? false : { scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
        />
      ))}
      <motion.polyline
        points={pts}
        fill="none"
        stroke="#fff"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={reduce ? false : { pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.9, delay: 0.5, ease: "easeOut" }}
      />
    </svg>
  );
}
