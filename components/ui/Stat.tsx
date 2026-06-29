"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/cn";

interface Parsed {
  prefix: string;
  target: number;
  decimals: number;
  suffix: string;
}

/** Split "250k+/hr" → {prefix:"", target:250, suffix:"k+/hr"}; null for word-only values. */
function parseValue(value: string): Parsed | null {
  const m = value.match(/^(\D*)(\d+(?:\.\d+)?)(.*)$/);
  if (!m) return null;
  const [, prefix, num, suffix] = m;
  return {
    prefix,
    target: parseFloat(num),
    decimals: num.includes(".") ? num.split(".")[1].length : 0,
    suffix,
  };
}

function format(p: Parsed, n: number): string {
  return `${p.prefix}${n.toLocaleString("en-US", {
    minimumFractionDigits: p.decimals,
    maximumFractionDigits: p.decimals,
  })}${p.suffix}`;
}

export function Stat({
  value,
  label,
  tone = "light",
  size = "lg",
  className,
}: {
  value: string;
  label: string;
  tone?: "light" | "dark";
  size?: "sm" | "lg";
  className?: string;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLParagraphElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const parsed = useMemo(() => parseValue(value), [value]);
  const [display, setDisplay] = useState(() => (parsed ? format(parsed, 0) : value));

  useEffect(() => {
    if (!parsed || !inView) return;
    // Reduced motion → duration 0 snaps straight to the final value.
    const controls = animate(0, parsed.target, {
      duration: reduce ? 0 : 1.1,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(format(parsed, v)),
    });
    return () => controls.stop();
  }, [inView, reduce, parsed]);

  return (
    <div className={cn("text-center", className)}>
      <p
        ref={ref}
        aria-label={value}
        className={cn(
          "font-extrabold tabular-nums tracking-[-0.02em]",
          size === "sm" ? "text-[clamp(1.5rem,1.1rem+1.3vw,1.875rem)]" : "text-h2",
          tone === "dark" ? "text-white" : "text-ink",
        )}
      >
        {display}
      </p>
      <p
        className={cn(
          "mt-1.5 text-caption",
          tone === "dark" ? "text-[color:var(--color-text-on-dark-muted)]" : "text-muted",
        )}
      >
        {label}
      </p>
    </div>
  );
}
