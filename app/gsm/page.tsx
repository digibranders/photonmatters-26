import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { Check, ArrowRight, PhoneMissed, PhoneForwarded, type LucideIcon } from "lucide-react";
import { HeroDark } from "@/components/layout/HeroDark";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { getIcon } from "@/lib/icons";

export const metadata: Metadata = {
  title: "GSM: Missed Call & Collect Call",
  description:
    "Zero-cost, no-data Missed Call and Collect Call engagement rails for telecom operators. Verification, opt-in, reminders and reverse-charge connectivity on any 2G phone.",
};

const HEADING_CLIP =
  "text-h2 font-bold text-balance bg-clip-text pb-[0.18em] text-transparent bg-gradient-to-b from-ink to-[color:rgba(26,20,38,0.6)]";

const WHY_CHECKLIST = [
  "Reaches the data-light prepaid majority",
  "Free for the subscriber to use",
  "No smartphone or install required",
  "New high-margin revenue line for operators",
];

const MISSED_CALL = [
  { title: "Verification & opt-in", body: "Confirm a number or capture consent with a single missed call instead of a paid OTP SMS." },
  { title: "Lead capture", body: "Print one number on packaging or billboards. Every flash becomes a verified, callable lead." },
  { title: "Call-me-back", body: "Out-of-credit subscribers flash your line and an agent or IVR rings them back automatically." },
  { title: "Repayment & top-up reminders", body: "Nudge subscribers to repay a loan or recharge. They reply free, you confirm intent instantly." },
  { title: "Campaign response", body: "Measure pull from radio, TV and SMS blasts in real time. Each missed call is a tracked response." },
  { title: "Vote & poll", body: "Run free yes/no polls and contests with one number per option. No data, no cost to vote." },
];

const COLLECT_CALL = [
  { title: "Subscriber-funded support", body: "Customers reach your helpdesk for free; the business absorbs the charge as a service cost." },
  { title: "Emergency call-back", body: "A subscriber with no balance can still reach a hotline or family contact in an emergency." },
  { title: "B2B reach", body: "Field agents and distributors stay connected to head office even when out of airtime." },
  { title: "Consent-gated billing", body: "The receiving party hears the cost and explicitly accepts before the call connects." },
  { title: "Operator revenue share", body: "Every reverse-charge minute is billed and settled. A new ARPU line on idle prepaid lines." },
  { title: "Collections outreach", body: "Borrowers without credit can still reach your recovery desk to arrange a repayment." },
];

const STEPS = [
  { n: "01", title: "Subscriber dials", body: "A subscriber flashes a dedicated number or starts a reverse-charge call. Free, on any 2G handset." },
  { n: "02", title: "Carrier triggers event", body: "The operator network signals the call to our gateway, which captures the number and campaign." },
  { n: "03", title: "Action fires", body: "OTP, opt-in, reminder, call-back or reverse-charge connect. Routed by the rule you configured." },
  { n: "04", title: "Logged & reconciled", body: "Every event is recorded for analytics, billing and campaign attribution in real time." },
];

const OPERATOR_STATS = [
  { value: "Zero cost", label: "to the subscriber to engage" },
  { value: "Any 2G phone", label: "works on the simplest feature phone" },
  { value: "No app, no data", label: "nothing to install or connect" },
  { value: "Massive reach", label: "every subscriber on the network" },
];

const CROSS_LINKS = [
  { href: "/solutions/campaign-management", icon: "Megaphone", name: "Campaign Management", blurb: "Orchestrate missed-call responses across SMS, voice and WhatsApp." },
  { href: "/solutions/collection-marketing-ai", icon: "BellRing", name: "Collection Marketing AI", blurb: "Turn free reminders into repayments with behaviour-driven nudges." },
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
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[color:var(--blue-50)] text-primary">
          <Icon size={22} aria-hidden />
        </span>
        <div>
          <span className="eyebrow mb-2">{eyebrow}</span>
          <h2 className={HEADING_CLIP}>{heading}</h2>
        </div>
      </div>
      <p className="measure mt-5 text-body-lg text-secondary">{subtitle}</p>
      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((c) => (
          <Reveal key={c.title}>
            <div
              className="group relative h-full overflow-hidden rounded-3xl border border-line p-6 transition-all duration-300 hover:-translate-y-1 hover:border-line-strong hover:shadow-[0_1px_2px_rgba(26,20,38,0.04),0_18px_40px_-18px_rgba(126,73,242,0.28)]"
              style={{ background: "linear-gradient(160deg, #ffffff 0%, var(--navy-50) 100%)" }}
            >
              <div
                aria-hidden
                className="pointer-events-none absolute -bottom-14 -right-14 h-44 w-44 rounded-full opacity-70 blur-2xl transition-transform duration-700 group-hover:scale-110"
                style={{ background: "radial-gradient(circle, rgba(126,73,242,0.12), transparent 70%)" }}
              />
              <h3 className="relative z-10 text-h3 font-bold text-ink">{c.title}</h3>
              <p className="relative z-10 mt-2 text-caption leading-relaxed text-secondary">{c.body}</p>
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
      <HeroDark
        eyebrow="GSM · New division"
        title="Missed Call & Collect Call,"
        titleAccent="for telecom operators."
        subtitle="Zero-cost, no-data engagement rails that reach every subscriber. Verification, opt-in, reminders and reverse-charge connectivity that work on any 2G handset, with no app and no data plan."
        image="https://images.pexels.com/photos/29488660/pexels-photo-29488660.jpeg?auto=compress&cs=tinysrgb&w=1920"
        imageAlt="Telecom subscriber engagement"
        primary={{ label: "Book a demo", href: "/contact" }}
        secondary={{ label: "Explore solutions", href: "/solutions" }}
      />

      {/* Why it matters */}
      <section className="section">
        <div className="container-site grid gap-12 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <h2 className={HEADING_CLIP}>In prepaid markets, the cheapest channel wins.</h2>
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
            <figure className="relative">
              <div
                aria-hidden
                className="pointer-events-none absolute -bottom-8 -right-8 -z-10 h-56 w-56 rounded-full opacity-70 blur-3xl"
                style={{ background: "radial-gradient(circle, rgba(126,73,242,0.16), transparent 70%)" }}
              />
              <div className="relative aspect-[4/3] overflow-hidden rounded-3xl ring-1 ring-line">
                <Image
                  src="https://images.pexels.com/photos/36096255/pexels-photo-36096255.jpeg?auto=compress&cs=tinysrgb&w=1280"
                  alt="Mobile-money vendor in West Africa"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </figure>
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

      {/* How it works — flow pipeline */}
      <section className="section bg-sunken">
        <div className="container-site">
          <SectionHeader eyebrow="How it works" title="From a single dial to a fired action." />
          <div className="mt-14 grid items-stretch gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((step, i) => (
              <Reveal key={step.n} index={i} className="relative">
                <div
                  className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-line p-7 transition-all duration-300 hover:-translate-y-1 hover:border-line-strong hover:shadow-[0_1px_2px_rgba(26,20,38,0.04),0_18px_40px_-18px_rgba(126,73,242,0.28)]"
                  style={{ background: "linear-gradient(160deg, #ffffff 0%, var(--navy-50) 100%)" }}
                >
                  <span
                    aria-hidden
                    className="pointer-events-none absolute -right-1 -top-6 select-none text-[6rem] font-extrabold leading-none tabular-nums text-[color:var(--blue-100)] opacity-70"
                  >
                    {step.n}
                  </span>
                  <h3 className="relative z-10 mt-10 text-h3 font-bold text-ink">{step.title}</h3>
                  <p className="relative z-10 mt-2 text-caption leading-relaxed text-secondary">{step.body}</p>
                </div>
                {i < STEPS.length - 1 ? (
                  <span
                    aria-hidden
                    className="absolute right-0 top-1/2 z-20 hidden h-9 w-9 -translate-y-1/2 translate-x-1/2 items-center justify-center rounded-full border border-line bg-surface text-white shadow-[var(--shadow-overlay)] lg:flex"
                    style={{ background: "linear-gradient(135deg, var(--blue-500), var(--blue-400))" }}
                  >
                    <ArrowRight size={16} strokeWidth={2.75} />
                  </span>
                ) : null}
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why operators care — dark gradient-rail showcase */}
      <section
        data-nav-theme="dark"
        className="section relative overflow-hidden bg-ink text-white"
      >
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute -left-[8%] -top-[25%] h-[520px] w-[520px] rounded-full blur-[100px]" style={{ background: "rgba(126,73,242,0.18)" }} />
          <div className="absolute -bottom-[28%] -right-[8%] h-[460px] w-[460px] rounded-full blur-[80px]" style={{ background: "rgba(233,162,242,0.10)" }} />
        </div>
        <div className="container-site relative">
          <SectionHeader tone="dark" eyebrow="Why operators care" title="The lowest-friction channel you already own." />
          <div className="mt-12 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {OPERATOR_STATS.map((s, i) => (
              <Reveal key={s.value} index={i} className="relative">
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
                <p className="bg-gradient-to-b from-white to-white/60 bg-clip-text pb-[0.1em] text-[clamp(1.5rem,1.2rem+1.3vw,2.125rem)] font-bold leading-tight tracking-tight text-transparent">
                  {s.value}
                </p>
                <p className="mt-2 text-body text-[color:var(--color-text-on-dark-muted)]">{s.label}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA + cross-links — gradient finale with glass cards */}
      <section className="section">
        <div className="container-site">
          <Reveal>
            <div
              className="relative overflow-hidden rounded-[2.5rem] px-8 py-14 shadow-2xl shadow-[rgba(126,73,242,0.25)] md:px-14 md:py-16"
              style={{ background: "linear-gradient(110deg, var(--color-primary) 0%, var(--blue-600) 100%)" }}
            >
              <div
                aria-hidden
                className="pointer-events-none absolute -right-[10%] -top-[30%] h-[420px] w-[420px] rounded-full blur-[90px]"
                style={{ background: "rgba(233,162,242,0.30)" }}
              />
              <div className="relative z-10 grid gap-10 lg:grid-cols-2 lg:items-center">
                <div>
                  <p className="eyebrow !text-white/70">Connect the channels</p>
                  <h2 className="mt-4 text-balance bg-gradient-to-b from-white to-white/55 bg-clip-text pb-[0.18em] text-h2 font-bold text-transparent">
                    Pair GSM rails{" "}
                    <span className="font-playfair font-light text-[color:var(--amber-500)]">
                      with your lending campaigns.
                    </span>
                  </h2>
                  <p className="measure mt-5 text-body-lg text-white/80">
                    Combine missed-call opt-in and collect-call outreach with PhotonMatters campaign
                    and collections intelligence to drive response and recovery — without spending a
                    cent of subscriber data.
                  </p>
                  <div className="mt-8">
                    <Button
                      href="/contact"
                      size="lg"
                      withArrow
                      className="!bg-white !text-ink !shadow-none hover:!bg-accent hover:!text-ink"
                    >
                      Book a demo
                    </Button>
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  {CROSS_LINKS.map((link) => {
                    const Icon = getIcon(link.icon);
                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="group/card flex items-center gap-4 rounded-2xl border border-white/15 bg-white/[0.08] p-4 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-white/35 hover:bg-white/[0.14]"
                      >
                        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10 text-white">
                          <Icon size={19} aria-hidden />
                        </span>
                        <div className="min-w-0 flex-1">
                          <h3 className="text-body font-semibold text-white">{link.name}</h3>
                          <p className="mt-0.5 text-caption text-white/70">{link.blurb}</p>
                        </div>
                        <ArrowRight
                          size={18}
                          className="shrink-0 text-white/80 transition-transform duration-200 group-hover/card:translate-x-1"
                          aria-hidden
                        />
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
