import { cn } from "@/lib/cn";

type Surface = "plain" | "raised" | "sunken";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  surface?: Surface;
  /** Render a 1px hairline border (use on light surfaces where cards need separation). */
  bordered?: boolean;
  /** Subtle hover — bg shift + 2px lift. Never applies a heavy drop-shadow. */
  interactive?: boolean;
  tone?: "light" | "dark";
  /** Padding variant — default is p-6 (24px). */
  padding?: "sm" | "md" | "lg";
}

const surfaces: Record<Surface, string> = {
  plain: "",
  raised: "bg-surface",
  sunken: "bg-sunken",
};

const paddings = {
  sm: "p-5",
  md: "p-6",
  lg: "p-7",
};

export function Card({
  surface = "raised",
  bordered = false,
  interactive = false,
  tone = "light",
  padding = "md",
  className,
  children,
  ...rest
}: CardProps) {
  return (
    <div
      className={cn(
        "rounded-xl transition-[transform,background-color] duration-200",
        paddings[padding],
        tone === "dark" ? "bg-white/[0.04]" : surfaces[surface],
        bordered && (tone === "dark" ? "border border-line-on-dark" : "border border-line"),
        interactive &&
          (tone === "dark"
            ? "hover:-translate-y-0.5 hover:bg-white/[0.07]"
            : "hover:-translate-y-0.5 hover:border-line-strong hover:shadow-[0_1px_2px_rgba(14,26,43,0.04),0_16px_34px_-18px_rgba(14,26,43,0.22)]"),
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
}
