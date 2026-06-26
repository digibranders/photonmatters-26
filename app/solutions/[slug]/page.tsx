import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowRight, Check } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Stat } from "@/components/ui/Stat";
import { SOLUTION_PAGES } from "@/lib/solutions-data";
import type { SolutionSlug } from "@/lib/site";

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
      <PageHero
        eyebrow={hero.eyebrow}
        title={
          hero.titleAccent ? (
            <>
              {hero.title} <span className="text-primary-strong">{hero.titleAccent}</span>
            </>
          ) : (
            hero.title
          )
        }
        subtitle={hero.subtitle}
        image={hero.image}
      />

      {/* Overview */}
      <section className="section">
        <div className="container-site grid gap-12 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <h2 className="text-h2 font-bold text-balance text-ink">{overview.heading}</h2>
            {overview.paragraphs.map((p, i) => (
              <p key={i} className="mt-5 text-body text-secondary">
                {p}
              </p>
            ))}
            <ul className="mt-7 space-y-3">
              {overview.checklist.map((item) => (
                <li key={item.lead} className="flex items-start gap-3">
                  <Check size={18} className="mt-0.5 shrink-0 text-primary" strokeWidth={2.5} aria-hidden />
                  <span className="text-body text-secondary">
                    <span className="font-semibold text-ink">{item.lead}</span>
                    {item.text ? <> — {item.text}</> : null}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.1}>
            <figure className="relative aspect-[4/3] overflow-hidden rounded-2xl">
              <Image
                src={overview.image.src}
                alt={overview.image.caption}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </figure>
          </Reveal>
        </div>
      </section>

      {/* Capabilities */}
      <section className="section bg-sunken">
        <div className="container-site">
          <SectionHeader title={capabilities.heading} subtitle={capabilities.subtitle} />
          <div className="mt-14 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {capabilities.cards.map((card, i) => (
              <Reveal key={card.title} index={i % 3}>
                <div className="border-t border-line pt-5">
                  <span className="text-caption font-bold tracking-[0.08em] text-primary">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-3 text-h3 font-bold text-ink">{card.title}</h3>
                  <p className="mt-2 text-caption leading-relaxed text-secondary">{card.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="section">
        <div className="container-site">
          <SectionHeader title={how.heading} />
          <div className="mt-14 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {how.steps.map((step, i) => (
              <Reveal key={step.n} index={i}>
                <div>
                  <span className="text-h2 font-extrabold text-[color:var(--blue-100)]">{step.n}</span>
                  <h3 className="mt-2 text-h3 font-bold text-ink">{step.title}</h3>
                  <p className="mt-2 text-caption leading-relaxed text-secondary">{step.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Outcomes */}
      <section className="section-lg bg-ink text-white">
        <div className="container-site">
          <SectionHeader tone="dark" title={outcomes.heading} />
          <div className="mt-12 grid gap-x-10 gap-y-8 md:grid-cols-3">
            {outcomes.stats.map((s) => (
              <Reveal key={s.label}>
                <div className="border-t border-line-on-dark pt-6">
                  <Stat value={s.value} label={s.label} tone="dark" />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA + cross-links */}
      <section className="section">
        <div className="container-site grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="text-h2 font-bold text-balance text-ink">{cta.heading}</h2>
            <p className="measure mt-5 text-body-lg text-secondary">{cta.body}</p>
            <div className="mt-8">
              <Button href="/contact" size="lg" withArrow>
                Book a demo
              </Button>
            </div>
          </div>
          <div>
            {cta.crossLinks.map((link) => (
              <Link
                key={link.slug}
                href={link.slug === "gsm" ? "/gsm" : `/solutions/${link.slug}`}
                className="group/btn flex items-center justify-between gap-4 border-t border-line py-5 transition-colors last:border-b hover:text-primary-strong"
              >
                <div>
                  <h3 className="text-body font-semibold text-ink">{link.name}</h3>
                  <p className="mt-1 text-caption text-secondary">{link.blurb}</p>
                </div>
                <ArrowRight
                  size={18}
                  className="shrink-0 text-primary transition-transform duration-200 group-hover/btn:translate-x-1"
                  aria-hidden
                />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
