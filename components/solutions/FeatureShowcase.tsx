"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/cn";
import { ShowcaseVisual } from "./ShowcaseVisual";

const CYCLE = 5; // seconds per auto-advance

export interface ShowcaseItem {
  title: string;
  body: string;
  /** Pre-rendered icon element (resolved in the server template). */
  icon: React.ReactNode;
  /** Visual id for the animated mini-graphic. */
  visual: string;
}

interface FeatureShowcaseProps {
  eyebrow?: string;
  heading: string;
  items: ShowcaseItem[];
}

const HEADING_CLIP =
  "text-h2 font-bold text-balance bg-clip-text pb-[0.18em] text-transparent bg-gradient-to-b from-ink to-[color:rgba(26,20,38,0.6)]";

/**
 * Interactive "What you can do" explorer — story-progress tabs paired with a
 * dark product panel that plays a bespoke animated visual per feature.
 */
export function FeatureShowcase({ eyebrow, heading, items }: FeatureShowcaseProps) {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (reduce || items.length < 2) return;
    const t = setInterval(() => setActive((a) => (a + 1) % items.length), CYCLE * 1000);
    return () => clearInterval(t);
  }, [reduce, items.length, active]);

  const item = items[active];

  return (
    <section className="section bg-sunken">
      <div className="container-site">
        {eyebrow ? <p className="eyebrow mb-4">{eyebrow}</p> : null}
        <h2 className={HEADING_CLIP}>{heading}</h2>

        <div className="mt-12 grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-14">
          {/* Story-progress tabs */}
          <div role="tablist" aria-label={heading} className="flex flex-col">
            {items.map((it, i) => {
              const isActive = i === active;
              return (
                <button
                  key={it.title}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActive(i)}
                  className={cn(
                    "relative cursor-pointer py-4 pl-6 text-left text-h3 font-semibold tracking-tight transition-colors duration-200",
                    isActive ? "text-ink" : "text-muted hover:text-ink",
                  )}
                >
                  {/* Rail track */}
                  <span aria-hidden className="absolute left-0 top-0 h-full w-[2px] bg-line" />
                  {/* Animated progress fill on the active tab */}
                  {isActive ? (
                    <motion.span
                      key={active}
                      aria-hidden
                      className="absolute left-0 top-0 h-full w-[2px] origin-top bg-primary"
                      initial={reduce ? { scaleY: 1 } : { scaleY: 0 }}
                      animate={{ scaleY: 1 }}
                      transition={reduce ? { duration: 0 } : { duration: CYCLE, ease: "linear" }}
                    />
                  ) : null}
                  {it.title}
                </button>
              );
            })}
          </div>

          {/* Dark product panel */}
          <div className="relative">
            <div
              className="relative overflow-hidden rounded-3xl border border-white/10 bg-ink p-6 text-white sm:p-8"
              style={{ boxShadow: "0 30px 70px -30px rgba(126,73,242,0.55)" }}
            >
              {/* Ambient blooms */}
              <div
                aria-hidden
                className="pointer-events-none absolute -right-[12%] -top-[20%] h-72 w-72 rounded-full blur-[80px]"
                style={{ background: "rgba(126,73,242,0.32)" }}
              />
              <div
                aria-hidden
                className="pointer-events-none absolute -bottom-[20%] -left-[10%] h-60 w-60 rounded-full blur-[70px]"
                style={{ background: "rgba(233,162,242,0.16)" }}
              />
              {/* Dot grid texture */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-[0.5]"
                style={{
                  backgroundImage: "radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)",
                  backgroundSize: "16px 16px",
                  maskImage: "radial-gradient(120% 100% at 50% 0%, #000 40%, transparent 100%)",
                }}
              />

              {/* Window chrome */}
              <div className="relative z-10 flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                <span className="ml-2 text-label uppercase tracking-[0.14em] text-white/40">
                  Campaign console
                </span>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={reduce ? false : { opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? undefined : { opacity: 0, y: -14 }}
                  transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                  className="relative z-10"
                >
                  {/* Animated visual stage */}
                  <div className="mt-5 flex h-44 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] px-4">
                    <ShowcaseVisual kind={item.visual} reduce={reduce} />
                  </div>

                  <div className="mt-6 flex items-center gap-3">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10 text-[color:var(--blue-400)]">
                      {item.icon}
                    </span>
                    <h3 className="text-h3 font-bold text-white">{item.title}</h3>
                  </div>
                  <p className="mt-3 text-body text-[color:var(--color-text-on-dark-muted)]">
                    {item.body}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
