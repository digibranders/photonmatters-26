/**
 * Contact form endpoint.
 *
 * Flow: validate -> rate limit -> notify the team -> confirm to the visitor.
 *
 * The admin notification is the submission of record: if it fails, the request
 * fails so the visitor knows to email us directly. The visitor confirmation is
 * best effort, a bounced auto-reply must never make a captured lead look lost.
 */

import { NextResponse } from "next/server";
import { rateLimit } from "@/lib/rate-limit";
import {
  BrevoConfigError,
  getBrevoConfig,
  isBrevoConfigured,
  sendTransactionalEmail,
  type BrevoConfig,
} from "@/lib/email/brevo";
import { renderAdminNotification } from "@/lib/email/templates/admin-notification";
import { renderUserConfirmation } from "@/lib/email/templates/user-confirmation";
import type { ContactSubmission } from "@/lib/email/types";

interface ContactPayload {
  name?: unknown;
  email?: unknown;
  company?: unknown;
  country?: unknown;
  message?: unknown;
  /** Honeypot: must stay empty for real users. */
  botcheck?: unknown;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Server-side caps. The form mirrors these with `maxLength` for better UX. */
const LIMITS = {
  name: 120,
  email: 254,
  company: 160,
  country: 80,
  message: 5000,
} as const;

const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;

const GENERIC_SEND_ERROR = "Could not send your message. Please email us directly.";

function fail(error: string, status: number, headers?: HeadersInit): NextResponse {
  return NextResponse.json({ ok: false, error }, { status, headers });
}

/** Coerces an unknown JSON value to a trimmed string. */
function asString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

/**
 * Best-effort client identity for rate limiting.
 *
 * `x-forwarded-for` is set by the Vercel edge and cannot be trusted in a
 * self-hosted setup without a proxy in front, which is acceptable here given
 * the limiter's stated scope.
 */
function clientKey(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for");
  const first = forwarded?.split(",")[0]?.trim();
  return first || req.headers.get("x-real-ip")?.trim() || "unknown";
}

type ValidationResult =
  | { ok: true; submission: ContactSubmission }
  | { ok: false; error: string };

function validate(data: ContactPayload): ValidationResult {
  const name = asString(data.name);
  const email = asString(data.email);
  const company = asString(data.company);
  const country = asString(data.country);
  const message = asString(data.message);

  if (!name || !email || !country || !message) {
    return { ok: false, error: "Please complete all required fields." };
  }
  if (!EMAIL_RE.test(email) || email.length > LIMITS.email) {
    return { ok: false, error: "Please enter a valid email address." };
  }
  if (
    name.length > LIMITS.name ||
    company.length > LIMITS.company ||
    country.length > LIMITS.country ||
    message.length > LIMITS.message
  ) {
    return { ok: false, error: "One of your answers is too long. Please shorten it." };
  }

  return {
    ok: true,
    submission: {
      name,
      email,
      company: company || null,
      country,
      message,
      submittedAt: new Date(),
    },
  };
}

export async function POST(req: Request): Promise<NextResponse> {
  let data: ContactPayload;
  try {
    data = (await req.json()) as ContactPayload;
  } catch {
    return fail("Invalid request.", 400);
  }

  // Bot caught by the honeypot: accept silently so it sees success and moves on.
  if (asString(data.botcheck)) {
    return NextResponse.json({ ok: true });
  }

  const result = validate(data);
  if (!result.ok) {
    return fail(result.error, 400);
  }
  const { submission } = result;

  const limit = rateLimit(clientKey(req), RATE_LIMIT_MAX, RATE_LIMIT_WINDOW_MS);
  if (!limit.allowed) {
    return fail("Too many messages from this connection. Please try again shortly.", 429, {
      "Retry-After": String(limit.retryAfterSeconds),
    });
  }

  if (!isBrevoConfigured()) {
    // Local development without credentials: log so the submission is visible.
    if (process.env.NODE_ENV !== "production") {
      console.info("[contact] received (Brevo not configured):", {
        name: submission.name,
        email: submission.email,
        company: submission.company,
        country: submission.country,
      });
      return NextResponse.json({ ok: true });
    }
    console.error("[contact] Brevo is not configured; submission could not be delivered.");
    return fail(GENERIC_SEND_ERROR, 500);
  }

  let config: BrevoConfig;
  try {
    config = getBrevoConfig();
  } catch (cause) {
    const detail = cause instanceof BrevoConfigError ? cause.message : "unknown error";
    console.error("[contact] Brevo configuration invalid:", detail);
    return fail(GENERIC_SEND_ERROR, 500);
  }

  // 1. Notify the team. This one is required.
  try {
    await sendTransactionalEmail(config, {
      to: config.adminRecipients,
      email: renderAdminNotification(submission),
      replyTo: { email: submission.email, name: submission.name },
      tags: ["contact-form", "admin-notification"],
    });
  } catch (cause) {
    console.error("[contact] admin notification failed:", cause);
    return fail(GENERIC_SEND_ERROR, 502);
  }

  // 2. Confirm to the visitor. Best effort: the lead is already captured.
  try {
    await sendTransactionalEmail(config, {
      to: [{ email: submission.email, name: submission.name }],
      email: renderUserConfirmation(submission),
      replyTo: config.adminRecipients[0],
      tags: ["contact-form", "user-confirmation"],
    });
  } catch (cause) {
    console.error("[contact] visitor confirmation failed:", cause);
  }

  return NextResponse.json({ ok: true });
}
