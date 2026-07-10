import type { Metadata } from "next";
import { HeroDark } from "@/components/layout/HeroDark";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { IndustryTabs, type IndustryBlock } from "@/components/industries/IndustryTabs";
import { MARKETS } from "@/lib/site";

export const metadata: Metadata = {
  title: "Industries",
  description:
    "Built for the institutions that move credit: banks, NBFCs and telecom operators across Africa, India and the Middle East.",
};

const BLOCKS: IndustryBlock[] = [
  {
    eyebrow: "Banks",
    heading: "Digital-first credit, free of legacy core constraints.",
    body: "Launch new lending products in weeks instead of quarters. PhotonMatters sits alongside your core, plugging the gaps in origination, scoring and collections without a multi-year migration. Compliance is built in from day one.",
    checklist: [
      { text: "Core-agnostic integration with your existing systems" },
      { text: "8-week go-live from kickoff to production" },
      { text: "Regulatory reporting & full audit trails" },
    ],
    image:
      "/industries/industry1.webp",
    alt: "Modern banking headquarters",
  },
  {
    eyebrow: "NBFCs & Lenders",
    heading: "Scale alternative lending on configurable rails.",
    body: "Build any product construct, score borrowers no one else can see, and protect the book with AI-led collections. PhotonMatters gives lenders the flexibility of a custom stack with the speed and economics of a platform.",
    checklist: [
      { text: "Product builder for any lending construct" },
      { text: "Alt-data scoring for thin-file borrowers" },
      { text: "AI collections to protect the book" },
    ],
    image:
      "/industries/industry2.webp",
    alt: "Lending team at work",
  },
  {
    eyebrow: "Telecom Operators",
    heading: "Turn your subscriber base into a financial-services business.",
    body: "Your subscribers already trust you with airtime and mobile money. Extend that into credit. PhotonMatters layers lending, microloans and device financing onto your network, plus GSM Missed Call & Collect Call to engage every customer at zero cost.",
    checklist: [
      { text: "Airtime & device financing for subscribers" },
      { text: "Microloans delivered entirely via mobile" },
      { text: "Missed Call & Collect Call engagement", href: "/gsm" },
    ],
    image:
      "/industries/industry3.webp",
    alt: "Mobile-money vendor",
  },
];

const INDUSTRY_STATS = [
  { value: "250k+/hr", label: "Requests at peak scale" },
  { value: "8 wks", label: "From kickoff to go-live" },
  { value: "99.9%", label: "Platform availability" },
  { value: "3", label: "Regions: Africa · India · ME" },
];

export default function IndustriesPage() {
  return (
    <>
      <HeroDark
        eyebrow="Who we serve"
        title="Built for the institutions that"
        titleAccent="move credit."
        subtitle="Banks, NBFCs and telecom operators run on PhotonMatters to launch, scale and collect credit across Africa, India and the Middle East."
        image="/industries/hero.webp"
        imageAlt="Institutions that move credit"
        primary={{ label: "Book a demo", href: "/contact" }}
        secondary={{ label: "Explore solutions", href: "/solutions" }}
      />

      <section className="section">
        <div className="container-site">
          <IndustryTabs blocks={BLOCKS} />
        </div>
      </section>

      {/* Markets: premium cards */}
      <section className="section bg-sunken">
        <div className="container-site">
          <SectionHeader
            align="center"
            eyebrow="Markets"
            title={
              <>
                Born for{" "}
                <span className="font-playfair text-primary-strong">emerging markets</span>
              </>
            }
          />
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {MARKETS.map((m, i) => (
              <Reveal key={m.name} index={i}>
                <div className="relative h-full overflow-hidden rounded-[2rem] border border-line bg-surface p-8">
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -bottom-12 -right-12 h-48 w-48 rounded-full opacity-60 blur-2xl"
                    style={{ background: "radial-gradient(circle, rgba(126,73,242,0.14), transparent 70%)" }}
                  />
                  <h3 className="relative z-10 text-h3 font-bold text-primary-strong">{m.name}</h3>
                  <p className="relative z-10 mt-3 text-body text-secondary">{m.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Stats: dark gradient-rail showcase */}
      <section
        data-nav-theme="dark"
        className="section relative overflow-hidden bg-ink text-white"
      >
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute -left-[8%] -top-[30%] h-[520px] w-[520px] rounded-full blur-[100px]" style={{ background: "rgba(126,73,242,0.18)" }} />
          <div className="absolute -bottom-[30%] -right-[8%] h-[460px] w-[460px] rounded-full blur-[80px]" style={{ background: "rgba(233,162,242,0.10)" }} />
        </div>
        <div className="container-site relative">
          <SectionHeader tone="dark" eyebrow="By the numbers" title="Built to run at national scale." />
          <div className="mt-12 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {INDUSTRY_STATS.map((s, i) => (
              <Reveal key={s.label} index={i} className="relative">
                {i > 0 ? (
                  <span
                    aria-hidden
                    className="absolute -left-5 top-0 hidden h-full w-px lg:block"
                    style={{
                      background:
                        "linear-gradient(to bottom, transparent, rgba(126,73,242,0.45) 25%, rgba(233,162,242,0.30) 75%, transparent)",
                    }}
                  />
                ) : null}
                <p className="pb-[0.1em] text-[clamp(1.875rem,1.4rem+1.6vw,2.625rem)] font-bold leading-tight tracking-tight text-white">
                  {s.value}
                </p>
                <p className="mt-2 text-body text-[color:var(--color-text-on-dark-muted)]">{s.label}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
