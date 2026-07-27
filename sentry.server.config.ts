/**
 * Sentry init for the Node.js server runtime.
 *
 * Loaded by `instrumentation.ts` when `NEXT_RUNTIME` is "nodejs". This is the
 * runtime that serves the contact route, so the `dataCollection` restrictions in
 * `lib/sentry-shared.ts` matter most here.
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
