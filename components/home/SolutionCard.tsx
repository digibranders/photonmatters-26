import Link from "next/link";
import { ArrowRight, type LucideIcon } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/cn";

interface SolutionCardProps {
  href: string;
  icon: LucideIcon;
  name: string;
  blurb: string;
  badge?: string;
  /** Amber accent treatment — used for the GSM "new" card. */
  accent?: boolean;
}

const base =
  "group/card flex h-full flex-col rounded-xl border border-line bg-surface p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-line-strong hover:shadow-[0_1px_2px_rgba(14,26,43,0.04),0_16px_34px_-18px_rgba(14,26,43,0.22)] cursor-pointer";

export function SolutionCard({ href, icon: Icon, name, blurb, badge, accent }: SolutionCardProps) {
  return (
    <Link href={href} className={cn("block", base)}>
      <div className="flex items-center justify-between">
        <span
          className={cn(
            "flex h-11 w-11 items-center justify-center rounded-lg",
            accent ? "bg-amber-100 text-[color:var(--amber-600)]" : "bg-blue-50 text-primary",
          )}
        >
          <Icon size={20} aria-hidden />
        </span>
        {badge ? <Badge tone="accent">{badge}</Badge> : null}
      </div>
      <h3 className="mt-5 text-h3 font-bold text-ink">{name}</h3>
      <p className="mt-2 flex-grow text-caption leading-relaxed text-secondary">{blurb}</p>
      <span className="mt-5 inline-flex items-center gap-1.5 text-caption font-semibold text-primary-strong">
        Learn more
        <ArrowRight
          size={15}
          aria-hidden
          className="transition-transform duration-200 group-hover/card:translate-x-1"
        />
      </span>
    </Link>
  );
}
