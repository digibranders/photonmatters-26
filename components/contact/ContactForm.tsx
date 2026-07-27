"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { SITE } from "@/lib/site";
import { cn } from "@/lib/cn";
import { Select } from "@/components/ui/Select";

type Status = "idle" | "submitting" | "success" | "error";
type FieldName = "name" | "email" | "country" | "message";
type FieldErrors = Partial<Record<FieldName, string>>;

const COUNTRIES = ["Africa", "India", "Middle East", "Other"];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Mirrors the server-side caps in `app/api/contact/route.ts`. */
const MAX_LENGTH = { name: 120, email: 254, company: 160, message: 5000 } as const;

const fieldClass =
  "w-full rounded-xl border border-line bg-sunken px-4 py-3.5 text-body text-ink placeholder:text-muted outline-none transition-all duration-200 focus:border-[color:rgba(126,73,242,0.5)] focus:bg-surface focus:shadow-[0_0_0_4px_rgba(126,73,242,0.12)]";
const invalidClass =
  "!border-[color:var(--color-danger)] focus:!shadow-[0_0_0_4px_rgba(220,38,38,0.12)]";
const labelClass = "mb-1.5 block text-caption font-semibold text-ink";
const errorTextClass = "mt-1.5 text-caption text-[color:var(--color-danger)]";

function validate(values: Record<FieldName, string>): FieldErrors {
  const errors: FieldErrors = {};
  if (!values.name.trim()) errors.name = "Please enter your name.";
  if (!values.email.trim()) errors.email = "Please enter your work email.";
  else if (!EMAIL_RE.test(values.email.trim())) errors.email = "That email address doesn’t look right.";
  if (!values.country.trim()) errors.country = "Please choose a region.";
  if (!values.message.trim()) errors.message = "Please tell us how we can help.";
  return errors;
}

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});

  const clearError = (field: FieldName) =>
    setErrors((prev) => (prev[field] ? { ...prev, [field]: undefined } : prev));

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const raw = Object.fromEntries(new FormData(form).entries());
    const values: Record<FieldName, string> = {
      name: String(raw.name ?? ""),
      email: String(raw.email ?? ""),
      country: String(raw.country ?? ""),
      message: String(raw.message ?? ""),
    };

    const nextErrors = validate(values);
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      setStatus("idle");
      const first = (["name", "email", "country", "message"] as FieldName[]).find((f) => nextErrors[f]);
      if (first) document.getElementById(first)?.focus();
      return;
    }

    setErrors({});
    setStatus("submitting");
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(raw),
      });
      const data: { ok: boolean; error?: string } = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || "Something went wrong.");
      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error && err.message ? err.message : "Something went wrong.");
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-start gap-4 rounded-2xl bg-sunken p-8">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-primary">
          <CheckCircle2 size={26} aria-hidden />
        </span>
        <p className="text-body-lg text-ink">
          Thanks, we’ve got your message and will reply within one business day.
        </p>
        <p className="text-caption text-secondary">
          A confirmation is on its way to your inbox. If it isn’t there in a few minutes,
          check your spam folder.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      <input type="text" name="botcheck" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />

      <div>
        <label htmlFor="name" className={labelClass}>Full name</label>
        <input
          id="name"
          name="name"
          autoComplete="name"
          maxLength={MAX_LENGTH.name}
          className={cn(fieldClass, errors.name && invalidClass)}
          placeholder="Your name"
          aria-invalid={errors.name ? true : undefined}
          aria-describedby={errors.name ? "name-error" : undefined}
          onInput={() => clearError("name")}
        />
        {errors.name ? <p id="name-error" className={errorTextClass}>{errors.name}</p> : null}
      </div>
      <div>
        <label htmlFor="email" className={labelClass}>Work email</label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          maxLength={MAX_LENGTH.email}
          className={cn(fieldClass, errors.email && invalidClass)}
          placeholder="you@company.com"
          aria-invalid={errors.email ? true : undefined}
          aria-describedby={errors.email ? "email-error" : undefined}
          onInput={() => clearError("email")}
        />
        {errors.email ? <p id="email-error" className={errorTextClass}>{errors.email}</p> : null}
      </div>
      <div>
        <label htmlFor="company" className={labelClass}>Company</label>
        <input
          id="company"
          name="company"
          autoComplete="organization"
          maxLength={MAX_LENGTH.company}
          className={fieldClass}
          placeholder="Bank, NBFC or operator"
        />
      </div>
      <div>
        <label id="country-label" htmlFor="country" className={labelClass}>Country / region</label>
        <Select
          id="country"
          name="country"
          required
          labelledBy="country-label"
          describedBy={errors.country ? "country-error" : undefined}
          invalid={Boolean(errors.country)}
          placeholder="Select a region"
          options={COUNTRIES}
          className={fieldClass}
          onValueChange={() => clearError("country")}
        />
        {errors.country ? <p id="country-error" className={errorTextClass}>{errors.country}</p> : null}
      </div>
      <div>
        <label htmlFor="message" className={labelClass}>How can we help?</label>
        <textarea
          id="message"
          name="message"
          rows={5}
          maxLength={MAX_LENGTH.message}
          className={cn(fieldClass, "resize-y", errors.message && invalidClass)}
          placeholder="Tell us about the lending journey you want to build."
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={errors.message ? "message-error" : undefined}
          onInput={() => clearError("message")}
        />
        {errors.message ? <p id="message-error" className={errorTextClass}>{errors.message}</p> : null}
      </div>

      {status === "error" ? (
        <p role="alert" className="text-caption text-[color:var(--color-danger)]">
          {error} Please email us at{" "}
          <a href={`mailto:${SITE.email}`} className="font-semibold underline">{SITE.email}</a>.
        </p>
      ) : null}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="group/btn mt-1 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-body-lg font-semibold text-white shadow-lg shadow-[rgba(126,73,242,0.22)] transition-colors duration-150 hover:bg-accent hover:text-ink hover:shadow-[rgba(242,203,7,0.28)] disabled:opacity-60"
      >
        {status === "submitting" ? "Sending…" : "Send message"}
        {status === "submitting" ? null : (
          <ArrowRight size={18} aria-hidden className="transition-transform duration-150 group-hover/btn:translate-x-0.5" />
        )}
      </button>
    </form>
  );
}
