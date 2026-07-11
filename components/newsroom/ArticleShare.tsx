"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Check, Link2, Share2 } from "lucide-react";
import { cn } from "@/lib/cn";

/* Brand glyphs: lucide dropped its social icons, so these are drawn inline. */
function LinkedInGlyph() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14ZM7.12 20.45H3.55V9h3.57v11.45ZM22.22 0H1.77C.8 0 0 .78 0 1.75v20.5C0 23.22.8 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.75V1.75C24 .78 23.2 0 22.22 0Z" />
    </svg>
  );
}
function XGlyph() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M18.9 1.5h3.4l-7.4 8.5L23.6 22.5h-6.8l-5.3-7-6.1 7H1.9l7.9-9.1L.9 1.5h7l4.8 6.3 5.2-6.3Zm-1.2 19h1.9L7.1 3.4H5.1L17.7 20.5Z" />
    </svg>
  );
}
function WhatsAppGlyph() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.6-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.22 3.08.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.7.63.71.23 1.36.19 1.87.12.57-.09 1.76-.72 2-1.41.25-.7.25-1.29.17-1.42-.07-.13-.27-.2-.57-.35ZM12.04 21.5a9.4 9.4 0 0 1-4.8-1.32l-.34-.2-3.56.93.95-3.47-.22-.36a9.4 9.4 0 1 1 8.02 4.42Zm5.55-14.96A11.28 11.28 0 0 0 2.06 20.2L.5 23.9l3.8-1a11.28 11.28 0 0 0 5.72 1.55h.01c6.23 0 11.3-5.06 11.3-11.29a11.2 11.2 0 0 0-3.74-8.62Z" />
    </svg>
  );
}

const MENU_ITEM =
  "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-body font-medium text-ink transition-colors duration-150 hover:bg-sunken focus-visible:bg-sunken focus-visible:outline-none";

/**
 * Article share control: a single "Share" button that opens a clearly-labelled
 * "Share this release" menu (LinkedIn, X, WhatsApp, copy link). Closes on
 * outside click or Escape; the copy action falls back silently without the
 * Clipboard API.
 */
export function ArticleShare({
  url,
  title,
  byline,
}: {
  url: string;
  title: string;
  byline: string;
}) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!open) return;
    function onPointer(e: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      /* Clipboard unavailable (insecure context / denied), no-op. */
    }
  }

  const shareLinks = [
    {
      label: "LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      glyph: <LinkedInGlyph />,
    },
    {
      label: "X",
      href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
      glyph: <XGlyph />,
    },
    {
      label: "WhatsApp",
      href: `https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`,
      glyph: <WhatsAppGlyph />,
    },
  ];

  return (
    <div className="flex items-center gap-4 border-t border-line pt-6">
      <span className="mr-auto text-caption text-muted">{byline}</span>

      <div ref={rootRef} className="relative">
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-haspopup="menu"
          aria-expanded={open}
          className="group/share inline-flex items-center gap-2 rounded-full border border-line-strong px-5 py-2.5 text-caption font-semibold text-ink transition-all duration-200 hover:border-[color:var(--color-primary)] hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-primary)] focus-visible:ring-offset-2"
        >
          <Share2
            size={16}
            aria-hidden
            className="transition-transform duration-200 group-hover/share:-translate-y-0.5"
          />
          Share
        </button>

        <AnimatePresence>
          {open ? (
            <motion.div
              role="menu"
              aria-label="Share this release"
              initial={reduce ? false : { opacity: 0, y: -6, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: -6, scale: 0.97 }}
              transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
              className="absolute right-0 top-[calc(100%+10px)] z-20 w-64 origin-top-right overflow-hidden rounded-2xl border border-line bg-surface p-2 shadow-[0_2px_6px_rgba(26,20,38,0.08),0_24px_48px_-20px_rgba(126,73,242,0.4)]"
            >
              <p className="px-3 pb-2 pt-1.5 text-label font-semibold uppercase tracking-[0.12em] text-muted">
                Share this release
              </p>
              {shareLinks.map((l) => (
                <a
                  key={l.label}
                  role="menuitem"
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={MENU_ITEM}
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[color:var(--blue-50)] text-primary">
                    {l.glyph}
                  </span>
                  {l.label}
                </a>
              ))}
              <button type="button" role="menuitem" onClick={copy} className={MENU_ITEM}>
                <span
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-lg transition-colors duration-150",
                    copied
                      ? "bg-[color:var(--amber-100)] text-[color:var(--amber-600)]"
                      : "bg-[color:var(--blue-50)] text-primary",
                  )}
                >
                  {copied ? <Check size={15} aria-hidden /> : <Link2 size={15} aria-hidden />}
                </span>
                {copied ? "Link copied" : "Copy link"}
              </button>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </div>
  );
}
