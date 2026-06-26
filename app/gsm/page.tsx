import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { Check, ArrowRight, PhoneMissed, PhoneForwarded, type LucideIcon } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Stat } from "@/components/ui/Stat";

export const metadata: Metadata = {
  title: "GSM — Missed Call & Collect Call",
  description:
    "Zero-cost, no-data Missed Call and Collect Call engagement rails for telecom operators — verification, opt-in, reminders and reverse-charge connectivity on any 2G phone.",
};

const WHY_CHECKLIST = [
  "Reaches the data-light prepaid majority",
  "Free for the subscriber to use",
  "No smartphone or install required",
  "New high-margin revenue line for operators",
];

const MISSED_CALL = [
  { title: "Verification & opt-in", body: "Confirm a number or capture consent with a single missed call instead of a paid OTP SMS." },
  { title: "Lead capture", body: "Print one number on packaging or billboards — every flash becomes a verified, callable lead." },
  { title: "Call-me-back", body: "Out-of-credit subscribers flash your line and an agent or IVR rings them back automatically." },
  { title: "Repayment & top-up reminders", body: "Nudge subscribers to repay a loan or recharge — they reply free, you confirm intent instantly." },
  { title: "Campaign response", body: "Measure pull from radio, TV and SMS blasts in real time — each missed call is a tracked response." },
  { title: "Vote & poll", body: "Run free yes/no polls and contests with one number per option — no data, no cost to vote." },
];

const COLLECT_CALL = [
  { title: "Subscriber-funded support", body: "Customers reach your helpdesk for free; the business absorbs the charge as a service cost." },
  { title: "Emergency call-back", body: "A subscriber with no balance can still reach a hotline or family contact in an emergency." },
  { title: "B2B reach", body: "Field agents and distributors stay connected to head office even when out of airtime." },
  { title: "Consent-gated billing", body: "The receiving party hears the cost and explicitly accepts before the call connects." },
  { title: "Operator revenue share", body: "Every reverse-charge minute is billed and settled — a new ARPU line on idle prepaid lines." },
  { title: "Collections outreach", body: "Borrowers without credit can still reach your recovery desk to arrange a repayment." },
];

const STEPS = [
  { n: "01", title: "Subscriber dials", body: "A subscriber flashes a dedicated number or starts a reverse-charge call — free, on any 2G handset." },
  { n: "02", title: "Carrier triggers event", body: "The operator network signals the call to our gateway, which captures the number and campaign." },
  { n: "03", title: "Action fires", body: "OTP, opt-in, reminder, call-back or reverse-charge connect — routed by the rule you configured." },
  { n: "04", title: "Logged & reconciled", body: "Every event is recorded for analytics, billing and campaign attribution in real time." },
];

const OPERATOR_STATS = [
  { value: "Zero cost", label: "to the subscriber to engage" },
  { value: "Any 2G phone", label: "works on the simplest feature phone" },
  { value: "No app, no data", label: "nothing to install or connect" },
  { value: "Massive reach", label: "every subscriber on the network" },
];

const CROSS_LINKS = [
  { href: "/solutions/campaign-management", name: "Campaign Management", blurb: "Orchestrate missed-call responses across SMS, voice and WhatsApp." },
  { href: "/solutions/collection-marketing-ai", name: "Collection Marketing AI", blurb: "Turn free reminders into repayments with behaviour-driven nudges." },
];

function ProductBlock({
  icon: Icon,
  eyebrow,
  heading,
  subtitle,
  cards,
}: {
  icon: LucideIcon;
  eyebrow: string;
  heading: string;
  subtitle: string;
  cards: { title: string; body: string }[];
}) {
  return (
    <div>
      <div className="flex items-start gap-4">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-primary">
          <Icon size={22} aria-hidden />
        </span>
        <div>
          <span className="eyebrow mb-2">{eyebrow}</span>
          <h2 className="text-h2 font-bold text-ink">{heading}</h2>
        </div>
      </div>
      <p className="measure mt-5 text-body-lg text-secondary">{subtitle}</p>
      <div className="mt-12 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((c) => (
          <Reveal key={c.title}>
            <div className="border-t border-line pt-5">
              <h3 className="text-h3 font-bold text-ink">{c.title}</h3>
              <p className="mt-2 text-caption leading-relaxed text-secondary">{c.body}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

export default function GsmPage() {
  return (
    <>
      <PageHero
        eyebrow="GSM · New division"
        title="Missed Call & Collect Call, for telecom operators."
        subtitle="Zero-cost, no-data engagement rails that reach every subscriber — verification, opt-in, reminders and reverse-charge connectivity that work on any 2G handset, with no app and no data plan."
        image="https://images.pexels.com/photos/29488660/pexels-photo-29488660.jpeg?auto=compress&cs=tinysrgb&w=1280"
      />

      {/* Why it matters */}
      <section className="section">
        <div className="container-site grid gap-12 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <h2 className="text-h2 font-bold text-balance text-ink">
              In prepaid markets, the cheapest channel wins.
            </h2>
            <p className="mt-5 text-body text-secondary">
              Across Africa, the vast majority of subscribers are prepaid and data-light. A megabyte
              costs more than a meal in some markets, so SMS gets ignored and apps never get
              installed. But a missed call costs nothing — and everyone already knows how to “flash”
              a number to be called back.
            </p>
            <p className="mt-4 text-body text-secondary">
              PhotonMatters turns that universal behaviour into a programmable engagement layer. A
              subscriber dials and hangs up, or accepts a reverse charge, and your platform fires the
              right action: verify, opt in, remind, or connect. No data, no app, no friction — the
              entire prepaid base becomes reachable.
            </p>
            <ul className="mt-7 grid gap-3 sm:grid-cols-2">
              {WHY_CHECKLIST.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <Check size={18} className="mt-0.5 shrink-0 text-primary" strokeWidth={2.5} aria-hidden />
                  <span className="text-caption text-secondary">{item}</span>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
              <Image
                src="https://images.pexels.com/photos/36096255/pexels-photo-36096255.jpeg?auto=compress&cs=tinysrgb&w=1280"
                alt="Mobile-money vendor in West Africa"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section bg-sunken">
        <div className="container-site">
          <ProductBlock
            icon={PhoneMissed}
            eyebrow="Product · 01"
            heading="Missed Call Service"
            subtitle="Zero-cost subscriber engagement. A subscriber rings a dedicated number and hangs up — the call never connects, nothing is charged, and your gateway fires the action you’ve configured."
            cards={MISSED_CALL}
          />
        </div>
      </section>

      <section className="section">
        <div className="container-site">
          <ProductBlock
            icon={PhoneForwarded}
            eyebrow="Product · 02"
            heading="Collect Call Service"
            subtitle="Reverse-charge connectivity. The subscriber places a call they can’t pay for; the receiving party accepts the charge. Conversations happen even when the caller has zero credit."
            cards={COLLECT_CALL}
          />
        </div>
      </section>

      {/* How it works */}
      <section className="section bg-sunken">
        <div className="container-site">
          <SectionHeader title="From a single dial to a fired action." />
          <div className="mt-14 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((step, i) => (
              <Reveal key={step.n} index={i}>
                <div>
                  <span className="text-h2 font-extrabold text-[color:var(--blue-100)]">{step.n}</span>
                  <h3 className="mt-2 text-h3 font-bold text-ink">{step.title}</h3>
                  <p className="mt-2 text-caption leading-relaxed text-secondary">{step.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why operators care */}
      <section className="section-lg bg-ink text-white">
        <div className="container-site">
          <SectionHeader tone="dark" title="The lowest-friction channel you already own." />
          <div className="mt-12 grid grid-cols-2 gap-x-10 gap-y-8 lg:grid-cols-4">
            {OPERATOR_STATS.map((s) => (
              <Reveal key={s.value}>
                <div className="border-t border-line-on-dark pt-6">
                  <Stat value={s.value} label={s.label} tone="dark" />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA + cross-links */}
      <section className="section">
        <div className="container-site grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="text-h2 font-bold text-balance text-ink">
              Pair GSM rails with your lending campaigns.
            </h2>
            <p className="measure mt-5 text-body-lg text-secondary">
              Combine missed-call opt-in and collect-call outreach with PhotonMatters campaign and
              collections intelligence to drive response and recovery — without spending a cent of
              subscriber data.
            </p>
            <div className="mt-8">
              <Button href="/contact" size="lg" withArrow>
                Book a demo
              </Button>
            </div>
          </div>
          <div>
            {CROSS_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group/btn flex items-center justify-between gap-4 border-t border-line py-5 transition-colors last:border-b hover:text-primary-strong"
              >
                <div>
                  <h3 className="text-body font-semibold text-ink">{link.name}</h3>
                  <p className="mt-1 text-caption text-secondary">{link.blurb}</p>
                </div>
                <ArrowRight
                  size={18}
                  className="shrink-0 text-primary transition-transform duration-200 group-hover/btn:translate-x-1"
                  aria-hidden
                />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
