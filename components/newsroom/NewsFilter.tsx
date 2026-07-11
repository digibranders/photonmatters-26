"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/cn";
import { Badge } from "@/components/ui/Badge";
import { NEWS_CATEGORIES, type NewsCategory, type NewsItem } from "@/lib/news-data";

type Filter = "All" | NewsCategory;

const FILTERS: readonly Filter[] = ["All", ...NEWS_CATEGORIES] as const;

/** Category to Badge tone. Mostly brand purple; Expansion picks up the gold accent. */
const CATEGORY_TONE: Record<NewsCategory, "brand" | "accent" | "neutral"> = {
  Company: "brand",
  Expansion: "accent",
  Deployment: "neutral",
  Product: "brand",
};

/**
 * The filterable announcement list on the newsroom hub. Rendered as a divided
 * editorial list (not a card grid) so a short run of releases never tiles into
 * an orphan row, and the big tabular dates read as a descending timeline.
 * Category chips narrow the list client-side with a live count, an animated
 * re-layout and an empty state.
 */
export function NewsFilter({ items }: { items: NewsItem[] }) {
  const [active, setActive] = useState<Filter>("All");
  const reduce = useReducedMotion();

  const filtered = useMemo(
    () => (active === "All" ? items : items.filter((n) => n.category === active)),
    [items, active],
  );

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2.5">
        <span className="mr-1 text-label font-semibold uppercase tracking-[0.14em] text-muted">
          Filter
        </span>
        {FILTERS.map((f) => {
          const isActive = active === f;
          return (
            <button
              key={f}
              type="button"
              aria-pressed={isActive}
              onClick={() => setActive(f)}
              className={cn(
                "min-h-[38px] rounded-full border px-4 py-2 text-caption font-semibold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-primary)] focus-visible:ring-offset-2",
                isActive
                  ? "border-ink bg-ink text-white"
                  : "border-line text-secondary hover:border-line-strong hover:text-ink",
              )}
            >
              {f}
            </button>
          );
        })}
        <span
          aria-live="polite"
          className="ml-auto text-caption font-medium tabular-nums text-muted"
        >
          {filtered.length} {filtered.length === 1 ? "release" : "releases"}
        </span>
      </div>

      {filtered.length ? (
        <motion.ul layout={!reduce} className="mt-6">
          <AnimatePresence initial={false} mode="popLayout">
            {filtered.map((item) => (
              <motion.li
                key={item.slug}
                layout={!reduce}
                initial={reduce ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
                transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                className="border-t border-line last:border-b"
              >
                <Link
                  href={`/newsroom/${item.slug}`}
                  className="group -mx-4 grid gap-3 rounded-2xl px-4 py-6 transition-colors duration-200 hover:bg-sunken md:grid-cols-[128px_132px_1fr_28px] md:items-center md:gap-8"
                >
                  <time
                    dateTime={item.dateISO}
                    className="text-body-lg font-semibold tabular-nums tracking-tight text-ink"
                  >
                    {item.date}
                  </time>
                  <div>
                    <Badge tone={CATEGORY_TONE[item.category]}>{item.category}</Badge>
                  </div>
                  <div>
                    <h3 className="text-h3 font-bold leading-snug tracking-tight text-ink transition-colors duration-200 group-hover:text-primary">
                      {item.title} {item.titleAccent}
                    </h3>
                    <p className="mt-1.5 text-caption leading-relaxed text-secondary">
                      {item.excerpt}
                    </p>
                  </div>
                  <ArrowRight
                    size={20}
                    aria-hidden
                    className="hidden text-muted transition-all duration-200 group-hover:translate-x-1 group-hover:text-primary md:block"
                  />
                </Link>
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      ) : (
        <p className="mt-10 rounded-2xl border border-dashed border-line py-12 text-center text-body text-muted">
          No releases in this category yet.
        </p>
      )}
    </div>
  );
}
