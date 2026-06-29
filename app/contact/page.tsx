import type { Metadata } from "next";
import { Mail, Phone, ArrowRight } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Badge } from "@/components/ui/Badge";
import { ContactForm } from "@/components/contact/ContactForm";
import { SITE, OFFICES } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Talk to PhotonMatters about building your next AI-native lending product across Africa, India and the Middle East.",
};

function LinkedInGlyph({ size = 18, ...rest }: { size?: number } & React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" {...rest}>
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14zM7.12 20.45H3.55V9h3.57v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.22.79 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
    </svg>
  );
}

const DETAILS = [
  { icon: Mail, label: "Email", value: SITE.email, href: `mailto:${SITE.email}` },
  { icon: Phone, label: "Phone", value: SITE.phone, href: SITE.phoneHref },
  { icon: LinkedInGlyph, label: "LinkedIn", value: "/company/photonmatters", href: SITE.linkedin },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Get in touch"
        title={
          <>
            Let&apos;s build your next{" "}
            <span className="font-playfair text-primary-strong">lending product</span>.
          </>
        }
        subtitle="Tell us about your market and the credit journey you want to launch. We’ll come back fast, usually within one business day."
      />

      {/* Form + details */}
      <section className="section">
        <div className="container-site grid gap-12 lg:grid-cols-[1.3fr_1fr]">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl border border-line bg-surface p-6 shadow-[var(--shadow-overlay)] sm:p-8">
              <div
                aria-hidden
                className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full opacity-70 blur-3xl"
                style={{ background: "radial-gradient(circle, rgba(126,73,242,0.12), transparent 70%)" }}
              />
              <div className="relative z-10">
                <ContactForm />
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <h2 className="text-h3 font-bold text-ink">Reach us directly</h2>
            <ul className="mt-5 space-y-3">
              {DETAILS.map((d) => (
                <li key={d.label}>
                  <a
                    href={d.href}
                    target={d.href.startsWith("http") ? "_blank" : undefined}
                    rel={d.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="group/card flex items-center gap-4 rounded-2xl border border-line bg-surface p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-line-strong hover:shadow-[0_1px_2px_rgba(26,20,38,0.04),0_14px_30px_-16px_rgba(126,73,242,0.28)]"
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[color:var(--blue-50)] text-primary">
                      <d.icon size={18} aria-hidden />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-caption text-muted">{d.label}</span>
                      <span className="block truncate text-body font-semibold text-ink">{d.value}</span>
                    </span>
                    <ArrowRight
                      size={16}
                      className="shrink-0 text-primary transition-transform duration-200 group-hover/card:translate-x-1"
                      aria-hidden
                    />
                  </a>
                </li>
              ))}
            </ul>

            <div className="relative mt-6 overflow-hidden rounded-3xl bg-ink p-7 text-white">
              <div
                aria-hidden
                className="pointer-events-none absolute -right-12 -top-16 h-56 w-56 rounded-full blur-[70px]"
                style={{ background: "rgba(126,73,242,0.4)" }}
              />
              <div className="relative z-10">
                <h2 className="text-h3 font-bold text-white">Prefer a demo?</h2>
                <p className="mt-2 text-caption text-[color:var(--color-text-on-dark-muted)]">
                  We’ll show you a live lending journey in 30 minutes.
                </p>
                <div className="mt-5">
                  <Button href={`mailto:${SITE.email}`} size="sm" withArrow>
                    Book a demo
                  </Button>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Offices — premium cards */}
      <section className="section bg-sunken">
        <div className="container-site">
          <SectionHeader eyebrow="Offices" title="Find us across three regions." />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {OFFICES.map((o, i) => (
              <Reveal key={o.country} index={i}>
                <div className="relative h-full overflow-hidden rounded-3xl border border-line bg-surface p-7">
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -bottom-12 -right-12 h-44 w-44 rounded-full opacity-60 blur-2xl"
                    style={{ background: "radial-gradient(circle, rgba(126,73,242,0.13), transparent 70%)" }}
                  />
                  <div className="relative z-10 flex items-center gap-2">
                    <h3 className="text-h3 font-bold text-ink">{o.country}</h3>
                    {o.badge ? <Badge>{o.badge}</Badge> : null}
                  </div>
                  <p className="relative z-10 mt-1 text-body font-medium text-primary-strong">{o.city}</p>
                  <p className="relative z-10 mt-3 text-caption leading-relaxed text-secondary">{o.address}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
