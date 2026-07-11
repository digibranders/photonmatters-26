import { createElement } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { getIcon } from "@/lib/icons";
import type { NewsCategory, NewsItem } from "@/lib/news-data";

/** Category → Badge tone. Mostly brand purple; Expansion picks up the gold accent. */
const CATEGORY_TONE: Record<NewsCategory, "brand" | "accent" | "neutral"> = {
  Company: "brand",
  Expansion: "accent",
  Deployment: "neutral",
  Product: "brand",
};

/**
 * A single newsroom announcement card: kicker (category + date), headline,
 * excerpt and a read affordance. Purely presentational, so it renders in both
 * the client-filtered hub grid and the server-rendered "more news" rail.
 */
export function NewsCard({ item }: { item: NewsItem }) {
  return (
    <Link
      href={`/newsroom/${item.slug}`}
      className="group/card relative flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-surface p-7 transition-all duration-300 hover:-translate-y-1 hover:border-line-strong hover:shadow-[0_1px_2px_rgba(26,20,38,0.04),0_18px_40px_-18px_rgba(126,73,242,0.28)]"
    >
      {/* Corner bloom: eterna bento accent */}
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-16 -right-16 h-48 w-48 rounded-full opacity-70 blur-2xl transition-transform duration-700 group-hover/card:scale-110"
        style={{ background: "radial-gradient(circle, rgba(126,73,242,0.12), transparent 70%)" }}
      />

      <div className="relative z-10 flex items-center justify-between gap-3">
        <Badge tone={CATEGORY_TONE[item.category]}>{item.category}</Badge>
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[color:var(--blue-50)] text-primary">
          {createElement(getIcon(item.icon), { size: 18, "aria-hidden": true })}
        </span>
      </div>

      <time
        dateTime={item.dateISO}
        className="relative z-10 mt-5 text-label font-semibold uppercase tracking-[0.1em] text-muted tabular-nums"
      >
        {item.date}
      </time>
      <h3 className="relative z-10 mt-2 text-h3 font-bold leading-snug tracking-tight text-balance text-ink">
        {item.title} {item.titleAccent}
      </h3>
      <p className="relative z-10 mt-2.5 flex-grow text-caption leading-relaxed text-secondary">
        {item.excerpt}
      </p>

      <span className="relative z-10 mt-6 inline-flex items-center gap-1.5 text-caption font-semibold text-primary-strong">
        Read release
        <ArrowRight
          size={15}
          aria-hidden
          className="transition-transform duration-200 group-hover/card:translate-x-1"
        />
      </span>
    </Link>
  );
}
