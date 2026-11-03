import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Pre-footer conversion band: dark full-width, one focused message, two CTAs.
 * The card is the page's one full field of logo vermilion, mirroring the logo
 * suite's "Color BG" lockup. Text is ink, not white: ink on #EB5435 is 5:1,
 * white is 3.6:1 and is kept for the large display accent only.
 */
export function CtaBand() {
  return (
    <section data-nav-theme="dark" className="bg-ink">
      <div className="container-site section">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2.5rem] bg-accent px-6 py-10 text-center text-ink shadow-2xl shadow-[rgba(235,84,53,0.22)] md:px-14 md:py-14">
            {/* Logomark supergraphic: tone-on-tone, cropped by the card edge */}
            <Image
              src="/logomark-white.svg"
              alt=""
              aria-hidden
              width={240}
              height={440}
              className="pointer-events-none absolute -bottom-[18%] -right-[4%] h-[135%] w-auto opacity-[0.14] max-md:opacity-[0.08]"
            />
            {/* Soft light bloom for depth */}
            <div
              aria-hidden
              className="pointer-events-none absolute -left-[10%] -top-[40%] h-[420px] w-[420px] rounded-full blur-[90px]"
              style={{ background: "rgba(255,255,255,0.22)" }}
            />

            <div className="relative z-10">
              <p className="eyebrow !text-ink">Ready to go live</p>
              <h2 className="mt-4 text-balance pb-[0.18em] text-h1 font-medium tracking-tighter text-ink">
                See it on{" "}
                <span className="font-playfair font-light text-white">your data</span>
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-body-lg text-ink">
                Most lending platforms take 12 to 18 months to deploy. PhotonMatters goes live in
                8 weeks, with your products, your rules, your market.
              </p>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <Button
                  href="/contact"
                  size="lg"
                  withArrow
                  className="!bg-ink !text-white !shadow-none hover:!bg-white hover:!text-ink"
                >
                  Book a demo
                </Button>
                <Button
                  href="/solutions"
                  size="lg"
                  variant="secondary"
                  className="!border-ink/30 hover:!bg-ink/[0.08]"
                >
                  Explore solutions
                </Button>
              </div>

              <dl className="mx-auto mt-12 flex max-w-2xl flex-wrap items-center justify-center gap-x-10 gap-y-4 border-t border-ink/15 pt-8">
                {[
                  { value: "8 weeks", label: "Average go-live" },
                  { value: "99.9%", label: "Platform availability" },
                  { value: "250k+/hr", label: "Requests at peak" },
                ].map((s) => (
                  <div key={s.label} className="text-center">
                    <dt className="text-h3 font-bold tabular-nums">{s.value}</dt>
                    <dd className="mt-0.5 text-caption">{s.label}</dd>
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
