"use client";

import { useMemo, useState } from "react";
import { cn } from "@/lib/cn";
import { NEWS_CATEGORIES, type NewsCategory, type NewsItem } from "@/lib/news-data";
import { NewsCard } from "@/components/newsroom/NewsCard";
import { Reveal } from "@/components/ui/Reveal";

type Filter = "All" | NewsCategory;

const FILTERS: readonly Filter[] = ["All", ...NEWS_CATEGORIES] as const;

/**
 * The filterable announcement grid on the newsroom hub. Category chips narrow
 * the list client-side; cards re-enter with the shared Reveal stagger.
 */
export function NewsFilter({ items }: { items: NewsItem[] }) {
  const [active, setActive] = useState<Filter>("All");

  const filtered = useMemo(
    () => (active === "All" ? items : items.filter((n) => n.category === active)),
    [items, active],
  );

  return (
    <div>
      <div
        className="flex flex-wrap items-center gap-2.5"
        role="group"
        aria-label="Filter announcements by category"
      >
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
      </div>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((item, i) => (
          <Reveal key={item.slug} index={i % 3}>
            <NewsCard item={item} />
          </Reveal>
        ))}
      </div>
    </div>
  );
}
