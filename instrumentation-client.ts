/**
 * Sentry init for the browser runtime.
 *
 * Next.js loads this file automatically for the client bundle. The filename is
 * fixed by the framework: the older `sentry.client.config.ts` name is no longer
 * picked up.
 */
import * as Sentry from "@sentry/nextjs";
import {
  DATA_COLLECTION,
  SENTRY_DSN,
  SENTRY_ENABLED,
  TRACES_SAMPLE_RATE,
} from "@/lib/sentry-shared";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN ?? SENTRY_DSN,
  enabled: SENTRY_ENABLED,
  tracesSampleRate: TRACES_SAMPLE_RATE,
  dataCollection: DATA_COLLECTION,
});

/** Lets Sentry tie App Router navigations into client-side traces. */
export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
