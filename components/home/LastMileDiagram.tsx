/**
 * "The last mile" diagram: the legacy credit file on the left, the four
 * alternative signals it cannot see, and a credit decision on the right.
 *
 * Deliberately built as inline SVG plus real HTML labels rather than a raster
 * image, because the labels are content, not decoration:
 *   - HTML text stays sharp at any DPI and scales with the type scale, where
 *     text baked into a bitmap goes soft and unreadable at mobile widths.
 *   - It can be translated. Text inside an image cannot.
 *   - It is selectable and searchable.
 * The drawing carries no numbers: an invented credit score or loan amount next
 * to this copy would read as a product claim.
 *
 * Each signal gets its own horizontal lane rather than a symmetric fan. A fan
 * of four curves sharing both endpoints closes into a lens and reads as one
 * decorative shape; separate lanes read as four distinct inputs, which is the
 * point being made.
 */

/** viewBox is fixed at 640x480 so label percentages below stay in step with it. */
const VB = { w: 640, h: 480 } as const;

/** Where each lane runs, and the label that rides above it. */
const SIGNALS = [
  { label: "Mobile usage", y: 140 },
  { label: "Airtime", y: 205 },
  { label: "Cashflow", y: 270 },
  { label: "Repayment behaviour", y: 335 },
] as const;

/** Exit the file, curve into the lane, run flat, curve back into the dial. */
const lane = (y: number) =>
  `M144 230 C 184 230 184 ${y} 224 ${y} L 386 ${y} C 426 ${y} 426 240 452 240`;

const LABEL_X = 228;
const DIAL = { cx: 518, cy: 240, r: 66 } as const;

/** Stacked sheets: the paperwork a legacy model needs before it can see you. */
function LegacyFile() {
  const sheet = { width: 96, height: 140, rx: 6 };
  return (
    <g>
      {[
        { x: 32, y: 146, opacity: 0.35 },
        { x: 40, y: 153, opacity: 0.6 },
      ].map((s) => (
        <rect
          key={s.x}
          {...sheet}
          x={s.x}
          y={s.y}
          fill="#241c33"
          stroke="rgba(255,255,255,0.16)"
          opacity={s.opacity}
        />
      ))}
      <rect {...sheet} x={48} y={160} fill="#2b2140" stroke="rgba(255,255,255,0.26)" />
      {/* Ruled lines: legible as "a form" without inventing any text. */}
      {[190, 208, 226, 244, 262].map((y, i) => (
        <line
          key={y}
          x1={64}
          y1={y}
          x2={i === 4 ? 106 : 128}
          y2={y}
          stroke="rgba(255,255,255,0.3)"
          strokeWidth={3}
          strokeLinecap="round"
        />
      ))}
    </g>
  );
}

export function LastMileDiagram() {
  const { cx, cy, r } = DIAL;
  // Gauge open at the bottom: 150deg round to 30deg, so 240deg of sweep.
  const pt = (deg: number) => {
    const a = (deg * Math.PI) / 180;
    return `${(cx + r * Math.cos(a)).toFixed(1)} ${(cy + r * Math.sin(a)).toFixed(1)}`;
  };

  return (
    <div className="relative aspect-[4/3] overflow-hidden rounded-2xl ring-1 ring-line">
      <svg
        viewBox={`0 0 ${VB.w} ${VB.h}`}
        className="absolute inset-0 h-full w-full"
        role="img"
        aria-label="The legacy credit file on the left gives way to four live signals, mobile usage, airtime, cashflow and repayment behaviour, which together produce a credit decision"
      >
        <defs>
          {/* Cold at the paper, brand violet through the middle, gold where it
              becomes a decision. */}
          <linearGradient id="lm-signal" x1="144" y1="0" x2="452" y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#ffffff" stopOpacity="0.18" />
            <stop offset="0.5" stopColor="#7e49f2" />
            <stop offset="1" stopColor="#f2cb07" />
          </linearGradient>
          <linearGradient id="lm-dial" x1="452" y1="306" x2="584" y2="174" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#7e49f2" />
            <stop offset="1" stopColor="#f2cb07" />
          </linearGradient>
          <radialGradient id="lm-bg" cx="64%" cy="46%" r="72%">
            <stop offset="0" stopColor="#241c33" />
            <stop offset="1" stopColor="#0f0a18" />
          </radialGradient>
          <filter id="lm-glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="5" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <rect width={VB.w} height={VB.h} fill="url(#lm-bg)" />

        <LegacyFile />

        <g fill="none" stroke="url(#lm-signal)" strokeLinecap="round" filter="url(#lm-glow)">
          {SIGNALS.map((s) => (
            <path key={s.label} d={lane(s.y)} strokeWidth={2.25} />
          ))}
        </g>

        {/* Node where each lane starts its flat run, directly under its label */}
        <g fill="#f2cb07" filter="url(#lm-glow)">
          {SIGNALS.map((s) => (
            <circle key={s.label} cx={224} cy={s.y} r={3.5} />
          ))}
        </g>

        {/* Decision dial. No number: the arc reads as a verdict, not a score. */}
        <g fill="none" strokeLinecap="round">
          <path
            d={`M${pt(150)} A${r} ${r} 0 1 1 ${pt(30)}`}
            stroke="rgba(255,255,255,0.10)"
            strokeWidth={9}
          />
          <path
            d={`M${pt(150)} A${r} ${r} 0 1 1 ${pt(348)}`}
            stroke="url(#lm-dial)"
            strokeWidth={9}
            filter="url(#lm-glow)"
          />
          {/* One phone: the only thing the platform actually requires. */}
          <rect
            x={cx - 14}
            y={cy - 26}
            width={28}
            height={52}
            rx={5}
            stroke="#f2cb07"
            strokeWidth={2}
            filter="url(#lm-glow)"
          />
          <line x1={cx - 5} y1={cy - 17} x2={cx + 5} y2={cy - 17} stroke="#f2cb07" strokeWidth={2} />
        </g>
      </svg>

      {/* Labels live in the DOM, not the bitmap: translatable, selectable and
          sharp at every width. Percentages track the fixed viewBox above. */}
      <div className="pointer-events-none absolute inset-0">
        {/* nowrap throughout: the lanes are only 65 units apart, so a label that
            wraps to a second line lands on its neighbour. Every string here is
            short enough to clear the card at the narrowest layout. */}
        {SIGNALS.map((s) => (
          <span
            key={s.label}
            aria-hidden
            className="absolute -translate-y-[135%] whitespace-nowrap text-[11px] font-medium leading-tight text-white/85 sm:text-[13px]"
            style={{ left: `${(LABEL_X / VB.w) * 100}%`, top: `${(s.y / VB.h) * 100}%` }}
          >
            {s.label}
          </span>
        ))}
        {/* Anchored to the left edge of the file rather than centred under it:
            the caption is wider than the drawing it labels, so centring pushed
            it off the card. */}
        <span
          aria-hidden
          className="absolute whitespace-nowrap text-[9px] font-semibold uppercase leading-tight tracking-[0.12em] text-white/45 sm:text-[11px]"
          style={{ left: `${(32 / VB.w) * 100}%`, top: `${(330 / VB.h) * 100}%` }}
        >
          Legacy credit file
        </span>
        {/* Right-anchored rather than centred on the dial: centring put its
            right edge past the card once the column got narrow. */}
        <span
          aria-hidden
          className="absolute right-[4%] whitespace-nowrap text-right text-[9px] font-semibold uppercase leading-tight tracking-[0.12em] text-white/45 sm:text-[11px]"
          style={{ top: `${(348 / VB.h) * 100}%` }}
        >
          A first fair loan
        </span>
      </div>
    </div>
  );
}
