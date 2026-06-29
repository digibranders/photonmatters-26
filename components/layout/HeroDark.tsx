import Image from "next/image";
import { Button } from "@/components/ui/Button";

interface CtaDef {
  label: string;
  href: string;
}

interface HeroDarkProps {
  eyebrow?: string;
  title: string;
  /** Optional trailing fragment rendered as a Playfair orchid accent. */
  titleAccent?: string;
  subtitle: React.ReactNode;
  image: string;
  imageAlt?: string;
  primary?: CtaDef;
  secondary?: CtaDef;
}

/* Navy scrim + grain — matched to the home hero (#07101f). */
const SCRIM =
  "linear-gradient(95deg, rgba(7,16,31,0.94) 0%, rgba(7,16,31,0.80) 35%, rgba(7,16,31,0.34) 66%, rgba(7,16,31,0.62) 100%), linear-gradient(180deg, rgba(7,16,31,0.55) 0%, rgba(7,16,31,0.12) 32%, rgba(7,16,31,0.92) 100%)";
const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

/**
 * Shared dark, cinematic page hero — full-bleed photo, navy scrim, grain and an
 * eterna purple/orchid glow. Used by the content secondary pages.
 */
export function HeroDark({
  eyebrow,
  title,
  titleAccent,
  subtitle,
  image,
  imageAlt = "",
  primary,
  secondary,
}: HeroDarkProps) {
  return (
    <section
      data-nav-theme="dark"
      className="relative flex min-h-[64svh] flex-col justify-center overflow-hidden pt-20 text-white"
      style={{ backgroundColor: "#07101f" }}
    >
      {/* Full-bleed image + scrim + grain */}
      <div className="absolute inset-0 z-0">
        <Image src={image} alt={imageAlt} fill priority sizes="100vw" className="object-cover" />
        <div aria-hidden className="absolute inset-0" style={{ background: SCRIM }} />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.22] mix-blend-soft-light"
          style={{ backgroundImage: GRAIN }}
        />
      </div>

      {/* Ambient brand glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            "radial-gradient(50% 45% at 82% 14%, rgba(126,73,242,0.22), transparent 60%), radial-gradient(40% 45% at 0% 100%, rgba(233,162,242,0.10), transparent 60%)",
        }}
      />

      <div className="container-site relative z-10 w-full">
        <div className="max-w-[44rem] py-16 lg:py-20">
          {eyebrow ? (
            <p className="mb-5 text-label font-semibold uppercase tracking-[0.14em] text-[color:var(--blue-400)]">
              {eyebrow}
            </p>
          ) : null}

          <h1 className="text-display font-medium leading-[1.05] tracking-tighter text-balance text-white [text-shadow:0_2px_40px_rgba(0,0,0,0.4)]">
            {title}
            {titleAccent ? (
              <>
                {" "}
                <span className="font-playfair font-light text-[color:var(--blue-400)]">
                  {titleAccent}
                </span>
              </>
            ) : null}
          </h1>

          <p className="mt-6 max-w-[36rem] text-body-lg text-[color:var(--color-text-on-dark-muted)] [text-shadow:0_1px_18px_rgba(0,0,0,0.45)]">
            {subtitle}
          </p>

          {primary || secondary ? (
            <div className="mt-8 flex flex-wrap items-center gap-3">
              {primary ? (
                <Button href={primary.href} size="lg" withArrow>
                  {primary.label}
                </Button>
              ) : null}
              {secondary ? (
                <Button
                  href={secondary.href}
                  size="lg"
                  variant="secondary"
                  tone="dark"
                  className="!border-white/25 !bg-white/10 backdrop-blur-md hover:!bg-white/20"
                >
                  {secondary.label}
                </Button>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
