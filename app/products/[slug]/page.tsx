import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { HeroDark } from "@/components/layout/HeroDark";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { ProductExplorer } from "@/components/products/ProductExplorer";
import { getIcon } from "@/lib/icons";
import { PRODUCT_PAGES } from "@/lib/products-data";
import type { ProductSlug } from "@/lib/products-data";

export function generateStaticParams() {
  return Object.keys(PRODUCT_PAGES).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = PRODUCT_PAGES[slug as ProductSlug];
  if (!page) return {};
  return { title: page.metaTitle, description: page.metaDescription };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = PRODUCT_PAGES[slug as ProductSlug];
  if (!page) notFound();

  const { hero, explorer, extras, why, cta } = page;

  return (
    <>
      <HeroDark
        eyebrow={hero.eyebrow}
        title={hero.title}
        titleAccent={hero.titleAccent}
        subtitle={hero.subtitle}
        image={hero.image}
        imageAlt={hero.title}
        primary={{ label: "Book a demo", href: "/contact" }}
        secondary={{ label: "All products", href: "/products" }}
      />

      {/* Product menu — interactive explorer */}
      <ProductExplorer
        eyebrow={explorer.eyebrow}
        heading={explorer.heading}
        items={explorer.categories.map((c) => {
          const Icon = getIcon(c.icon);
          return {
            title: c.title,
            description: c.description,
            specs: c.specs,
            icon: <Icon size={26} aria-hidden />,
          };
        })}
      />

      {/* Specialized extras — bento (optional) */}
      {extras ? (
        <section className="pb-12 pt-[var(--section-y)] sm:pb-16">
          <div className="container-site">
            <SectionHeader eyebrow={extras.eyebrow} title={extras.heading} />
            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {extras.items.map((it, i) => {
                const Icon = getIcon(it.icon);
                return (
                  <Reveal key={it.title} index={i % 3}>
                    <div className="group relative h-full overflow-hidden rounded-3xl border border-line bg-surface p-7 transition-all duration-300 hover:-translate-y-1 hover:border-line-strong hover:shadow-[0_1px_2px_rgba(26,20,38,0.04),0_18px_40px_-18px_rgba(126,73,242,0.28)]">
                      <div
                        aria-hidden
                        className="pointer-events-none absolute -bottom-16 -right-16 h-56 w-56 rounded-full opacity-70 blur-2xl transition-transform duration-700 group-hover:scale-110"
                        style={{ background: "radial-gradient(circle, rgba(126,73,242,0.13), transparent 70%)" }}
                      />
                      <span className="relative z-10 flex h-12 w-12 items-center justify-center rounded-2xl bg-[color:var(--blue-50)] text-primary">
                        <Icon size={22} aria-hidden />
                      </span>
                      <h3 className="relative z-10 mt-6 text-h3 font-bold tracking-tight text-ink">{it.title}</h3>
                      <p className="relative z-10 mt-2.5 text-caption leading-relaxed text-secondary">{it.body}</p>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>
      ) : null}

      {/* Why PhotonMatters — dark icon grid (optional) */}
      {why ? (
        <section data-nav-theme="dark" className="section relative overflow-hidden bg-ink text-white">
          <div aria-hidden className="pointer-events-none absolute inset-0">
            <div className="absolute -left-[8%] -top-[20%] h-[560px] w-[560px] rounded-full blur-[100px]" style={{ background: "rgba(126,73,242,0.18)" }} />
            <div className="absolute -bottom-[24%] -right-[8%] h-[460px] w-[460px] rounded-full blur-[80px]" style={{ background: "rgba(233,162,242,0.10)" }} />
          </div>
          <div className="container-site relative">
            <SectionHeader tone="dark" eyebrow={why.eyebrow} title={why.heading} />
            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {why.items.map((it, i) => {
                const Icon = getIcon(it.icon);
                return (
                  <Reveal key={it.text} index={i % 3}>
                    <div className="flex h-full items-start gap-4 rounded-2xl border border-line-on-dark bg-white/[0.04] p-6 backdrop-blur-sm transition-colors duration-300 hover:border-[color:rgba(126,73,242,0.5)]">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/[0.08] text-[color:var(--blue-400)]">
                        <Icon size={20} aria-hidden />
                      </span>
                      <p className="text-body font-medium text-white">{it.text}</p>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>
      ) : null}

      {/* CTA finale — gradient card with glass cross-links */}
      <section className="pb-[var(--section-y)] pt-10">
        <div className="container-site">
          <Reveal>
            <div
              className="relative overflow-hidden rounded-[2.5rem] px-8 py-14 shadow-2xl shadow-[rgba(126,73,242,0.25)] md:px-14 md:py-16"
              style={{ background: "linear-gradient(110deg, var(--color-primary) 0%, var(--blue-600) 100%)" }}
            >
              <div
                aria-hidden
                className="pointer-events-none absolute -right-[10%] -top-[30%] h-[420px] w-[420px] rounded-full blur-[90px]"
                style={{ background: "rgba(233,162,242,0.30)" }}
              />
              <div className="relative z-10 grid gap-10 lg:grid-cols-2 lg:items-center">
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
                <div className="flex flex-col gap-3">
                  {cta.crossLinks.map((link) => {
                    const Icon = getIcon(PRODUCT_PAGES[link.slug].icon);
                    return (
                      <Link
                        key={link.slug}
                        href={`/products/${link.slug}`}
                        className="group/card flex items-center gap-4 rounded-2xl border border-white/15 bg-white/[0.08] p-4 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-white/35 hover:bg-white/[0.14]"
                      >
                        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10 text-white">
                          <Icon size={19} aria-hidden />
                        </span>
                        <div className="min-w-0 flex-1">
                          <h3 className="text-body font-semibold text-white">{link.name}</h3>
                          <p className="mt-0.5 text-caption text-white/70">{link.blurb}</p>
                        </div>
                        <ArrowRight
                          size={18}
                          className="shrink-0 text-white/80 transition-transform duration-200 group-hover/card:translate-x-1"
                          aria-hidden
                        />
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
