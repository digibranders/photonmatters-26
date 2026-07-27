/**
 * Shared shapes for outbound transactional email.
 *
 * `ContactSubmission` is the validated, trimmed result of a contact-form POST.
 * Everything downstream (templates, Brevo payloads) consumes this type rather
 * than the raw request body, so untrusted input is normalised in exactly one
 * place: `app/api/contact/route.ts`.
 */

export interface ContactSubmission {
  name: string;
  email: string;
  /** Optional field on the form; `null` when the visitor left it blank. */
  company: string | null;
  country: string;
  message: string;
  submittedAt: Date;
}

/** A single Brevo sender/recipient. */
export interface EmailContact {
  email: string;
  name?: string;
}

/** A fully rendered email, ready to hand to the provider. */
export interface RenderedEmail {
  subject: string;
  html: string;
  text: string;
}
