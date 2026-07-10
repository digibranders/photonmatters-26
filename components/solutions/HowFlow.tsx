"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion, type Transition } from "framer-motion";
import { cn } from "@/lib/cn";
import { getIcon } from "@/lib/icons";
import { SectionHeader } from "@/components/ui/SectionHeader";

export interface FlowStep {
  n: string;
  title: string;
  body: string;
  /** Lucide icon name (see lib/icons.ts). */
  icon: string;
}

interface HowFlowProps {
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  steps: FlowStep[];
  /** Extra section classes, e.g. "bg-sunken". */
  className?: string;
}

const EASE = [0.16, 1, 0.3, 1] as const;
const NODE = 60; // px node diameter; drives connector offsets below
const CYCLE = 1900; // ms the "active" fill rests on each node
const FILL = "linear-gradient(150deg, #8b5cf6, #6a34e0)";

/** Symmetric gradient so the swept highlight tiles seamlessly along the rail. */
const RAIL_X =
  "linear-gradient(90deg, var(--blue-500), var(--blue-400) 42%, #ffffff 50%, var(--blue-400) 58%, var(--blue-500))";
const RAIL_Y =
  "linear-gradient(180deg, var(--blue-500), var(--blue-400) 42%, #ffffff 50%, var(--blue-400) 58%, var(--blue-500))";

/**
 * "How it works" journey rail: the process steps sit on one connected gradient
 * line inside a contained stage, reading as a single flow rather than a row of
 * cards. Nodes are outlined and icon-led; a filled highlight travels step to
 * step (and follows the cursor on hover), while a light pulse runs the line and
 * each node lands with a ripple.
 */
export function HowFlow({ eyebrow, title, subtitle, steps, className }: HowFlowProps) {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (reduce || steps.length < 2) return;
    const t = setInterval(() => setActive((a) => (a + 1) % steps.length), CYCLE);
    return () => clearInterval(t);
  }, [reduce, steps.length]);

  const lineIn: Transition = reduce
    ? { duration: 0 }
    : { duration: 0.6, ease: EASE, delay: 0.15 };

  return (
    <section className={cn("section", className)}>
      <div className="container-site">
        <SectionHeader eyebrow={eyebrow} title={title} subtitle={subtitle} />

        {/* Stage: contains the rail for a premium, framed feel */}
        <div
          className="mt-12 rounded-[2rem] border border-line p-8 sm:p-12 lg:px-14 lg:py-16"
          style={{
            background: "linear-gradient(180deg, #ffffff 0%, #f7f4ff 100%)",
            boxShadow: "0 24px 60px -34px rgba(126,73,242,0.32)",
          }}
        >
          <ol
            role="list"
            className="relative flex flex-col gap-9 lg:grid lg:gap-x-8"
            style={{ gridTemplateColumns: `repeat(${steps.length}, minmax(0, 1fr))` }}
          >
            {steps.map((step, i) => {
              const isLast = i === steps.length - 1;
              const isActive = i === active;
              const nodeDelay = i * 0.1;
              const Icon = getIcon(step.icon);
              return (
                <li
                  key={step.n}
                  data-active={isActive ? "true" : "false"}
                  className="group relative flex gap-5 lg:flex-col lg:items-center lg:text-center"
                >
                  {/* Vertical connector (mobile): node bottom to next node top */}
                  {!isLast ? (
                    <motion.span
                      aria-hidden
                      className="rail-flow-y absolute left-[29px] top-[60px] -bottom-9 w-[2px] origin-top rounded-full lg:hidden"
                      style={{ backgroundImage: RAIL_Y }}
                      initial={reduce ? { scaleY: 1 } : { scaleY: 0 }}
                      whileInView={{ scaleY: 1 }}
                      viewport={{ once: true, amount: 0.4 }}
                      transition={lineIn}
                    />
                  ) : null}

                  {/* Horizontal connector (desktop): this node center to next */}
                  {!isLast ? (
                    <motion.span
                      aria-hidden
                      className="rail-flow-x absolute left-1/2 top-[29px] hidden h-[2px] w-full origin-left rounded-full lg:block"
                      style={{ backgroundImage: RAIL_X }}
                      initial={reduce ? { scaleX: 1 } : { scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true, amount: 0.4 }}
                      transition={lineIn}
                    />
                  ) : null}

                  {/* Node + its glow / ripple */}
                  <div className="relative shrink-0" style={{ width: NODE, height: NODE }}>
                    {/* Ambient bloom: brightens for the active node */}
                    <span
                      aria-hidden
                      className="pointer-events-none absolute -inset-3 rounded-full opacity-30 blur-xl transition-opacity duration-500 group-data-[active=true]:opacity-90"
                      style={{ background: "radial-gradient(circle, rgba(126,73,242,0.55), transparent 70%)" }}
                    />

                    {/* Entrance ripple: fires once as the node lands */}
                    {!reduce ? (
                      <motion.span
                        aria-hidden
                        className="absolute inset-0 rounded-full border border-[color:var(--blue-500)]"
                        initial={{ scale: 0.85, opacity: 0 }}
                        whileInView={{ scale: [0.85, 2.1], opacity: [0.5, 0] }}
                        viewport={{ once: true, amount: 0.8 }}
                        transition={{ duration: 1.1, ease: "easeOut", delay: nodeDelay + 0.2 }}
                      />
                    ) : null}

                    {/* Node: white + purple ring + icon; the active node fills */}
                    <motion.span
                      className="relative z-10 flex h-full w-full items-center justify-center rounded-full border-2 border-[color:var(--blue-500)] text-primary transition-colors duration-500 group-data-[active=true]:text-white"
                      style={{
                        background: "#ffffff",
                        boxShadow: "0 8px 22px -10px rgba(126,73,242,0.5)",
                      }}
                      initial={reduce ? false : { opacity: 0, scale: 0.6 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true, amount: 0.6 }}
                      transition={reduce ? { duration: 0 } : { duration: 0.4, ease: EASE, delay: nodeDelay }}
                    >
                      {/* Gradient fill: shown when the node is the active step */}
                      <span
                        aria-hidden
                        className="absolute inset-0 rounded-full opacity-0 transition-opacity duration-500 group-data-[active=true]:opacity-100"
                        style={{ background: FILL }}
                      />
                      <Icon size={24} strokeWidth={1.9} aria-hidden className="relative z-10" />
                    </motion.span>
                  </div>

                  {/* Copy: serif index, title, body */}
                  <motion.div
                    className="lg:mt-6"
                    initial={reduce ? false : { opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={reduce ? { duration: 0 } : { duration: 0.4, ease: EASE, delay: nodeDelay + 0.08 }}
                  >
                    <span className="font-playfair block text-[26px] leading-none text-primary">
                      {step.n}
                    </span>
                    <h3 className="mt-2.5 text-lg font-bold tracking-tight text-ink transition-colors duration-300 group-data-[active=true]:text-primary">
                      {step.title}
                    </h3>
                    <p className="mt-2 max-w-[26ch] text-caption leading-relaxed text-secondary lg:mx-auto">
                      {step.body}
                    </p>
                  </motion.div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
