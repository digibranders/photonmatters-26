"use client";

import { motion, useReducedMotion } from "framer-motion";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  /** Stagger position: multiplies the base 80ms delay. */
  index?: number;
  /** Extra delay in seconds. */
  delay?: number;
}

/**
 * Entrance fade-up: 24px Y offset, 400ms ease-out, staggered 80ms per index
 * (30ms below the `sm` breakpoint: an 80ms stagger tuned for a desktop grid
 * revealing a row at a time makes a single-column mobile list of 6+ items
 * trickle in noticeably slower during a fast scroll).
 * Respects prefers-reduced-motion (renders static when reduced).
 */
export function Reveal({ index = 0, delay = 0, className, style, children }: RevealProps) {
  const reduce = useReducedMotion();
  const isMobile = typeof window !== "undefined" && window.innerWidth < 640;
  const stagger = isMobile ? 0.03 : 0.08;

  if (reduce) {
    return (
      <div className={className} style={style}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      className={className}
      style={style}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.4,
        ease: [0.16, 1, 0.3, 1],
        delay: index * stagger + delay,
      }}
    >
      {children}
    </motion.div>
  );
}
