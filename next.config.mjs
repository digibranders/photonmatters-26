import { withSentryConfig } from "@sentry/nextjs";

/** @type {import('next').NextConfig} */

/**
 * Baseline security headers applied to every route. HTTPS/HSTS is also enforced
 * at the Vercel edge, but setting these at the app level keeps them consistent
 * across hosts and is a Google "secure site" trust signal.
 */
const securityHeaders = [
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  },
];

const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.pexels.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "upload.wikimedia.org" },
    ],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default withSentryConfig(nextConfig, {
  org: "fynix-digital",
  project: "photonmatters",

  /**
   * Uploads source maps on production builds so real-user stack traces show
   * this source rather than minified output. Without the token the build still
   * succeeds, it just skips the upload, so CI is never blocked on it.
   */
  authToken: process.env.SENTRY_AUTH_TOKEN,
  widenClientFileUpload: true,

  /**
   * Routes events through the app's own origin so ad blockers, which commonly
   * block requests to ingest.sentry.io, cannot silently drop client errors.
   * `proxy.ts` excludes this path from its matcher.
   */
  tunnelRoute: "/monitoring",

  // Keep local builds quiet; keep the upload log in CI where it is diagnostic.
  silent: !process.env.CI,

  // The build plugin reports its own usage back to Sentry. Off by choice, not
  // for quota (it is billed to Sentry, not to this org), simply because nothing
  // here needs it.
  telemetry: false,
});
