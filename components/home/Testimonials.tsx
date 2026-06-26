"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/cn";
import { TESTIMONIALS } from "@/lib/site";

const ROTATE_MS = 6500;

/**
 * Client-voices showcase — a dark, editorial band that auto-rotates through
 * verbatim testimonials. The left rail lets the reader jump between speakers
 * via role pills; the right stage crossfades the featured quote. Rotation
 * pauses on hover/focus and when prefers-reduced-motion is set.
 */
export function Testimonials() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = TESTIMONIALS.length;

  const goTo = useCallback((i: number) => setActive(((i % total) + total) % total), [total]);

  useEffect(() => {
    if (reduce || paused) return;
    const id = window.setInterval(() => setActive((i) => (i + 1) % total), ROTATE_MS);
    return () => window.clearInterval(id);
  }, [reduce, paused, total]);

  const current = TESTIMONIALS[active];

  return (
    <section
      data-nav-theme="dark"
      className="section-lg relative overflow-hidden text-white"
      style={{ backgroundColor: "#1A1426" }}
      aria-roledescription="carousel"
      aria-label="Client testimonials"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      {/* Ambient eterna blooms */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div
          className="absolute -left-[12%] top-[8%] h-[560px] w-[560px] rounded-full blur-[110px]"
          style={{ background: "rgba(126,73,242,0.22)" }}
        />
        <div
          className="absolute -bottom-[22%] right-[2%] h-[480px] w-[480px] rounded-full blur-[90px]"
          style={{ background: "rgba(233,162,242,0.12)" }}
        />
      </div>

      <div className="container-site relative grid gap-12 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.4fr)] lg:items-center lg:gap-16">
        {/* ── Left rail — heading + speaker selector ─────────────────────── */}
        <div>
          <span className="eyebrow mb-4 !text-[color:var(--blue-400)]">Client voices</span>
          <h2 className="text-h2 font-bold text-balance bg-clip-text pb-[0.18em] text-transparent bg-gradient-to-b from-white to-white/45">
            Trusted by the teams{" "}
            <span className="font-playfair font-light text-[color:var(--blue-400)]">
              moving credit
            </span>{" "}
            forward.
          </h2>
          <p className="mt-5 max-w-md text-body-lg text-[color:var(--color-text-on-dark-muted)]">
            Lenders across three regions launched, scaled and outpaced their
            roadmaps on PhotonMatters. Hear it from them.
          </p>

          {/* Speaker pills */}
          <div className="mt-9 flex flex-col gap-2.5" role="tablist" aria-label="Select a testimonial">
            {TESTIMONIALS.map((t, i) => {
              const selected = i === active;
              return (
                <button
                  key={t.role + t.company}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  onClick={() => goTo(i)}
                  className={cn(
                    "group/pill flex items-center gap-3.5 rounded-2xl border px-4 py-3 text-left transition-all duration-300",
                    selected
                      ? "border-[color:rgba(126,73,242,0.6)] bg-white/[0.06]"
                      : "border-line-on-dark bg-white/[0.02] hover:border-[color:rgba(126,73,242,0.4)] hover:bg-white/[0.04]",
                  )}
                >
                  <span
                    aria-hidden
                    className={cn(
                      "flex h-9 w-9 shrink-0 items-center justify-center rounded-full font-playfair text-body font-light transition-colors duration-300",
                      selected
                        ? "bg-[color:rgba(126,73,242,0.22)] text-[color:var(--blue-400)]"
                        : "bg-white/[0.06] text-white/55",
                    )}
                  >
                    {i + 1}
                  </span>
                  <span className="min-w-0">
                    <span
                      className={cn(
                        "block truncate text-body font-semibold transition-colors duration-300",
                        selected ? "text-white" : "text-white/70",
                      )}
                    >
                      {t.role}
                    </span>
                    <span className="block truncate text-caption text-[color:var(--color-text-on-dark-muted)]">
                      {t.company}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Right stage — featured quote ───────────────────────────────── */}
        <div className="relative">
          {/* Oversized Playfair quote glyph */}
          <span
            aria-hidden
            className="pointer-events-none absolute -top-10 -left-2 select-none font-playfair text-[14rem] leading-none text-[color:rgba(126,73,242,0.16)] sm:-top-16 sm:text-[20rem]"
          >
            &ldquo;
          </span>

          <div className="relative min-h-[20rem] sm:min-h-[18rem]">
            <AnimatePresence mode="wait">
              <motion.figure
                key={active}
                initial={reduce ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, y: -12 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="relative"
              >
                <span className="inline-flex items-center rounded-full border border-line-on-dark bg-white/[0.05] px-3 py-1 text-label font-semibold uppercase tracking-wide text-[color:var(--blue-400)]">
                  {current.region}
                </span>
                <blockquote className="mt-6 text-balance text-h3 font-medium leading-snug tracking-tight text-white sm:text-[1.9rem]">
                  {current.quote}
                </blockquote>
                <figcaption className="mt-8 flex items-center gap-3 text-caption">
                  <span aria-hidden className="h-px w-10 bg-[color:var(--blue-400)]" />
                  <span className="font-semibold text-white">{current.role}</span>
                  <span className="text-[color:var(--color-text-on-dark-muted)]">
                    · {current.company}
                  </span>
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>

          {/* Progress ticks */}
          <div className="mt-10 flex items-center gap-2" aria-hidden>
            {TESTIMONIALS.map((t, i) => (
              <button
                key={t.role + t.company}
                type="button"
                tabIndex={-1}
                onClick={() => goTo(i)}
                className="group/tick py-2"
                aria-label={`Show testimonial ${i + 1}`}
              >
                <span
                  className={cn(
                    "block h-[3px] rounded-full transition-all duration-500",
                    i === active
                      ? "w-10 bg-[color:var(--blue-400)]"
                      : "w-5 bg-white/20 group-hover/tick:bg-white/40",
                  )}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
