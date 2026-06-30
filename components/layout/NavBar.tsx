"use client";

import { startTransition, useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X, ArrowRight } from "lucide-react";
import { NAV, SOLUTIONS, GSM } from "@/lib/site";
import { PRODUCT_LIST } from "@/lib/products-data";
import { getIcon } from "@/lib/icons";
import { cn } from "@/lib/cn";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";

type Theme = "dark" | "light";

interface DropdownItem {
  href: string;
  name: string;
  icon: string;
}
interface DropdownConfig {
  items: DropdownItem[];
  allHref: string;
  allLabel: string;
}

const DROPDOWNS: Record<string, DropdownConfig> = {
  Solutions: {
    items: [
      ...SOLUTIONS.map((s) => ({ href: `/solutions/${s.slug}`, name: s.name, icon: s.icon })),
      { href: GSM.href, name: GSM.name, icon: GSM.icon },
    ],
    allHref: "/solutions",
    allLabel: "All solutions",
  },
  Products: {
    items: PRODUCT_LIST.map((p) => ({ href: `/products/${p.slug}`, name: p.name, icon: p.icon })),
    allHref: "/products",
    allLabel: "All products",
  },
};

function isActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/");
}

export function NavBar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  // Theme of the section currently behind the header. Seed from the route so
  // the very first paint is right (homepage opens on a dark hero).
  const [theme, setTheme] = useState<Theme>(pathname === "/" ? "dark" : "light");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const hoverTimeoutRef = useRef<any>(null);

  // Recompute scrolled + theme from the section sitting under the header line.
  const sync = useCallback(() => {
    const y = window.scrollY;
    setScrolled(y > 24);
    const checkpoint = y + 44;
    let dark = false;
    for (const el of document.querySelectorAll<HTMLElement>('[data-nav-theme="dark"]')) {
      const top = el.offsetTop;
      const bottom = top + el.offsetHeight;
      if (checkpoint >= top && checkpoint < bottom) {
        dark = true;
        break;
      }
    }
    setTheme(dark ? "dark" : "light");
  }, []);

  useEffect(() => {
    const raf = requestAnimationFrame(sync);
    window.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
    };
  }, [sync]);

  useEffect(() => {
    const raf = requestAnimationFrame(sync);
    return () => cancelAnimationFrame(raf);
  }, [pathname, sync]);

  // Close any open dropdown on outside click or Escape
  useEffect(() => {
    if (!openMenu) return;
    function handleOutside(e: MouseEvent) {
      if (!(e.target as Element).closest("[data-nav-menu]")) setOpenMenu(null);
    }
    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") setOpenMenu(null);
    }
    document.addEventListener("mousedown", handleOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [openMenu]);

  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current !== undefined) clearTimeout(hoverTimeoutRef.current);
    };
  }, []);

  useEffect(() => {
    startTransition(() => {
      setMobileOpen(false);
      setOpenMenu(null);
      setMobileExpanded(null);
    });
  }, [pathname]);

  const isDark = theme === "dark";
  const atTop = !scrolled && !mobileOpen;

  const headerClass = atTop
    ? "bg-transparent border-transparent"
    : isDark
      ? "bg-ink/85 backdrop-blur-md border-b border-white/10"
      : "bg-white/85 backdrop-blur-md border-b border-line";

  const linkClass = (active: boolean) =>
    cn(
      "rounded-full px-4 py-2 text-caption font-medium transition-colors",
      isDark
        ? "text-white/80 hover:bg-white/10 hover:text-white"
        : "text-ink/70 hover:bg-ink/[0.06] hover:text-ink",
      active && (isDark ? "bg-white/10 text-white" : "bg-ink/[0.06] text-ink"),
    );

  const controlClass = isDark ? "text-white" : "text-ink";

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-[var(--z-header)] transition-colors duration-300",
        headerClass,
      )}
    >
      <div className="container-site flex h-[76px] items-center justify-between lg:h-[84px]">
        <Link href="/" aria-label="PhotonMatters home" className="shrink-0">
          <Logo tone={isDark ? "onDark" : "onLight"} />
        </Link>

        {/* Desktop nav */}
        <nav aria-label="Main navigation" className="hidden items-center gap-0.5 lg:flex">
          {NAV.map((item) => {
            const menu = DROPDOWNS[item.label];
            if (!menu) {
              return (
                <Link key={item.href} href={item.href} className={linkClass(isActive(pathname, item.href))}>
                  {item.label}
                </Link>
              );
            }
            const open = openMenu === item.label;
            return (
              <div
                key={item.href}
                data-nav-menu
                className="relative"
                onMouseEnter={() => {
                  if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
                  setOpenMenu(item.label);
                }}
                onMouseLeave={() => {
                  hoverTimeoutRef.current = setTimeout(
                    () => setOpenMenu((m) => (m === item.label ? null : m)),
                    150,
                  );
                }}
              >
                <button
                  type="button"
                  aria-haspopup="true"
                  aria-expanded={open}
                  className={cn(
                    linkClass(isActive(pathname, item.href)),
                    "inline-flex cursor-pointer items-center gap-1",
                  )}
                >
                  {item.label}
                  <ChevronDown
                    size={15}
                    aria-hidden
                    className={cn(
                      "transition-transform duration-200",
                      isDark ? "text-white/70" : "text-ink/60",
                      open && "rotate-180",
                    )}
                  />
                </button>

                {open && (
                  <div
                    role="menu"
                    aria-label={`${item.label} menu`}
                    className={cn(
                      "absolute left-1/2 top-full z-10 mt-3 w-[320px] -translate-x-1/2 rounded-xl border p-2 shadow-[var(--shadow-overlay)]",
                      isDark ? "border-white/10 bg-ink" : "border-line bg-surface",
                    )}
                  >
                    {menu.items.map((it) => {
                      const Icon = getIcon(it.icon);
                      return (
                        <Link
                          key={it.href}
                          href={it.href}
                          role="menuitem"
                          className={cn(
                            "flex cursor-pointer items-center gap-3 rounded-md px-3 py-2.5 transition-colors",
                            isDark ? "hover:bg-white/[0.08]" : "hover:bg-sunken",
                          )}
                          onClick={() => setOpenMenu(null)}
                        >
                          <Icon size={18} className={cn("shrink-0", isDark ? "text-[#7E49F2]" : "text-primary")} aria-hidden />
                          <span className={cn("text-caption font-medium", isDark ? "text-white" : "text-ink")}>{it.name}</span>
                        </Link>
                      );
                    })}
                    <div className={cn("my-1.5 h-px", isDark ? "bg-white/10" : "bg-line")} role="separator" />
                    <Link
                      href={menu.allHref}
                      role="menuitem"
                      className={cn(
                        "flex cursor-pointer items-center gap-1.5 rounded-md px-3 py-2.5 text-caption font-semibold transition-colors",
                        isDark ? "text-[#7E49F2] hover:bg-white/[0.08]" : "text-primary-strong hover:bg-sunken",
                      )}
                      onClick={() => setOpenMenu(null)}
                    >
                      {menu.allLabel} <ArrowRight size={14} aria-hidden />
                    </Link>
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden sm:block">
            <Button href="/contact" size="sm">
              Book a demo
            </Button>
          </div>
          <button
            type="button"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            onClick={() => {
              setMobileExpanded(null);
              setMobileOpen((v) => !v);
            }}
            className={cn(
              "flex h-11 w-11 cursor-pointer items-center justify-center rounded-md lg:hidden",
              controlClass,
            )}
          >
            {mobileOpen ? <X size={22} aria-hidden /> : <Menu size={22} aria-hidden />}
          </button>
        </div>
      </div>

      {/* Mobile nav — solid panel matching the active theme */}
      {mobileOpen && (
        <div
          id="mobile-nav"
          className={cn(
            "border-t backdrop-blur-md lg:hidden",
            isDark ? "border-white/10 bg-ink/95" : "border-line bg-white/95",
          )}
        >
          <nav aria-label="Mobile navigation" className="container-site flex flex-col gap-1 py-4">
            {NAV.map((item) => {
              const menu = DROPDOWNS[item.label];
              if (!menu) {
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "rounded-md px-2 py-3 text-body font-medium transition-colors",
                      isDark
                        ? "text-white/85 hover:bg-white/10 hover:text-white"
                        : "text-ink/80 hover:bg-ink/[0.06] hover:text-ink",
                      isActive(pathname, item.href) && (isDark ? "text-white" : "text-ink"),
                    )}
                  >
                    {item.label}
                  </Link>
                );
              }
              const expanded = mobileExpanded === item.label;
              return (
                <div key={item.href}>
                  <button
                    type="button"
                    aria-expanded={expanded}
                    onClick={() => setMobileExpanded((e) => (e === item.label ? null : item.label))}
                    className={cn(
                      "flex w-full items-center justify-between rounded-md px-2 py-3 text-body font-medium transition-colors",
                      isDark
                        ? "text-white/85 hover:bg-white/10 hover:text-white"
                        : "text-ink/80 hover:bg-ink/[0.06] hover:text-ink",
                      isActive(pathname, item.href) && (isDark ? "text-white" : "text-ink"),
                    )}
                  >
                    {item.label}
                    <ChevronDown
                      size={18}
                      aria-hidden
                      className={cn(
                        "transition-transform duration-200",
                        isDark ? "text-white/60" : "text-ink/50",
                        expanded && "rotate-180",
                      )}
                    />
                  </button>
                  {expanded && (
                    <div
                      className={cn(
                        "ml-3 mb-1 flex flex-col border-l pl-3",
                        isDark ? "border-white/12" : "border-line",
                      )}
                    >
                      {menu.items.map((it) => {
                        const Icon = getIcon(it.icon);
                        return (
                          <Link
                            key={it.href}
                            href={it.href}
                            onClick={() => setMobileOpen(false)}
                            className={cn(
                              "flex items-center gap-3 rounded-md px-2 py-2.5 text-caption font-medium transition-colors",
                              isDark
                                ? "text-white/75 hover:bg-white/[0.08] hover:text-white"
                                : "text-secondary hover:bg-sunken hover:text-ink",
                            )}
                          >
                            <Icon size={16} className={cn("shrink-0", isDark ? "text-[#7E49F2]" : "text-primary")} aria-hidden />
                            {it.name}
                          </Link>
                        );
                      })}
                      <Link
                        href={menu.allHref}
                        onClick={() => setMobileOpen(false)}
                        className={cn(
                          "rounded-md px-2 py-2.5 text-caption font-semibold",
                          isDark ? "text-[#7E49F2]" : "text-primary-strong",
                        )}
                      >
                        {menu.allLabel} →
                      </Link>
                    </div>
                  )}
                </div>
              );
            })}
            <Link
              href="/contact"
              onClick={() => setMobileOpen(false)}
              className="mt-2 rounded-md px-2 py-3 text-body font-semibold text-primary-strong"
            >
              Book a demo →
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
