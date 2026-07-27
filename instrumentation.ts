/**
 * Next.js server-side instrumentation hook.
 *
 * `register` runs once per server runtime before any application code, which is
 * why Sentry init has to be dynamically imported here rather than at module
 * scope: each runtime needs a different config, and importing both would
 * initialise the wrong SDK build.
 */
import * as Sentry from "@sentry/nextjs";

export async function register(): Promise<void> {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    await import("./sentry.server.config");
  }

  if (process.env.NEXT_RUNTIME === "edge") {
    await import("./sentry.edge.config");
  }
}

/**
 * Captures unhandled errors thrown while handling a request, including ones
 * inside route handlers and server components that never reach a boundary.
 */
export const onRequestError = Sentry.captureRequestError;
