import Image from "next/image";
import { cn } from "@/lib/cn";

/**
 * PhotonMatters logo (vermilion P mark + wordmark), from the 2026 logo suite.
 * - tone="onDark"  → white wordmark  (default; use over dark/transparent bars)
 * - tone="onLight" → ink wordmark    (use over white/light bars)
 * The mark is vermilion in both variants. The SVG viewBox is cropped to the
 * artwork, so the class height is the visible logo height.
 */
export function Logo({
  className,
  tone = "onDark",
}: {
  className?: string;
  tone?: "onDark" | "onLight";
}) {
  return (
    <Image
      src={tone === "onLight" ? "/photonmatters-logo-dark.svg" : "/photonmatters-logo.svg"}
      alt="PhotonMatters"
      width={960}
      height={192}
      priority
      className={cn("w-auto", className ?? "h-8")}
    />
  );
}
