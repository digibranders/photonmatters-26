"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/cn";
import { TESTIMONIALS } from "@/lib/site";

const ROTATE_MS = 6500;

/**
 * Client-voices showcase — a dark editorial band with a tactile "deck" of
 * glass testimonial cards. The active quote sits on an elevated glass card
 * with two cards peeking behind it; prev/next controls advance the deck.
 * Auto-rotates, pausing on hover/focus and for prefers-reduced-motion.
 */
export function Testimonials() {
  const reduce = useReducedMotion();
  const [[active, dir], setState] = useState<[number, number]>([0, 1]);
  const [paused, setPaused] = useState(false);
  const total = TESTIMONIALS.length;

  const paginate = useCallback(
    (d: number) => setState(([i]) => [((i + d) % total + total) % total, d]),
    [total],
  );
  const goTo = useCallback(
    (i: number) => setState(([cur]) => [i, i >= cur ? 1 : -1]),
    [],
  );

  useEffect(() => {
    if (reduce || paused) return;
    const id = window.setInterval(() => paginate(1), ROTATE_MS);
    return () => window.clearInterval(id);
  }, [reduce, paused, paginate]);

  const current = TESTIMONIALS[active];
  const monogram = current.company.charAt(0).toUpperCase();

  // Variants receive the latest direction via `custom`, so the exiting card
  // animates the correct way for prev vs next.
  const cardVariants = {
    enter: (d: number) => (reduce ? { opacity: 0 } : { opacity: 0, x: d * 56, rotate: d * 2 }),
    center: { opacity: 1, x: 0, rotate: 0 },
    exit: (d: number) => (reduce ? { opacity: 0 } : { opacity: 0, x: d * -56, rotate: d * -2 }),
  };

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
        <div className="absolute -left-[12%] top-[8%] h-[560px] w-[560px] rounded-full blur-[110px]" style={{ background: "rgba(126,73,242,0.22)" }} />
        <div className="absolute -bottom-[22%] right-[2%] h-[480px] w-[480px] rounded-full blur-[90px]" style={{ background: "rgba(233,162,242,0.12)" }} />
      </div>

      <div className="container-site relative grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-center lg:gap-16">
        {/* ── Left rail — heading + controls ─────────────────────────────── */}
        <div>
          <span className="eyebrow mb-4 !text-[color:var(--blue-400)]">Client voices</span>
          <h2 className="text-h2 font-bold text-balance bg-clip-text pb-[0.18em] text-transparent bg-gradient-to-b from-white to-white/45">
            Trusted by the teams{" "}
            <span className="font-playfair font-light text-[color:var(--blue-400)]">moving credit</span>{" "}
            forward.
          </h2>
          <p className="mt-5 max-w-md text-body-lg text-[color:var(--color-text-on-dark-muted)]">
            Lenders across three regions launched, scaled and outpaced their roadmaps on
            PhotonMatters. Hear it from them.
          </p>

          {/* Controls */}
          <div className="mt-9 flex items-center gap-5">
            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={() => paginate(-1)}
                aria-label="Previous testimonial"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-line-on-dark text-white/80 transition-colors duration-200 hover:border-[color:rgba(126,73,242,0.6)] hover:bg-white/[0.06] hover:text-white"
              >
                <ArrowLeft size={18} aria-hidden />
              </button>
              <button
                type="button"
                onClick={() => paginate(1)}
                aria-label="Next testimonial"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-line-on-dark text-white/80 transition-colors duration-200 hover:border-[color:rgba(126,73,242,0.6)] hover:bg-white/[0.06] hover:text-white"
              >
                <ArrowRight size={18} aria-hidden />
              </button>
            </div>
            <span className="font-playfair text-body-lg text-white/45">
              <span className="text-white">{String(active + 1).padStart(2, "0")}</span>
              {" / "}
              {String(total).padStart(2, "0")}
            </span>
          </div>

          {/* Progress ticks */}
          <div className="mt-6 flex items-center gap-2">
            {TESTIMONIALS.map((t, i) => (
              <button
                key={t.role + t.company}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Show testimonial ${i + 1}`}
                className="group/tick py-2"
              >
                <span
                  className={cn(
                    "block h-[3px] rounded-full transition-all duration-500",
                    i === active ? "w-10 bg-[color:var(--blue-400)]" : "w-5 bg-white/20 group-hover/tick:bg-white/40",
                  )}
                />
              </button>
            ))}
          </div>
        </div>

        {/* ── Right stage — card deck ────────────────────────────────────── */}
        <div className="relative min-h-[24rem] sm:min-h-[22rem]">
          {/* Peeking deck cards */}
          <div aria-hidden className="absolute inset-0 translate-x-3 translate-y-4 scale-[0.97] rounded-[2rem] border border-white/[0.08] bg-white/[0.03]" />
          <div aria-hidden className="absolute inset-0 translate-x-6 translate-y-8 scale-[0.94] rounded-[2rem] border border-white/[0.06] bg-white/[0.02]" />

          {/* Active card */}
          <AnimatePresence mode="wait" custom={dir}>
            <motion.figure
              key={active}
              custom={dir}
              variants={cardVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: reduce ? 0 : 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="relative overflow-hidden rounded-[2rem] border border-white/[0.12] p-8 backdrop-blur-xl sm:p-10"
              style={{
                background: "linear-gradient(160deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.03) 100%)",
                boxShadow:
                  "inset 0 1px 0 rgba(255,255,255,0.18), 0 2px 8px rgba(0,0,0,0.25), 0 36px 80px -34px rgba(126,73,242,0.6)",
              }}
            >
              {/* Faint Playfair quote glyph */}
              <span
                aria-hidden
                className="pointer-events-none absolute -right-2 -top-10 select-none font-playfair text-[12rem] leading-none text-[color:rgba(233,162,242,0.12)]"
              >
                &rdquo;
              </span>

              <blockquote className="relative mt-2 text-balance text-[clamp(1.375rem,1.05rem+0.9vw,1.85rem)] font-medium leading-snug tracking-tight text-white">
                {current.quote}
              </blockquote>

              <figcaption className="relative mt-8 flex items-center gap-4">
                <span
                  aria-hidden
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full font-playfair text-h3 font-light text-white"
                  style={{ background: "linear-gradient(150deg, var(--blue-500), var(--blue-400))" }}
                >
                  {monogram}
                </span>
                <span>
                  <span className="block text-body font-semibold text-white">{current.role}</span>
                  <span className="block text-caption text-[color:var(--color-text-on-dark-muted)]">
                    {current.company}
                  </span>
                </span>
              </figcaption>
            </motion.figure>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
