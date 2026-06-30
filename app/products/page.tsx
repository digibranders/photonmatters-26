import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { HeroDark } from "@/components/layout/HeroDark";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { getIcon } from "@/lib/icons";
import { PRODUCT_LIST } from "@/lib/products-data";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Lending reimagined for every market and every need — design, launch and manage micro, consumer, commercial and supply-chain lending products on one AI-native platform.",
};

export default function ProductsHubPage() {
  return (
    <>
      <HeroDark
        eyebrow="The Products"
        title="Lending reimagined for every"
        titleAccent="market, every need."
        subtitle="The platform adapts to diverse lending markets — from street vendors to fintechs. Design, launch and manage lending products built for your market, your customers and your growth."
        image="https://images.pexels.com/photos/30688593/pexels-photo-30688593.jpeg?auto=compress&cs=tinysrgb&w=1920"
        imageAlt="Lending for every market and every need"
        primary={{ label: "Book a demo", href: "/contact" }}
        secondary={{ label: "See solutions", href: "/solutions" }}
      />

      {/* Products grid */}
      <section className="section bg-sunken">
        <div className="container-site">
          <SectionHeader
            eyebrow="Products"
            title="Four product families, one platform."
            subtitle="Micro and consumer credit for everyday needs, commercial and supply-chain finance for industry — each available standalone or as part of the full stack."
          />
          <div className="mt-14 grid gap-5 md:grid-cols-2">
            {PRODUCT_LIST.map((p, i) => {
              const Icon = getIcon(p.icon);
              return (
                <Reveal key={p.slug} index={i % 2}>
                  <Link
                    href={`/products/${p.slug}`}
                    className="group/card relative flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-surface p-8 transition-all duration-300 hover:-translate-y-1 hover:border-line-strong hover:shadow-[0_1px_2px_rgba(26,20,38,0.04),0_18px_40px_-18px_rgba(126,73,242,0.28)]"
                  >
                    <div
                      aria-hidden
                      className="pointer-events-none absolute -bottom-16 -right-16 h-56 w-56 rounded-full opacity-70 blur-2xl transition-transform duration-700 group-hover/card:scale-110"
                      style={{ background: "radial-gradient(circle, rgba(126,73,242,0.13), transparent 70%)" }}
                    />
                    <span className="relative z-10 flex h-12 w-12 items-center justify-center rounded-2xl bg-[color:var(--blue-50)] text-primary">
                      <Icon size={22} aria-hidden />
                    </span>
                    <h3 className="relative z-10 mt-6 text-h3 font-bold tracking-tight text-ink">{p.name}</h3>
                    <p className="relative z-10 mt-2.5 flex-grow text-body leading-relaxed text-secondary">{p.blurb}</p>
                    <span className="relative z-10 mt-6 inline-flex items-center gap-1.5 text-caption font-semibold text-primary-strong">
                      Explore product
                      <ArrowRight size={15} aria-hidden className="transition-transform duration-200 group-hover/card:translate-x-1" />
                    </span>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Closing — gradient CTA finale */}
      <section className="section">
        <div className="container-site">
          <Reveal>
            <div
              className="relative overflow-hidden rounded-[2.5rem] px-8 py-16 text-center shadow-2xl shadow-[rgba(126,73,242,0.25)] md:px-16 md:py-20"
              style={{ background: "linear-gradient(110deg, var(--color-primary) 0%, var(--blue-600) 100%)" }}
            >
              <div
                aria-hidden
                className="pointer-events-none absolute -right-[10%] -top-[30%] h-[420px] w-[420px] rounded-full blur-[90px]"
                style={{ background: "rgba(233,162,242,0.30)" }}
              />
              <div className="relative z-10">
                <p className="eyebrow !text-white/70">One platform</p>
                <h2 className="mx-auto mt-4 max-w-2xl text-balance bg-gradient-to-b from-white to-white/55 bg-clip-text pb-[0.18em] text-h1 font-bold text-transparent">
                  Infinite{" "}
                  <span className="font-playfair font-light text-[color:var(--amber-500)]">possibilities</span>.
                </h2>
                <p className="mx-auto mt-5 max-w-xl text-body-lg text-white/80">
                  Because no matter the borrower, every loan begins with belief — and ends in
                  progress.
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
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
