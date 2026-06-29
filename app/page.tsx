import Image from "next/image";
import Link from "next/link";
import { Zap, Database, ShieldCheck } from "lucide-react";
import { Hero } from "@/components/home/Hero";
import { SolutionCard } from "@/components/home/SolutionCard";
import { Testimonials } from "@/components/home/Testimonials";
import { GlobalPresence } from "@/components/home/GlobalPresence";
import { CtaBand } from "@/components/home/CtaBand";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Stat } from "@/components/ui/Stat";
import { getIcon } from "@/lib/icons";
import { SOLUTIONS, GSM, PLATFORM_STATS, MARKETS } from "@/lib/site";

const GsmIcon = getIcon(GSM.icon);

const SOLUTION_TAGS: Record<string, string> = {
  "loan-origination": "LOS",
  "loan-management": "LMS",
  "credit-scoring": "AI",
  "debt-collection": "Recovery",
  "reconciliation-ai": "Reconcile",
  "collection-marketing-ai": "AI Mktg",
  "campaign-management": "Growth",
};

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
    body: "Turn subscribers into a financial-services base. Airtime to credit.",
    image:
      "https://images.pexels.com/photos/36359722/pexels-photo-36359722.jpeg?auto=compress&cs=tinysrgb&w=1100",
  },
];

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* ── Stats band ─────────────────────────────────────────────────────── */}
      <section className="border-b border-line bg-surface py-10">
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
      <section className="section bg-sunken">
        <div className="container-site">
          <SectionHeader
            eyebrow="Solutions"
            title="One modular core for the entire credit lifecycle."
            subtitle="API-first, AI-native modules that run the journey end to end: originate, manage, score, collect and reconcile. On-premises or in the cloud."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {SOLUTIONS.map((s, i) => (
              <Reveal key={s.slug} index={i % 3}>
                <SolutionCard
                  href={`/solutions/${s.slug}`}
                  icon={getIcon(s.icon)}
                  name={s.name}
                  blurb={s.blurb}
                  tag={SOLUTION_TAGS[s.slug]}
                />
              </Reveal>
            ))}
            {/* GSM — new division, dark image variant */}
            <Reveal index={1}>
              <SolutionCard
                href={GSM.href}
                icon={GsmIcon}
                name="GSM · Missed Call & Collect Call"
                blurb={GSM.blurb}
                tag="New"
              />
            </Reveal>
            {/* Dark CTA card — pinned as the grid's final item */}
            <Reveal index={2}>
              <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-3xl bg-ink p-8 text-white">
                {/* Ambient purple/orchid blooms */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-[20%] -top-[30%] h-72 w-72 rounded-full blur-[80px]"
                  style={{ background: "rgba(126,73,242,0.35)" }}
                />
                <div
                  aria-hidden
                  className="pointer-events-none absolute -bottom-[25%] -left-[15%] h-60 w-60 rounded-full blur-[70px]"
                  style={{ background: "rgba(233,162,242,0.18)" }}
                />
                <h3 className="relative z-10 text-h3 font-medium leading-snug tracking-tight">
                  One platform.
                  <br />
                  Every <span className="font-playfair font-light text-[color:var(--blue-400)]">credit journey</span>.
                </h3>
                <p className="relative z-10 mt-3 text-caption text-[color:var(--color-text-on-dark-muted)]">
                  Mix and match modules, or run the full stack. API-first and configurable to
                  your market.
                </p>
                <div className="relative z-10 mt-6">
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
      <section
        data-nav-theme="dark"
        className="section-lg relative overflow-hidden text-white"
        style={{ backgroundColor: "#1A1426" }}
      >
        {/* Eterna ambient blobs — mirrored from revamp Solution.tsx */}
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute -left-[10%] -top-[20%] h-[600px] w-[600px] rounded-full blur-[100px]" style={{ background: "rgba(126,73,242,0.20)" }} />
          <div className="absolute -bottom-[20%] -right-[10%] h-[500px] w-[500px] rounded-full blur-[80px]" style={{ background: "rgba(233,162,242,0.10)" }} />
        </div>
        <div className="container-site grid gap-12 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <SectionHeader
              tone="dark"
              eyebrow="AI Engine"
              title="AI that decides, explains, and gets smarter."
              subtitle="Every loan is underwritten, priced, reconciled and collected by models that combine bureau, alternative and behavioural data. Full explainability for regulators and risk teams."
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
                <div className="flex gap-4 rounded-2xl border border-line-on-dark bg-white/[0.04] p-6 backdrop-blur-sm transition-colors duration-300 hover:border-[color:rgba(126,73,242,0.5)]">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/[0.08] text-[color:var(--blue-400)]">
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
            eyebrow="Industries"
            title="Built for the institutions that move credit."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {INDUSTRIES.map((ind, i) => (
              <Reveal key={ind.name} index={i}>
                <Link
                  href="/industries"
                  className="group/card block overflow-hidden rounded-3xl border border-line bg-surface transition-all duration-300 hover:-translate-y-1 hover:border-line-strong hover:shadow-[0_1px_2px_rgba(26,20,38,0.04),0_18px_40px_-18px_rgba(126,73,242,0.28)] cursor-pointer"
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
                <Link
                  href="/industries"
                  className="group/card relative flex h-full flex-col overflow-hidden rounded-[2rem] border border-line bg-surface p-8 transition-all duration-300 hover:-translate-y-1 hover:border-line-strong hover:shadow-[0_1px_2px_rgba(26,20,38,0.04),0_18px_40px_-18px_rgba(126,73,242,0.28)] cursor-pointer"
                >
                  {/* Corner bloom — eterna bento accent */}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -bottom-12 -right-12 h-48 w-48 rounded-full opacity-60 blur-2xl transition-transform duration-700 group-hover/card:scale-110"
                    style={{ background: "radial-gradient(circle, rgba(126,73,242,0.14), transparent 70%)" }}
                  />
                  <h3 className="relative z-10 text-h3 font-bold text-primary-strong">{m.name}</h3>
                  <p className="relative z-10 mt-3 flex-grow text-body text-secondary">{m.description}</p>
                  <span className="relative z-10 mt-5 text-caption font-semibold text-primary-strong opacity-0 transition-opacity duration-200 group-hover/card:opacity-100">
                    Learn more →
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials — client voices ───────────────────────────────────── */}
      <Testimonials />

      {/* ── Human impact ───────────────────────────────────────────────────── */}
      <section className="section-lg bg-sunken">
        <div className="container-site grid gap-12 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl ring-1 ring-line">
              <Image
                src="/hero/section-last-mile.webp"
                alt="A first mobile-money loan approved on a phone at a bustling African market"
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
              Most of them are not unbankable. They&apos;re just unseen by legacy credit models built
              for paperwork and payslips. PhotonMatters reads the signals the old system ignores:
              mobile usage, airtime, cashflow and repayment behaviour. A first fair loan is
              possible with nothing but a phone.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-6">
              <Stat value="1.4B" label="adults still unbanked worldwide" />
              <Stat value="1 phone" label="all it takes to access credit on our platform" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Global presence map ────────────────────────────────────────────── */}
      <GlobalPresence />

      {/* ── Pre-footer CTA band ────────────────────────────────────────────── */}
      <CtaBand />
    </>
  );
}
