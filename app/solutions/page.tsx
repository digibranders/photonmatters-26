import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
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
  { title: "Missed Call", body: "Free verification, opt-in and reminders triggered by a single ring." },
  { title: "Collect Call", body: "Customers reach support and confirm repayments at zero cost to them." },
  { title: "Operator-grade scale", body: "Carrier integration that handles national subscriber volumes." },
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
      <PageHero
        eyebrow="The Platform"
        title="The complete lending & collections stack."
        subtitle="Modular, API-first and AI-native. Run a single module or the full credit lifecycle: originate, manage, score, collect and reconcile. On-premises or in the cloud."
        image="https://images.pexels.com/photos/577195/pexels-photo-577195.jpeg?auto=compress&cs=tinysrgb&w=1280"
      />

      {/* Solutions grid */}
      <section className="section">
        <div className="container-site">
          <SectionHeader
            title="Every module, one modular core."
            subtitle="Seven AI-native products that cover the credit journey end to end. Each available standalone or as part of the full stack."
          />
          <div className="mt-14 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {SOLUTIONS.map((s, i) => {
              const Icon = getIcon(s.icon);
              return (
                <Reveal key={s.slug} index={i % 3}>
                  <Link
                    href={`/solutions/${s.slug}`}
                    className="group/btn flex h-full flex-col rounded-xl p-6 transition-colors duration-200 hover:bg-sunken"
                  >
                    <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-blue-50 text-primary">
                      <Icon size={20} aria-hidden />
                    </span>
                    <h3 className="mt-5 text-h3 font-bold text-ink">{s.name}</h3>
                    <p className="mt-2 flex-grow text-caption leading-relaxed text-secondary">
                      {HUB_BLURBS[s.slug]}
                    </p>
                    <span className="mt-5 inline-flex items-center gap-1.5 text-caption font-semibold text-primary-strong">
                      Learn more
                      <ArrowRight size={15} className="transition-transform duration-200 group-hover/btn:translate-x-1" aria-hidden />
                    </span>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* GSM band */}
      <section className="section-lg bg-ink text-white">
        <div className="container-site grid gap-12 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <h2 className="text-h2 font-bold text-balance text-white">
              GSM <span className="text-[color:var(--blue-400)]">Missed Call &amp; Collect Call.</span>
            </h2>
            <p className="measure mt-5 text-body-lg text-[color:var(--color-text-on-dark-muted)]">
              Zero-cost engagement built straight into the network. Verify subscribers, capture
              opt-ins and deliver loan reminders with a missed call. Let customers reach you
              free of charge with collect call. Perfect for thin-airtime markets where every cedi
              counts.
            </p>
            <div className="mt-8">
              <Button href="/gsm" size="lg" withArrow>
                Explore GSM services
              </Button>
            </div>
          </Reveal>
          <div className="divide-y divide-[color:var(--color-line-on-dark)]">
            {GSM_FEATURES.map((f, i) => (
              <Reveal key={f.title} index={i}>
                <div className="py-5 first:pt-0">
                  <h3 className="text-body font-semibold text-white">{f.title}</h3>
                  <p className="mt-1 text-caption text-[color:var(--color-text-on-dark-muted)]">{f.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* How it fits together */}
      <section className="section">
        <div className="container-site">
          <SectionHeader
            title="Run one module, or the full stack."
            subtitle="Start where the pain is and add modules as you grow. Everything shares one data model, so each piece makes the next one smarter."
          />
          <div className="mt-14 grid gap-x-10 gap-y-10 sm:grid-cols-2">
            {FIT_CARDS.map((c, i) => (
              <Reveal key={c.title} index={i % 2}>
                <div className="border-t border-line pt-6">
                  <h3 className="text-h3 font-bold text-ink">{c.title}</h3>
                  <p className="mt-2 text-body text-secondary">{c.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Closing strip */}
      <section className="section bg-sunken">
        <div className="container-site flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
          <div className="max-w-xl">
            <h2 className="text-h2 font-bold text-balance text-ink">See the stack on your data.</h2>
            <p className="mt-4 text-body-lg text-secondary">
              Tell us which modules matter most and we’ll show you a working setup tailored to your
              market in weeks, not quarters.
            </p>
          </div>
          <Button href="/contact" size="lg" withArrow>
            Talk to us
          </Button>
        </div>
      </section>
    </>
  );
}
