/**
 * Options shared by all three Sentry runtimes (browser, Node server, edge).
 *
 * They live here so the three `Sentry.init` calls cannot drift apart, which
 * matters most for `DATA_COLLECTION`: a privacy setting that is correct in the
 * server config but missing from the client config is worse than no setting at
 * all, because the gap is invisible.
 */

/**
 * Public DSN for the `fynix-digital/photonmatters` project.
 *
 * Safe to commit. A DSN is designed to be public: it is embedded in the client
 * bundle by design and only permits submitting events, never reading them. The
 * environment variables below exist so a different project can be targeted per
 * deployment, not to keep this value secret.
 */
export const SENTRY_DSN =
  "https://2d13d4a94a63b938e2d6230efaa288b9@o4511098086227968.ingest.us.sentry.io/4511806881333248";

/**
 * Only report from production.
 *
 * This org is on Sentry's free plan, where quota is genuinely scarce. Local
 * development is the biggest avoidable drain: every `npm run dev` page load,
 * hot reload and route change would otherwise send events and spans against the
 * same allowance that real user errors depend on, and a developer's own errors
 * are already visible in their terminal and browser console.
 *
 * Note this gates preview deploys too. If a Vercel preview ever needs to
 * report, widen it to check `VERCEL_ENV` instead of `NODE_ENV`.
 */
export const SENTRY_ENABLED = process.env.NODE_ENV === "production";

/**
 * Sample 10% of production traces.
 *
 * Errors are always captured in full and are unaffected by this: it only
 * controls performance spans, which are the high-volume category on the free
 * plan. Lower it if span quota gets tight, raise it if traces are too sparse to
 * be useful. There is no development branch here because `SENTRY_ENABLED`
 * already switches the SDK off outside production.
 */
export const TRACES_SAMPLE_RATE = 0.1;

/**
 * Privacy controls. Both of these override a v10 default that is unsafe for
 * this specific codebase, so neither should be removed without reading why.
 *
 * - `httpBodies: []` disables request/response body capture, which otherwise
 *   defaults to collecting everything. `/api/contact` receives a visitor's
 *   name, work email, company and free-text message. If that route throws, the
 *   default would forward all of it to Sentry: third-party personal data sent
 *   to a third-party processor that the visitor never consented to.
 *
 * - `stackFrameVariables: false` disables local-variable capture, which also
 *   defaults on. `sendTransactionalEmail` in `lib/email/brevo.ts` receives the
 *   Brevo config as a parameter, so `config.apiKey` is a local variable in a
 *   frame that appears in any send failure. Sentry can filter variables by
 *   name, but only against names as they exist *after bundling*, and minifiers
 *   rename locals, so name-based filtering cannot be trusted here.
 *
 * - `userInfo: false` keeps Sentry from auto-populating `user.*` from request
 *   data. Nothing in this app identifies users, so there is nothing to gain.
 */
export const DATA_COLLECTION = {
  userInfo: false,
  httpBodies: [],
  stackFrameVariables: false,
};
