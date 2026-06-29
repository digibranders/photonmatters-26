import Image from "next/image";
import { Button } from "@/components/ui/Button";

interface SolutionHeroProps {
  eyebrow: string;
  title: React.ReactNode;
  subtitle: React.ReactNode;
  image: string;
  imageAlt?: string;
}

/**
 * Solution hero — a tinted lavender section with an ambient mesh, a category
 * pill, the headline, a single primary CTA, and the photo in a rounded panel.
 * Richer than the shared PageHero, but copy stays source-faithful.
 */
export function SolutionHero({ eyebrow, title, subtitle, image, imageAlt = "" }: SolutionHeroProps) {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, var(--color-surface-sunken) 0%, var(--color-surface-sunken) 45%, var(--color-surface-canvas) 100%)",
      }}
    >
      {/* Ambient eterna mesh */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute -right-[8%] -top-[12%] h-[520px] w-[520px] rounded-full blur-[120px]"
          style={{ background: "rgba(126,73,242,0.18)" }}
        />
        <div
          className="absolute -left-[10%] top-[38%] h-[420px] w-[420px] rounded-full blur-[120px]"
          style={{ background: "rgba(233,162,242,0.12)" }}
        />
      </div>

      <div className="container-site grid items-center gap-12 pt-32 pb-14 lg:grid-cols-[1.05fr_0.95fr] lg:pt-36 lg:pb-16">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3.5 py-1.5 text-label font-semibold uppercase tracking-[0.08em] text-primary-strong">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden />
            {eyebrow}
          </span>

          <h1 className="mt-6 text-h1 font-extrabold text-balance text-ink">{title}</h1>

          <p className="measure mt-6 text-body-lg text-secondary">{subtitle}</p>

          <div className="mt-8">
            <Button href="/contact" size="lg" withArrow>
              Book a demo
            </Button>
          </div>
        </div>

        <div className="relative">
          {/* Corner bloom behind the panel */}
          <div
            aria-hidden
            className="pointer-events-none absolute -right-8 -top-8 h-72 w-72 rounded-full opacity-70 blur-3xl"
            style={{ background: "radial-gradient(circle, rgba(126,73,242,0.18), transparent 70%)" }}
          />
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl ring-1 ring-line lg:aspect-[5/4]">
            <Image
              src={image}
              alt={imageAlt}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 48vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
