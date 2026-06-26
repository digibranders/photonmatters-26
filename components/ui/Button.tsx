import Link from "next/link";
import { ArrowRight, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost" | "link";
type Size = "sm" | "md" | "lg";
type Tone = "light" | "dark";

const base =
  "inline-flex items-center justify-center gap-2 font-semibold whitespace-nowrap transition-colors duration-150 disabled:opacity-50 disabled:pointer-events-none focus-visible:outline-none";

// Sizes meet a ≥44px tap target on md/lg. Pill radius is part of the eterna language.
const sizes: Record<Size, string> = {
  sm: "text-caption px-5 py-2 rounded-full min-h-[38px]",
  md: "text-[1.0625rem] px-6 py-2.5 rounded-full min-h-[44px]",
  lg: "text-body-lg px-8 py-3 rounded-full min-h-[52px]",
};

function variantClasses(variant: Variant, tone: Tone): string {
  switch (variant) {
    case "primary":
      // Eterna tell: purple → gold on hover, with plum ink text on the gold.
      return "bg-primary text-white shadow-lg shadow-[rgba(126,73,242,0.22)] hover:bg-accent hover:text-ink hover:shadow-[rgba(242,203,7,0.28)] active:bg-primary-press active:text-white";
    case "secondary":
      return tone === "dark"
        ? "border border-line-on-dark text-white hover:bg-white/[0.08]"
        : "border border-line-strong text-ink hover:bg-sunken";
    case "ghost":
      return tone === "dark"
        ? "text-white hover:bg-white/[0.08]"
        : "text-ink hover:bg-sunken";
    case "link":
      return tone === "dark"
        ? "!min-h-0 !p-0 text-white hover:text-[color:var(--blue-400)] gap-1.5"
        : "!min-h-0 !p-0 text-primary-strong hover:text-primary-press gap-1.5";
  }
}

interface CommonProps {
  variant?: Variant;
  size?: Size;
  tone?: Tone;
  withArrow?: boolean;
  icon?: LucideIcon;
  className?: string;
  children: React.ReactNode;
}

type ButtonAsLink = CommonProps & { href: string };
type ButtonAsButton = CommonProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof CommonProps> & {
    href?: undefined;
  };

export type ButtonProps = ButtonAsLink | ButtonAsButton;

const isExternal = (href: string) => /^(https?:|mailto:|tel:)/.test(href);

export function Button(props: ButtonProps) {
  const {
    variant = "primary",
    size = "md",
    tone = "light",
    withArrow = false,
    icon: Icon,
    className,
    children,
  } = props;

  const classes = cn(base, sizes[size], variantClasses(variant, tone), className);

  const inner = (
    <>
      {Icon ? <Icon size={18} aria-hidden /> : null}
      {children}
      {withArrow ? (
        <ArrowRight size={18} aria-hidden className="transition-transform duration-150 group-hover/btn:translate-x-0.5" />
      ) : null}
    </>
  );

  if (props.href !== undefined) {
    const { href } = props;
    if (isExternal(href)) {
      return (
        <a
          href={href}
          className={cn("group/btn", classes)}
          rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
          target={href.startsWith("http") ? "_blank" : undefined}
        >
          {inner}
        </a>
      );
    }
    return (
      <Link href={href} className={cn("group/btn", classes)}>
        {inner}
      </Link>
    );
  }

  const { href: _href, ...rest } = props as ButtonAsButton;
  void _href;
  return (
    <button className={cn("group/btn", classes)} {...rest}>
      {inner}
    </button>
  );
}
