import { createElement } from "react";
import type { Metadata } from "next";
import { Download, FileText } from "lucide-react";
import { HeroDark } from "@/components/layout/HeroDark";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Badge } from "@/components/ui/Badge";
import { getIcon } from "@/lib/icons";
import { RESOURCES } from "@/lib/resources-data";

export const metadata: Metadata = {
  title: "Resource Centre",
  description:
    "Download PhotonMatters brochures and datasheets. Deep dives on the AI-native lending and collections platform, products and deployment model.",
  alternates: { canonical: "/resources" },
};

/** Fine film grain, matched to the other gradient surfaces on the site. */
const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

const DOWNLOAD_BTN =
  "inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full bg-primary px-6 py-2.5 text-[1.0625rem] font-semibold text-white shadow-lg shadow-[rgba(126,73,242,0.22)] transition-colors duration-150 hover:bg-accent hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-primary)] focus-visible:ring-offset-2";
const PREVIEW_BTN =
  "inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full border border-line-strong px-6 py-2.5 text-caption font-semibold text-ink transition-colors duration-150 hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-primary)] focus-visible:ring-offset-2";

export default function ResourcesPage() {
  const count = RESOURCES.length;

  return (
    <>
      <HeroDark
        eyebrow="Resource Centre"
        title="Everything you need to"
        titleAccent="evaluate PhotonMatters"
        subtitle="Brochures and datasheets on the platform, products and deployment model. Download what you need, ready whenever you are."
        image="/reuse/data-tablet.webp"
        imageAlt="PhotonMatters resources and documentation"
      />

      <section className="section">
        <div className="container-site">
          {/* TODO(resource-filters): add a left filter sidebar once the library
              grows and spans multiple ResourceTypes. Plan:
              - Wrap the content below in `lg:grid-cols-[240px_1fr]`.
              - Sticky sidebar: filter by type (Brochure, Datasheet, Whitepaper,
                Case study) with live counts derived from RESOURCES; optional search.
              - Make it a client component (mirror components/newsroom/NewsFilter)
                that renders the doc rows as its filtered output; collapse to a
                chip row on mobile.
              Skipped for now: only one document (the brochure) exists. */}
          <div className="flex items-end justify-between gap-6">
            <SectionHeader
              eyebrow="Downloads"
              title="Brochures & datasheets."
              subtitle="Official PhotonMatters collateral, free to download and share with your team."
            />
            <span className="hidden shrink-0 pb-1 text-caption font-medium tabular-nums text-muted sm:block">
              {count} {count === 1 ? "document" : "documents"}
            </span>
          </div>

          <div className="mt-12 flex flex-col gap-5">
            {RESOURCES.map((doc, i) => (
              <Reveal key={doc.slug} index={i}>
                <article className="group grid gap-6 rounded-3xl border border-line bg-surface p-5 transition-all duration-300 hover:border-line-strong hover:shadow-[0_1px_2px_rgba(26,20,38,0.04),0_18px_40px_-18px_rgba(126,73,242,0.28)] sm:p-6 md:grid-cols-[220px_1fr_auto] md:items-center">
                  {/* Cover: branded document panel (no cover image needed) */}
                  <div
                    aria-hidden
                    className="relative aspect-[4/3] overflow-hidden rounded-2xl md:aspect-auto md:h-full md:min-h-[190px]"
                    style={{
                      background:
                        "radial-gradient(85% 85% at 22% 18%, rgba(233,162,242,0.38), transparent 55%), linear-gradient(150deg, #2a1a52 0%, #0b0716 80%)",
                    }}
                  >
                    <div
                      className="pointer-events-none absolute inset-0 opacity-[0.16] mix-blend-soft-light"
                      style={{ backgroundImage: GRAIN }}
                    />
                    {/* Suggested page lines */}
                    <div className="absolute inset-x-7 top-8 flex flex-col gap-2">
                      <span className="h-1.5 w-2/3 rounded-full bg-white/15" />
                      <span className="h-1.5 w-full rounded-full bg-white/10" />
                      <span className="h-1.5 w-4/5 rounded-full bg-white/10" />
                    </div>
                    <span className="absolute right-4 top-4 rounded-md bg-[color:var(--amber-500)] px-2 py-0.5 text-label font-bold uppercase tracking-[0.1em] text-ink">
                      {doc.format}
                    </span>
                    <span className="absolute inset-0 grid place-items-center pt-8 text-white/90 transition-transform duration-500 group-hover:scale-105">
                      {createElement(getIcon(doc.icon), {
                        size: 46,
                        strokeWidth: 1.25,
                        "aria-hidden": true,
                      })}
                    </span>
                  </div>

                  {/* Details */}
                  <div className="min-w-0">
                    <Badge tone="brand">{doc.type}</Badge>
                    <h3 className="mt-3 text-h3 font-bold leading-snug tracking-tight text-ink">
                      {doc.title}
                    </h3>
                    <p className="mt-2 max-w-prose text-body text-secondary">{doc.description}</p>
                    <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-caption font-medium text-muted">
                      <span className="inline-flex items-center gap-1.5">
                        <FileText size={15} aria-hidden />
                        {doc.format}
                      </span>
                      <span aria-hidden className="text-muted/50">
                        ·
                      </span>
                      <span className="tabular-nums">{doc.size}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex shrink-0 flex-col gap-2.5 sm:flex-row md:flex-col md:items-stretch">
                    <a
                      href={doc.file}
                      download
                      className={DOWNLOAD_BTN}
                      aria-label={`Download ${doc.title} (${doc.format}, ${doc.size})`}
                    >
                      <Download size={18} aria-hidden />
                      Download
                    </a>
                    <a
                      href={doc.file}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={PREVIEW_BTN}
                      aria-label={`Preview ${doc.title} in a new tab`}
                    >
                      Preview
                    </a>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section pt-0">
        <div className="container-site">
          <Reveal>
            <div
              className="relative overflow-hidden rounded-[2.5rem] px-6 py-10 md:px-12 md:py-12"
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
                  <p className="eyebrow !text-white/70">Need more detail?</p>
                  <h2 className="mt-4 text-balance pb-[0.06em] text-h2 font-bold text-white">
                    Looking for something{" "}
                    <span className="font-playfair font-light text-[color:var(--amber-500)]">
                      specific?
                    </span>
                  </h2>
                  <p className="mt-4 text-body-lg text-white/80">
                    Tell us your use case and we will send the right datasheets, a tailored walkthrough
                    or a working demo of the platform.
                  </p>
                </div>
                <Button
                  href="/contact"
                  size="lg"
                  withArrow
                  className="!bg-white !text-ink !shadow-none hover:!bg-accent hover:!text-ink"
                >
                  Talk to us
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
