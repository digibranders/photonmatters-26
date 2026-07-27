/**
 * Sentry init for the edge runtime.
 *
 * Loaded by `instrumentation.ts` when `NEXT_RUNTIME` is "edge". `proxy.ts`
 * (Next 16's rename of middleware) runs on the edge, so this is what reports if
 * the canonical-host / noindex logic ever throws.
 */
import * as Sentry from "@sentry/nextjs";
import {
  DATA_COLLECTION,
  SENTRY_DSN,
  SENTRY_ENABLED,
  TRACES_SAMPLE_RATE,
} from "@/lib/sentry-shared";

Sentry.init({
  dsn: process.env.SENTRY_DSN ?? SENTRY_DSN,
  enabled: SENTRY_ENABLED,
  tracesSampleRate: TRACES_SAMPLE_RATE,
  dataCollection: DATA_COLLECTION,
});
