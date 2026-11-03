import Image from "next/image";
import { cn } from "@/lib/cn";

/**
 * Logomark supergraphic: the white P mark, tone-on-tone, cropped by the edge of
 * its container. Used once per page at the closing moment (CTA card or the last
 * dark band). The parent must be `relative overflow-hidden`; pass position, height
 * and opacity through `className`.
 */
export function LogoWatermark({ className }: { className?: string }) {
  return (
    <Image
      src="/logomark-white.svg"
      alt=""
      aria-hidden
      width={240}
      height={440}
      className={cn("pointer-events-none absolute w-auto select-none", className)}
    />
  );
}
