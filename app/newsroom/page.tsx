import { createElement } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { HeroDark } from "@/components/layout/HeroDark";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Badge } from "@/components/ui/Badge";
import { NewsFilter } from "@/components/newsroom/NewsFilter";
import { getIcon } from "@/lib/icons";
import { FEATURED_NEWS, NEWS_REST } from "@/lib/news-data";
import { MILESTONES } from "@/lib/site";

export const metadata: Metadata = {
  title: "Newsroom",
  description:
    "Product launches, market expansions and go-lives from PhotonMatters, the team building AI-native lending infrastructure across Africa, India and the Middle East.",
  alternates: { canonical: "/newsroom" },
};

/** Fine film grain, matched to the other gradient surfaces on the site. */
const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

export default function NewsroomPage() {
  const milestoneNo = String(FEATURED_NEWS.milestoneIndex + 1).padStart(2, "0");
  const milestoneTotal = String(MILESTONES.length).padStart(2, "0");

  return (
    <>
      <HeroDark
        eyebrow="Newsroom"
        title="Milestones from a company"
        titleAccent="built in motion"
        subtitle="Product launches, market expansions and go-lives from the team building AI-native lending infrastructure across Africa, India and the Middle East."
        image="/reuse/global-map.webp"
        imageAlt="PhotonMatters' global footprint"
      />

      {/* Featured lead: the flagship announcement, given an editorial two-up card. */}
      <section className="section">
        <div className="container-site">
          <Reveal>
            <Link
              href={`/newsroom/${FEATURED_NEWS.slug}`}
              className="group grid overflow-hidden rounded-[2rem] border border-line bg-surface shadow-[0_1px_2px_rgba(26,20,38,0.04),0_28px_60px_-30px_rgba(126,73,242,0.35)] transition-all duration-300 hover:border-line-strong hover:shadow-[0_2px_4px_rgba(26,20,38,0.05),0_36px_72px_-32px_rgba(126,73,242,0.45)] lg:grid-cols-[1.05fr_0.95fr]"
            >
              {/* Media stage: the milestone rendered as a rising beam of light
                  (echoing the About journey) that terminates at a glowing node. */}
              <div
                aria-hidden
                className="relative min-h-[240px] overflow-hidden lg:min-h-[380px]"
                style={{
                  background:
                    "radial-gradient(90% 90% at 22% 20%, rgba(233,162,242,0.42), transparent 55%), linear-gradient(150deg, #2a1a52 0%, #0b0716 78%)",
                }}
              >
                <div
                  className="pointer-events-none absolute inset-0 opacity-[0.16] mix-blend-soft-light"
                  style={{ backgroundImage: GRAIN }}
                />

                {/* Rising trajectory beam */}
                <svg
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                  className="absolute inset-0 h-full w-full"
                >
                  <defs>
                    <linearGradient id="leadBeam" x1="0" y1="1" x2="1" y2="0">
                      <stop offset="0" stopColor="var(--color-primary)" stopOpacity="0" />
                      <stop offset="0.52" stopColor="var(--blue-400)" stopOpacity="0.85" />
                      <stop offset="1" stopColor="var(--amber-500)" />
                    </linearGradient>
                  </defs>
                  <line
                    x1="0"
                    y1="86"
                    x2="100"
                    y2="14"
                    stroke="url(#leadBeam)"
                    strokeWidth="1.5"
                    vectorEffect="non-scaling-stroke"
                  />
                </svg>

                {/* Ghost milestone index */}
                <span className="pointer-events-none absolute -bottom-4 right-4 select-none font-playfair text-[8.5rem] leading-none text-white/[0.06]">
                  {milestoneNo}
                </span>

                <span className="absolute left-6 top-6 inline-flex items-center gap-1.5 rounded-full bg-[color:var(--amber-500)] px-3 py-1 text-label font-bold uppercase tracking-[0.1em] text-ink">
                  Latest
                </span>
                <span className="absolute bottom-6 left-6 text-label font-semibold uppercase tracking-[0.14em] text-white/55">
                  Milestone {milestoneNo} / {milestoneTotal}
                </span>

                {/* Glowing node on the beam */}
                <span className="absolute inset-0 grid place-items-center">
                  <span className="relative grid h-24 w-24 place-items-center text-white transition-transform duration-700 group-hover:scale-105">
                    <span
                      className="absolute inset-0 rounded-full blur-2xl"
                      style={{
                        background:
                          "radial-gradient(circle, rgba(233,162,242,0.45), transparent 70%)",
                      }}
                    />
                    <span className="absolute inset-2 rounded-full border border-white/15" />
                    {createElement(getIcon(FEATURED_NEWS.icon), {
                      size: 52,
                      strokeWidth: 1.25,
                      className: "relative",
                      "aria-hidden": true,
                    })}
                  </span>
                </span>
              </div>

              {/* Body */}
              <div className="flex flex-col gap-4 p-8 sm:p-11">
                <div className="flex items-center gap-3">
                  <Badge tone="brand">{FEATURED_NEWS.category}</Badge>
                  <time
                    dateTime={FEATURED_NEWS.dateISO}
                    className="text-label font-semibold uppercase tracking-[0.1em] text-muted tabular-nums"
                  >
                    {FEATURED_NEWS.date}
                  </time>
                </div>
                <h2 className="text-balance pb-[0.06em] text-h2 font-bold leading-tight tracking-tight text-ink">
                  {FEATURED_NEWS.title}{" "}
                  <span className="font-playfair font-light text-primary">
                    {FEATURED_NEWS.titleAccent}
                  </span>
                </h2>
                <p className="text-body text-secondary">{FEATURED_NEWS.excerpt}</p>
                <span className="mt-2 inline-flex items-center gap-2 text-body font-semibold text-primary-strong">
                  Read the release
                  <ArrowRight
                    size={17}
                    aria-hidden
                    className="transition-transform duration-200 group-hover:translate-x-1"
                  />
                </span>
              </div>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* All announcements: filterable grid */}
      <section className="section bg-sunken">
        <div className="container-site">
          <SectionHeader
            eyebrow="All announcements"
            title="The story so far."
            subtitle="From incorporation in Dubai to live deployments across Africa: the milestones that shaped PhotonMatters, newest first."
          />
          <div className="mt-12">
            <NewsFilter items={NEWS_REST} />
          </div>
        </div>
      </section>

      {/* Media relations CTA */}
      <section className="section">
        <div className="container-site">
          <Reveal>
            <div
              className="relative overflow-hidden rounded-[2.5rem] px-8 py-14 md:px-14 md:py-16"
              style={{
                background:
                  "linear-gradient(125deg, var(--blue-600) 0%, var(--color-primary) 52%, #8a55f5 100%)",
                boxShadow:
                  "inset 0 1px 0 rgba(255,255,255,0.22), 0 30px 80px -28px rgba(126,73,242,0.6)",
              }}
            >
              <div
                aria-hidden
                className="pointer-events-none absolute -right-[8%] -top-[30%] h-[420px] w-[420px] rounded-full blur-[90px]"
                style={{ background: "rgba(242,203,7,0.28)" }}
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-[0.14] mix-blend-soft-light"
                style={{ backgroundImage: GRAIN }}
              />
              <div className="relative z-10 flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
                <div className="max-w-xl">
                  <p className="eyebrow !text-white/70">Media relations</p>
                  <h2 className="mt-4 text-balance pb-[0.06em] text-h2 font-bold text-white">
                    Writing about PhotonMatters?{" "}
                    <span className="font-playfair font-light text-[color:var(--amber-500)]">
                      Let&apos;s talk.
                    </span>
                  </h2>
                  <p className="mt-4 text-body-lg text-white/80">
                    Press enquiries, executive interviews and product briefings for journalists and
                    analysts. We reply within one business day.
                  </p>
                </div>
                <Button
                  href="/contact"
                  size="lg"
                  withArrow
                  className="!bg-white !text-ink !shadow-none hover:!bg-accent hover:!text-ink"
                >
                  Contact media relations
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
