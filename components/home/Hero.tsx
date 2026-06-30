"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

const SLIDES = [
  { src: "/hero/slide-market.webp", alt: "Smartphone showing an approved mobile-money loan on a West African market stall" },
  { src: "/hero/slide-kiosk.webp", alt: "Card terminal and phone at a mobile-money kiosk at dusk" },
  { src: "/hero/slide-shop-credit.webp", alt: "Smartphone showing an approved loan with a growth graph beside a card terminal on a merchant counter" },
];

/* Navy scrim + grain — matched to the photonmatters reference hero (#07101f). */
const SCRIM =
  "linear-gradient(95deg, rgba(7,16,31,0.94) 0%, rgba(7,16,31,0.80) 35%, rgba(7,16,31,0.34) 66%, rgba(7,16,31,0.62) 100%), linear-gradient(180deg, rgba(7,16,31,0.55) 0%, rgba(7,16,31,0.12) 32%, rgba(7,16,31,0.92) 100%)";
const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

function Slides({ active }: { active: number }) {
  return (
    <>
      {SLIDES.map((slide, i) => (
        <div
          key={slide.src}
          aria-hidden={i !== active}
          className={cn(
            "absolute inset-0 transition-opacity duration-[1100ms] ease-in-out",
            i === active ? "opacity-100" : "opacity-0",
          )}
        >
          <Image
            src={slide.src}
            alt={i === 0 ? slide.alt : ""}
            fill
            priority={i === 0}
            sizes="100vw"
            className="object-cover"
          />
        </div>
      ))}
    </>
  );
}

function Progress({ active, onSelect }: { active: number; onSelect: (i: number) => void }) {
  return (
    <div className="flex items-center gap-2">
      {SLIDES.map((slide, i) => (
        <button
          key={slide.src}
          type="button"
          aria-label={`Show slide ${i + 1}`}
          aria-current={i === active}
          onClick={() => onSelect(i)}
          className={cn(
            "h-1 rounded-full transition-all duration-300",
            i === active ? "w-10 bg-white" : "w-5 bg-white/35 hover:bg-white/60",
          )}
        />
      ))}
    </div>
  );
}

export function Hero() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const t = setInterval(() => setActive((i) => (i + 1) % SLIDES.length), 5200);
    return () => clearInterval(t);
  }, [reduce]);

  const intro = reduce
    ? {}
    : {
        initial: { opacity: 0, y: 16 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] as const },
      };

  return (
    <section
      data-nav-theme="dark"
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden pt-20 text-white"
      style={{ backgroundColor: "#07101f" }}
    >
      {/* Full-bleed image carousel */}
      <div className="absolute inset-0 z-0">
        <Slides active={active} />
        {/* Navy scrim — dark on the left for the headline, image visible centre-right */}
        <div aria-hidden className="absolute inset-0" style={{ background: SCRIM }} />
        {/* Film grain */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.22] mix-blend-soft-light"
          style={{ backgroundImage: GRAIN }}
        />
      </div>

      {/* Ambient brand glow — subtle eterna purple/orchid over the navy */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            "radial-gradient(50% 45% at 82% 14%, rgba(126,73,242,0.22), transparent 60%), radial-gradient(40% 45% at 0% 100%, rgba(233,162,242,0.10), transparent 60%)",
        }}
      />

      <div className="container-site relative z-10 w-full">
        <motion.div {...intro} className="max-w-[40rem] py-10 lg:py-0">
          <h1 className="text-display font-medium tracking-tighter leading-[1.05] text-balance text-white [text-shadow:0_2px_40px_rgba(0,0,0,0.4)]">
            AI Powered Lending{" "}
            <span className="font-playfair font-light text-[color:var(--blue-400)]">reaching the last mile</span>
          </h1>
          <p className="mt-7 max-w-[32rem] text-body-lg text-[color:var(--color-text-on-dark-muted)] [text-shadow:0_1px_18px_rgba(0,0,0,0.45)]">
            The only AI-native platform that takes a bank, NBFC or telecom operator from zero
            to live lending in{" "}
            <span className="font-semibold text-white">8 weeks</span> — across Africa, India
            and the Middle East.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button href="/solutions" size="lg" withArrow>
              Explore solutions
            </Button>
            <Button
              href="/contact"
              size="lg"
              variant="secondary"
              tone="dark"
              className="!border-white/25 !bg-white/10 backdrop-blur-md hover:!bg-white/20"
            >
              Book a demo
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Progress */}
      <div className="absolute bottom-9 left-0 right-0 z-10">
        <div className="container-site">
          <Progress active={active} onSelect={setActive} />
        </div>
      </div>
    </section>
  );
}
