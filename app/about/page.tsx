import Image from "next/image";
import type { Metadata } from "next";
import { HeroDark } from "@/components/layout/HeroDark";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { Badge } from "@/components/ui/Badge";
import { MARKETS, OFFICES } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "PhotonMatters is building AI-native lending technology to bank the people legacy systems forgot, across Africa, India and the Middle East.",
};

const HEADING_CLIP =
  "text-h2 font-bold text-balance bg-clip-text pb-[0.18em] text-transparent bg-gradient-to-b from-ink to-[color:rgba(26,20,38,0.6)]";

const CARD_BENTO =
  "group relative h-full overflow-hidden rounded-3xl border border-line p-7 transition-all duration-300 hover:-translate-y-1 hover:border-line-strong hover:shadow-[0_1px_2px_rgba(26,20,38,0.04),0_18px_40px_-18px_rgba(126,73,242,0.28)] sm:p-8";

const VALUES = [
  { title: "Built to Disrupt", body: "We challenge the assumptions baked into legacy credit. AI-native from the first line of code, we replace paperwork and gut-feel with explainable, data-driven decisions." },
  { title: "Engineered for Scale", body: "From a $50 micro-loan to enterprise portfolios — 250k+ requests an hour, 99.9% availability, and an 8-week path from kickoff to go-live in any market." },
  { title: "Designed to Empower", body: "Every product is built to put credit in the hands of the people and institutions the system overlooked — human-centered, transparent and fair by design." },
];

const LEADERS = [
  {
    image: "/team/tahseen-jamal.png",
    name: "Tahseen Jamal",
    role: "Co-Founder & CEO",
    bio: "23+ years in fintech and digital platforms. B.Tech, ISB MBA.",
  },
  {
    image: "/team/rohit-ahuja.png",
    name: "Rohit Ahuja",
    role: "Co-Founder & CCO",
    bio: "25+ years in business development and IT consulting; ex-Accenture. MBA, Certified Cloud Practitioner.",
  },
];

function Bloom() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute -bottom-16 -right-16 h-48 w-48 rounded-full opacity-70 blur-2xl transition-transform duration-700 group-hover:scale-110"
      style={{ background: "radial-gradient(circle, rgba(126,73,242,0.12), transparent 70%)" }}
    />
  );
}

export default function AboutPage() {
  return (
    <>
      <HeroDark
        eyebrow="Our story"
        title="We’re banking the people the"
        titleAccent="system forgot."
        subtitle="PhotonMatters is building AI-native lending technology for the institutions that move credit — banks, NBFCs and telecom operators — across Africa, India and the Middle East."
        image="https://images.pexels.com/photos/30688593/pexels-photo-30688593.jpeg?auto=compress&cs=tinysrgb&w=1920"
        imageAlt="Banking the people the system forgot"
        primary={{ label: "Book a demo", href: "/contact" }}
        secondary={{ label: "Our solutions", href: "/solutions" }}
      />

      {/* Mission */}
      <section className="section">
        <div className="container-site grid gap-12 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <h2 className={HEADING_CLIP}>
              Unleashing a{" "}
              <span className="font-playfair text-primary-strong">global revolution</span> in lending
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
            <figure className="relative">
              <div
                aria-hidden
                className="pointer-events-none absolute -bottom-8 -right-8 -z-10 h-56 w-56 rounded-full opacity-70 blur-3xl"
                style={{ background: "radial-gradient(circle, rgba(126,73,242,0.16), transparent 70%)" }}
              />
              <div className="relative aspect-[4/3] overflow-hidden rounded-3xl ring-1 ring-line">
                <Image
                  src="https://images.pexels.com/photos/3894376/pexels-photo-3894376.jpeg?auto=compress&cs=tinysrgb&w=1280"
                  alt="Building human-centered credit, together"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </figure>
          </Reveal>
        </div>
      </section>

      {/* Values — bento */}
      <section className="section bg-sunken">
        <div className="container-site">
          <SectionHeader
            eyebrow="What drives us"
            title="Built to Disrupt. Engineered for Scale. Designed to Empower."
          />
          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {VALUES.map((v, i) => (
              <Reveal key={v.title} index={i}>
                <div className={CARD_BENTO} style={{ background: "linear-gradient(160deg, #ffffff 0%, var(--navy-50) 100%)" }}>
                  <Bloom />
                  <h3 className="relative z-10 text-h3 font-bold text-ink">{v.title}</h3>
                  <p className="relative z-10 mt-3 text-body text-secondary">{v.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership — founder cards with portraits */}
      <section className="section">
        <div className="container-site">
          <SectionHeader eyebrow="Leadership" title="Founders who’ve spent decades building this." />
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {LEADERS.map((l, i) => (
              <Reveal key={l.name} index={i}>
                <div className={`${CARD_BENTO} bg-surface`}>
                  <Bloom />
                  <div className="relative z-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-6">
                    {/* Portrait with eterna halo */}
                    <div className="relative shrink-0">
                      <div
                        aria-hidden
                        className="pointer-events-none absolute -inset-3 rounded-full opacity-90 blur-xl"
                        style={{
                          background:
                            "radial-gradient(circle, rgba(126,73,242,0.26), rgba(233,162,242,0.14) 55%, transparent 72%)",
                        }}
                      />
                      <div className="relative h-28 w-28 overflow-hidden rounded-2xl bg-sunken ring-1 ring-line sm:h-32 sm:w-32">
                        <Image
                          src={l.image}
                          alt={l.name}
                          fill
                          sizes="128px"
                          className="object-cover"
                        />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-h3 font-bold text-ink">{l.name}</h3>
                      <span className="mt-2 inline-flex items-center rounded-full bg-[color:var(--blue-50)] px-3 py-1 text-caption font-semibold text-primary-strong">
                        {l.role}
                      </span>
                    </div>
                  </div>
                  <p className="relative z-10 mt-5 text-body text-secondary">{l.bio}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Markets — premium cards */}
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

      {/* Global presence — dark band with blooms + glass office cards */}
      <section
        data-nav-theme="dark"
        className="section-lg relative overflow-hidden bg-ink text-white"
      >
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute -left-[8%] -top-[20%] h-[560px] w-[560px] rounded-full blur-[100px]" style={{ background: "rgba(126,73,242,0.18)" }} />
          <div className="absolute -bottom-[24%] -right-[8%] h-[460px] w-[460px] rounded-full blur-[80px]" style={{ background: "rgba(233,162,242,0.10)" }} />
        </div>
        <div className="container-site relative">
          <SectionHeader tone="dark" eyebrow="Global presence" title="Four offices. Three regions. One platform." />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {OFFICES.map((o, i) => (
              <Reveal key={o.country} index={i}>
                <div className="h-full rounded-2xl border border-line-on-dark bg-white/[0.04] p-6 backdrop-blur-sm transition-colors duration-300 hover:border-[color:rgba(126,73,242,0.5)]">
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
