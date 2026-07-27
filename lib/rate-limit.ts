/**
 * Fixed-window, in-memory rate limiter.
 *
 * Scope note: state lives in the module closure, so each serverless instance
 * counts independently and limits reset on cold start. That makes this a cheap
 * brake on casual abuse and accidental double-submits, not a security control.
 * The honeypot and server-side validation are the real gates; if the contact
 * form ever attracts sustained abuse, move this to a shared store (Vercel KV,
 * Upstash) behind the same interface.
 */

interface Window {
  count: number;
  resetAt: number;
}

const windows = new Map<string, Window>();

/** Above this many tracked keys, expired entries are swept before inserting. */
const SWEEP_THRESHOLD = 500;

function sweepExpired(now: number): void {
  for (const [key, window] of windows) {
    if (window.resetAt <= now) windows.delete(key);
  }
}

export interface RateLimitResult {
  allowed: boolean;
  /** Seconds until the caller may retry. Zero when `allowed` is true. */
  retryAfterSeconds: number;
}

/**
 * Records a hit against `key` and reports whether it is within the limit.
 *
 * @param key         Caller identity, typically a client IP.
 * @param limit       Maximum hits allowed per window.
 * @param windowMs    Window length in milliseconds.
 */
export function rateLimit(key: string, limit: number, windowMs: number): RateLimitResult {
  const now = Date.now();
  const existing = windows.get(key);

  if (!existing || existing.resetAt <= now) {
    if (windows.size >= SWEEP_THRESHOLD) sweepExpired(now);
    windows.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, retryAfterSeconds: 0 };
  }

  if (existing.count >= limit) {
    return {
      allowed: false,
      retryAfterSeconds: Math.max(1, Math.ceil((existing.resetAt - now) / 1000)),
    };
  }

  existing.count += 1;
  return { allowed: true, retryAfterSeconds: 0 };
}
