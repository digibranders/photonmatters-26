import Link from "next/link";
import { ArrowRight, type LucideIcon } from "lucide-react";

interface SolutionCardProps {
  href: string;
  icon: LucideIcon;
  name: string;
  blurb: string;
  /** Short category label (e.g. "LOS", "AI"). Rendered as a quiet uppercase tag. */
  tag?: string;
}

/**
 * Light "premium" solution card — modelled on the revamp's ProductLines bento.
 * Icon chip fills the top-left, a quiet uppercase label sits opposite it, and
 * the body flows top-down so there is no dead space. A soft corner bloom adds
 * the eterna texture on hover.
 */
export function SolutionCard({ href, icon: Icon, name, blurb, tag }: SolutionCardProps) {
  return (
    <Link
      href={href}
      className="group/card relative flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-surface p-7 transition-all duration-300 hover:-translate-y-1 hover:border-line-strong hover:shadow-[0_1px_2px_rgba(26,20,38,0.04),0_18px_40px_-18px_rgba(126,73,242,0.28)]"
    >
      {/* Corner bloom — eterna bento accent */}
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-16 -right-16 h-56 w-56 rounded-full opacity-70 blur-2xl transition-transform duration-700 group-hover/card:scale-110"
        style={{ background: "radial-gradient(circle, rgba(126,73,242,0.13), transparent 70%)" }}
      />

      <div className="relative z-10 flex items-center justify-between">
        <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[color:var(--blue-50)] text-primary">
          <Icon size={22} aria-hidden />
        </span>
        {tag ? (
          <span className="text-label font-semibold uppercase tracking-[0.14em] text-muted">
            {tag}
          </span>
        ) : null}
      </div>

      <h3 className="relative z-10 mt-6 text-h3 font-bold tracking-tight text-ink">{name}</h3>
      <p className="relative z-10 mt-2.5 flex-grow text-caption leading-relaxed text-secondary">
        {blurb}
      </p>

      <span className="relative z-10 mt-6 inline-flex items-center gap-1.5 text-caption font-semibold text-primary-strong">
        Explore feature
        <ArrowRight
          size={15}
          aria-hidden
          className="transition-transform duration-200 group-hover/card:translate-x-1"
        />
      </span>
    </Link>
  );
}
