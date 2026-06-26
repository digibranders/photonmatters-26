import Image from "next/image";
import Link from "next/link";
import { Zap, Database, ShieldCheck } from "lucide-react";
import { Hero } from "@/components/home/Hero";
import { SolutionCard } from "@/components/home/SolutionCard";
import { CtaBand } from "@/components/home/CtaBand";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Stat } from "@/components/ui/Stat";
import { getIcon } from "@/lib/icons";
import { SOLUTIONS, GSM, PLATFORM_STATS, MARKETS } from "@/lib/site";

const GsmIcon = getIcon(GSM.icon);

const AI_FEATURES = [
  { icon: Zap, title: "Real-time decisioning", body: "Sub-second approvals at 250k+ requests/hour." },
  { icon: Database, title: "Alternative data scoring", body: "Telco, cashflow and device signals for the unbanked." },
  { icon: ShieldCheck, title: "Explainable & compliant", body: "Every decision is auditable, with reason codes built in." },
];

const INDUSTRIES = [
  {
    name: "Banks",
    body: "Launch digital-first credit without legacy core constraints.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Nedbank_regional_office_in_Cape_Town%2C_South_Africa.jpg/1280px-Nedbank_regional_office_in_Cape_Town%2C_South_Africa.jpg",
  },
  {
    name: "NBFCs & Lenders",
    body: "Scale alternative lending with configurable, compliant rails.",
    image:
      "https://images.pexels.com/photos/7654401/pexels-photo-7654401.jpeg?auto=compress&cs=tinysrgb&w=1100",
  },
  {
    name: "Telecom Operators",
    body: "Turn subscribers into a financial-services base — airtime to credit.",
    image:
      "https://images.pexels.com/photos/36359722/pexels-photo-36359722.jpeg?auto=compress&cs=tinysrgb&w=1100",
  },
];

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* ── Stats band ─────────────────────────────────────────────────────── */}
      <section className="section border-b border-line bg-sunken">
        <div className="container-site grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-5 lg:gap-x-0">
          {PLATFORM_STATS.map((s, i) => (
            <Reveal
              key={s.label}
              index={i}
              className={`lg:px-6 ${i === 0 ? "lg:pl-0" : "lg:border-l lg:border-line"}`}
            >
              <Stat value={s.value} label={s.label} size="sm" />
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Solutions ──────────────────────────────────────────────────────── */}
      <section className="section relative overflow-hidden">
        {/* Subtle ambient blue glow — per Stripe/Linear reference pattern */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
          style={{ background: "var(--ambient-blue)" }}
        />
        <div className="container-site">
          <SectionHeader
            title="One modular core for the entire credit lifecycle."
            subtitle="API-first, AI-native modules that run the journey end to end — originate, manage, score, collect and reconcile — on-premises or in the cloud."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {SOLUTIONS.map((s, i) => (
              <Reveal key={s.slug} index={i % 3}>
                <SolutionCard
                  href={`/solutions/${s.slug}`}
                  icon={getIcon(s.icon)}
                  name={s.name}
                  blurb={s.blurb}
                />
              </Reveal>
            ))}
            {/* GSM — accent treatment for the new division */}
            <Reveal index={1}>
              <SolutionCard
                href={GSM.href}
                icon={GsmIcon}
                name="GSM · Missed Call & Collect Call"
                blurb={GSM.blurb}
                badge="New"
                accent
              />
            </Reveal>
            {/* Dark CTA card — pinned as the grid's final item */}
            <Reveal index={2}>
              <div className="flex h-full flex-col justify-between rounded-xl bg-ink p-6 text-white">
                <h3 className="text-h3 font-bold leading-snug">
                  One platform.
                  <br />
                  Every credit journey.
                </h3>
                <p className="mt-3 text-caption text-[color:var(--color-text-on-dark-muted)]">
                  Mix and match modules, or run the full stack. API-first and configurable to
                  your market.
                </p>
                <div className="mt-6">
                  <Button href="/solutions" size="sm" withArrow>
                    See all solutions
                  </Button>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── AI band — dark ─────────────────────────────────────────────────── */}
      <section className="section-lg bg-ink text-white">
        <div className="container-site grid gap-12 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <SectionHeader
              tone="dark"
              title="AI that decides, explains, and gets smarter."
              subtitle="Every loan is underwritten, priced, reconciled and collected by models that combine bureau, alternative and behavioural data — with full explainability for regulators and risk teams."
            />
            <div className="mt-8">
              <Button href="/solutions/credit-scoring" variant="link" tone="dark" withArrow>
                See how scoring works
              </Button>
            </div>
          </Reveal>
          <div className="grid gap-4">
            {AI_FEATURES.map((f, i) => (
              <Reveal key={f.title} index={i}>
                <div className="flex gap-4 rounded-xl border border-line-on-dark bg-white/[0.04] p-5">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/[0.08] text-[color:var(--blue-400)]">
                    <f.icon size={20} aria-hidden />
                  </span>
                  <div>
                    <h3 className="text-body font-semibold text-white">{f.title}</h3>
                    <p className="mt-1 text-caption text-[color:var(--color-text-on-dark-muted)]">
                      {f.body}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Industries ─────────────────────────────────────────────────────── */}
      <section className="section bg-sunken">
        <div className="container-site">
          <SectionHeader
            title="Built for the institutions that move credit."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {INDUSTRIES.map((ind, i) => (
              <Reveal key={ind.name} index={i}>
                <Link
                  href="/industries"
                  className="group/card block overflow-hidden rounded-xl border border-line bg-surface transition-all duration-200 hover:-translate-y-0.5 hover:border-line-strong hover:shadow-[0_1px_2px_rgba(14,26,43,0.04),0_16px_34px_-18px_rgba(14,26,43,0.22)] cursor-pointer"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={ind.image}
                      alt={ind.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover/card:scale-[1.04]"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-h3 font-bold text-ink">{ind.name}</h3>
                    <p className="mt-2 text-caption leading-relaxed text-secondary">{ind.body}</p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Markets ────────────────────────────────────────────────────────── */}
      <section className="section">
        <div className="container-site">
          <SectionHeader
            align="center"
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
                <Link
                  href="/industries"
                  className="group/card flex h-full flex-col rounded-xl border border-line bg-surface p-7 transition-all duration-200 hover:-translate-y-0.5 hover:border-line-strong hover:shadow-[0_1px_2px_rgba(14,26,43,0.04),0_16px_34px_-18px_rgba(14,26,43,0.22)] cursor-pointer"
                >
                  <h3 className="text-h3 font-bold text-primary-strong">{m.name}</h3>
                  <p className="mt-3 flex-grow text-body text-secondary">{m.description}</p>
                  <span className="mt-5 text-caption font-semibold text-primary-strong opacity-0 transition-opacity duration-200 group-hover/card:opacity-100">
                    Learn more →
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Human impact ───────────────────────────────────────────────────── */}
      <section className="section-lg bg-sunken">
        <div className="container-site grid gap-12 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl ring-1 ring-line">
              <Image
                src="https://images.pexels.com/photos/27553169/pexels-photo-27553169.jpeg?auto=compress&cs=tinysrgb&w=1280"
                alt="Street commerce in Accra, Ghana"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="eyebrow">The last mile</p>
            <h2 className="mt-4 text-h2 font-bold text-balance text-ink">
              1.4 billion adults are still{" "}
              <span className="font-playfair text-primary-strong">locked out of finance</span>.
            </h2>
            <p className="measure mt-6 text-body-lg text-secondary">
              Most of them are not unbankable — they are just unseen by legacy credit models built
              for paperwork and payslips. PhotonMatters reads the signals the old system ignores:
              mobile usage, airtime, cashflow and repayment behaviour — so a first fair loan is
              possible with nothing but a phone.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-6">
              <Stat value="1.4B" label="adults still unbanked worldwide" />
              <Stat value="1 phone" label="all it takes to access credit on our platform" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Pre-footer CTA band ────────────────────────────────────────────── */}
      <CtaBand />
    </>
  );
}
