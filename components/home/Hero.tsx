"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

const SLIDES = [
  { src: "https://images.pexels.com/photos/36752223/pexels-photo-36752223.jpeg?auto=compress&cs=tinysrgb&w=1600", alt: "Entrepreneur accessing credit on a mobile phone" },
  { src: "https://images.pexels.com/photos/27814588/pexels-photo-27814588.jpeg?auto=compress&cs=tinysrgb&w=1600", alt: "Market vendor in an emerging economy" },
  { src: "https://images.pexels.com/photos/37529290/pexels-photo-37529290.jpeg?auto=compress&cs=tinysrgb&w=1600", alt: "Mobile-money transaction in progress" },
  { src: "https://images.pexels.com/photos/35064938/pexels-photo-35064938.jpeg?auto=compress&cs=tinysrgb&w=1600", alt: "Small-business owner reviewing finances on a phone" },
];

const HERO_STATS = [
  { value: "8-week", label: "go-live" },
  { value: "250k+", label: "requests / hr" },
  { value: "3", label: "regions live" },
];

function Slides({ active, priority }: { active: number; priority?: boolean }) {
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
            priority={priority && i === 0}
            sizes="(max-width: 1024px) 100vw, 55vw"
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
    <section className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden bg-ink pt-20 text-white">
      {/* Ambient brand glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(55% 50% at 78% 12%, rgba(31,142,221,0.32), transparent 62%), radial-gradient(40% 45% at 0% 100%, rgba(31,142,221,0.14), transparent 60%)",
        }}
      />

      {/* Desktop full-bleed image panel (bleeds to the right edge, fades into navy) */}
      <div className="absolute inset-y-0 right-0 z-0 hidden w-[55vw] lg:block">
        <Slides active={active} priority />
        {/* fade the image into the navy on its left edge + subtle bottom scrim */}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, var(--navy-900) 0%, rgba(14,26,43,0.55) 26%, rgba(14,26,43,0.10) 55%, transparent 100%), linear-gradient(0deg, rgba(14,26,43,0.45), transparent 40%)",
          }}
        />
        {/* Progress */}
        <div className="absolute bottom-9 right-10 xl:right-16">
          <Progress active={active} onSelect={setActive} />
        </div>
      </div>

      <div className="container-site relative z-10 w-full">
        <motion.div {...intro} className="max-w-[34rem] py-10 lg:py-0">
          <p className="eyebrow mb-3 text-[color:var(--blue-400)]">Micro-finance, re-engineered</p>
          <h1 className="text-display font-extrabold leading-[1.12] text-balance text-white">
            AI Powered Lending{" "}
            <span className="font-playfair text-[color:var(--blue-400)]">reaching the last mile</span>
          </h1>
          <p className="mt-6 max-w-[30rem] text-body-lg text-[color:var(--color-text-on-dark-muted)]">
            The only AI-native platform that takes a bank, NBFC or telecom operator from zero
            to live lending in{" "}
            <span className="font-semibold text-white">8 weeks</span> — across Africa, India
            and the Middle East.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button href="/solutions" size="md" withArrow>
              Explore solutions
            </Button>
            <Button
              href="/contact"
              size="md"
              variant="secondary"
              tone="dark"
              className="!border-white/25 !bg-white/10 backdrop-blur-md hover:!bg-white/20"
            >
              Book a demo
            </Button>
          </div>

          <dl className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-4">
            {HERO_STATS.map((s, i) => (
              <div key={s.label} className={cn("flex items-baseline gap-2", i > 0 && "sm:border-l sm:border-white/15 sm:pl-6")}>
                <dt className="text-h3 font-bold text-white">{s.value}</dt>
                <dd className="text-caption text-[color:var(--color-text-on-dark-muted)]">{s.label}</dd>
              </div>
            ))}
          </dl>

          {/* Mobile carousel */}
          <div className="mt-10 lg:hidden">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl ring-1 ring-white/10">
              <Slides active={active} />
              <div aria-hidden className="absolute inset-0" style={{ background: "linear-gradient(0deg, rgba(14,26,43,0.5), transparent 45%)" }} />
              <div className="absolute bottom-4 left-4">
                <Progress active={active} onSelect={setActive} />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
