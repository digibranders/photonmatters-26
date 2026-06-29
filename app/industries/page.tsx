import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { Check } from "lucide-react";
import { HeroDark } from "@/components/layout/HeroDark";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { MARKETS } from "@/lib/site";

export const metadata: Metadata = {
  title: "Industries",
  description:
    "Built for the institutions that move credit: banks, NBFCs and telecom operators across Africa, India and the Middle East.",
};

const HEADING_CLIP =
  "text-h2 font-bold text-balance bg-clip-text pb-[0.18em] text-transparent bg-gradient-to-b from-ink to-[color:rgba(26,20,38,0.6)]";

interface ChecklistItem {
  text: string;
  href?: string;
}
interface Block {
  eyebrow: string;
  heading: string;
  body: string;
  checklist: ChecklistItem[];
  image: string;
  alt: string;
}

const BLOCKS: Block[] = [
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
      "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Absa_Group_logo_on_exterior_of_head_office_building_in_Johannesburg%2C_South_Africa_%281%29.jpg/1280px-Absa_Group_logo_on_exterior_of_head_office_building_in_Johannesburg%2C_South_Africa_%281%29.jpg",
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
      "https://images.pexels.com/photos/9301316/pexels-photo-9301316.jpeg?auto=compress&cs=tinysrgb&w=1280",
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
      "https://images.pexels.com/photos/12478756/pexels-photo-12478756.jpeg?auto=compress&cs=tinysrgb&w=1280",
    alt: "Mobile-money vendor",
  },
];

const INDUSTRY_STATS = [
  { value: "250k+/hr", label: "Requests at peak scale" },
  { value: "8 wks", label: "From kickoff to go-live" },
  { value: "99.9%", label: "Platform availability" },
  { value: "3", label: "Regions: Africa · India · ME" },
];

function FeatureBlock({ block, flip }: { block: Block; flip: boolean }) {
  return (
    <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-14">
      <Reveal className={flip ? "lg:order-2" : undefined}>
        <figure className="relative">
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-8 -right-8 -z-10 h-56 w-56 rounded-full opacity-70 blur-3xl"
            style={{ background: "radial-gradient(circle, rgba(126,73,242,0.16), transparent 70%)" }}
          />
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl ring-1 ring-line">
            <Image
              src={block.image}
              alt={block.alt}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </figure>
      </Reveal>
      <Reveal delay={0.1} className={flip ? "lg:order-1" : undefined}>
        <span className="eyebrow mb-4">{block.eyebrow}</span>
        <h2 className={HEADING_CLIP}>{block.heading}</h2>
        <p className="mt-5 text-body text-secondary">{block.body}</p>
        <ul className="mt-7 space-y-3">
          {block.checklist.map((item) => (
            <li key={item.text} className="flex items-start gap-3">
              <Check size={18} className="mt-0.5 shrink-0 text-primary" strokeWidth={2.5} aria-hidden />
              {item.href ? (
                <Link href={item.href} className="text-body text-primary-strong hover:underline">
                  {item.text}
                </Link>
              ) : (
                <span className="text-body text-secondary">{item.text}</span>
              )}
            </li>
          ))}
        </ul>
        <div className="mt-8">
          <Button href="/solutions" variant="link" withArrow>
            Explore solutions
          </Button>
        </div>
      </Reveal>
    </div>
  );
}

export default function IndustriesPage() {
  return (
    <>
      <HeroDark
        eyebrow="Who we serve"
        title="Built for the institutions that"
        titleAccent="move credit."
        subtitle="Banks, NBFCs and telecom operators run on PhotonMatters to launch, scale and collect credit across Africa, India and the Middle East."
        image="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Standard_Bank_Head_Office.jpg/1280px-Standard_Bank_Head_Office.jpg"
        imageAlt="Institutions that move credit"
        primary={{ label: "Book a demo", href: "/contact" }}
        secondary={{ label: "Explore solutions", href: "/solutions" }}
      />

      <section className="section">
        <div className="container-site flex flex-col gap-20 lg:gap-28">
          {BLOCKS.map((block, i) => (
            <FeatureBlock key={block.eyebrow} block={block} flip={i % 2 === 1} />
          ))}
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

      {/* Stats — dark gradient-rail showcase */}
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
                <p className="bg-gradient-to-b from-white to-white/60 bg-clip-text pb-[0.1em] text-[clamp(1.875rem,1.4rem+1.6vw,2.625rem)] font-bold leading-tight tracking-tight text-transparent">
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
