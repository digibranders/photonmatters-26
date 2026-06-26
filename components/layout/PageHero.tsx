import Image from "next/image";
import { cn } from "@/lib/cn";

interface PageHeroProps {
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  image?: string;
  imageAlt?: string;
}

/**
 * Light, type-forward inner-page hero. One ambient blue gradient in the corner;
 * optional contained image (never full-bleed dark). Type carries the page.
 */
export function PageHero({ eyebrow, title, subtitle, image, imageAlt = "" }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden">
      {/* One ambient gradient, confined to the top-right */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{ background: "var(--ambient-blue)" }}
      />
      <div
        className={cn(
          "container-site pt-32 pb-[var(--section-y)] lg:pt-40",
          image && "grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center",
        )}
      >
        <div className="max-w-2xl">
          {eyebrow ? <span className="eyebrow mb-5">{eyebrow}</span> : null}
          <h1 className="text-h1 font-extrabold text-balance text-ink">{title}</h1>
          {subtitle ? (
            <p className="measure mt-6 text-body-lg text-secondary">{subtitle}</p>
          ) : null}
        </div>
        {image ? (
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl lg:aspect-[5/4]">
            <Image
              src={image}
              alt={imageAlt}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 48vw"
              className="object-cover"
            />
          </div>
        ) : null}
      </div>
    </section>
  );
}
