/**
 * Shared HTML chrome for every PhotonMatters transactional email.
 *
 * Email clients are not browsers: no external stylesheets, no flexbox or grid
 * in Outlook, no reliable `rem`, and no SVG. So this file deliberately uses
 * table layout, inline styles, hex colours and pixel units.
 *
 * ---------------------------------------------------------------------------
 * Light mode only: what is enforced, and what cannot be
 * ---------------------------------------------------------------------------
 * These emails are deliberately light-only. There is no dark palette. How far
 * that can actually be enforced varies by client, so the strategy is layered:
 *
 *  1. Apple Mail, iOS Mail, and other WebKit clients: `color-scheme: light only`
 *     (meta + CSS) genuinely disables their automatic darkening. Enforced.
 *  2. Outlook app on iOS/Android: cannot be disabled, but it stamps `data-ogsc`
 *     (text) and `data-ogsb` (background) on every element it rewrote, so the
 *     selectors below pin our light values straight back. Effectively enforced.
 *  3. Outlook for Windows desktop and Outlook.com: CANNOT be prevented. Dark
 *     mode there is a user-side toggle with no sender opt-out, and it ignores
 *     `color-scheme`, media queries and `!important` alike. Do not add hacks
 *     claiming otherwise, they break more than they fix.
 *
 * Because tier 3 is unavoidable, the design is built so a forced inversion is
 * still perfectly readable rather than broken:
 *
 *  - No dark fills anywhere. Light text on a dark fill is the classic failure:
 *    the fill inverts to near-white, the text stays light, the content vanishes.
 *    Dark text on light surfaces inverts into a clean, legible dark email.
 *  - Colour is rationed to two places that survive inversion: the saturated
 *    purple button and purple link text. Everything else is ink, grey, white and
 *    hairline borders. Mid-tone brand colours shift unpredictably, so there
 *    simply are not any.
 *  - Blocks are grouped with 1px borders, not tinted fills. A border that
 *    inverts is still a border; a tint that inverts wrong is a muddy panel.
 *
 * Rules for anyone extending these templates:
 *  - Never put light text on a dark filled background.
 *  - Prefer borders over fills; prefer grey over colour.
 *  - Set an explicit colour and bgcolor on anything that carries one. Inherited
 *    colours are what partial-inversion clients mangle first.
 *  - Give every coloured element a `CLS.*` class so tier 2 stays pinned.
 */

import { OFFICES, SITE } from "@/lib/site";
import { escapeHtml } from "../html";

/** Deliberately small palette. See the note above before adding to it. */
export const BRAND = {
  /** Page backdrop. Near-neutral, so the white card still reads as a card. */
  page: "#f2f1f5",
  surface: "#ffffff",
  line: "#e3e0e9",
  /** The one saturated accent, used for the button fill and nothing else. */
  purple: "#7e49f2",
  /** Accessible purple for link text on white. */
  purpleDeep: "#38208c",
  textPrimary: "#1a1426",
  textSecondary: "#55525e",
  textMuted: "#75727e",
} as const;

/**
 * Class hooks used to pin light values back after a client rewrites them.
 *
 * `lm` is for "light mode lock". Every element carrying a colour needs one of
 * these, or the Outlook mobile app will keep its own rewritten colour.
 */
export const CLS = {
  page: "lm-page",
  card: "lm-card",
  heading: "lm-heading",
  text: "lm-text",
  muted: "lm-muted",
  link: "lm-link",
  rule: "lm-rule",
  btn: "lm-btn",
} as const;

const FONT_STACK =
  "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";

/** Logo lockup: colourful mark plus gradient wordmark, no tagline. */
const LOGO_URL = `${SITE.url}/email/photonmatters-logo.png`;
const LOGO_WIDTH = 190;
const LOGO_HEIGHT = 53;

/* ---------------------------------------------------------------------------
   Footer content, derived from `lib/site.ts` so it cannot drift from the site.

   Deliberately minimal: identity, postal address, one contact line and the
   legal note. A transactional email is not a place for site navigation, an
   office list or a company description, all of which push the real content off
   the first screen. Onward journeys belong in the body, where they have intent
   behind them.
   ------------------------------------------------------------------------- */

/** Registered office, the postal address recipients and mailbox filters expect. */
const HQ_OFFICE = OFFICES.find((office) => office.badge === "HQ") ?? OFFICES[0];
const HQ_ADDRESS_HTML = HQ_OFFICE?.address
  ? escapeHtml(HQ_OFFICE.address)
  : escapeHtml(`${HQ_OFFICE?.city ?? "Dubai"}, ${HQ_OFFICE?.country ?? "UAE"}`);

export const TEXT_STYLES = {
  paragraph: `margin:0 0 16px;font-family:${FONT_STACK};font-size:16px;line-height:1.65;color:${BRAND.textSecondary};`,
  paragraphTight: `margin:0 0 12px;font-family:${FONT_STACK};font-size:15px;line-height:1.6;color:${BRAND.textSecondary};`,
  label: `margin:0 0 4px;font-family:${FONT_STACK};font-size:12px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:${BRAND.textMuted};`,
  value: `margin:0;font-family:${FONT_STACK};font-size:16px;font-weight:600;line-height:1.5;color:${BRAND.textPrimary};`,
  /** Grey, not purple: one less colour to survive inversion. */
  sectionTitle: `margin:0 0 14px;font-family:${FONT_STACK};font-size:12px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:${BRAND.textMuted};`,
} as const;

/**
 * Restates every light value at `!important`, scoped to a client's dark-mode
 * marker, so the client's own rewrite loses.
 *
 * Emitted once for `[data-ogsc]` (Outlook mobile rewrote a text colour) and
 * once for `[data-ogsb]` (it rewrote a background). There is no media query
 * counterpart: `color-scheme: light only` already stops `prefers-color-scheme`
 * clients from darkening in the first place.
 */
function lightLockRules(prefix: string): string {
  return `
  ${prefix} .${CLS.page} { background-color:${BRAND.page} !important; }
  ${prefix} .${CLS.card} { background-color:${BRAND.surface} !important; border-color:${BRAND.line} !important; }
  ${prefix} .${CLS.heading} { color:${BRAND.textPrimary} !important; }
  ${prefix} .${CLS.text} { color:${BRAND.textSecondary} !important; }
  ${prefix} .${CLS.muted} { color:${BRAND.textMuted} !important; }
  ${prefix} .${CLS.link}, ${prefix} .${CLS.link} a { color:${BRAND.purpleDeep} !important; }
  ${prefix} .${CLS.rule} { border-color:${BRAND.line} !important; }
  ${prefix} .${CLS.btn} { background-color:${BRAND.purple} !important; }
  ${prefix} .${CLS.btn} a { color:#ffffff !important; }`;
}

/**
 * Every field here except `body` is escaped before insertion, so pass plain
 * text and literal characters, never HTML entities (`&middot;` would render as
 * the entity itself). `body` is inserted raw and must arrive already escaped.
 */
export interface EmailShellOptions {
  /** Document title. Some clients show it in the "view in browser" tab. */
  title: string;
  /** Inbox preview line, shown after the subject in most clients. */
  preheader: string;
  /** Small uppercase kicker above the heading. */
  eyebrow: string;
  /** Main heading. */
  heading: string;
  /** Optional supporting line under the heading. */
  subheading?: string;
  /** Pre-rendered, already-escaped HTML for the card body. */
  body: string;
  /**
   * Optional small print in the legal strip, for example explaining why the
   * recipient is getting this. Omit on internal mail, which needs no such note.
   */
  footerNote?: string;
}

/**
 * Renders the primary call to action.
 *
 * Outlook (Word engine) ignores `border-radius`, so the button degrades to a
 * square block there rather than breaking. That is an accepted trade against
 * the markup weight of a VML fallback. The purple is saturated enough that a
 * forced inversion leaves white text legible on it.
 */
export function renderButton(href: string, label: string): string {
  return `
    <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="border-collapse:separate;">
      <tr>
        <td class="${CLS.btn}" align="center" bgcolor="${BRAND.purple}" style="background-color:${BRAND.purple};border-radius:8px;">
          <a href="${escapeHtml(href)}" style="display:inline-block;padding:14px 28px;font-family:${FONT_STACK};font-size:15px;font-weight:700;line-height:1;color:#ffffff;text-decoration:none;border-radius:8px;">${escapeHtml(label)}</a>
        </td>
      </tr>
    </table>`;
}

/** Wraps content in the branded outer frame: logo, light card, footer. */
export function renderEmailShell(options: EmailShellOptions): string {
  const { title, preheader, eyebrow, heading, subheading, body, footerNote } = options;
  const year = new Date().getFullYear();

  return `<!doctype html>
<html lang="en" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta name="x-apple-disable-message-reformatting" />
<!-- "only" is the opt-out keyword: it tells WebKit clients (Apple Mail, iOS
     Mail) not to auto-darken. The supported-color-schemes meta is Apple's
     older spelling of the same intent and takes a bare scheme name. -->
<meta name="color-scheme" content="light only" />
<meta name="supported-color-schemes" content="light" />
<title>${escapeHtml(title)}</title>
<!--[if mso]>
<noscript><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml></noscript>
<![endif]-->
<style>
  :root { color-scheme:light only; supported-color-schemes:light only; }
  body { margin:0 !important; padding:0 !important; width:100% !important; color-scheme:light only; -webkit-text-size-adjust:100%; -ms-text-size-adjust:100%; }
  table { border-collapse:collapse !important; mso-table-lspace:0pt; mso-table-rspace:0pt; }
  img { border:0; outline:none; line-height:100%; -ms-interpolation-mode:bicubic; }
  /* Stop iOS and Gmail auto-linking plain data as blue phone numbers. */
  a[x-apple-data-detectors], .unstyled-link a { color:inherit !important; text-decoration:none !important; }

  @media only screen and (max-width:620px) {
    .sm-px { padding-left:24px !important; padding-right:24px !important; }
    .sm-heading { font-size:23px !important; }
  }

  /* Outlook app on iOS/Android: undo its rewrite, keep the email light. */
${lightLockRules("[data-ogsc]")}
${lightLockRules("[data-ogsb]")}
</style>
</head>
<body class="${CLS.page}" style="margin:0;padding:0;background-color:${BRAND.page};">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;mso-hide:all;">${escapeHtml(preheader)}</div>
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;mso-hide:all;">&#8199;&#65279;&#847;&#8199;&#65279;&#847;&#8199;&#65279;&#847;&#8199;&#65279;&#847;&#8199;&#65279;&#847;&#8199;&#65279;&#847;&#8199;&#65279;&#847;</div>

  <table role="presentation" class="${CLS.page}" width="100%" border="0" cellpadding="0" cellspacing="0" bgcolor="${BRAND.page}" style="background-color:${BRAND.page};">
    <tr>
      <td class="${CLS.page}" align="center" bgcolor="${BRAND.page}" style="background-color:${BRAND.page};padding:32px 12px;">

        <table role="presentation" class="${CLS.card}" width="600" border="0" cellpadding="0" cellspacing="0" bgcolor="${BRAND.surface}" style="width:600px;max-width:600px;background-color:${BRAND.surface};border:1px solid ${BRAND.line};border-radius:12px;">

                <!-- Header. The logo lives inside the card: the tagline is
                     stripped and the mark is colourful, so it needs no
                     background of its own and reads on white either way. -->
                <tr>
                  <td class="sm-px ${CLS.card}" bgcolor="${BRAND.surface}" style="background-color:${BRAND.surface};padding:36px 40px 0;">
                    <img src="${escapeHtml(LOGO_URL)}" width="${LOGO_WIDTH}" height="${LOGO_HEIGHT}" alt="PhotonMatters"
                         style="display:block;width:${LOGO_WIDTH}px;max-width:${LOGO_WIDTH}px;height:auto;margin:0 0 30px;border:0;font-family:${FONT_STACK};font-size:18px;font-weight:800;color:${BRAND.textPrimary};" />
                    <p class="${CLS.muted}" style="margin:0 0 10px;font-family:${FONT_STACK};font-size:12px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:${BRAND.textMuted};">${escapeHtml(eyebrow)}</p>
                    <h1 class="sm-heading ${CLS.heading}" style="margin:0;font-family:${FONT_STACK};font-size:26px;font-weight:700;line-height:1.25;letter-spacing:-0.02em;color:${BRAND.textPrimary};">${escapeHtml(heading)}</h1>
                    ${
                      subheading
                        ? `<p class="${CLS.muted}" style="margin:12px 0 0;font-family:${FONT_STACK};font-size:15px;line-height:1.6;color:${BRAND.textMuted};">${escapeHtml(subheading)}</p>`
                        : ""
                    }
                  </td>
                </tr>

                <!-- Body -->
                <tr>
                  <td class="sm-px ${CLS.card}" bgcolor="${BRAND.surface}" style="background-color:${BRAND.surface};padding:30px 40px 36px;">
                    ${body}
                  </td>
                </tr>

                <!-- Footer -->
                <tr>
                  <td class="sm-px ${CLS.card} ${CLS.rule}" bgcolor="${BRAND.surface}" style="background-color:${BRAND.surface};padding:26px 40px 30px;border-top:1px solid ${BRAND.line};border-radius:0 0 11px 11px;">

                    <p class="unstyled-link ${CLS.muted}" style="margin:0 0 10px;font-family:${FONT_STACK};font-size:12px;line-height:1.7;color:${BRAND.textMuted};">
                      <span class="${CLS.heading}" style="font-weight:700;color:${BRAND.textPrimary};">PhotonMatters</span><br />
                      ${HQ_ADDRESS_HTML}
                    </p>

                    <p class="${CLS.link}" style="margin:0;font-family:${FONT_STACK};font-size:12px;line-height:1.7;color:${BRAND.purpleDeep};">
                      <a href="mailto:${escapeHtml(SITE.email)}" style="color:${BRAND.purpleDeep};font-weight:600;text-decoration:none;">${escapeHtml(SITE.email)}</a>
                      &nbsp;&middot;&nbsp;
                      <a href="${escapeHtml(SITE.url)}" style="color:${BRAND.purpleDeep};font-weight:600;text-decoration:none;">${escapeHtml(SITE.domain)}</a>
                    </p>

                    ${
                      footerNote
                        ? `<p class="${CLS.muted}" style="margin:16px 0 0;font-family:${FONT_STACK};font-size:11px;line-height:1.6;color:${BRAND.textMuted};">${escapeHtml(footerNote)}</p>`
                        : ""
                    }
                    <p class="${CLS.muted}" style="margin:${footerNote ? "6px" : "16px"} 0 0;font-family:${FONT_STACK};font-size:11px;line-height:1.6;color:${BRAND.textMuted};">
                      &copy; ${year} PhotonMatters. All rights reserved.
                    </p>

                  </td>
                </tr>

        </table>

      </td>
    </tr>
  </table>
</body>
</html>`;
}
