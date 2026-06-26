import Image from "next/image";
import { cn } from "@/lib/cn";

/**
 * Original PhotonMatters logo, used verbatim from the live site
 * (public/photonmatters-logo.svg — colourful molecule mark + gradient wordmark).
 * Default height is set for the navbar; pass a className to override (e.g. footer).
 */
export function Logo({ className }: { className?: string }) {
  return (
    <Image
      src="/photonmatters-logo.svg"
      alt="PhotonMatters"
      width={354}
      height={113}
      priority
      className={cn("w-auto", className ?? "h-9")}
    />
  );
}
