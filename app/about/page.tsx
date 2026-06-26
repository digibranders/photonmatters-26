import Image from "next/image";
import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { Badge } from "@/components/ui/Badge";
import { MARKETS, OFFICES } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "PhotonMatters is building AI-native lending technology to bank the people legacy systems forgot, across Africa, India and the Middle East.",
};

const VALUES = [
  { title: "Built to Disrupt", body: "We challenge the assumptions baked into legacy credit. AI-native from the first line of code, we replace paperwork and gut-feel with explainable, data-driven decisions." },
  { title: "Engineered for Scale", body: "From a $50 micro-loan to enterprise portfolios — 250k+ requests an hour, 99.9% availability, and an 8-week path from kickoff to go-live in any market." },
  { title: "Designed to Empower", body: "Every product is built to put credit in the hands of the people and institutions the system overlooked — human-centered, transparent and fair by design." },
];

const LEADERS = [
  { initials: "TJ", name: "Tahseen Jamal", role: "Founder & CEO", bio: "23+ years in fintech and digital platforms. B.Tech, ISB MBA." },
  { initials: "RA", name: "Rohit Ahuja", role: "Founder & CCO", bio: "25+ years in business development and IT consulting; ex-Accenture. MBA, Certified Cloud Practitioner." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Our story"
        title="We’re banking the people the system forgot."
        subtitle="PhotonMatters is building AI-native lending technology for the institutions that move credit — banks, NBFCs and telecom operators — across Africa, India and the Middle East."
        image="https://images.pexels.com/photos/30688593/pexels-photo-30688593.jpeg?auto=compress&cs=tinysrgb&w=1280"
      />

      {/* Mission */}
      <section className="section">
        <div className="container-site grid gap-12 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <h2 className="text-h2 font-bold text-balance text-ink">
              Unleashing a <span className="text-primary-strong">global revolution</span> in lending
              technology.
            </h2>
            <p className="mt-5 text-body text-secondary">
              We exist to unleash a global revolution in how credit is built and delivered. Legacy
              systems were designed for paperwork, payslips and the people the formal economy already
              serves — leaving billions unseen. We’re replacing that with an AI-native platform that
              reads the signals the old models ignore.
            </p>
            <p className="mt-4 text-body text-secondary">
              Our purpose is to empower financial institutions to scale, innovate and deliver
              human-centered credit — a first fair loan to a market vendor, a working-capital line to
              a small business, a transparent decision to a regulator. Technology that reaches the
              last mile, on terms people can trust.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
              <Image
                src="https://images.pexels.com/photos/3894376/pexels-photo-3894376.jpeg?auto=compress&cs=tinysrgb&w=1280"
                alt="Building human-centered credit, together"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Values */}
      <section className="section bg-sunken">
        <div className="container-site">
          <SectionHeader title="Built to Disrupt. Engineered for Scale. Designed to Empower." />
          <div className="mt-14 grid gap-x-10 gap-y-10 md:grid-cols-3">
            {VALUES.map((v, i) => (
              <Reveal key={v.title} index={i}>
                <div className="border-t border-line pt-6">
                  <h3 className="text-h3 font-bold text-ink">{v.title}</h3>
                  <p className="mt-3 text-body text-secondary">{v.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="section">
        <div className="container-site">
          <SectionHeader title="Founders who’ve spent decades building this." />
          <div className="mt-12 grid gap-10 md:grid-cols-2">
            {LEADERS.map((l, i) => (
              <Reveal key={l.name} index={i}>
                <div className="flex items-start gap-5">
                  <span
                    aria-hidden
                    className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-blue-50 text-h3 font-bold text-primary-strong"
                  >
                    {l.initials}
                  </span>
                  <div>
                    <h3 className="text-h3 font-bold text-ink">{l.name}</h3>
                    <p className="mt-0.5 text-caption font-semibold text-primary-strong">{l.role}</p>
                    <p className="mt-3 text-body text-secondary">{l.bio}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Markets */}
      <section className="section bg-sunken">
        <div className="container-site">
          <SectionHeader title="Born for emerging markets." />
          <div className="mt-12 grid gap-x-10 gap-y-10 md:grid-cols-3">
            {MARKETS.map((m, i) => (
              <Reveal key={m.name} index={i}>
                <div className="border-t border-line pt-6">
                  <h3 className="text-h2 font-extrabold text-ink">{m.name}</h3>
                  <p className="mt-3 text-body text-secondary">{m.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Global presence */}
      <section className="section-lg bg-ink text-white">
        <div className="container-site">
          <SectionHeader tone="dark" title="Four offices. Three regions. One platform." />
          <div className="mt-12 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
            {OFFICES.map((o, i) => (
              <Reveal key={o.country} index={i}>
                <div className="border-t border-line-on-dark pt-6">
                  <div className="flex items-center gap-2">
                    <h3 className="text-h3 font-bold text-white">{o.country}</h3>
                    {o.badge ? <Badge tone="onDark">{o.badge}</Badge> : null}
                  </div>
                  <p className="mt-1 text-body font-medium text-[color:var(--blue-400)]">{o.city}</p>
                  <p className="mt-3 text-caption text-[color:var(--color-text-on-dark-muted)]">{o.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
