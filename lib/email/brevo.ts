/**
 * Minimal Brevo (formerly Sendinblue) transactional email client.
 *
 * Uses the REST API directly rather than the `@getbrevo/brevo` SDK: the send
 * endpoint is a single POST, and avoiding the SDK keeps the serverless bundle
 * small and the dependency surface at zero.
 *
 * Docs: https://developers.brevo.com/reference/sendtransacemail
 */

import type { EmailContact, RenderedEmail } from "./types";

const BREVO_SEND_ENDPOINT = "https://api.brevo.com/v3/smtp/email";
const REQUEST_TIMEOUT_MS = 10_000;

/** Thrown when the required environment variables are missing or malformed. */
export class BrevoConfigError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "BrevoConfigError";
  }
}

/** Thrown when Brevo rejects the send or is unreachable. */
export class BrevoSendError extends Error {
  readonly status: number | null;

  constructor(message: string, status: number | null = null) {
    super(message);
    this.name = "BrevoSendError";
    this.status = status;
  }
}

export interface BrevoConfig {
  apiKey: string;
  /** Verified sender in the Brevo dashboard. Brevo rejects unverified senders. */
  sender: Required<EmailContact>;
  /** Internal inbox(es) that receive contact-form notifications. */
  adminRecipients: EmailContact[];
}

export interface SendOptions {
  to: EmailContact[];
  email: RenderedEmail;
  replyTo?: EmailContact;
  /** Surfaced in the Brevo dashboard for filtering and statistics. */
  tags?: string[];
}

function requireEnv(name: string): string {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new BrevoConfigError(`Missing required environment variable: ${name}`);
  }
  return value;
}

/** Parses a comma-separated recipient list, e.g. "a@x.com, b@x.com". */
function parseRecipients(raw: string): EmailContact[] {
  return raw
    .split(",")
    .map((entry) => entry.trim())
    .filter(Boolean)
    .map((email) => ({ email }));
}

/**
 * Reads and validates Brevo configuration from the environment.
 *
 * @throws {BrevoConfigError} when any required variable is absent.
 */
export function getBrevoConfig(): BrevoConfig {
  const apiKey = requireEnv("BREVO_API_KEY");
  const senderEmail = requireEnv("BREVO_SENDER_EMAIL");
  const senderName = process.env.BREVO_SENDER_NAME?.trim() || "PhotonMatters";

  const adminRecipients = parseRecipients(requireEnv("CONTACT_TO"));
  if (adminRecipients.length === 0) {
    throw new BrevoConfigError("CONTACT_TO did not contain a usable email address.");
  }

  return {
    apiKey,
    sender: { email: senderEmail, name: senderName },
    adminRecipients,
  };
}

/** True when Brevo is configured well enough to attempt a send. */
export function isBrevoConfigured(): boolean {
  return Boolean(
    process.env.BREVO_API_KEY?.trim() &&
      process.env.BREVO_SENDER_EMAIL?.trim() &&
      process.env.CONTACT_TO?.trim(),
  );
}

/**
 * Sends one transactional email through Brevo.
 *
 * @returns the provider message id, useful for correlating with Brevo logs.
 * @throws {BrevoSendError} on a non-2xx response, a network failure, or timeout.
 */
export async function sendTransactionalEmail(
  config: BrevoConfig,
  options: SendOptions,
): Promise<string> {
  const payload = {
    sender: config.sender,
    to: options.to,
    replyTo: options.replyTo,
    subject: options.email.subject,
    htmlContent: options.email.html,
    textContent: options.email.text,
    tags: options.tags,
  };

  let response: Response;
  try {
    response = await fetch(BREVO_SEND_ENDPOINT, {
      method: "POST",
      headers: {
        "api-key": config.apiKey,
        "content-type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    });
  } catch (cause) {
    const reason = cause instanceof Error ? cause.message : "unknown error";
    throw new BrevoSendError(`Could not reach Brevo: ${reason}`);
  }

  const body = await response.text();

  if (!response.ok) {
    // Body is logged by the caller only; it can echo recipient addresses back.
    throw new BrevoSendError(`Brevo responded ${response.status}: ${body}`, response.status);
  }

  try {
    const parsed = JSON.parse(body) as { messageId?: string };
    return parsed.messageId ?? "unknown";
  } catch {
    return "unknown";
  }
}
