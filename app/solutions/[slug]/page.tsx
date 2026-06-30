import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowRight, MapPin } from "lucide-react";
import { SolutionHero } from "@/components/solutions/SolutionHero";
import { FeatureShowcase } from "@/components/solutions/FeatureShowcase";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { getIcon } from "@/lib/icons";
import { SOLUTION_PAGES } from "@/lib/solutions-data";
import { SOLUTIONS, GSM, type SolutionSlug } from "@/lib/site";

/** Light gradient-clipped heading — eterna signature (ink → ink/60). */
const HEADING_CLIP =
  "text-h2 font-bold text-balance bg-clip-text pb-[0.18em] text-transparent bg-gradient-to-b from-ink to-[color:rgba(26,20,38,0.6)]";

/** Resolve a cross-link's lucide icon name by slug. */
const SOLUTION_ICON: Record<string, string> = {
  ...Object.fromEntries(SOLUTIONS.map((s) => [s.slug, s.icon])),
  gsm: GSM.icon,
};

/** Fine film grain — adds premium texture on gradient surfaces. */
const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

export function generateStaticParams() {
  return Object.keys(SOLUTION_PAGES).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = SOLUTION_PAGES[slug as SolutionSlug];
  if (!page) return {};
  return { title: page.metaTitle, description: page.metaDescription };
}

export default async function SolutionDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = SOLUTION_PAGES[slug as SolutionSlug];
  if (!page) notFound();

  const { hero, overview, capabilities, how, outcomes, cta, featureShowcase } = page;

  return (
    <>
      <SolutionHero
        title={hero.title}
        titleAccent={hero.titleAccent}
        subtitle={hero.subtitle}
        image={hero.image}
        imageAlt={hero.title}
      />

      {/* Overview — glass spotlight: cinematic image stage with a frosted content card */}
      <section className="section">
        <div className="container-site">
          <Reveal>
            <div className="relative overflow-hidden rounded-[2rem] ring-1 ring-line">
              {/* Cinematic image backdrop */}
              <div aria-hidden className="absolute inset-0">
                <Image
                  src={overview.image.src}
                  alt=""
                  fill
                  sizes="100vw"
                  className="object-cover"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(100deg, rgba(15,10,24,0.55) 0%, rgba(15,10,24,0.20) 48%, rgba(126,73,242,0.30) 100%), radial-gradient(70% 90% at 100% 0%, rgba(233,162,242,0.22), transparent 60%)",
                  }}
                />
              </div>

              {/* Frosted glass content card */}
              <div className="relative px-4 py-10 sm:px-8 sm:py-14 lg:px-12 lg:py-16">
                <div
                  className="max-w-xl rounded-3xl border border-white/60 p-8 backdrop-blur-2xl sm:p-10"
                  style={{
                    background:
                      "linear-gradient(160deg, rgba(255,255,255,0.90) 0%, rgba(255,255,255,0.72) 100%)",
                    boxShadow:
                      "inset 0 1px 0 0 rgba(255,255,255,0.9), inset 0 0 0 1px rgba(255,255,255,0.30), 0 2px 6px rgba(26,20,38,0.10), 0 22px 46px -14px rgba(26,20,38,0.40), 0 60px 110px -34px rgba(126,73,242,0.45)",
                  }}
                >
                  <p className="eyebrow mb-3">{overview.eyebrow}</p>
                  <h2 className={HEADING_CLIP}>{overview.heading}</h2>
                  {overview.paragraphs.map((p, i) => (
                    <p key={i} className="mt-4 text-body text-secondary">
                      {p}
                    </p>
                  ))}

                  {/* Feature list — bullets with the brand arrow motif */}
                  <div className="mt-8 grid gap-x-8 gap-y-5 sm:grid-cols-2">
                    {overview.checklist.map((item) => (
                      <div key={item.lead} className="flex items-start gap-2.5">
                        <ArrowRight
                          size={15}
                          strokeWidth={2.5}
                          className="mt-1 shrink-0 text-primary"
                          aria-hidden
                        />
                        <div>
                          <p className="text-body font-semibold leading-snug text-ink">{item.lead}</p>
                          {item.text ? (
                            <p className="mt-1 text-caption leading-relaxed text-secondary">{item.text}</p>
                          ) : null}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Caption chip over the image */}
              <figcaption className="absolute bottom-4 right-4 z-10 inline-flex items-center gap-2 rounded-full border border-white/15 bg-ink/55 px-3.5 py-1.5 text-caption text-white backdrop-blur-md">
                <MapPin size={14} className="text-[color:var(--blue-400)]" aria-hidden />
                {overview.image.caption}
              </figcaption>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Capabilities — bento cards */}
      <section id="capabilities" className="section bg-sunken scroll-mt-24">
        <div className="container-site">
          <SectionHeader
            eyebrow={capabilities.eyebrow}
            title={capabilities.heading}
            subtitle={capabilities.subtitle}
          />
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {capabilities.cards.map((card, i) => {
              const Icon = getIcon(card.icon);
              return (
                <Reveal key={card.title} index={i % 3}>
                  <div className="group/card relative flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-surface p-7 transition-all duration-300 hover:-translate-y-1 hover:border-line-strong hover:shadow-[0_1px_2px_rgba(26,20,38,0.04),0_18px_40px_-18px_rgba(126,73,242,0.28)]">
                    {/* Corner bloom — eterna bento accent */}
                    <div
                      aria-hidden
                      className="pointer-events-none absolute -bottom-16 -right-16 h-56 w-56 rounded-full opacity-70 blur-2xl transition-transform duration-700 group-hover/card:scale-110"
                      style={{ background: "radial-gradient(circle, rgba(126,73,242,0.13), transparent 70%)" }}
                    />
                    <div className="relative z-10 flex items-center justify-between">
                      <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[color:var(--blue-50)] text-primary">
                        <Icon size={22} aria-hidden />
                      </span>
                      <span className="text-label font-semibold tracking-[0.14em] text-muted">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <h3 className="relative z-10 mt-6 text-h3 font-bold tracking-tight text-ink">
                      {card.title}
                    </h3>
                    <p className="relative z-10 mt-2.5 flex-grow text-caption leading-relaxed text-secondary">
                      {card.body}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* How it works — flow pipeline of connected step cards */}
      <section className="section">
        <div className="container-site">
          <SectionHeader title={how.eyebrow} />
          <div className="mt-14 grid items-stretch gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
            {how.steps.map((step, i) => (
              <Reveal key={step.n} index={i} className="relative">
                <div
                  className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-line p-7 transition-all duration-300 hover:-translate-y-1 hover:border-line-strong hover:shadow-[0_1px_2px_rgba(26,20,38,0.04),0_18px_40px_-18px_rgba(126,73,242,0.28)]"
                  style={{ background: "linear-gradient(160deg, #ffffff 0%, var(--navy-50) 100%)" }}
                >
                  {/* Ghost numeral */}
                  <span
                    aria-hidden
                    className="pointer-events-none absolute -right-1 -top-6 select-none text-[6rem] font-extrabold leading-none tabular-nums text-[color:var(--blue-100)] opacity-70"
                  >
                    {step.n}
                  </span>
                  {/* Corner bloom */}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -bottom-14 -right-14 h-40 w-40 rounded-full opacity-70 blur-2xl transition-transform duration-700 group-hover:scale-110"
                    style={{ background: "radial-gradient(circle, rgba(126,73,242,0.12), transparent 70%)" }}
                  />
                  <h3 className="relative z-10 mt-10 text-h3 font-bold text-ink">{step.title}</h3>
                  <p className="relative z-10 mt-2 text-caption leading-relaxed text-secondary">
                    {step.body}
                  </p>
                </div>

                {/* Gradient connector arrow to the next step (lg only) */}
                {i < how.steps.length - 1 ? (
                  <span
                    aria-hidden
                    className="absolute right-0 top-1/2 z-20 hidden h-9 w-9 -translate-y-1/2 translate-x-1/2 items-center justify-center rounded-full border border-line bg-surface text-white shadow-[var(--shadow-overlay)] lg:flex"
                    style={{ background: "linear-gradient(135deg, var(--blue-500), var(--blue-400))" }}
                  >
                    <ArrowRight size={16} strokeWidth={2.75} />
                  </span>
                ) : null}
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* What you can do — interactive feature explorer (per-solution, optional) */}
      {featureShowcase ? (
        <FeatureShowcase
          eyebrow={featureShowcase.eyebrow}
          heading={featureShowcase.heading}
          items={featureShowcase.items.map((it) => {
            const Icon = getIcon(it.icon);
            return {
              title: it.title,
              body: it.body,
              visual: it.visual,
              icon: <Icon size={20} aria-hidden />,
            };
          })}
        />
      ) : null}

      {/* Outcomes — dark band with ambient light + glass stat cards */}
      <section
        data-nav-theme="dark"
        className="section relative overflow-hidden bg-ink text-white"
      >
        {/* Eterna ambient blooms */}
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div
            className="absolute -left-[10%] -top-[20%] h-[600px] w-[600px] rounded-full blur-[100px]"
            style={{ background: "rgba(126,73,242,0.20)" }}
          />
          <div
            className="absolute -bottom-[20%] -right-[10%] h-[500px] w-[500px] rounded-full blur-[80px]"
            style={{ background: "rgba(233,162,242,0.10)" }}
          />
        </div>
        <div className="container-site relative">
          <SectionHeader tone="dark" eyebrow={outcomes.eyebrow} title={outcomes.heading} />
          <div className="mt-12 grid gap-x-10 gap-y-10 md:grid-cols-3">
            {outcomes.stats.map((s, i) => (
              <Reveal key={s.label} index={i} className="relative">
                {/* Gradient rail between columns */}
                {i > 0 ? (
                  <span
                    aria-hidden
                    className="absolute -left-5 top-0 hidden h-full w-px md:block"
                    style={{
                      background:
                        "linear-gradient(to bottom, transparent, rgba(126,73,242,0.45) 25%, rgba(233,162,242,0.30) 75%, transparent)",
                    }}
                  />
                ) : null}
                <p className="bg-gradient-to-b from-white to-white/60 bg-clip-text pb-[0.1em] text-[clamp(1.5rem,1.2rem+1.3vw,2.125rem)] font-bold leading-tight tracking-tight text-transparent">
                  {s.value}
                </p>
                <p className="mt-3 max-w-xs text-body leading-relaxed text-[color:var(--color-text-on-dark-muted)]">
                  {s.label}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA finale (v3, premium) — gradient card with a connected lifecycle pipeline */}
      <section className="section">
        <div className="container-site">
          <Reveal>
            <div
              className="relative overflow-hidden rounded-[2.5rem] px-8 py-14 md:px-14 md:py-16"
              style={{
                background:
                  "linear-gradient(125deg, var(--blue-600) 0%, var(--color-primary) 48%, #8a55f5 100%)",
                boxShadow:
                  "inset 0 1px 0 rgba(255,255,255,0.22), 0 30px 80px -28px rgba(126,73,242,0.6)",
              }}
            >
              {/* Soft orchid bloom + highlight bloom for depth */}
              <div
                aria-hidden
                className="pointer-events-none absolute -right-[10%] -top-[30%] h-[420px] w-[420px] rounded-full blur-[90px]"
                style={{ background: "rgba(233,162,242,0.32)" }}
              />
              <div
                aria-hidden
                className="pointer-events-none absolute -bottom-[35%] -left-[12%] h-[360px] w-[360px] rounded-full blur-[100px]"
                style={{ background: "rgba(255,255,255,0.12)" }}
              />
              {/* Film grain */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-[0.14] mix-blend-soft-light"
                style={{ backgroundImage: GRAIN }}
              />

              <div className="relative z-10 grid gap-12 lg:grid-cols-2 lg:items-center">
                <div>
                  <p className="eyebrow !text-white/70">{cta.eyebrow}</p>
                  <h2 className="mt-4 text-balance bg-gradient-to-b from-white to-white/55 bg-clip-text pb-[0.18em] text-h2 font-bold text-transparent">
                    {cta.headingAccent && cta.heading.endsWith(cta.headingAccent) ? (
                      <>
                        {cta.heading.slice(0, cta.heading.length - cta.headingAccent.length)}
                        <span className="font-playfair font-light text-[color:var(--amber-500)]">
                          {cta.headingAccent}
                        </span>
                      </>
                    ) : (
                      cta.heading
                    )}
                  </h2>
                  <p className="measure mt-5 text-body-lg text-white/80">{cta.body}</p>
                  <div className="mt-8">
                    <Button
                      href="/contact"
                      size="lg"
                      withArrow
                      className="!bg-white !text-ink !shadow-none hover:!bg-accent hover:!text-ink"
                    >
                      Book a demo
                    </Button>
                  </div>
                </div>

                {/* Connected lifecycle pipeline */}
                <div className="relative">
                  {cta.crossLinks.map((link, i) => {
                    const Icon = getIcon(SOLUTION_ICON[link.slug] ?? "Sparkles");
                    const last = i === cta.crossLinks.length - 1;
                    return (
                      <Link
                        key={link.slug}
                        href={link.slug === "gsm" ? "/gsm" : `/solutions/${link.slug}`}
                        className="group/node relative flex gap-4 rounded-2xl p-3 transition-colors duration-300 hover:bg-white/[0.07]"
                      >
                        {/* Vertical gradient connector to the next node */}
                        {!last ? (
                          <span
                            aria-hidden
                            className="absolute left-[2.25rem] top-[3.75rem] -bottom-1 w-px"
                            style={{
                              background:
                                "linear-gradient(to bottom, rgba(233,162,242,0.7), rgba(255,255,255,0.12))",
                            }}
                          />
                        ) : null}
                        {/* Station node */}
                        <span
                          className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-white transition-transform duration-300 group-hover/node:scale-105"
                          style={{
                            background:
                              "linear-gradient(150deg, rgba(255,255,255,0.32), rgba(255,255,255,0.06))",
                            boxShadow:
                              "inset 0 1px 0 rgba(255,255,255,0.55), 0 10px 26px -8px rgba(233,162,242,0.55)",
                          }}
                        >
                          <span
                            aria-hidden
                            className="absolute inset-0 rounded-full ring-1 ring-inset ring-white/25"
                          />
                          <Icon size={19} aria-hidden />
                        </span>
                        <div className="min-w-0 flex-1 pt-1.5">
                          <span className="inline-flex items-center gap-1.5">
                            <span className="text-body font-semibold text-white">{link.name}</span>
                            <ArrowRight
                              size={15}
                              className="text-white/60 transition-all duration-200 group-hover/node:translate-x-1 group-hover/node:text-white"
                              aria-hidden
                            />
                          </span>
                          <p className="mt-0.5 text-caption text-white/70">{link.blurb}</p>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
