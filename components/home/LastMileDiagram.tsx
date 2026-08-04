"use client";

/**
 * "The Last Mile" diagram component.
 *
 * Visualizes the transformation from static legacy paper credit files on the left
 * into 4 live alternative data signals (Mobile usage, Airtime, Cashflow, Repayment behaviour),
 * converging into a real-time credit decision gauge and mobile phone approval on the right.
 *
 * High-craft SVG + HTML hybrid:
 *   - HTML text badges remain crisp, selectable, and fully responsive across all viewports.
 *   - Live animated signal data packets flow along vector path curves using Framer Motion.
 *   - Interactive hover states highlight individual signal streams.
 *   - Clean brand color palette (Obsidian, Electric Violet #7E49F2, Orchid #E9A2F2, Spark Gold #F2CB07).
 *   - Precision vector path alignment: symmetric curves, node anchors, and centered captions.
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

/** Signal lane definitions */
const SIGNALS = [
  { id: "mobile", label: "Mobile usage", y: 130, icon: MobileSignalIcon, delay: 0 },
  { id: "airtime", label: "Airtime", y: 200, icon: AirtimeIcon, delay: 0.6 },
  { id: "cashflow", label: "Cashflow", y: 270, icon: CashflowIcon, delay: 1.2 },
  { id: "repayment", label: "Repayment behaviour", y: 340, icon: RepaymentIcon, delay: 1.8 },
] as const;

/** Origin point on the right edge of top paper document */
const ORIGIN = { x: 138, y: 235 } as const;

/** Convergence point at the decision dial input */
const CONVERGE = { x: 452, y: 235 } as const;

/** Node x position where horizontal flat lane starts */
const LANE_START_X = 216;
const LANE_END_X = 388;

/** Smooth bezier curve for each signal lane: origin -> flat lane -> dial convergence */
const lanePath = (y: number) =>
  `M ${ORIGIN.x} ${ORIGIN.y} C 176 ${ORIGIN.y}, 176 ${y}, ${LANE_START_X} ${y} L ${LANE_END_X} ${y} C 424 ${y}, 424 ${CONVERGE.y}, ${CONVERGE.x} ${CONVERGE.y}`;

const DIAL = { cx: 518, cy: 235, r: 66 } as const;

/** Baseline for the two small captions. */
const CAPTION_Y = 332;

/** Radial gauge ticks for the decision meter */
const GAUGE_TICKS = Array.from({ length: 32 }).map((_, i) => {
  const deg = (i * 360) / 32;
  const rad = (deg * Math.PI) / 180;
  const isActive = deg >= 140 && deg <= 350;
  return { deg, rad, isActive, index: i };
});

/** Tactical paper document stack representing legacy credit files */
function LegacyPaperStack() {
  return (
    <g className="transition-transform duration-300">
      {/* Soft floor ambient drop shadow */}
      <ellipse cx="88" cy="315" rx="54" ry="10" fill="#000000" opacity="0.5" />

      {/* Sheet 3 (backmost card) */}
      <rect
        x="34"
        y="143"
        width="88"
        height="144"
        rx="6"
        fill="#161024"
        stroke="rgba(255, 255, 255, 0.08)"
        strokeWidth="1"
      />

      {/* Sheet 2 (middle card) */}
      <rect
        x="42"
        y="151"
        width="88"
        height="144"
        rx="6"
        fill="#1e1630"
        stroke="rgba(255, 255, 255, 0.14)"
        strokeWidth="1"
      />

      {/* Sheet 1 (front top document with dog-eared corner) */}
      <path
        d="M 50 165 C 50 161.7 52.7 159 56 159 L 122 159 L 138 175 L 138 295 C 138 298.3 135.3 301 132 301 L 56 301 C 52.7 301 50 298.3 50 295 Z"
        fill="#271e3b"
        stroke="rgba(255, 255, 255, 0.22)"
        strokeWidth="1"
      />

      {/* Dog-eared folded corner */}
      <path
        d="M 122 159 L 122 175 L 138 175 Z"
        fill="#1a1329"
        stroke="rgba(255, 255, 255, 0.25)"
        strokeWidth="1"
      />
      <path d="M 122 175 L 138 175" stroke="rgba(0, 0, 0, 0.4)" strokeWidth="1.5" />

      {/* Top Header Block / File Badge */}
      <rect
        x="62"
        y="173"
        width="34"
        height="10"
        rx="2"
        fill="rgba(255, 255, 255, 0.07)"
        stroke="rgba(255, 255, 255, 0.14)"
        strokeWidth="0.75"
      />
      <line x1="102" y1="178" x2="122" y2="178" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="2" strokeLinecap="round" />

      {/* Binder / Paperclip accent */}
      <path
        d="M 64 153 L 64 167 C 64 171 70 171 70 167 L 70 157"
        fill="none"
        stroke="rgba(255, 255, 255, 0.35)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      {/* Ruled paperwork lines */}
      {[197, 215, 233, 251, 269].map((y, i) => (
        <g key={y}>
          <rect
            x="62"
            y={y - 3}
            width="6"
            height="6"
            rx="1.5"
            fill="none"
            stroke="rgba(255, 255, 255, 0.18)"
            strokeWidth="0.8"
          />
          <line
            x1="74"
            y1={y}
            x2={i === 4 ? 104 : i === 2 ? 116 : 124}
            y2={y}
            stroke="rgba(255, 255, 255, 0.22)"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </g>
      ))}

      {/* Watermark padlock badge indicating static/locked legacy files */}
      <g opacity="0.65">
        <rect
          x="112"
          y="261"
          width="14"
          height="11"
          rx="2"
          fill="rgba(255, 255, 255, 0.05)"
          stroke="rgba(255, 255, 255, 0.25)"
          strokeWidth="1"
        />
        <path
          d="M 115 261 V 258 C 115 255.8 116.8 254 119 254 C 121.2 254 123 255.8 123 258 V 261"
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

  // Every animated component on this site gates on this hook (Reveal, Hero,
  // Testimonials, Journey and six others). These loops run forever and sit
  // directly above the already-pulsing Global Presence map, so honouring the
  // preference matters more here than most. Dropping `animate` leaves each
  // element parked on its `initial` state, which is a complete static drawing.
  const reduce = useReducedMotion();
  const still = <T,>(value: T) => (reduce ? undefined : value);

  // Math point generator for dial arc
  const dialPt = (deg: number) => {
    const a = (deg * Math.PI) / 180;
    return `${(cx + r * Math.cos(a)).toFixed(1)} ${(cy + r * Math.sin(a)).toFixed(1)}`;
  };

  // End point of decision arc (350deg)
  const endRad = (350 * Math.PI) / 180;
  const endX = (cx + r * Math.cos(endRad)).toFixed(1);
  const endY = (cy + r * Math.sin(endRad)).toFixed(1);

  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-[#0d0917] ring-1 ring-white/10 shadow-2xl">
      {/* SVG Canvas for precision graphic render */}
      <svg
        viewBox={`0 0 ${VB.w} ${VB.h}`}
        className="absolute inset-0 h-full w-full select-none"
        role="img"
        aria-label="Illustration showing legacy credit files transforming into 4 live alternative signals powering a phone credit decision"
      >
        <defs>
          {/* Lane color gradient: desaturated silver -> electric violet -> orchid -> spark gold */}
          <linearGradient id="lm-lane-grad" x1="142" y1="0" x2="452" y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.2" />
            <stop offset="25%" stopColor="#e9a2f2" stopOpacity="0.8" />
            <stop offset="65%" stopColor="#7e49f2" stopOpacity="1" />
            <stop offset="90%" stopColor="#e9a2f2" stopOpacity="1" />
            <stop offset="100%" stopColor="#f2cb07" stopOpacity="1" />
          </linearGradient>

          {/* Active bright core lane gradient */}
          <linearGradient id="lm-lane-active" x1="142" y1="0" x2="452" y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.6" />
            <stop offset="40%" stopColor="#e9a2f2" />
            <stop offset="80%" stopColor="#7e49f2" />
            <stop offset="100%" stopColor="#f2cb07" />
          </linearGradient>

          {/* Decision dial gradient arc */}
          <linearGradient id="lm-dial-grad" x1="452" y1="301" x2="584" y2="169" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#7e49f2" />
            <stop offset="50%" stopColor="#e9a2f2" />
            <stop offset="100%" stopColor="#f2cb07" />
          </linearGradient>

          {/* Canvas Radial Background */}
          <radialGradient id="lm-bg-radial" cx="50%" cy="50%" r="70%">
            <stop offset="0%" stopColor="#211833" />
            <stop offset="60%" stopColor="#120c21" />
            <stop offset="100%" stopColor="#0a0614" />
          </radialGradient>

          {/* Subtle Technical Micro-Grid Pattern */}
          <pattern id="lm-tech-grid" width="24" height="24" patternUnits="userSpaceOnUse">
            <path d="M 24 0 L 0 0 0 24" fill="none" stroke="rgba(255, 255, 255, 0.025)" strokeWidth="0.75" />
            <circle cx="24" cy="24" r="0.75" fill="rgba(255, 255, 255, 0.04)" />
          </pattern>
        </defs>

        {/* Canvas Background */}
        <rect width={VB.w} height={VB.h} fill="url(#lm-bg-radial)" />
        <rect width={VB.w} height={VB.h} fill="url(#lm-tech-grid)" />

        {/* Faint guide lines */}
        {SIGNALS.map((s) => (
          <line
            key={`guide-${s.id}`}
            x1={LANE_START_X}
            y1={s.y}
            x2={LANE_END_X}
            y2={s.y}
            stroke="rgba(255, 255, 255, 0.03)"
            strokeDasharray="2 6"
            strokeWidth="1"
          />
        ))}

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
                d={lanePath(s.y)}
                stroke="url(#lm-lane-grad)"
                strokeWidth={isHovered ? 3.5 : 2}
                opacity={isDimmed ? 0.25 : isHovered ? 1 : 0.75}
                className="transition-all duration-300"
              />
            );
          })}
        </g>

        {/* Signal Node Anchor Dots (where line meets label) */}
        {SIGNALS.map((s) => {
          const isHovered = activeSignal === s.id;
          const isDimmed = activeSignal !== null && !isHovered;
          return (
            <g key={`node-${s.id}`} className="transition-opacity duration-300" opacity={isDimmed ? 0.3 : 1}>
              <circle cx={LANE_START_X} cy={s.y} r={isHovered ? 5 : 3.5} fill="#160f26" stroke="#e9a2f2" strokeWidth="1.5" />
              <circle cx={LANE_START_X} cy={s.y} r={1.5} fill="#ffffff" />
            </g>
          );
        })}

        {/* Data Lanes Layer 2: Live animated signal packets (flowing data particles) */}
        <g fill="none" strokeLinecap="round">
          {SIGNALS.map((s) => {
            const isHovered = activeSignal === s.id;
            const isDimmed = activeSignal !== null && !isHovered;
            return (
              <React.Fragment key={`pulses-${s.id}`}>
                {/* Flowing animated dash stroke along the path */}
                <motion.path
                  d={lanePath(s.y)}
                  stroke="url(#lm-lane-active)"
                  strokeWidth={isHovered ? 3 : 2}
                  strokeDasharray="6 24"
                  opacity={isDimmed ? 0.2 : 0.9}
                  initial={{ strokeDashoffset: 0 }}
                  animate={still({ strokeDashoffset: -60 })}
                  transition={still({
                    repeat: Infinity,
                    duration: isHovered ? 1.2 : 2.2,
                    ease: "linear",
                    delay: s.delay,
                  })}
                />

                {/* Second staggered packet layer */}
                <motion.path
                  d={lanePath(s.y)}
                  stroke="#ffffff"
                  strokeWidth={1.5}
                  strokeDasharray="3 45"
                  opacity={isDimmed ? 0.15 : 0.85}
                  initial={{ strokeDashoffset: 0 }}
                  animate={still({ strokeDashoffset: -90 })}
                  transition={still({
                    repeat: Infinity,
                    duration: isHovered ? 1.5 : 2.8,
                    ease: "linear",
                    delay: s.delay + 0.4,
                  })}
                />
              </React.Fragment>
            );
          })}
        </g>

        {/* Convergence Node Pulse Effect */}
        <motion.circle
          cx={CONVERGE.x}
          cy={CONVERGE.y}
          r={6}
          fill="none"
          stroke="#f2cb07"
          strokeWidth="1.5"
          animate={still({ scale: [1, 1.8, 1], opacity: [0.3, 0.8, 0.3] })}
          transition={still({ repeat: Infinity, duration: 2, ease: "easeInOut" })}
        />
        <circle cx={CONVERGE.x} cy={CONVERGE.y} r={3} fill="#f2cb07" />

        {/* Decision Dial Gauge: Radial Ticks */}
        <g fill="none">
          <circle cx={cx} cy={cy} r={82} stroke="rgba(255, 255, 255, 0.05)" strokeDasharray="3 6" strokeWidth="1" />
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
                opacity={t.isActive ? 0.85 : 0.3}
              />
            );
          })}
        </g>

        {/* Decision Dial Arcs (Clean, crisp verdict meter without cluttered inner rails) */}
        <g fill="none" strokeLinecap="round">
          {/* Dark background track */}
          <path
            d={`M${dialPt(140)} A${r} ${r} 0 1 1 ${dialPt(40)}`}
            stroke="rgba(255, 255, 255, 0.08)"
            strokeWidth={8}
          />

          {/* Main decision verdict arc with smooth Framer Motion entrance */}
          <motion.path
            d={`M${dialPt(140)} A${r} ${r} 0 1 1 ${dialPt(350)}`}
            stroke="url(#lm-dial-grad)"
            strokeWidth={8}
            initial={{ pathLength: 0.8 }}
            animate={still({ pathLength: [0.8, 1, 0.8] })}
            transition={still({ repeat: Infinity, duration: 4, ease: "easeInOut" })}
          />

          {/* Spark indicator dot at dial tip */}
          <circle cx={endX} cy={endY} r={4.5} fill="#f2cb07" />
          <circle cx={endX} cy={endY} r={2} fill="#ffffff" />
        </g>

        {/* Smartphone Illustration & Approved Verdict Badge */}
        <g>
          {/* Phone Outer Chassis */}
          <rect
            x={cx - 17}
            y={cy - 30}
            width={34}
            height={60}
            rx={8}
            fill="#150f24"
            stroke="rgba(255, 255, 255, 0.25)"
            strokeWidth="1.2"
          />

          {/* Screen Glass */}
          <rect
            x={cx - 15}
            y={cy - 28}
            width={30}
            height={56}
            rx={6}
            fill="#0a0614"
            stroke="url(#lm-dial-grad)"
            strokeWidth="0.8"
            strokeOpacity="0.4"
          />

          {/* Speaker / Dynamic Island */}
          <rect
            x={cx - 5}
            y={cy - 24}
            width={10}
            height={2.5}
            rx={1.25}
            fill="rgba(255, 255, 255, 0.3)"
          />

          {/* Approved Checkmark Badge with live subtle breathing */}
          <motion.g
            animate={still({ scale: [1, 1.06, 1] })}
            transition={still({ repeat: Infinity, duration: 3, ease: "easeInOut" })}
            style={{ transformOrigin: `${cx}px ${cy}px` }}
          >
            <circle
              cx={cx}
              cy={cy + 1}
              r={9}
              fill="rgba(126, 73, 242, 0.25)"
              stroke="#f2cb07"
              strokeWidth="1.4"
            />
            <path
              d={`M ${cx - 3.5} ${cy + 1} L ${cx - 1} ${cy + 3.5} L ${cx + 4} ${cy - 2}`}
              fill="none"
              stroke="#f2cb07"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </motion.g>

          {/* Home Bar Indicator */}
          <rect
            x={cx - 5}
            y={cy + 22}
            width={10}
            height={1.5}
            rx={0.75}
            fill="rgba(255, 255, 255, 0.25)"
          />
        </g>
      </svg>

      {/* HTML Overlay: Interactive & Accessible Label Badges aligned precisely with SVG nodes */}
      <div className="pointer-events-auto absolute inset-0">
        {/* Signal Labels positioned above node anchor dots at LANE_START_X (216) */}
        {SIGNALS.map((s) => {
          const isHovered = activeSignal === s.id;
          const isDimmed = activeSignal !== null && !isHovered;

          return (
            <div
              key={s.id}
              className="absolute -translate-y-[135%] transition-all duration-200"
              style={{
                left: `${(LANE_START_X / VB.w) * 100}%`,
                top: `${(s.y / VB.h) * 100}%`,
              }}
              onMouseEnter={() => setActiveSignal(s.id)}
              onMouseLeave={() => setActiveSignal(null)}
            >
              <div
                className={`group flex cursor-pointer items-center gap-1.5 whitespace-nowrap rounded-full border px-2.5 py-1 text-[11px] font-medium tracking-wide shadow-md transition-all duration-200 sm:text-xs ${
                  isHovered
                    ? "scale-105 border-purple-400/60 bg-[#251a3d] text-white shadow-purple-500/20"
                    : isDimmed
                    ? "border-white/5 bg-[#140d24]/60 text-white/50"
                    : "border-white/12 bg-[#160f26]/80 text-white/90 hover:border-purple-400/40 hover:bg-[#1d1433]"
                }`}
              >
                <span
                  className={`flex h-4 w-4 shrink-0 items-center justify-center transition-colors duration-200 ${
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

        {/* Legacy File Caption: Centered directly below the paper stack (x = 90) */}
        {/* Anchored to the left edge of the file, NOT centred under it. The
            caption is wider than the drawing it labels, so centring pushes it
            off the card once the column narrows. */}
        <div
          className="absolute whitespace-nowrap text-[9px] font-semibold uppercase tracking-[0.14em] text-white/50 sm:text-[10px]"
          style={{ left: `${(34 / VB.w) * 100}%`, top: `${(CAPTION_Y / VB.h) * 100}%` }}
        >
          Legacy credit file
        </div>

        {/* Decision Dial Caption: Centered directly below the smartphone dial (cx = 518) */}
        {/* Right-anchored for the same reason: centring on the dial put its
            right edge past the card at narrow widths. */}
        <div
          className="absolute right-[4%] whitespace-nowrap text-right text-[9px] font-semibold uppercase tracking-[0.14em] text-white/50 sm:text-[10px]"
          style={{ top: `${(CAPTION_Y / VB.h) * 100}%` }}
        >
          A first fair loan
        </div>
      </div>
    </div>
  );
}
