import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowRight, MapPin } from "lucide-react";
import { SolutionHero } from "@/components/solutions/SolutionHero";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Stat } from "@/components/ui/Stat";
import { getIcon } from "@/lib/icons";
import { SOLUTION_PAGES } from "@/lib/solutions-data";
import type { SolutionSlug } from "@/lib/site";

/** Light gradient-clipped heading — eterna signature (ink → ink/60). */
const HEADING_CLIP =
  "text-h2 font-bold text-balance bg-clip-text pb-[0.18em] text-transparent bg-gradient-to-b from-ink to-[color:rgba(26,20,38,0.6)]";

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

  const { hero, overview, capabilities, how, outcomes, cta } = page;

  return (
    <>
      <SolutionHero
        title={hero.title}
        titleAccent={hero.titleAccent}
        subtitle={hero.subtitle}
        image={hero.image}
        imageAlt={hero.title}
      />

      {/* Overview — editorial overlap: duotone image with a content panel over its edge */}
      <section className="section overflow-hidden">
        <div className="container-site">
          <Reveal>
            <div className="grid items-stretch lg:grid-cols-12">
              {/* Duotone image — right, tall */}
              <figure className="relative aspect-[4/5] overflow-hidden rounded-3xl ring-1 ring-line sm:aspect-[16/10] lg:col-span-7 lg:col-start-6 lg:row-start-1 lg:aspect-auto">
                <Image
                  src={overview.image.src}
                  alt={overview.image.caption}
                  fill
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  className="object-cover [filter:grayscale(1)_contrast(1.03)]"
                />
                {/* Plum → purple → orchid duotone */}
                <div
                  aria-hidden
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(150deg, rgba(45,27,105,0.82) 0%, rgba(126,73,242,0.45) 55%, rgba(233,162,242,0.30) 100%)",
                    mixBlendMode: "multiply",
                  }}
                />
                <figcaption className="absolute bottom-4 right-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-ink/55 px-3.5 py-1.5 text-caption text-white backdrop-blur-md">
                  <MapPin size={14} className="text-[color:var(--blue-400)]" aria-hidden />
                  {overview.image.caption}
                </figcaption>
              </figure>

              {/* Content panel — left, overlapping the image edge */}
              <div className="relative z-10 -mt-10 mx-4 rounded-3xl border border-line bg-surface/95 p-8 shadow-[var(--shadow-overlay)] backdrop-blur-sm sm:mx-8 sm:p-10 lg:col-span-6 lg:col-start-1 lg:row-start-1 lg:mx-0 lg:my-10 lg:p-12">
                <div
                  aria-hidden
                  className="pointer-events-none absolute -left-16 -top-16 h-56 w-56 rounded-full opacity-70 blur-2xl"
                  style={{ background: "radial-gradient(circle, rgba(126,73,242,0.12), transparent 70%)" }}
                />
                <p className="eyebrow mb-3">{overview.eyebrow}</p>
                <h2 className={HEADING_CLIP}>{overview.heading}</h2>
                {overview.paragraphs.map((p, i) => (
                  <p key={i} className="relative z-10 mt-4 text-body text-secondary">
                    {p}
                  </p>
                ))}

                {/* Feature list — clean statements, no markers */}
                <div className="mt-8 grid gap-x-8 gap-y-5 sm:grid-cols-2">
                  {overview.checklist.map((item) => (
                    <div key={item.lead}>
                      <p className="text-body font-semibold text-ink">{item.lead}</p>
                      {item.text ? (
                        <p className="mt-1 text-caption leading-relaxed text-secondary">{item.text}</p>
                      ) : null}
                    </div>
                  ))}
                </div>
              </div>
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

      {/* How it works — connected stepper */}
      <section className="section">
        <div className="container-site">
          <SectionHeader eyebrow={how.eyebrow} title={how.heading} />
          <div className="mt-14 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {how.steps.map((step, i) => (
              <Reveal key={step.n} index={i}>
                <div className="relative">
                  {/* Connector hairline to the next step (lg only) */}
                  {i < how.steps.length - 1 ? (
                    <span
                      aria-hidden
                      className="absolute left-12 top-6 hidden h-px w-[calc(100%-1rem)] bg-line lg:block"
                    />
                  ) : null}
                  <span className="relative z-10 flex h-12 w-12 items-center justify-center rounded-2xl border border-line-strong bg-surface text-h3 font-extrabold tabular-nums text-primary-strong">
                    {step.n}
                  </span>
                  <h3 className="mt-5 text-h3 font-bold text-ink">{step.title}</h3>
                  <p className="mt-2 text-caption leading-relaxed text-secondary">{step.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

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
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {outcomes.stats.map((s, i) => (
              <Reveal key={s.label} index={i}>
                <div className="h-full rounded-2xl border border-line-on-dark bg-white/[0.04] p-8 backdrop-blur-sm transition-colors duration-300 hover:border-[color:rgba(126,73,242,0.5)]">
                  <Stat value={s.value} label={s.label} tone="dark" />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA + cross-links — gradient finale (light canvas, distinct from the dark Outcomes band) */}
      <section className="section">
        <div className="container-site">
          <Reveal>
            {/* Gradient CTA card — eterna signature (purple → deep purple) */}
            <div
              className="relative overflow-hidden rounded-[2.5rem] px-8 py-14 shadow-2xl shadow-[rgba(126,73,242,0.25)] md:px-14 md:py-16"
              style={{
                background:
                  "linear-gradient(110deg, var(--color-primary) 0%, var(--blue-600) 100%)",
              }}
            >
              {/* Soft orchid bloom for depth */}
              <div
                aria-hidden
                className="pointer-events-none absolute -right-[10%] -top-[30%] h-[420px] w-[420px] rounded-full blur-[90px]"
                style={{ background: "rgba(233,162,242,0.30)" }}
              />

              <div className="relative z-10 grid gap-10 lg:grid-cols-2 lg:items-center">
                <div>
                  <p className="eyebrow !text-white/70">{cta.eyebrow}</p>
                  <h2 className="mt-4 text-balance bg-gradient-to-b from-white to-white/55 bg-clip-text pb-[0.18em] text-h2 font-bold text-transparent">
                    {cta.heading}
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

                <div className="lg:pl-6">
                  {cta.crossLinks.map((link) => (
                    <Link
                      key={link.slug}
                      href={link.slug === "gsm" ? "/gsm" : `/solutions/${link.slug}`}
                      className="group/btn flex items-center justify-between gap-4 border-t border-white/20 py-5 transition-colors last:border-b"
                    >
                      <div>
                        <h3 className="text-body font-semibold text-white">{link.name}</h3>
                        <p className="mt-1 text-caption text-white/70">{link.blurb}</p>
                      </div>
                      <ArrowRight
                        size={18}
                        className="shrink-0 text-white/80 transition-transform duration-200 group-hover/btn:translate-x-1"
                        aria-hidden
                      />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
