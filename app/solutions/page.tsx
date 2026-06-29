import type { Metadata } from "next";
import { HeroDark } from "@/components/layout/HeroDark";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SolutionCard } from "@/components/home/SolutionCard";
import { getIcon } from "@/lib/icons";
import { SOLUTIONS } from "@/lib/site";

export const metadata: Metadata = {
  title: "Solutions",
  description:
    "The complete lending and collections stack. Modular, API-first, AI-native modules for banks, NBFCs and telecom operators.",
};

const HUB_BLURBS: Record<string, string> = {
  "loan-origination": "Digital onboarding, KYC/AML and AI-assisted approvals across every product.",
  "loan-management": "The full lifecycle from disbursement to closure. Schedules, accruals and payoffs.",
  "credit-scoring": "Explainable AI scores from bureau, telco, cashflow and alternative data.",
  "debt-collection": "AI-driven recovery that segments, prioritises and automates outreach.",
  "reconciliation-ai": "Auto-matches payments, ledgers and settlements. Flags breaks before they age.",
  "collection-marketing-ai": "Behaviour-driven nudges and offers that turn reminders into repayments.",
  "campaign-management": "Design, target and automate lending campaigns across SMS, WhatsApp, email and voice.",
};

const GSM_FEATURES = [
  { icon: "BellRing", title: "Missed Call", body: "Free verification, opt-in and reminders triggered by a single ring." },
  { icon: "PhoneCall", title: "Collect Call", body: "Customers reach support and confirm repayments at zero cost to them." },
  { icon: "RadioTower", title: "Operator-grade scale", body: "Carrier integration that handles national subscriber volumes." },
];

const FIT_CARDS = [
  { title: "One connected data flow", body: "Data moves cleanly from origination → management → scoring → collections → reconciliation, with no batch handoffs or duplicate keying." },
  { title: "API-first by design", body: "Every module exposes clean REST APIs and webhooks, so it slots into your core, bureau, payment and channel systems." },
  { title: "On-prem or cloud", body: "Deploy in your own data centre, your private cloud or ours. Your data residency and compliance rules, your choice." },
  { title: "AI-native throughout", body: "Scoring, collections and reconciliation are driven by explainable models that learn from every loan across the stack." },
];

export default function SolutionsHubPage() {
  return (
    <>
      <HeroDark
        eyebrow="The Platform"
        title="The complete lending &"
        titleAccent="collections stack."
        subtitle="Modular, API-first and AI-native. Run a single module or the full credit lifecycle: originate, manage, score, collect and reconcile. On-premises or in the cloud."
        image="https://images.pexels.com/photos/577195/pexels-photo-577195.jpeg?auto=compress&cs=tinysrgb&w=1920"
        imageAlt="The complete lending and collections platform"
        primary={{ label: "Book a demo", href: "/contact" }}
      />

      {/* Solutions grid — bento */}
      <section className="section bg-sunken">
        <div className="container-site">
          <SectionHeader
            eyebrow="Solutions"
            title="Every module, one modular core."
            subtitle="Seven AI-native products that cover the credit journey end to end. Each available standalone or as part of the full stack."
          />
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {SOLUTIONS.map((s, i) => (
              <Reveal key={s.slug} index={i % 3}>
                <SolutionCard
                  href={`/solutions/${s.slug}`}
                  icon={getIcon(s.icon)}
                  name={s.name}
                  blurb={HUB_BLURBS[s.slug]}
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* GSM band — dark with ambient blooms + glass cards */}
      <section
        data-nav-theme="dark"
        className="section-lg relative overflow-hidden text-white"
        style={{ backgroundColor: "#1A1426" }}
      >
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute -left-[10%] -top-[20%] h-[600px] w-[600px] rounded-full blur-[100px]" style={{ background: "rgba(126,73,242,0.20)" }} />
          <div className="absolute -bottom-[20%] -right-[10%] h-[500px] w-[500px] rounded-full blur-[80px]" style={{ background: "rgba(233,162,242,0.10)" }} />
        </div>
        <div className="container-site relative grid gap-12 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <SectionHeader
              tone="dark"
              eyebrow="GSM"
              title={
                <>
                  Missed Call &{" "}
                  <span className="font-playfair font-light text-[color:var(--blue-400)]">
                    Collect Call.
                  </span>
                </>
              }
              subtitle="Zero-cost engagement built straight into the network. Verify subscribers, capture opt-ins and deliver loan reminders with a missed call — and let customers reach you free of charge with collect call. Perfect for thin-airtime markets where every cedi counts."
            />
            <div className="mt-8">
              <Button href="/gsm" size="lg" withArrow>
                Explore GSM services
              </Button>
            </div>
          </Reveal>
          <div className="grid gap-4">
            {GSM_FEATURES.map((f, i) => {
              const Icon = getIcon(f.icon);
              return (
                <Reveal key={f.title} index={i}>
                  <div className="flex gap-4 rounded-2xl border border-line-on-dark bg-white/[0.04] p-6 backdrop-blur-sm transition-colors duration-300 hover:border-[color:rgba(126,73,242,0.5)]">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/[0.08] text-[color:var(--blue-400)]">
                      <Icon size={20} aria-hidden />
                    </span>
                    <div>
                      <h3 className="text-body font-semibold text-white">{f.title}</h3>
                      <p className="mt-1 text-caption text-[color:var(--color-text-on-dark-muted)]">{f.body}</p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* How it fits — bento */}
      <section className="section">
        <div className="container-site">
          <SectionHeader
            eyebrow="One stack"
            title="Run one module, or the full stack."
            subtitle="Start where the pain is and add modules as you grow. Everything shares one data model, so each piece makes the next one smarter."
          />
          <div className="mt-14 grid gap-5 sm:grid-cols-2">
            {FIT_CARDS.map((c, i) => (
              <Reveal key={c.title} index={i % 2}>
                <div
                  className="group relative h-full overflow-hidden rounded-3xl border border-line p-7 transition-all duration-300 hover:-translate-y-1 hover:border-line-strong hover:shadow-[0_1px_2px_rgba(26,20,38,0.04),0_18px_40px_-18px_rgba(126,73,242,0.28)] sm:p-8"
                  style={{ background: "linear-gradient(160deg, #ffffff 0%, var(--navy-50) 100%)" }}
                >
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -bottom-16 -right-16 h-48 w-48 rounded-full opacity-70 blur-2xl transition-transform duration-700 group-hover:scale-110"
                    style={{ background: "radial-gradient(circle, rgba(126,73,242,0.12), transparent 70%)" }}
                  />
                  <h3 className="relative z-10 text-h3 font-bold text-ink">{c.title}</h3>
                  <p className="relative z-10 mt-2.5 text-body text-secondary">{c.body}</p>
                </div>
              </Reveal>
            ))}
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
                <p className="eyebrow !text-white/70">Ready when you are</p>
                <h2 className="mx-auto mt-4 max-w-2xl text-balance bg-gradient-to-b from-white to-white/55 bg-clip-text pb-[0.18em] text-h1 font-bold text-transparent">
                  See the stack on{" "}
                  <span className="font-playfair font-light text-[color:var(--amber-500)]">your data</span>.
                </h2>
                <p className="mx-auto mt-5 max-w-xl text-body-lg text-white/80">
                  Tell us which modules matter most and we&apos;ll show you a working setup tailored to
                  your market in weeks, not quarters.
                </p>
                <div className="mt-8 flex justify-center">
                  <Button
                    href="/contact"
                    size="lg"
                    withArrow
                    className="!bg-white !text-ink !shadow-none hover:!bg-accent hover:!text-ink"
                  >
                    Talk to us
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
