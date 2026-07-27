/**
 * Admin template: the internal notification sent when a visitor submits the
 * contact form.
 *
 * Built for triage, so it carries only what is needed to act: who wrote in,
 * how to reach them, what they said, and a one-tap reply. The identifying
 * details sit in the header line rather than a labelled table, because a
 * labelled table restates what the heading already says.
 *
 * Grouping uses hairline borders and greys rather than tinted fills, and every
 * coloured element carries a `CLS.*` class. See the dark-mode notes at the top
 * of `shell.ts` for why.
 */

import { escapeHtml, formatTimestamp, toParagraphs } from "../html";
import type { ContactSubmission, RenderedEmail } from "../types";
import { BRAND, CLS, TEXT_STYLES, renderButton, renderEmailShell } from "./shell";

const FONT_STACK =
  "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";

/** Builds the subject, HTML and plain-text parts of the admin notification. */
export function renderAdminNotification(submission: ContactSubmission): RenderedEmail {
  const { name, email, company, country, message, submittedAt } = submission;
  const timestamp = formatTimestamp(submittedAt);

  // Company is optional, so drop it rather than printing "Not provided".
  const meta = [company, country, timestamp].filter(Boolean).join(" · ");

  const messageHtml =
    toParagraphs(
      message,
      `margin:0 0 14px;font-family:${FONT_STACK};font-size:16px;line-height:1.7;color:${BRAND.textPrimary};`,
      CLS.heading,
    ) || `<p class="${CLS.text}" style="${TEXT_STYLES.paragraph}">No message body.</p>`;

  const replyHref = `mailto:${email}?subject=${encodeURIComponent("Re: your enquiry to PhotonMatters")}`;

  const body = `
    <p class="${CLS.link}" style="margin:0 0 26px;font-family:${FONT_STACK};font-size:16px;font-weight:600;line-height:1.5;color:${BRAND.purpleDeep};">
      <a href="mailto:${escapeHtml(email)}" style="color:${BRAND.purpleDeep};text-decoration:none;">${escapeHtml(email)}</a>
    </p>

    <table role="presentation" width="100%" border="0" cellpadding="0" cellspacing="0" style="width:100%;">
      <tr>
        <td class="${CLS.rule}" style="padding:2px 0 2px 18px;border-left:3px solid ${BRAND.line};">
          ${messageHtml}
        </td>
      </tr>
    </table>

    <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="margin-top:28px;">
      <tr><td>${renderButton(replyHref, "Reply")}</td></tr>
    </table>`;

  const html = renderEmailShell({
    title: `New enquiry from ${name}`,
    preheader: `${name}${company ? ` at ${company}` : ""} (${country}) sent an enquiry via the website.`,
    eyebrow: "New website enquiry",
    heading: name,
    // Literal characters, not entities: `renderEmailShell` escapes this field.
    subheading: meta,
    body,
    // No footer note: this is internal mail, the recipient knows why they have it.
  });

  const text = [
    `NEW WEBSITE ENQUIRY`,
    ``,
    `Name:     ${name}`,
    `Email:    ${email}`,
    `Company:  ${company ?? "Not provided"}`,
    `Region:   ${country}`,
    `Received: ${timestamp}`,
    ``,
    message,
    ``,
    `Reply directly to this email to reach ${email}.`,
  ].join("\n");

  return {
    subject: `New enquiry: ${name}${company ? ` (${company})` : ""}`,
    html,
    text,
  };
}
