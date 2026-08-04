# PhotonMatters

[![Better Stack Badge](https://uptime.betterstack.com/status-badges/v1/monitor/2tett.svg)](https://uptime.betterstack.com/?utm_source=status_badge)

![Next.js](https://img.shields.io/badge/Next.js-16-000000?logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-19-20232A?logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-0055FF?logo=framer&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-%E2%89%A520.9-5FA04E?logo=nodedotjs&logoColor=white)

![Vercel](https://img.shields.io/badge/Vercel-deployed-000000?logo=vercel&logoColor=white)
![Sentry](https://img.shields.io/badge/Sentry-monitored-362D59?logo=sentry&logoColor=white)
![Brevo](https://img.shields.io/badge/Brevo-email-0B996E?logo=brevo&logoColor=white)

Marketing site for PhotonMatters, AI-native lending and collections technology
for banks, NBFCs and telecom operators across Africa, India and the Middle East.

Production: [www.photonmatters.com](https://www.photonmatters.com)

## Stack

The badges above cover the versions. What matters beyond them:

|            |                                                                   |
| ---------- | ----------------------------------------------------------------- |
| Framework  | Next.js App Router.`proxy.ts` is Next 16's rename of middleware |
| Language   | TypeScript in strict mode, no`any`                              |
| Styling    | Tailwind v4, driven by design tokens in`styles/tokens.css`      |
| Animation  | Framer Motion, used sparingly through`components/ui/Reveal`     |
| Icons      | `lucide-react`, resolved by name via `lib/icons.ts`           |
| Maps       | `d3-geo` and `topojson-client` for the global presence map    |
| Email      | Brevo transactional API, templates in`lib/email/`               |
| Monitoring | Sentry, errors and 10% tracing, production only                   |
| Hosting    | Vercel,`main` branch only                                       |

Requires Node 20.9 or newer.

## Getting started

```bash
npm install
cp .env.example .env.local   # then fill in the values
npm run dev
```

## Scripts

| Command           | What it does                  |
| ----------------- | ----------------------------- |
| `npm run dev`   | Development server            |
| `npm run build` | Production build              |
| `npm run start` | Serve a production build      |
| `npm run lint`  | ESLint plus the em-dash guard |

## Content and configuration

`lib/site.ts` is the single source of truth for site-wide values: canonical URL,
contact details, offices, navigation, solutions and products. Change a domain or
an address there and it propagates to the sitemap, structured data, the footer
and the transactional emails.

## Environment variables

All four Brevo variables are required for the contact form to send. See
[`.env.example`](.env.example) for what each one does. Set them locally in
`.env.local` and in Vercel under Settings > Environment Variables for both
Preview and Production.

| Variable               | Required | Notes                                                                         |
| ---------------------- | -------- | ----------------------------------------------------------------------------- |
| `BREVO_API_KEY`      | yes      | Contact form delivery                                                         |
| `BREVO_SENDER_EMAIL` | yes      | Must be a verified sender or on an authenticated domain in Brevo              |
| `BREVO_SENDER_NAME`  | no       | Defaults to "PhotonMatters"                                                   |
| `CONTACT_TO`         | yes      | Inbox that receives enquiries, comma-separated for several                    |
| `SENTRY_AUTH_TOKEN`  | no       | Build-time only, uploads source maps so production stack traces stay readable |

The Sentry DSN is not an environment variable. It is public by design and lives
in `lib/sentry-shared.ts`.

Without the Brevo variables the contact form still validates and accepts
submissions in development, logging the payload to the server console, but
returns an error in production rather than silently dropping a lead.

## Error monitoring

Sentry captures errors and 10% of traces, from production only, so local
development does not consume quota. Session replay, logging, profiling and
metrics are deliberately off.

Two SDK defaults are overridden in `lib/sentry-shared.ts` and should not be
removed without reading the reasoning there: HTTP request bodies are never sent
(the contact route receives visitor personal data) and stack frame variables are
never captured (an API key sits in a local variable on the email send path).

## Conventions

**No em-dashes.** The character U+2014 is banned in source and content;
`npm run lint` fails the build if one appears. Use a comma, colon, period or
parentheses instead. En-dashes for numeric ranges are fine.

## Branching and deployment

- **`development`** is the only branch for day-to-day work. All commits land here.
- **`main`** is production. Code reaches it only by merging `development` into
  `main` when a release is ready. Never commit to `main` directly.
- No standalone feature branches.

Only `main` deploys automatically, enforced in [`vercel.json`](vercel.json).
Pushing `main` triggers a production deploy; nothing else auto-deploys. To
preview another branch, run `vercel deploy` from it or trigger a redeploy from
the Vercel dashboard.
