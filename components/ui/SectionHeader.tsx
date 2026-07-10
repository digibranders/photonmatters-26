import { cn } from "@/lib/cn";

interface SectionHeaderProps {
  /** Use sparingly: only when it categorises, never above every section. */
  eyebrow?: string;
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  align?: "left" | "center";
  tone?: "light" | "dark";
  className?: string;
  maxWidth?: string;
}

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = "left",
  tone = "light",
  className,
  maxWidth = "max-w-2xl",
}: SectionHeaderProps) {
  const isCenter = align === "center";
  return (
    <div className={cn(isCenter && "mx-auto text-center", isCenter && maxWidth, className)}>
      {eyebrow ? (
        <span
          className={cn(
            "eyebrow mb-4",
            tone === "dark"
              ? "!text-[color:var(--blue-400)]"
              : "!text-[color:var(--color-primary)]",
          )}
        >
          {eyebrow}
        </span>
      ) : null}
      {/* Gradient-clipped heading: eterna signature (ink→ink/60 on light,
          white→white/40 on dark). Accent <span>s keep their own colour. */}
      {title ? (
        <h2
          className={cn(
            // pb-[0.18em] gives glyph descenders room below the clip box so they
            // aren't cut off (and don't land in the faded end of the gradient).
            "text-h2 font-bold text-balance pb-[0.18em]",
            tone === "dark" ? "text-white" : "text-ink",
          )}
        >
          {title}
        </h2>
      ) : null}
      {subtitle ? (
        <p
          className={cn(
            "mt-5 text-body-lg",
            !isCenter && maxWidth,
            tone === "dark"
              ? "text-[color:var(--color-text-on-dark-muted)]"
              : "text-secondary",
          )}
        >
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
