import { cn } from "@/lib/cn";

interface SectionHeaderProps {
  /** Use sparingly — only when it categorises, never above every section. */
  eyebrow?: string;
  title: React.ReactNode;
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
        <span className={cn("eyebrow mb-4", tone === "dark" && "!text-[color:var(--color-text-on-dark-muted)]")}>
          {eyebrow}
        </span>
      ) : null}
      <h2
        className={cn(
          "text-h2 font-bold text-balance",
          tone === "dark" ? "text-white" : "text-ink",
        )}
      >
        {title}
      </h2>
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
