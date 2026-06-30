"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/cn";

const CYCLE = 5500;

export interface ExplorerItem {
  title: string;
  description: string;
  /** Pre-rendered icon element (resolved in the server template). */
  icon: React.ReactNode;
  specs: { label: string; value: string }[];
}

interface ProductExplorerProps {
  eyebrow?: string;
  heading: string;
  items: ExplorerItem[];
}

const HEADING_CLIP =
  "text-h2 font-bold text-balance bg-clip-text pb-[0.18em] text-transparent bg-gradient-to-b from-ink to-[color:rgba(26,20,38,0.6)]";

/**
 * Interactive product menu — a tab list of lending sub-products paired with an
 * animated "spec sheet" panel. Auto-cycles, pausing for reduced motion.
 */
export function ProductExplorer({ eyebrow, heading, items }: ProductExplorerProps) {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (reduce || items.length < 2) return;
    const t = setInterval(() => setActive((a) => (a + 1) % items.length), CYCLE);
    return () => clearInterval(t);
  }, [reduce, items.length, active]);

  const item = items[active];

  return (
    <section id="products" className="section bg-sunken scroll-mt-24">
      <div className="container-site">
        {eyebrow ? <p className="eyebrow mb-4">{eyebrow}</p> : null}
        <h2 className={HEADING_CLIP}>{heading}</h2>

        <div className="mt-12 grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-start lg:gap-12">
          {/* Tab list */}
          <div role="tablist" aria-label={heading} className="flex flex-col gap-2">
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
                    "group/tab cursor-pointer rounded-2xl border px-5 py-4 text-left text-body-lg font-semibold tracking-tight transition-all duration-200",
                    isActive
                      ? "border-line-strong bg-surface text-ink shadow-[var(--shadow-overlay)]"
                      : "border-transparent text-secondary hover:bg-white/60 hover:text-ink",
                  )}
                >
                  {it.title}
                </button>
              );
            })}
          </div>

          {/* Spec panel */}
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={reduce ? false : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, y: -14 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="relative overflow-hidden rounded-3xl border border-line bg-surface p-8 shadow-[var(--shadow-overlay)] sm:p-10"
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full opacity-70 blur-2xl"
                  style={{ background: "radial-gradient(circle, rgba(126,73,242,0.13), transparent 70%)" }}
                />
                <div className="relative flex items-center gap-4">
                  <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[color:var(--blue-50)] text-primary">
                    {item.icon}
                  </span>
                  <h3 className="text-h3 font-bold tracking-tight text-ink">{item.title}</h3>
                </div>
                <p className="relative mt-4 text-body-lg text-secondary">{item.description}</p>

                <dl className="relative mt-7 border-t border-line">
                  {item.specs.map((s) => (
                    <div
                      key={s.label}
                      className="flex items-baseline justify-between gap-6 border-b border-line py-3.5"
                    >
                      <dt className="shrink-0 text-caption font-semibold uppercase tracking-[0.06em] text-muted">
                        {s.label}
                      </dt>
                      <dd className="text-right text-body font-medium text-ink">{s.value}</dd>
                    </div>
                  ))}
                </dl>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
