"use client";

import { startTransition, useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X, ArrowRight } from "lucide-react";
import { NAV, SOLUTIONS, GSM } from "@/lib/site";
import { getIcon } from "@/lib/icons";
import { cn } from "@/lib/cn";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";

const GsmIcon = getIcon(GSM.icon);

type Theme = "dark" | "light";

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
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const hoverTimeoutRef = useRef<any>(null);

  // Recompute scrolled + theme from the section sitting under the header line.
  const sync = useCallback(() => {
    const y = window.scrollY;
    setScrolled(y > 24);
    // Sample just below the header's top edge.
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

  // Re-sample after navigations — different pages expose different sections.
  useEffect(() => {
    const raf = requestAnimationFrame(sync);
    return () => cancelAnimationFrame(raf);
  }, [pathname, sync]);

  // Close dropdown on outside click or Escape
  useEffect(() => {
    if (!dropdownOpen) return;
    function handleOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setDropdownOpen(false);
        triggerRef.current?.focus();
      }
    }
    document.addEventListener("mousedown", handleOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [dropdownOpen]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current !== undefined) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);

  // Close mobile menu on route change — startTransition avoids setState-in-effect cascades
  useEffect(() => {
    startTransition(() => {
      setMobileOpen(false);
      setDropdownOpen(false);
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
          {NAV.map((item) =>
            item.label === "Solutions" ? (
              <div
                key={item.href}
                ref={dropdownRef}
                className="relative"
                onMouseEnter={() => {
                  if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
                  setDropdownOpen(true);
                }}
                onMouseLeave={() => {
                  hoverTimeoutRef.current = setTimeout(() => setDropdownOpen(false), 150);
                }}
              >
                <button
                  ref={triggerRef}
                  type="button"
                  aria-haspopup="true"
                  aria-expanded={dropdownOpen}
                  className={cn(
                    linkClass(isActive(pathname, item.href)),
                    "inline-flex cursor-pointer items-center gap-1",
                  )}
                >
                  Solutions
                  <ChevronDown
                    size={15}
                    aria-hidden
                    className={cn(
                      "transition-transform duration-200",
                      isDark ? "text-white/70" : "text-ink/60",
                      dropdownOpen && "rotate-180",
                    )}
                  />
                </button>

                {dropdownOpen && (
                  <div
                    role="menu"
                    aria-label="Solutions menu"
                    className={cn(
                      "absolute left-1/2 top-full z-10 mt-3 -translate-x-1/2 w-[320px] rounded-xl border p-2 shadow-[var(--shadow-overlay)]",
                      isDark ? "border-white/10 bg-ink" : "border-line bg-surface"
                    )}
                  >
                    {SOLUTIONS.map((s) => {
                      const Icon = getIcon(s.icon);
                      return (
                        <Link
                          key={s.slug}
                          href={`/solutions/${s.slug}`}
                          role="menuitem"
                          className={cn(
                            "flex cursor-pointer items-center gap-3 rounded-md px-3 py-2.5 transition-colors",
                            isDark
                              ? "hover:bg-white/[0.08]"
                              : "hover:bg-sunken"
                          )}
                          onClick={() => setDropdownOpen(false)}
                        >
                          <Icon size={18} className={cn("shrink-0", isDark ? "text-[#7E49F2]" : "text-primary")} aria-hidden />
                          <span className={cn("text-caption font-medium", isDark ? "text-white" : "text-ink")}>{s.name}</span>
                        </Link>
                      );
                    })}
                    <div className={cn("my-1.5 h-px", isDark ? "bg-white/10" : "bg-line")} role="separator" />
                    <Link
                      href={GSM.href}
                      role="menuitem"
                      className={cn(
                        "flex cursor-pointer items-center gap-3 rounded-md px-3 py-2.5 transition-colors",
                        isDark
                          ? "hover:bg-white/[0.08]"
                          : "hover:bg-sunken"
                      )}
                      onClick={() => setDropdownOpen(false)}
                    >
                      <GsmIcon size={18} className={cn("shrink-0", isDark ? "text-[#7E49F2]" : "text-primary")} aria-hidden />
                      <span className={cn("text-caption font-medium", isDark ? "text-white" : "text-ink")}>{GSM.name}</span>
                    </Link>
                    <Link
                      href="/solutions"
                      role="menuitem"
                      className={cn(
                        "flex cursor-pointer items-center gap-1.5 rounded-md px-3 py-2.5 text-caption font-semibold transition-colors",
                        isDark ? "text-[#7E49F2] hover:bg-white/[0.08]" : "text-primary-strong hover:bg-sunken"
                      )}
                      onClick={() => setDropdownOpen(false)}
                    >
                      All solutions <ArrowRight size={14} aria-hidden />
                    </Link>
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className={linkClass(isActive(pathname, item.href))}
              >
                {item.label}
              </Link>
            ),
          )}
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
            onClick={() => setMobileOpen((v) => !v)}
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
          <nav
            aria-label="Mobile navigation"
            className="container-site flex flex-col gap-1 py-4"
          >
            {NAV.map((item) => (
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
            ))}
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
