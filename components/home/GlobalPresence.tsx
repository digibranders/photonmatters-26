"use client";

import dynamic from "next/dynamic";
import { MapPin } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { OFFICES } from "@/lib/site";

// Map uses browser-only geo libs — load client-side after paint.
const GlobalPresenceMap = dynamic(
  () => import("./GlobalPresenceMap").then((m) => ({ default: m.GlobalPresenceMap })),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-[clamp(280px,40vw,560px)] items-center justify-center">
        <span
          className="block h-9 w-9 animate-spin rounded-full border-2 border-white/15"
          style={{ borderTopColor: "var(--color-primary)" }}
        />
      </div>
    ),
  },
);

export function GlobalPresence() {
  return (
    <section data-nav-theme="dark" className="relative overflow-hidden bg-ink py-16 text-white md:py-20">
      {/* Vertical plum→violet→plum wash, mirrored from the revamp */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, #1A1426 0%, rgba(56,32,140,0.35) 50%, #1A1426 100%)",
        }}
      />

      <div className="relative z-10">
        {/* Heading */}
        <div className="container-site text-center">
          <Reveal>
            <span className="eyebrow !text-[color:var(--blue-400)]">Global Presence</span>
            <h2 className="mx-auto mt-4 max-w-3xl text-balance bg-gradient-to-b from-white to-white/45 bg-clip-text pb-[0.18em] text-h2 font-medium tracking-tighter text-transparent">
              Global <span className="font-playfair font-light text-[color:var(--blue-400)]">Reach</span>.
              Local <span className="font-playfair font-light text-[color:var(--blue-400)]">Impact</span>.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-body-lg text-[color:var(--color-text-on-dark-muted)]">
              Four hubs across the Americas, the Gulf, India and Africa — close to the markets and
              operators we serve.
            </p>
          </Reveal>
        </div>

        {/* Full-width map */}
        <Reveal>
          <div className="container-site mt-10">
            <GlobalPresenceMap offices={OFFICES} />
          </div>
        </Reveal>

        {/* Location ribbon */}
        <div className="container-site">
          <ul className="mt-8 grid list-none grid-cols-2 gap-4 lg:grid-cols-4">
            {OFFICES.map((o) => (
              <li
                key={o.city}
                className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-sm transition-colors duration-300 hover:border-[color:rgba(126,73,242,0.5)]"
              >
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 shrink-0 text-[color:var(--amber-500)]" aria-hidden />
                  <span className="text-h3 font-bold leading-none text-white">{o.city}</span>
                  {o.badge ? (
                    <span className="rounded-full bg-[color:var(--amber-500)]/15 px-2 py-0.5 text-label font-bold uppercase tracking-[0.1em] text-[color:var(--amber-500)]">
                      {o.badge}
                    </span>
                  ) : null}
                </div>
                <p className="mt-1.5 text-label font-semibold uppercase tracking-[0.12em] text-[color:var(--blue-400)]">
                  {o.country}
                </p>
                <p className="mt-2 text-caption leading-relaxed text-[color:var(--color-text-on-dark-muted)]">
                  {o.description}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
