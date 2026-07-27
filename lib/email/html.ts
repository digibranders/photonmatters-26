/**
 * HTML helpers for email rendering.
 *
 * Every value that originates from a visitor MUST pass through `escapeHtml`
 * (or `toParagraphs`, which escapes internally) before being interpolated into
 * a template. Email clients render HTML, so an unescaped submission is a
 * straightforward injection vector into the inbox of whoever reads it.
 */

const HTML_ENTITIES: Readonly<Record<string, string>> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};

/** Escapes the five characters that are unsafe inside HTML text and attributes. */
export function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (char) => HTML_ENTITIES[char] ?? char);
}

/**
 * Renders a multi-line plain-text message as escaped HTML paragraphs.
 *
 * Blank lines start a new `<p>`; single newlines become `<br />` so the
 * visitor's own line breaks survive. Returns an empty string for blank input.
 *
 * @param className Dark-mode class hook from `templates/shell.ts` (`CLS`).
 *                  Without it the paragraphs keep their light colour on a dark
 *                  background in clients that honour `prefers-color-scheme`.
 */
export function toParagraphs(value: string, style: string, className: string): string {
  const blocks = value
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .filter(Boolean);

  if (blocks.length === 0) return "";

  return blocks
    .map((block) => {
      const inner = escapeHtml(block).replace(/\n/g, "<br />");
      return `<p class="${className}" style="${style}">${inner}</p>`;
    })
    .join("");
}

/**
 * Formats a timestamp for display in email bodies.
 *
 * Fixed to Dubai (the PhotonMatters HQ timezone) so that admin notifications
 * and visitor confirmations always agree, regardless of where the serverless
 * function happened to run.
 */
export function formatTimestamp(date: Date): string {
  const formatted = new Intl.DateTimeFormat("en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Asia/Dubai",
  }).format(date);
  return `${formatted} (GST)`;
}
