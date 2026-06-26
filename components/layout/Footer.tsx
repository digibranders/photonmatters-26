import Link from "next/link";
import { SITE, FOOTER_COLUMNS } from "@/lib/site";
import { Logo } from "@/components/ui/Logo";

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: readonly { label: string; href: string }[];
}) {
  return (
    <div>
      <h3 className="mb-4 text-label font-semibold uppercase tracking-[0.08em] text-[color:var(--color-text-on-dark-muted)]">
        {title}
      </h3>
      <ul className="space-y-2.5">
        {links.map((l) => (
          <li key={l.label}>
            <FooterLink href={l.href}>{l.label}</FooterLink>
          </li>
        ))}
      </ul>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  const external = /^(https?:|mailto:|tel:)/.test(href);
  const classes =
    "text-caption text-[color:var(--color-text-on-dark)] opacity-80 transition-opacity hover:opacity-100";
  if (external) {
    return (
      <a
        href={href}
        className={classes}
        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
        target={href.startsWith("http") ? "_blank" : undefined}
      >
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}

export function Footer() {
  return (
    <footer data-nav-theme="dark" className="relative overflow-hidden bg-ink text-white">
      {/* Oversized brand watermark — eterna signature */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-0 w-full select-none overflow-hidden"
      >
        <span className="block whitespace-nowrap text-center font-extrabold leading-none tracking-tighter text-white/[0.03] text-[15vw]">
          PHOTONMATTERS
        </span>
      </div>

      <div className="container-site relative z-10 py-16">
        <div className="grid grid-cols-2 gap-10 border-b border-line-on-dark pb-12 md:grid-cols-[1.7fr_1fr_1fr_1fr]">
          <div className="col-span-2 md:col-span-1">
            <Logo className="h-10" />
            <p className="mt-5 max-w-[320px] text-caption text-[color:var(--color-text-on-dark-muted)]">
              {SITE.blurb}
            </p>
            <p className="mt-5 max-w-[320px] text-h3 font-medium leading-snug text-white">
              Discover your{" "}
              <span className="font-playfair text-[color:var(--blue-400)]">lending edge</span>.
            </p>
          </div>
          <FooterColumn title="Solutions" links={FOOTER_COLUMNS.solutions} />
          <FooterColumn title="Company" links={FOOTER_COLUMNS.company} />
          <FooterColumn title="Offices" links={FOOTER_COLUMNS.offices} />
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3 pt-6 text-caption text-[color:var(--color-text-on-dark-muted)]">
          <span>© 2026 {SITE.name}. All rights reserved.</span>
          <span>{SITE.regions}</span>
        </div>
      </div>
    </footer>
  );
}
