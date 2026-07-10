"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

export interface IndustryChecklistItem {
  text: string;
  href?: string;
}

export interface IndustryBlock {
  eyebrow: string;
  heading: string;
  body: string;
  checklist: IndustryChecklistItem[];
  image: string;
  alt: string;
}

const HEADING_CLIP =
  "text-h2 font-bold text-balance bg-clip-text pb-[0.18em] text-transparent bg-gradient-to-b from-ink to-[color:rgba(26,20,38,0.6)]";

/**
 * Three near-identical "mini-page" blocks (image + heading + copy + checklist)
 * stacked vertically read as ~2,500px of repetition on mobile. A pill tab
 * switcher over one shared content area (same pattern as ProductExplorer)
 * removes that repetition at every viewport width, not just mobile.
 */
export function IndustryTabs({ blocks }: { blocks: IndustryBlock[] }) {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const block = blocks[active];

  return (
    <div>
      <div
        role="tablist"
        aria-label="Industries"
        className="-mx-[var(--gutter)] flex gap-2 overflow-x-auto px-[var(--gutter)] pb-1 [scrollbar-width:none] sm:mx-0 sm:px-0 sm:pb-0 [&::-webkit-scrollbar]:hidden"
      >
        {blocks.map((b, i) => {
          const isActive = i === active;
          return (
            <button
              key={b.eyebrow}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActive(i)}
              className={cn(
                "shrink-0 cursor-pointer whitespace-nowrap rounded-full border px-5 py-2.5 text-body font-semibold tracking-tight transition-all duration-200",
                isActive
                  ? "border-line-strong bg-surface text-ink shadow-[var(--shadow-overlay)]"
                  : "border-line text-secondary hover:border-line-strong hover:bg-white/60 hover:text-ink",
              )}
            >
              {b.eyebrow}
            </button>
          );
        })}
      </div>

      <div className="relative mt-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -14 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-14"
          >
            <figure className="relative">
              <div
                aria-hidden
                className="pointer-events-none absolute -bottom-8 -right-8 -z-10 h-56 w-56 rounded-full opacity-70 blur-3xl"
                style={{ background: "radial-gradient(circle, rgba(126,73,242,0.16), transparent 70%)" }}
              />
              <div className="relative aspect-[4/3] overflow-hidden rounded-3xl ring-1 ring-line">
                <Image
                  src={block.image}
                  alt={block.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </figure>
            <div>
              <h2 className={HEADING_CLIP}>{block.heading}</h2>
              <p className="mt-5 text-body text-secondary">{block.body}</p>
              <ul className="mt-7 space-y-3">
                {block.checklist.map((item) => (
                  <li key={item.text} className="flex items-start gap-3">
                    <Check size={18} className="mt-0.5 shrink-0 text-primary" strokeWidth={2.5} aria-hidden />
                    {item.href ? (
                      <Link href={item.href} className="text-body text-primary-strong hover:underline">
                        {item.text}
                      </Link>
                    ) : (
                      <span className="text-body text-secondary">{item.text}</span>
                    )}
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <Button href="/solutions" variant="link" withArrow>
                  Explore solutions
                </Button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
