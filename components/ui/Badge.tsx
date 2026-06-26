import { cn } from "@/lib/cn";

type BadgeTone = "brand" | "accent" | "neutral" | "onDark";

const tones: Record<BadgeTone, string> = {
  brand: "bg-blue-50 text-primary-strong",
  accent: "bg-amber-100 text-[color:var(--amber-600)]",
  neutral: "bg-sunken text-secondary",
  onDark: "bg-white/10 text-white",
};

/** Minimal squared status label — not a pill. Use only for genuine status/category. */
export function Badge({
  children,
  tone = "brand",
  className,
}: {
  children: React.ReactNode;
  tone?: BadgeTone;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-sm px-2 py-0.5 text-label font-semibold uppercase tracking-[0.06em]",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
