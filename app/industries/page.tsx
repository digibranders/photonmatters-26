import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { Check } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Stat } from "@/components/ui/Stat";
import { MARKETS } from "@/lib/site";

export const metadata: Metadata = {
  title: "Industries",
  description:
    "Built for the institutions that move credit: banks, NBFCs and telecom operators across Africa, India and the Middle East.",
};

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
    <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
      <Reveal className={flip ? "lg:order-2" : undefined}>
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
          <Image
            src={block.image}
            alt={block.alt}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
      </Reveal>
      <Reveal delay={0.1} className={flip ? "lg:order-1" : undefined}>
        <span className="eyebrow mb-4">{block.eyebrow}</span>
        <h2 className="text-h2 font-bold text-balance text-ink">{block.heading}</h2>
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
      <PageHero
        eyebrow="Who we serve"
        title="Built for the institutions that move credit."
        subtitle="Banks, NBFCs and telecom operators run on PhotonMatters to launch, scale and collect credit across Africa, India and the Middle East."
        image="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Standard_Bank_Head_Office.jpg/1280px-Standard_Bank_Head_Office.jpg"
      />

      <section className="section">
        <div className="container-site flex flex-col gap-20 lg:gap-28">
          {BLOCKS.map((block, i) => (
            <FeatureBlock key={block.eyebrow} block={block} flip={i % 2 === 1} />
          ))}
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

      {/* Stats strip */}
      <section className="border-y border-line">
        <div className="container-site grid grid-cols-2 gap-x-8 gap-y-10 py-14 lg:grid-cols-4">
          {INDUSTRY_STATS.map((s, i) => (
            <Reveal key={s.label} index={i}>
              <Stat value={s.value} label={s.label} />
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
