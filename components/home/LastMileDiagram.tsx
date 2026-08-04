"use client";

/**
 * "The Last Mile" diagram component.
 *
 * Visualizes the transformation from static legacy paper credit files on the left
 * into 4 live alternative data signals (Mobile usage, Airtime, Cashflow, Repayment behaviour),
 * converging into a real-time credit decision gauge and mobile phone approval on the right.
 *
 * Upgraded with premium 3D layout, drop shadows, refined vector lanes,
 * perfectly aligned HTML badges, and seamless "comet" data packet animations.
 */

import React, { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

/** Fixed viewBox coordinate canvas (640x480) for absolute label alignment */
const VB = { w: 640, h: 480 } as const;

/** Signal icons designed as clean monoline SVGs */
function MobileSignalIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" aria-hidden="true" {...props}>
      <path d="M2.5 13v-2m3.5 2V9m3.5 4V6.5m3.5 6.5V4" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function AirtimeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" aria-hidden="true" {...props}>
      <path
        d="M2.5 7.5a5.5 5.5 0 0 1 11 0M5 7.5a3 3 0 0 1 6 0M8 7.5v5.5m-2-2l2 2 2-2"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CashflowIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" aria-hidden="true" {...props}>
      <path
        d="M2 11.5l3.5-3.5 3 3 5.5-5.5M10.5 5.5H14v3.5"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function RepaymentIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" aria-hidden="true" {...props}>
      <path
        d="M3.5 4.5h9a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1h-9a1 1 0 0 1-1-1v-7a1 1 0 0 1 1-1zM5.5 3v3M10.5 3v3M6 9.5l1.5 1.5 3-3"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Signal lane definitions, mapped to paper rule lines */
const SIGNALS = [
  { id: "mobile", label: "Mobile usage", y: 130, startY: 195, icon: MobileSignalIcon, delay: 0 },
  { id: "airtime", label: "Airtime", y: 200, startY: 213, icon: AirtimeIcon, delay: 0.6 },
  { id: "cashflow", label: "Cashflow", y: 270, startY: 231, icon: CashflowIcon, delay: 1.2 },
  { id: "repayment", label: "Repayment behaviour", y: 340, startY: 249, icon: RepaymentIcon, delay: 1.8 },
] as const;

/** Convergence point at the decision dial input */
const CONVERGE = { x: 452, y: 235 } as const;

/** Node x position where horizontal flat lane starts */
const LANE_START_X = 216;
const LANE_END_X = 388;

/** Smooth bezier curve for each signal lane fanning out from the stack */
const lanePath = (s: typeof SIGNALS[number]) =>
  `M 134 ${s.startY} C 170 ${s.startY}, 170 ${s.y}, ${LANE_START_X} ${s.y} L ${LANE_END_X} ${s.y} C 420 ${s.y}, 420 235, 452 235`;

const DIAL = { cx: 518, cy: 235, r: 66 } as const;

/** Tactical paper document stack representing legacy credit files (3D Enhanced) */
function LegacyPaperStack() {
  return (
    <g className="transition-transform duration-300">
      {/* 3D Drop shadow definitions */}
      <defs>
        <filter id="paper-shadow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="2" dy="6" stdDeviation="6" floodColor="#000" floodOpacity="0.5" />
        </filter>
        <linearGradient id="paper-grad-1" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#2e2442" />
          <stop offset="100%" stopColor="#1a1329" />
        </linearGradient>
        <linearGradient id="paper-grad-2" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#251c36" />
          <stop offset="100%" stopColor="#161024" />
        </linearGradient>
      </defs>

      {/* Ambient floor shadow */}
      <ellipse cx="88" cy="310" rx="60" ry="12" fill="#000000" opacity="0.6" filter="blur(6px)" />

      {/* Sheet 3 (backmost card) */}
      <rect
        x="30"
        y="141"
        width="88"
        height="144"
        rx="6"
        fill="#161024"
        stroke="rgba(255, 255, 255, 0.08)"
        strokeWidth="1"
        filter="url(#paper-shadow)"
      />

      {/* Sheet 2 (middle card) */}
      <rect
        x="38"
        y="149"
        width="88"
        height="144"
        rx="6"
        fill="url(#paper-grad-2)"
        stroke="rgba(255, 255, 255, 0.12)"
        strokeWidth="1"
        filter="url(#paper-shadow)"
      />

      {/* Sheet 1 (front top document with dog-eared corner) */}
      <path
        d="M 46 163 C 46 159.7 48.7 157 52 157 L 118 157 L 134 173 L 134 293 C 134 296.3 131.3 299 128 299 L 52 299 C 48.7 299 46 296.3 46 293 Z"
        fill="url(#paper-grad-1)"
        stroke="rgba(255, 255, 255, 0.2)"
        strokeWidth="1"
        filter="url(#paper-shadow)"
      />

      {/* Dog-eared folded corner */}
      <path
        d="M 118 157 L 118 173 L 134 173 Z"
        fill="#1a1329"
        stroke="rgba(255, 255, 255, 0.3)"
        strokeWidth="1"
      />
      <path d="M 118 173 L 134 173" stroke="rgba(0, 0, 0, 0.5)" strokeWidth="1.5" />

      {/* Top Header Block / File Badge */}
      <rect
        x="58"
        y="171"
        width="34"
        height="10"
        rx="2"
        fill="rgba(255, 255, 255, 0.07)"
        stroke="rgba(255, 255, 255, 0.15)"
        strokeWidth="0.75"
      />
      <line x1="98" y1="176" x2="118" y2="176" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="2" strokeLinecap="round" />

      {/* Binder / Paperclip accent */}
      <path
        d="M 60 151 L 60 165 C 60 169 66 169 66 165 L 66 155"
        fill="none"
        stroke="rgba(255, 255, 255, 0.4)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      {/* Ruled paperwork lines matching the 4 signal origins */}
      {[195, 213, 231, 249, 267].map((y, i) => (
        <g key={y}>
          <rect
            x="58"
            y={y - 3}
            width="6"
            height="6"
            rx="1.5"
            fill="none"
            stroke="rgba(255, 255, 255, 0.15)"
            strokeWidth="0.8"
          />
          <line
            x1="70"
            y1={y}
            x2={i === 4 ? 100 : i === 2 ? 112 : 120}
            y2={y}
            stroke="rgba(255, 255, 255, 0.2)"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </g>
      ))}

      {/* Watermark padlock badge */}
      <g opacity="0.6">
        <rect
          x="108"
          y="259"
          width="14"
          height="11"
          rx="2"
          fill="rgba(255, 255, 255, 0.05)"
          stroke="rgba(255, 255, 255, 0.25)"
          strokeWidth="1"
        />
        <path
          d="M 111 259 V 256 C 111 253.8 112.8 252 115 252 C 117.2 252 119 253.8 119 256 V 259"
          fill="none"
          stroke="rgba(255, 255, 255, 0.25)"
          strokeWidth="1"
        />
      </g>
    </g>
  );
}

export function LastMileDiagram() {
  const { cx, cy, r } = DIAL;
  const [activeSignal, setActiveSignal] = useState<string | null>(null);

  const reduce = useReducedMotion();
  const still = <T,>(value: T) => (reduce ? undefined : value);

  // Math point generator for dial arc
  const dialPt = (deg: number) => {
    const a = (deg * Math.PI) / 180;
    return `${(cx + r * Math.cos(a)).toFixed(1)} ${(cy + r * Math.sin(a)).toFixed(1)}`;
  };

  /** Radial gauge ticks for the decision meter */
  const GAUGE_TICKS = Array.from({ length: 32 }).map((_, i) => {
    const deg = (i * 360) / 32;
    const rad = (deg * Math.PI) / 180;
    const isActive = deg >= 140 && deg <= 350;
    return { deg, rad, isActive, index: i };
  });

  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-[#0d0917] ring-1 ring-white/10 shadow-2xl">
      <svg
        viewBox={`0 0 ${VB.w} ${VB.h}`}
        className="absolute inset-0 h-full w-full select-none"
        role="img"
        aria-label="Illustration showing legacy credit files transforming into 4 live alternative signals powering a phone credit decision"
      >
        <defs>
          <linearGradient id="lm-lane-grad" x1="142" y1="0" x2="452" y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.15" />
            <stop offset="25%" stopColor="#e9a2f2" stopOpacity="0.75" />
            <stop offset="65%" stopColor="#7e49f2" stopOpacity="0.9" />
            <stop offset="90%" stopColor="#e9a2f2" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#f2cb07" stopOpacity="1" />
          </linearGradient>

          <linearGradient id="lm-dial-grad" x1="452" y1="301" x2="584" y2="169" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#7e49f2" />
            <stop offset="50%" stopColor="#e9a2f2" />
            <stop offset="100%" stopColor="#f2cb07" />
          </linearGradient>

          <radialGradient id="lm-bg-radial" cx="50%" cy="50%" r="70%">
            <stop offset="0%" stopColor="#211833" />
            <stop offset="60%" stopColor="#120c21" />
            <stop offset="100%" stopColor="#0a0614" />
          </radialGradient>

          <radialGradient id="grid-mask-grad" cx="50%" cy="50%" r="50%">
            <stop offset="20%" stopColor="white" stopOpacity="1" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>
          <mask id="grid-mask">
            <rect width={VB.w} height={VB.h} fill="url(#grid-mask-grad)" />
          </mask>

          <pattern id="lm-tech-grid" width="32" height="32" patternUnits="userSpaceOnUse" patternTransform="translate(0, 16)">
            <path d="M 32 0 L 0 0 0 32" fill="none" stroke="rgba(255, 255, 255, 0.03)" strokeWidth="1" />
            <circle cx="32" cy="32" r="1" fill="rgba(255, 255, 255, 0.06)" />
          </pattern>
        </defs>

        {/* Canvas Background with Faded 3D Grid */}
        <rect width={VB.w} height={VB.h} fill="url(#lm-bg-radial)" />
        <rect width={VB.w} height={VB.h} fill="url(#lm-tech-grid)" mask="url(#grid-mask)" />

        {/* Legacy Paper File Stack */}
        <LegacyPaperStack />

        {/* Data Lanes Layer 1: Base vector tracks */}
        <g fill="none" strokeLinecap="round">
          {SIGNALS.map((s) => {
            const isHovered = activeSignal === s.id;
            const isDimmed = activeSignal !== null && !isHovered;
            return (
              <path
                key={`track-${s.id}`}
                d={lanePath(s)}
                stroke="url(#lm-lane-grad)"
                strokeWidth={isHovered ? 4 : 2}
                opacity={isDimmed ? 0.15 : isHovered ? 1 : 0.6}
                className="transition-all duration-300"
              />
            );
          })}
        </g>

        {/* Signal Node Anchor Dots (at both ends of the straight lane) */}
        {SIGNALS.map((s) => {
          const isHovered = activeSignal === s.id;
          const isDimmed = activeSignal !== null && !isHovered;
          return (
            <g key={`node-${s.id}`} className="transition-opacity duration-300" opacity={isDimmed ? 0.2 : 1}>
              {/* Left Anchor */}
              <circle cx={LANE_START_X} cy={s.y} r={isHovered ? 4.5 : 3.5} fill="#160f26" stroke={isHovered ? "#e9a2f2" : "rgba(255,255,255,0.3)"} strokeWidth="1.5" className="transition-all duration-300" />
              <circle cx={LANE_START_X} cy={s.y} r={1.5} fill={isHovered ? "#ffffff" : "rgba(255,255,255,0.6)"} className="transition-all duration-300" />
              
              {/* Right Anchor */}
              <circle cx={LANE_END_X} cy={s.y} r={isHovered ? 4.5 : 3.5} fill="#160f26" stroke={isHovered ? "#7e49f2" : "rgba(255,255,255,0.3)"} strokeWidth="1.5" className="transition-all duration-300" />
              <circle cx={LANE_END_X} cy={s.y} r={1.5} fill={isHovered ? "#ffffff" : "rgba(255,255,255,0.6)"} className="transition-all duration-300" />
            </g>
          );
        })}

        {/* Data Lanes Layer 2: Live animated signal packets ("Comets") */}
        <g fill="none" strokeLinecap="round">
          {SIGNALS.map((s) => {
            const isHovered = activeSignal === s.id;
            const isDimmed = activeSignal !== null && !isHovered;
            return (
              <React.Fragment key={`pulses-${s.id}`}>
                {/* Primary Data Packet */}
                <motion.path
                  d={lanePath(s)}
                  stroke={isHovered ? "#ffffff" : "url(#lm-lane-grad)"}
                  strokeWidth={isHovered ? 3 : 2}
                  strokeDasharray="40 800"
                  initial={{ strokeDashoffset: 40 }}
                  animate={still({ strokeDashoffset: -420 })}
                  transition={still({
                    repeat: Infinity,
                    duration: isHovered ? 1.5 : 3.5,
                    ease: "linear",
                    delay: s.delay,
                  })}
                  opacity={isDimmed ? 0.1 : 1}
                />

                {/* Secondary Staggered Data Packet */}
                <motion.path
                  d={lanePath(s)}
                  stroke="#ffffff"
                  strokeWidth={1.5}
                  strokeDasharray="20 800"
                  initial={{ strokeDashoffset: 20 }}
                  animate={still({ strokeDashoffset: -420 })}
                  transition={still({
                    repeat: Infinity,
                    duration: isHovered ? 2 : 4,
                    ease: "linear",
                    delay: s.delay + 0.8,
                  })}
                  opacity={isDimmed ? 0.05 : 0.6}
                />
              </React.Fragment>
            );
          })}
        </g>

        {/* Convergence Node Port */}
        <motion.circle
          cx={CONVERGE.x}
          cy={CONVERGE.y}
          r={8}
          fill="none"
          stroke="#7e49f2"
          strokeWidth="1"
          animate={still({ scale: [0.8, 1.4, 0.8], opacity: [0.4, 0.8, 0.4] })}
          transition={still({ repeat: Infinity, duration: 2, ease: "easeInOut" })}
        />
        <circle cx={CONVERGE.x} cy={CONVERGE.y} r={4} fill="#120c1f" stroke="#e9a2f2" strokeWidth="1.5" />
        <circle cx={CONVERGE.x} cy={CONVERGE.y} r={1.5} fill="#ffffff" />

        {/* Decision Dial Gauge: Radial Ticks */}
        <g fill="none">
          {/* Inner bezel track */}
          <path
            d={`M${dialPt(138)} A${r+4} ${r+4} 0 1 1 ${dialPt(42)}`}
            stroke="rgba(255,255,255,0.03)"
            strokeWidth={14}
            strokeLinecap="round"
          />
          
          {GAUGE_TICKS.map((t) => {
            const x1 = cx + 72 * Math.cos(t.rad);
            const y1 = cy + 72 * Math.sin(t.rad);
            const x2 = cx + 77 * Math.cos(t.rad);
            const y2 = cy + 77 * Math.sin(t.rad);
            return (
              <line
                key={t.deg}
                x1={x1.toFixed(1)}
                y1={y1.toFixed(1)}
                x2={x2.toFixed(1)}
                y2={y2.toFixed(1)}
                stroke={t.isActive ? "url(#lm-dial-grad)" : "rgba(255, 255, 255, 0.1)"}
                strokeWidth={t.isActive ? 1.5 : 1}
                opacity={t.isActive ? 0.9 : 0.3}
                strokeLinecap="round"
              />
            );
          })}
        </g>

        {/* Decision Dial Arcs */}
        <g fill="none" strokeLinecap="round">
          {/* Dark Background Track */}
          <path
            d={`M${dialPt(140)} A${r} ${r} 0 1 1 ${dialPt(40)}`}
            stroke="#0a0614"
            strokeWidth={8}
          />
          <path
            d={`M${dialPt(140)} A${r} ${r} 0 1 1 ${dialPt(40)}`}
            stroke="rgba(255,255,255,0.05)"
            strokeWidth={1}
          />

          {/* Main decision verdict arc with smooth Framer Motion entrance */}
          <motion.path
            d={`M${dialPt(140)} A${r} ${r} 0 1 1 ${dialPt(350)}`}
            stroke="url(#lm-dial-grad)"
            strokeWidth={6}
            initial={{ pathLength: 0.8 }}
            animate={still({ pathLength: [0.8, 1, 0.8] })}
            transition={still({ repeat: Infinity, duration: 4, ease: "easeInOut" })}
          />

          {/* Spark indicator dot aligned perfectly with the arc tip (Rotate 308 to 350) */}
          <motion.g
            initial={{ rotate: 308 }}
            animate={still({ rotate: [308, 350, 308] })}
            transition={still({ repeat: Infinity, duration: 4, ease: "easeInOut" })}
            style={{ transformOrigin: `${cx}px ${cy}px` }}
          >
            <circle cx={cx + r} cy={cy} r={4.5} fill="#f2cb07" />
            <circle cx={cx + r} cy={cy} r={2} fill="#ffffff" />
          </motion.g>
        </g>

        {/* Smartphone Illustration (Premium 3D Extrusion) */}
        <g>
          {/* Phone Drop Shadow */}
          <rect x={cx - 20} y={cy - 24} width={40} height={64} rx={10} fill="#000" opacity="0.4" filter="blur(12px)" />

          {/* 3D Bezel Layer */}
          <rect
            x={cx - 16}
            y={cy - 29}
            width={34}
            height={60}
            rx={8}
            fill="#3a2b54"
          />

          {/* Phone Outer Chassis (Front Face) */}
          <rect
            x={cx - 18}
            y={cy - 31}
            width={34}
            height={60}
            rx={8}
            fill="#120c1f"
            stroke="rgba(255, 255, 255, 0.25)"
            strokeWidth="1"
          />

          {/* Screen Glass */}
          <rect
            x={cx - 16}
            y={cy - 28}
            width={30}
            height={56}
            rx={6}
            fill="#05030a"
            stroke="url(#lm-dial-grad)"
            strokeWidth="0.5"
            strokeOpacity="0.5"
          />

          {/* Dynamic Island */}
          <rect
            x={cx - 6}
            y={cy - 24}
            width={10}
            height={3}
            rx={1.5}
            fill="#221936"
          />
          <circle cx={cx - 3} cy={cy - 22.5} r={0.75} fill="rgba(255, 255, 255, 0.3)" />

          {/* Approved Checkmark Badge with live subtle breathing */}
          <motion.g
            animate={still({ scale: [1, 1.08, 1] })}
            transition={still({ repeat: Infinity, duration: 3, ease: "easeInOut" })}
            style={{ transformOrigin: `${cx - 1}px ${cy}px` }}
          >
            <circle
              cx={cx - 1}
              cy={cy}
              r={10}
              fill="url(#lm-dial-grad)"
              fillOpacity="0.2"
              stroke="#f2cb07"
              strokeWidth="1.2"
            />
            <path
              d={`M ${cx - 4.5} ${cy} L ${cx - 1.5} ${cy + 3} L ${cx + 3.5} ${cy - 2}`}
              fill="none"
              stroke="#f2cb07"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </motion.g>

          {/* Home Bar Indicator */}
          <rect
            x={cx - 6}
            y={cy + 22}
            width={10}
            height={1.5}
            rx={0.75}
            fill="rgba(255, 255, 255, 0.3)"
          />
        </g>
      </svg>

      {/* HTML Overlay: Interactive & Accessible Label Badges */}
      <div className="pointer-events-auto absolute inset-0">
        {/* Signal Labels positioned centered perfectly over the horizontal lane segment */}
        {SIGNALS.map((s) => {
          const isHovered = activeSignal === s.id;
          const isDimmed = activeSignal !== null && !isHovered;

          return (
            <div
              key={s.id}
              className="absolute -translate-x-1/2 -translate-y-[160%] transition-all duration-300"
              style={{
                left: `${(302 / VB.w) * 100}%`,
                top: `${(s.y / VB.h) * 100}%`,
              }}
              onMouseEnter={() => setActiveSignal(s.id)}
              onMouseLeave={() => setActiveSignal(null)}
            >
              <div
                className={`group flex cursor-pointer items-center gap-2 whitespace-nowrap rounded-lg border px-3 py-1.5 text-[11px] font-semibold tracking-wide shadow-xl transition-all duration-300 sm:text-xs ${
                  isHovered
                    ? "scale-105 border-[#e9a2f2]/50 bg-gradient-to-b from-[#2a1c42] to-[#1a112e] text-white shadow-[#e9a2f2]/10"
                    : isDimmed
                    ? "border-white/5 bg-[#140d24]/80 text-white/40"
                    : "border-white/10 bg-gradient-to-b from-[#1c1330] to-[#120c21] text-white/80 hover:border-white/20 hover:text-white"
                }`}
              >
                <span
                  className={`flex h-4 w-4 shrink-0 items-center justify-center transition-colors duration-300 ${
                    isHovered ? "text-[#e9a2f2]" : "text-[#7e49f2]"
                  }`}
                >
                  <s.icon className="h-3.5 w-3.5" />
                </span>
                <span>{s.label}</span>
              </div>
            </div>
          );
        })}

        {/* Legacy File Caption: Centered directly below the paper stack */}
        <div
          className="absolute -translate-x-1/2 whitespace-nowrap text-[9px] font-bold uppercase tracking-[0.2em] text-white/40 sm:text-[10px]"
          style={{ left: `${(88 / VB.w) * 100}%`, top: `${(390 / VB.h) * 100}%` }}
        >
          Legacy credit file
        </div>

        {/* Decision Dial Caption: Centered directly below the smartphone dial */}
        <div
          className="absolute -translate-x-1/2 whitespace-nowrap text-[9px] font-bold uppercase tracking-[0.2em] text-white/40 sm:text-[10px]"
          style={{ left: `${(DIAL.cx / VB.w) * 100}%`, top: `${(390 / VB.h) * 100}%` }}
        >
          A first fair loan
        </div>
      </div>
    </div>
  );
}
