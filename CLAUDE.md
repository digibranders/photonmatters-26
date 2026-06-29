# PhotonMatters Website — Project Instructions

## Preview viewport

**Always lock the browser preview to the desktop viewport.** This is the primary
design target for the site; mobile/tablet are secondary.

- Before taking any preview screenshot or verifying a change, set the viewport to
  desktop with `preview_resize` using **explicit dimensions** `width: 1440, height: 900`.
  Do **not** use `preset: "desktop"` — it resets to the window's native (often narrow)
  size instead of emulating a wide desktop viewport.
- Do **not** capture or reason about layout at mobile/tablet widths unless the user
  explicitly asks to check responsive behavior.
- If a fresh preview server is started, re-apply the desktop viewport before the
  first screenshot.

## Branching & deployment

**Branch model**

- **`development`** — the only branch for day-to-day local work. All coding,
  commits, and experimentation happen here.
- **`main`** — production only. Code reaches `main` exclusively by merging
  `development` → `main` when a release is ready for prod.
- **No standalone feature branches.** Do all work on `development`. If short-lived
  branches are ever needed, branch from `development`, merge back into it, and delete
  them — never let them linger.

**Rules for the agent**

- Never commit directly to `main`. If asked to "commit", commit to `development`
  (create it from `main` if it is missing).
- Promote to production only via an explicit `development` → `main` merge when the
  user asks to release.

**Deployment (Vercel)**

- Automatic deployments are **off for every branch except `main`**. Pushing `main`
  triggers a **production** deploy; nothing else auto-deploys.
- This is enforced in [`vercel.json`](vercel.json) via `git.deploymentEnabled`
  (`main: true`, `development: false`). Any future branch must also be added there as
  `false`, or — to cover all branches at once — set the Vercel dashboard
  **Settings → Git → Ignored Build Step** to:
  `bash -c '[ "$VERCEL_GIT_COMMIT_REF" = "main" ] && exit 1 || exit 0'`
  (exit 1 = build, exit 0 = skip), and set **Production Branch = `main`**.
- **Preview deploys are manual only.** To preview `development` (or any branch)
  without pushing to `main`, run `vercel deploy` (preview) or `vercel --prod=false`
  from the branch, or trigger a redeploy from the Vercel dashboard.
