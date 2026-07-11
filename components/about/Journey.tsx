"use client";

import { useEffect, useRef, useState } from "react";
import {
  animate,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  type Variants,
} from "framer-motion";
import { getIcon } from "@/lib/icons";
import { MILESTONES } from "@/lib/site";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";

const SECTION_BG =
  "linear-gradient(180deg, #ffffff 0%, var(--navy-50) 46%, #ffffff 100%)";
const EASE = [0.16, 1, 0.3, 1] as const;

const TITLE = (
  <>
    From a Dubai desk to a{" "}
    <span className="font-playfair text-primary-strong">next-generation platform</span>
  </>
);
const SUBTITLE =
  "Two years of momentum, milestone by milestone: the moves that built PhotonMatters.";

/* Step-transition choreography for the focus panel. `custom` is the scroll
   direction (1 down, -1 up) so content rises in from the way you're travelling. */
const PANEL: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.04 } },
};
const RISE: Variants = {
  hidden: (dir: number) => ({ opacity: 0, y: 20 * dir }),
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};
const TITLE_WIPE: Variants = {
  hidden: (dir: number) => ({ opacity: 0, y: 26 * dir, clipPath: "inset(0 0 100% 0)" }),
  show: { opacity: 1, y: 0, clipPath: "inset(0 0 0% 0)", transition: { duration: 0.6, ease: EASE } },
};
const GHOST: Variants = {
  hidden: (dir: number) => ({ opacity: 0, scale: 1.14, y: 12 * dir }),
  show: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.75, ease: EASE } },
};

/** Big metric that counts up from zero each time its milestone becomes active. */
function MetricCount({ value, gold }: { value: string; gold: boolean }) {
  const reduce = useReducedMotion();
  const target = Number.parseInt(value, 10);
  const numeric = Number.isFinite(target);
  const [display, setDisplay] = useState(numeric ? "0" : value);

  useEffect(() => {
    if (!numeric) return;
    const controls = animate(0, target, {
      duration: reduce ? 0 : 1,
      ease: EASE,
      onUpdate: (v) => setDisplay(String(Math.round(v))),
    });
    return () => controls.stop();
  }, [numeric, target, reduce]);

  return (
    <span
      className="text-display font-extrabold tabular-nums"
      style={{ color: gold ? "var(--amber-600)" : "var(--color-primary-strong)" }}
    >
      {numeric ? display : value}
    </span>
  );
}

/**
 * "Our Journey" timeline. On a wide viewport with motion allowed it is a
 * contained, one-screen stage that plays as the page scrolls: a compact index
 * rail on the left tracks progress while a focus card on the right cross-fades
 * from milestone to milestone, finishing gold at the closing step. On narrow
 * viewports, or when reduced motion is preferred, it becomes a plain compact
 * list with no pinning.
 */
export function Journey() {
  const enhanced = useEnhancedMode();
  return enhanced ? <FocusReveal /> : <CompactList />;
}

/** True only after mount on a wide viewport when motion is not reduced. */
function useEnhancedMode(): boolean {
  const reduce = useReducedMotion();
  const [wide, setWide] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setWide(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return wide && !reduce;
}

/* ------------------------------------------------------------------ */
/* Enhanced: contained sticky stage that advances on scroll            */
/* ------------------------------------------------------------------ */

function FocusReveal() {
  const wrapRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const count = MILESTONES.length;

  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ["start start", "end end"],
  });
  const railFill = useSpring(scrollYProgress, { stiffness: 90, damping: 30, mass: 0.4 });

  // Scroll direction (1 down, -1 up) drives which way new content rises in.
  const [dir, setDir] = useState(1);
  const prevRef = useRef(0);
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setDir(v >= prevRef.current ? 1 : -1);
    prevRef.current = v;
    setActive(Math.min(count - 1, Math.max(0, Math.floor(v * count))));
  });

  // Jump the page scroll so the clicked milestone becomes active (rail acts as nav).
  const jumpTo = (i: number) => {
    const el = wrapRef.current;
    if (!el) return;
    const runway = el.offsetHeight - window.innerHeight;
    window.scrollTo({ top: el.offsetTop + ((i + 0.5) / count) * runway, behavior: "smooth" });
  };

  // Scroll runway. Larger multiplier = more scroll distance per milestone (less
  // sensitive). ~42vh/step means it takes a few wheel ticks to advance one step.
  const runwayVh = Math.round(count * 42 + 130);

  return (
    <section
      ref={wrapRef}
      id="journey"
      aria-label="Our journey"
      className="relative mt-12 scroll-mt-24 lg:-mt-24"
      style={{ height: `${runwayVh}vh`, background: SECTION_BG }}
    >
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div
            className="absolute right-[8%] top-1/2 h-96 w-96 -translate-y-1/2 rounded-full opacity-70 blur-[120px]"
            style={{ background: "radial-gradient(circle, rgba(126,73,242,0.12), transparent 70%)" }}
          />
        </div>

        <div className="container-site relative w-full">
          {/* Split header: title (with a forced break) on the left, description
              on the right, baselines aligned. */}
          <div className="grid items-end gap-x-16 gap-y-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,auto)]">
            <div>
              <span className="eyebrow mb-4 block !text-[color:var(--color-primary)]">Our journey</span>
              <h2 className="text-h2 font-bold text-ink pb-[0.18em]">
                From a Dubai desk to a
                <br />
                <span className="font-playfair text-primary-strong">next-generation platform</span>
              </h2>
            </div>
            <p className="max-w-sm text-body-lg text-secondary lg:justify-self-end lg:text-right">
              {SUBTITLE}
            </p>
          </div>

          <div className="mt-10 grid grid-cols-[minmax(0,2fr)_minmax(0,3fr)] items-center gap-12 xl:gap-16">
            {/* Index rail */}
            <ol role="list" className="relative ml-4 xl:ml-6">
              <span aria-hidden className="absolute bottom-3 left-[7px] top-3 w-[2px] rounded-full bg-line" />
              <motion.span
                aria-hidden
                className="absolute left-[7px] top-3 h-[calc(100%-1.5rem)] w-[2px] origin-top rounded-full"
                style={{
                  background:
                    "linear-gradient(180deg, var(--blue-500) 0%, var(--blue-400) 78%, var(--amber-500) 100%)",
                  scaleY: railFill,
                }}
              />
              {MILESTONES.map((m, i) => {
                const on = i === active;
                const gold = Boolean(m.climax);
                return (
                  <li key={`${m.date}-${m.title}`} className="relative">
                    <button
                      type="button"
                      onClick={() => jumpTo(i)}
                      aria-current={on ? "step" : undefined}
                      className="group flex w-full items-center gap-4 py-[7px] text-left"
                    >
                      {/* Node: stays on the rail, outside the pill */}
                      <span
                        className={cn(
                          "relative z-10 h-4 w-4 shrink-0 rounded-full border-2 transition-all duration-300",
                          on ? "scale-110" : "bg-surface",
                        )}
                        style={{
                          borderColor: on
                            ? gold
                              ? "var(--amber-500)"
                              : "var(--color-primary)"
                            : "var(--color-line-strong)",
                          background: on
                            ? gold
                              ? "var(--amber-500)"
                              : "var(--color-primary)"
                            : "var(--color-surface)",
                        }}
                      />
                      {/* Content group: the gliding pill hugs exactly this (date +
                          title), so it never spans the full column or the rail. */}
                      <span className="relative flex min-w-0 items-center gap-4">
                        {on ? (
                          <motion.span
                            layoutId="journey-rail-active"
                            aria-hidden
                            className="pointer-events-none absolute -inset-x-3 -inset-y-1 rounded-xl"
                            style={{ background: gold ? "var(--amber-100)" : "var(--blue-50)" }}
                            transition={{ type: "spring", stiffness: 380, damping: 34 }}
                          />
                        ) : null}
                        <span
                          className={cn(
                            "relative z-10 w-[68px] shrink-0 text-caption font-semibold tabular-nums transition-colors duration-300",
                            on ? "text-primary-strong" : "text-muted group-hover:text-secondary",
                          )}
                          style={on && gold ? { color: "var(--amber-600)" } : undefined}
                        >
                          {m.date}
                        </span>
                        <span
                          className={cn(
                            "relative z-10 truncate text-body font-semibold transition-colors duration-300",
                            on ? "text-ink" : "text-muted group-hover:text-secondary",
                          )}
                        >
                          {m.title}
                        </span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ol>

            {/* Focus panel: borderless editorial float. An oversized, faint
                Playfair year sits behind the milestone; content floats on the
                section surface. Single keyed fade-in per step (no exit queue),
                so fast scrolling can never strand it blank. */}
            <div className="relative min-h-[400px] pl-1 lg:pl-4">
              {MILESTONES.map((m, i) => {
                if (i !== active) return null;
                const Icon = getIcon(m.icon);
                const gold = Boolean(m.climax);
                const year = m.date.slice(-4);
                return (
                  <motion.div
                    key={i}
                    custom={dir}
                    variants={PANEL}
                    initial="hidden"
                    animate="show"
                    className="relative"
                  >
                    {/* Oversized ghost year (chapter watermark) */}
                    <motion.span
                      aria-hidden
                      custom={dir}
                      variants={GHOST}
                      className="font-playfair pointer-events-none absolute -top-20 right-0 select-none italic leading-none"
                      style={{
                        fontSize: "clamp(7rem, 13vw, 12.5rem)",
                        color: gold ? "rgba(242,203,7,0.12)" : "rgba(126,73,242,0.08)",
                        transformOrigin: "right center",
                      }}
                    >
                      {year}
                    </motion.span>
                    {/* Soft depth bloom */}
                    <span
                      aria-hidden
                      className="pointer-events-none absolute -left-12 top-2 h-64 w-64 rounded-full blur-[90px]"
                      style={{
                        background: gold
                          ? "radial-gradient(circle, rgba(242,203,7,0.14), transparent 70%)"
                          : "radial-gradient(circle, rgba(126,73,242,0.12), transparent 70%)",
                      }}
                    />

                    {/* Date row: inline icon + tracked label */}
                    <motion.div custom={dir} variants={RISE} className="relative z-10 flex items-center gap-3">
                      <Icon
                        size={24}
                        strokeWidth={1.9}
                        aria-hidden
                        style={{ color: gold ? "var(--amber-600)" : "var(--color-primary)" }}
                      />
                      <span
                        className="text-label uppercase tracking-[0.16em]"
                        style={{ color: gold ? "var(--amber-600)" : "var(--color-primary-strong)" }}
                      >
                        {m.date}
                      </span>
                    </motion.div>

                    <motion.h3
                      custom={dir}
                      variants={TITLE_WIPE}
                      className="relative z-10 mt-5 max-w-[16ch] text-balance text-h1 font-bold text-ink"
                    >
                      {m.title}
                    </motion.h3>
                    <motion.p
                      custom={dir}
                      variants={RISE}
                      className="relative z-10 mt-4 max-w-[46ch] text-body-lg text-secondary"
                    >
                      {m.body}
                    </motion.p>

                    {m.metric ? (
                      <motion.div custom={dir} variants={RISE} className="relative z-10 mt-8 flex items-baseline gap-2.5">
                        <MetricCount value={m.metric.value} gold={gold} />
                        <span className="text-body text-muted">{m.metric.label}</span>
                      </motion.div>
                    ) : null}
                  </motion.div>
                );
              })}

              {/* Step counter */}
              <p className="relative z-10 mt-10 text-caption tabular-nums text-muted">
                {String(active + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Fallback: compact list (mobile / reduced motion)                    */
/* ------------------------------------------------------------------ */

function CompactList() {
  return (
    <section id="journey" className="section relative overflow-hidden scroll-mt-24" style={{ background: SECTION_BG }}>
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div
          className="absolute left-1/2 top-24 h-72 w-72 -translate-x-1/2 rounded-full opacity-70 blur-[110px]"
          style={{ background: "radial-gradient(circle, rgba(126,73,242,0.10), transparent 70%)" }}
        />
      </div>

      <div className="container-site relative">
        <SectionHeader align="center" eyebrow="Our journey" title={TITLE} subtitle={SUBTITLE} />

        <ol role="list" className="relative mx-auto mt-12 max-w-xl">
          <span aria-hidden className="absolute bottom-4 left-[19px] top-4 w-[2px] rounded-full bg-line" />
          {MILESTONES.map((m, i) => {
            const Icon = getIcon(m.icon);
            const gold = Boolean(m.climax);
            return (
              <li key={`${m.date}-${m.title}`} className="relative flex gap-5 pb-8 last:pb-0">
                <span
                  className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-white"
                  style={{
                    background: gold
                      ? "linear-gradient(150deg, var(--blue-500), var(--amber-500))"
                      : "linear-gradient(150deg, #8b5cf6, #6a34e0)",
                    boxShadow: gold
                      ? "0 10px 22px -12px rgba(242,203,7,0.5)"
                      : "0 10px 22px -14px rgba(126,73,242,0.5)",
                  }}
                >
                  <Icon size={18} strokeWidth={1.9} aria-hidden />
                </span>
                <Reveal index={i} className="flex-1 pt-0.5">
                  <span
                    className={cn(
                      "inline-flex items-center rounded-full px-2.5 py-0.5 text-caption font-semibold",
                      gold
                        ? "bg-[color:var(--amber-100)] text-[color:var(--amber-600)]"
                        : "bg-[color:var(--blue-50)] text-primary-strong",
                    )}
                  >
                    {m.date}
                  </span>
                  <h3 className="mt-2 text-h3 font-bold text-ink">{m.title}</h3>
                  <p className="mt-1.5 text-body text-secondary">{m.body}</p>
                  {m.metric ? (
                    <p className="mt-2.5 flex items-baseline gap-2">
                      <span className="text-h2 font-extrabold tabular-nums text-primary-strong">
                        {m.metric.value}
                      </span>
                      <span className="text-caption text-muted">{m.metric.label}</span>
                    </p>
                  ) : null}
                </Reveal>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
