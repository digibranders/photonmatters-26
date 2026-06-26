/** Tiny class-name joiner (truthy parts joined by space). */
export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}
