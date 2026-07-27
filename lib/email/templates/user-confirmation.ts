/**
 * Visitor template: the auto-reply confirming that an enquiry was received.
 *
 * A confirmation has one job: tell the sender it arrived and when they will
 * hear back. Everything beyond that is filler, so this carries only the
 * acknowledgement, a copy of what they sent for their records, and a faster
 * route to us if they need one. Onward links live in the shared footer.
 *
 * Grouping uses hairline borders and greys rather than tinted fills, and every
 * coloured element carries a `CLS.*` class. See the dark-mode notes at the top
 * of `shell.ts` for why.
 */

import { SITE } from "@/lib/site";
import { escapeHtml, formatTimestamp, toParagraphs } from "../html";
import type { ContactSubmission, RenderedEmail } from "../types";
import { BRAND, CLS, TEXT_STYLES, renderEmailShell } from "./shell";

const FONT_STACK =
  "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";

/** Builds the subject, HTML and plain-text parts of the visitor auto-reply. */
export function renderUserConfirmation(submission: ContactSubmission): RenderedEmail {
  const { name, country, message, submittedAt } = submission;
  const firstName = name.split(/\s+/)[0] || name;
  const timestamp = formatTimestamp(submittedAt);

  const messageHtml =
    toParagraphs(
      message,
      `margin:0 0 12px;font-family:${FONT_STACK};font-size:15px;line-height:1.7;color:${BRAND.textSecondary};`,
      CLS.text,
    ) || `<p class="${CLS.text}" style="${TEXT_STYLES.paragraphTight}">No message body.</p>`;

  const body = `
    <p class="${CLS.text}" style="${TEXT_STYLES.paragraph}">Hi ${escapeHtml(firstName)},</p>
    <p class="${CLS.text}" style="${TEXT_STYLES.paragraph}">
      Thanks for getting in touch. Someone who knows the ${escapeHtml(country)} market
      will reply within one business day.
    </p>

    <p class="${CLS.muted}" style="${TEXT_STYLES.sectionTitle}margin-top:28px;">Your message</p>
    <table role="presentation" class="${CLS.rule}" width="100%" border="0" cellpadding="0" cellspacing="0" style="width:100%;border:1px solid ${BRAND.line};border-radius:10px;">
      <tr>
        <td style="padding:20px 22px;">
          <p class="${CLS.muted}" style="margin:0 0 12px;font-family:${FONT_STACK};font-size:13px;line-height:1.5;color:${BRAND.textMuted};">
            Sent ${escapeHtml(timestamp)}
          </p>
          ${messageHtml}
        </td>
      </tr>
    </table>

    <p class="${CLS.text}" style="${TEXT_STYLES.paragraph}margin:26px 0 0;">
      Need us sooner? Reply to this email or call
      <span class="${CLS.link}"><a href="${escapeHtml(SITE.phoneHref)}" style="color:${BRAND.purpleDeep};font-weight:600;text-decoration:none;">${escapeHtml(SITE.phone)}</a></span>.
    </p>`;

  const html = renderEmailShell({
    title: "We have your message",
    preheader: `Thanks ${firstName}, our team will reply within one business day.`,
    eyebrow: "Message received",
    heading: "Thanks, we have got it.",
    body,
    footerNote:
      `You are receiving this because you submitted the contact form on ${SITE.domain}. ` +
      "This is a one-off confirmation, not a subscription.",
  });

  const text = [
    `Hi ${firstName},`,
    ``,
    `Thanks for getting in touch. Someone who knows the ${country} market will reply`,
    `within one business day.`,
    ``,
    `YOUR MESSAGE (sent ${timestamp})`,
    ``,
    message,
    ``,
    `Need us sooner? Reply to this email or call ${SITE.phone}.`,
    ``,
    `PhotonMatters`,
    `${SITE.url}`,
  ].join("\n");

  return {
    subject: "We have your message, PhotonMatters",
    html,
    text,
  };
}
