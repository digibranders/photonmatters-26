import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { Badge } from "@/components/ui/Badge";
import { ArticleShare } from "@/components/newsroom/ArticleShare";
import { NewsCard } from "@/components/newsroom/NewsCard";
import {
  NEWS,
  getNewsBySlug,
  getRelatedNews,
  type NewsQuote,
} from "@/lib/news-data";
import { SITE, MILESTONES } from "@/lib/site";

export function generateStaticParams() {
  return NEWS.map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = getNewsBySlug(slug);
  if (!item) return {};
  const headline = `${item.title} ${item.titleAccent ?? ""}`.trim();
  const url = `/newsroom/${item.slug}`;
  return {
    title: headline,
    description: item.standfirst,
    alternates: { canonical: url },
    openGraph: {
      title: headline,
      description: item.standfirst,
      type: "article",
      url,
      publishedTime: item.dateISO,
    },
  };
}

/** Render a quote, highlighting the optional accent fragment in brand purple. */
function QuoteText({ quote }: { quote: NewsQuote }) {
  if (!quote.accent || !quote.text.includes(quote.accent)) {
    return <>{quote.text}</>;
  }
  const [before, after] = quote.text.split(quote.accent);
  return (
    <>
      {before}
      <span className="text-primary">{quote.accent}</span>
      {after}
    </>
  );
}

export default async function NewsArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = getNewsBySlug(slug);
  if (!item) notFound();

  const related = getRelatedNews(slug, 2);
  const headline = `${item.title} ${item.titleAccent ?? ""}`.trim();
  const absoluteUrl = `${SITE.url}/newsroom/${item.slug}`;
  const milestone = MILESTONES[item.milestoneIndex];
  const milestoneNumber = item.milestoneIndex + 1;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline,
    description: item.standfirst,
    datePublished: item.dateISO,
    dateModified: item.dateISO,
    articleSection: item.category,
    url: absoluteUrl,
    mainEntityOfPage: { "@type": "WebPage", "@id": absoluteUrl },
    image: `${SITE.url}/reuse/global-map.webp`,
    author: { "@type": "Organization", name: SITE.name, url: SITE.url },
    publisher: {
      "@type": "Organization",
      name: SITE.name,
      logo: {
        "@type": "ImageObject",
        url: `${SITE.url}/photonmatters-logo.svg`,
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      {/* Back to hub: pt clears the fixed NavBar (content pages get this from HeroDark). */}
      <div className="border-b border-line bg-sunken">
        <div className="container-site pb-5 pt-28">
          <Link
            href="/newsroom"
            className="inline-flex items-center gap-2 text-caption font-semibold text-muted transition-colors duration-200 hover:text-primary"
          >
            <ArrowLeft size={16} aria-hidden />
            All news
          </Link>
        </div>
      </div>

      {/* Header */}
      <header className="pt-12">
        <div className="container-site">
          <div className="max-w-[52rem]">
            <div className="flex flex-wrap items-center gap-3">
              <Badge tone="brand">{item.category}</Badge>
              <time
                dateTime={item.dateISO}
                className="text-label font-semibold uppercase tracking-[0.1em] text-muted tabular-nums"
              >
                {item.date}
              </time>
              {item.dateline ? (
                <>
                  <span aria-hidden className="text-muted/60">
                    ·
                  </span>
                  <span className="text-label font-semibold uppercase tracking-[0.1em] text-muted">
                    {item.dateline}
                  </span>
                </>
              ) : null}
            </div>

            <h1 className="mt-5 text-balance pb-[0.04em] text-h1 font-bold leading-[1.08] tracking-tight text-ink">
              {item.title}{" "}
              <span className="font-playfair font-light text-primary">{item.titleAccent}</span>
            </h1>
            <p className="mt-6 max-w-[44rem] text-body-lg leading-relaxed text-secondary">
              {item.standfirst}
            </p>

            <div className="mt-8">
              <ArticleShare
                url={absoluteUrl}
                title={headline}
                byline={`By ${SITE.name} · ${item.readTime}`}
              />
            </div>
          </div>
        </div>
      </header>

      {/* Body + facts rail */}
      <section className="section pt-10">
        <div className="container-site">
          <div className="grid gap-x-16 gap-y-12 lg:grid-cols-[minmax(0,1fr)_300px]">
            {/* Article prose */}
            <article>
              <div className="max-w-[68ch]">
                {item.body.map((para, i) => (
                  <div key={i}>
                    <p
                      className={
                        i === 0
                          ? "text-body-lg leading-[1.8] text-secondary first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:font-playfair first-letter:text-[3.4rem] first-letter:font-medium first-letter:leading-[0.72] first-letter:text-primary"
                          : "mt-6 text-body-lg leading-[1.8] text-secondary"
                      }
                    >
                      {para}
                    </p>
                    {item.quote && i === 1 ? (
                      <figure className="my-10">
                        <span
                          aria-hidden
                          className="block font-playfair text-[4.5rem] font-medium leading-[0.4] text-[color:var(--amber-500)]"
                        >
                          &ldquo;
                        </span>
                        <blockquote className="mt-4 font-playfair text-[clamp(1.35rem,1.05rem+1.4vw,1.85rem)] font-medium leading-[1.4] text-ink">
                          <QuoteText quote={item.quote} />
                        </blockquote>
                        <figcaption className="mt-5 text-caption text-muted">
                          <span className="font-semibold text-ink">{item.quote.attribution}</span>
                          {item.quote.role ? `, ${item.quote.role}` : null}
                        </figcaption>
                      </figure>
                    ) : null}
                  </div>
                ))}
                {item.quote && item.body.length <= 1 ? (
                  <figure className="my-10">
                    <span
                      aria-hidden
                      className="block font-playfair text-[4.5rem] font-medium leading-[0.4] text-[color:var(--amber-500)]"
                    >
                      &ldquo;
                    </span>
                    <blockquote className="mt-4 font-playfair text-[clamp(1.35rem,1.05rem+1.4vw,1.85rem)] font-medium leading-[1.4] text-ink">
                      <QuoteText quote={item.quote} />
                    </blockquote>
                    <figcaption className="mt-5 text-caption text-muted">
                      <span className="font-semibold text-ink">{item.quote.attribution}</span>
                      {item.quote.role ? `, ${item.quote.role}` : null}
                    </figcaption>
                  </figure>
                ) : null}
              </div>

              {/* Boilerplate + media contact */}
              <div className="mt-10 max-w-[68ch] border-t border-line pt-8">
                <p className="eyebrow">About PhotonMatters</p>
                <p className="mt-3 text-body leading-relaxed text-secondary">
                  PhotonMatters is an AI-native lending and collections platform for banks, NBFCs,
                  fintechs and telecom operators across Africa, India and the Middle East.
                  Headquartered in Dubai, the company helps institutions launch products faster,
                  improve operational efficiency and scale with confidence across multiple regulatory
                  environments.
                </p>
                <dl className="mt-6 flex flex-wrap gap-x-12 gap-y-4">
                  <div>
                    <dt className="text-label uppercase tracking-[0.1em] text-muted">Media contact</dt>
                    <dd className="mt-1 text-body font-semibold text-ink">
                      <a href={`mailto:${SITE.email}`} className="hover:text-primary">
                        {SITE.email}
                      </a>
                    </dd>
                  </div>
                  <div>
                    <dt className="text-label uppercase tracking-[0.1em] text-muted">Follow</dt>
                    <dd className="mt-1 text-body font-semibold text-ink">
                      <a
                        href={SITE.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-primary"
                      >
                        LinkedIn
                      </a>
                    </dd>
                  </div>
                  <div>
                    <dt className="text-label uppercase tracking-[0.1em] text-muted">More</dt>
                    <dd className="mt-1 text-body font-semibold text-ink">
                      <Link href="/newsroom" className="hover:text-primary">
                        Newsroom
                      </Link>
                    </dd>
                  </div>
                </dl>
              </div>
            </article>

            {/* Facts rail */}
            <aside className="flex flex-col gap-4 lg:sticky lg:top-28 lg:self-start">
              <div className="rounded-2xl border border-line bg-sunken p-6">
                <h2 className="text-label font-semibold uppercase tracking-[0.14em] text-muted">
                  At a glance
                </h2>
                <dl className="mt-4">
                  {item.facts.map((f) => (
                    <div
                      key={f.label}
                      className="flex flex-col gap-0.5 border-t border-line py-3 first:border-t-0 first:pt-0"
                    >
                      <dt className="text-caption font-medium text-muted">{f.label}</dt>
                      <dd className="text-body font-bold leading-snug text-ink">
                        {f.value}
                        {f.unit ? <span className="text-primary"> {f.unit}</span> : null}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="rounded-2xl border border-line p-6">
                <h2 className="text-label font-semibold uppercase tracking-[0.14em] text-muted">
                  Part of the journey
                </h2>
                <p className="mt-3 text-caption leading-relaxed text-secondary">
                  This announcement is milestone {milestoneNumber} of {MILESTONES.length} on the
                  PhotonMatters timeline
                  {milestone ? `: “${milestone.title}.”` : "."}
                </p>
                <Link
                  href="/about#journey"
                  className="mt-4 inline-flex items-center gap-1.5 text-caption font-semibold text-primary-strong hover:text-primary"
                >
                  See the full journey
                  <ArrowRight size={15} aria-hidden />
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* More from the newsroom */}
      {related.length ? (
        <section className="section bg-sunken">
          <div className="container-site">
            <h2 className="text-label font-semibold uppercase tracking-[0.14em] text-muted">
              More from the newsroom
            </h2>
            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              {related.map((r, i) => (
                <Reveal key={r.slug} index={i}>
                  <NewsCard item={r} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}
