import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Pre-footer conversion band — dark full-width, one focused message, two CTAs.
 * Pattern: Enterprise Gateway (ui-ux-pro-max) + Stripe/Linear/Vercel reference.
 * Placed between the last content section and <Footer> on every page that needs it.
 */
export function CtaBand() {
  return (
    <section className="bg-ink">
      {/* Top hairline separates from any preceding light section */}
      <div className="h-px bg-line-on-dark" />

      <div className="container-site section text-center">
        <Reveal>
          <p className="eyebrow text-[color:var(--color-text-on-dark-muted)]">
            Ready to go live
          </p>
          <h2 className="mt-4 text-h1 font-extrabold text-white text-balance">
            See it on{" "}
            <span className="font-playfair text-[color:var(--blue-400)]">your data</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-body-lg text-[color:var(--color-text-on-dark-muted)]">
            Most lending platforms take 12–18 months to deploy. PhotonMatters goes live in 8
            weeks — with your products, your rules, your market.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button href="/contact" size="lg" withArrow>
              Book a demo
            </Button>
            <Button href="/solutions" size="lg" variant="secondary" tone="dark">
              Explore solutions
            </Button>
          </div>

          <dl className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 border-t border-line-on-dark pt-8">
            {[
              { value: "8 weeks", label: "Average go-live" },
              { value: "99.9%", label: "Platform availability" },
              { value: "250k+/hr", label: "Requests at peak" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <dt className="text-h3 font-bold text-white tabular-nums">{s.value}</dt>
                <dd className="mt-0.5 text-caption text-[color:var(--color-text-on-dark-muted)]">
                  {s.label}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
