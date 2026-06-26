import Image from "next/image";
import { cn } from "@/lib/cn";

/**
 * PhotonMatters logo (colourful molecule mark + wordmark).
 * - tone="onDark"  → white wordmark  (default; use over dark/transparent bars)
 * - tone="onLight" → ink wordmark    (use over white/light bars)
 * The molecule mark is colourful in both variants.
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
      width={354}
      height={113}
      priority
      className={cn("w-auto", className ?? "h-9")}
    />
  );
}
