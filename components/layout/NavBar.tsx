"use client";

import { startTransition, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X, ArrowRight } from "lucide-react";
import { NAV, SOLUTIONS, GSM } from "@/lib/site";
import { getIcon } from "@/lib/icons";
import { cn } from "@/lib/cn";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";

const GsmIcon = getIcon(GSM.icon);

function isActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/");
}

export function NavBar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    const raf = requestAnimationFrame(onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

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

  // Close mobile menu on route change — startTransition avoids setState-in-effect cascades
  useEffect(() => {
    startTransition(() => {
      setMobileOpen(false);
      setDropdownOpen(false);
    });
  }, [pathname]);

  const linkClass = (active: boolean) =>
    cn(
      "rounded-md px-3 py-2 text-caption font-medium text-white/80 transition-colors hover:text-white",
      active && "text-white",
    );

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-[var(--z-header)] border-b border-white/10 backdrop-blur-md transition-colors duration-300",
        scrolled || mobileOpen ? "bg-ink/85" : "bg-ink/45",
      )}
    >
      <div className="container-site flex h-[76px] items-center justify-between lg:h-[84px]">
        <Link href="/" aria-label="PhotonMatters home" className="shrink-0">
          <Logo />
        </Link>

        {/* Desktop nav */}
        <nav aria-label="Main navigation" className="hidden items-center gap-0.5 lg:flex">
          {NAV.map((item) =>
            item.label === "Solutions" ? (
              <div key={item.href} ref={dropdownRef} className="relative">
                <button
                  ref={triggerRef}
                  type="button"
                  aria-haspopup="true"
                  aria-expanded={dropdownOpen}
                  onClick={() => setDropdownOpen((v) => !v)}
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
                      "text-white/70 transition-transform duration-200",
                      dropdownOpen && "rotate-180",
                    )}
                  />
                </button>

                {dropdownOpen && (
                  <div
                    role="menu"
                    aria-label="Solutions menu"
                    className="absolute left-1/2 top-full z-10 mt-3 -translate-x-1/2 w-[320px] rounded-xl border border-line bg-surface p-2 shadow-[var(--shadow-overlay)]"
                  >
                    {SOLUTIONS.map((s) => {
                      const Icon = getIcon(s.icon);
                      return (
                        <Link
                          key={s.slug}
                          href={`/solutions/${s.slug}`}
                          role="menuitem"
                          className="flex cursor-pointer items-center gap-3 rounded-md px-3 py-2.5 transition-colors hover:bg-sunken"
                          onClick={() => setDropdownOpen(false)}
                        >
                          <Icon size={18} className="shrink-0 text-primary" aria-hidden />
                          <span className="text-caption font-medium text-ink">{s.name}</span>
                        </Link>
                      );
                    })}
                    <div className="my-1.5 h-px bg-line" role="separator" />
                    <Link
                      href={GSM.href}
                      role="menuitem"
                      className="flex cursor-pointer items-center gap-3 rounded-md px-3 py-2.5 transition-colors hover:bg-sunken"
                      onClick={() => setDropdownOpen(false)}
                    >
                      <GsmIcon size={18} className="shrink-0 text-primary" aria-hidden />
                      <span className="text-caption font-medium text-ink">{GSM.name}</span>
                    </Link>
                    <Link
                      href="/solutions"
                      role="menuitem"
                      className="flex cursor-pointer items-center gap-1.5 rounded-md px-3 py-2.5 text-caption font-semibold text-primary-strong transition-colors hover:bg-sunken"
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
            className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-md text-white lg:hidden"
          >
            {mobileOpen ? <X size={22} aria-hidden /> : <Menu size={22} aria-hidden />}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <div id="mobile-nav" className="border-t border-white/10 bg-ink/95 backdrop-blur-md lg:hidden">
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
                  "rounded-md px-2 py-3 text-body font-medium text-white/85 transition-colors hover:bg-white/10 hover:text-white",
                  isActive(pathname, item.href) && "text-white",
                )}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setMobileOpen(false)}
              className="mt-2 rounded-md px-2 py-3 text-body font-semibold text-[color:var(--blue-400)]"
            >
              Book a demo →
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
