import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Pre-footer conversion band — dark full-width, one focused message, two CTAs.
 * Pattern: Enterprise Gateway (ui-ux-pro-max) + Stripe/Linear/Vercel reference.
 * Placed between the last content section and <Footer> on every page that needs it.
 */
export function CtaBand() {
  return (
    <section data-nav-theme="dark" className="bg-ink">
      <div className="container-site section">
        <Reveal>
          {/* Gradient CTA card — eterna signature (purple → deep purple) */}
          <div
            className="relative overflow-hidden rounded-[2.5rem] px-8 py-16 text-center shadow-2xl shadow-[rgba(126,73,242,0.25)] md:px-16 md:py-20"
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

            <div className="relative z-10">
              <p className="eyebrow !text-white/70">Ready to go live</p>
              <h2 className="mt-4 text-balance bg-gradient-to-b from-white to-white/55 bg-clip-text pb-[0.18em] text-h1 font-medium tracking-tighter text-transparent">
                See it on{" "}
                <span className="font-playfair font-light text-[color:var(--amber-500)]">
                  your data
                </span>
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-body-lg text-white/80">
                Most lending platforms take 12–18 months to deploy. PhotonMatters goes live in 8
                weeks — with your products, your rules, your market.
              </p>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <Button
                  href="/contact"
                  size="lg"
                  withArrow
                  className="!bg-white !text-ink !shadow-none hover:!bg-accent hover:!text-ink"
                >
                  Book a demo
                </Button>
                <Button
                  href="/solutions"
                  size="lg"
                  variant="secondary"
                  tone="dark"
                  className="!border-white/30 hover:!bg-white/10"
                >
                  Explore solutions
                </Button>
              </div>

              <dl className="mx-auto mt-12 flex max-w-2xl flex-wrap items-center justify-center gap-x-10 gap-y-4 border-t border-white/15 pt-8">
                {[
                  { value: "8 weeks", label: "Average go-live" },
                  { value: "99.9%", label: "Platform availability" },
                  { value: "250k+/hr", label: "Requests at peak" },
                ].map((s) => (
                  <div key={s.label} className="text-center">
                    <dt className="text-h3 font-bold text-white tabular-nums">{s.value}</dt>
                    <dd className="mt-0.5 text-caption text-white/70">{s.label}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
