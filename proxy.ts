import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/** The single canonical, indexable host. Everything else must not be indexed. */
const CANONICAL_HOST = "www.photonmatters.com";

/**
 * Keep every non-canonical host out of search indexes.
 *
 * This covers all `*.vercel.app` preview and production-alias URLs, the apex
 * `photonmatters.com` domain, and localhost, as well as any deployment whose
 * environment is not "production". Search engines honour `X-Robots-Tag` even
 * when a page is reachable and crawlable, so this holds regardless of what
 * robots.txt says for a given host.
 */
export function proxy(request: NextRequest) {
  const response = NextResponse.next();

  const host = request.headers.get("host") ?? "";
  const isProduction = process.env.VERCEL_ENV === "production";
  const isCanonicalHost = host === CANONICAL_HOST;
  const isVercelHost = host.endsWith(".vercel.app");

  if (!isProduction || !isCanonicalHost || isVercelHost) {
    response.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");
  }

  return response;
}

export const config = {
  /**
   * Run on document routes only; skip Next.js internals and common static
   * assets so the optimizer and static pipeline stay untouched.
   *
   * `monitoring` is Sentry's tunnel route (see `tunnelRoute` in next.config.mjs).
   * It carries event payloads, not documents, so tagging it with robots headers
   * is meaningless and it has no business passing through this proxy.
   */
  matcher: [
    "/((?!monitoring|_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|webp|svg|ico|pdf)$).*)",
  ],
};
