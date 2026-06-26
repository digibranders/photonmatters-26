"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { SITE } from "@/lib/site";
import { cn } from "@/lib/cn";

type Status = "idle" | "submitting" | "success" | "error";

const COUNTRIES = ["Africa", "India", "Middle East", "Other"];

const fieldClass =
  "w-full rounded-md border border-line-strong bg-surface px-4 py-3 text-body text-ink placeholder:text-muted transition-colors focus:border-primary";
const labelClass = "mb-1.5 block text-caption font-semibold text-ink";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setError("");

    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data: { ok: boolean; error?: string } = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || "Something went wrong.");
      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error && err.message ? err.message : `Something went wrong. Please email ${SITE.email}.`);
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-start gap-4 rounded-2xl bg-sunken p-8">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-primary">
          <CheckCircle2 size={26} aria-hidden />
        </span>
        <p className="text-body-lg text-ink">
          Thanks — we’ve got your message and will reply within one business day.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      <input type="text" name="botcheck" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />

      <div>
        <label htmlFor="name" className={labelClass}>Full name</label>
        <input id="name" name="name" required autoComplete="name" className={fieldClass} placeholder="Your name" />
      </div>
      <div>
        <label htmlFor="email" className={labelClass}>Work email</label>
        <input id="email" name="email" type="email" required autoComplete="email" className={fieldClass} placeholder="you@company.com" />
      </div>
      <div>
        <label htmlFor="company" className={labelClass}>Company</label>
        <input id="company" name="company" autoComplete="organization" className={fieldClass} placeholder="Bank, NBFC or operator" />
      </div>
      <div>
        <label htmlFor="country" className={labelClass}>Country / region</label>
        <select id="country" name="country" required defaultValue="" className={cn(fieldClass, "appearance-none")}>
          <option value="" disabled>Select a region</option>
          {COUNTRIES.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="message" className={labelClass}>How can we help?</label>
        <textarea id="message" name="message" required rows={5} className={cn(fieldClass, "resize-y")} placeholder="Tell us about the lending journey you want to build." />
      </div>

      {status === "error" ? (
        <p role="alert" className="text-caption text-[color:var(--color-danger)]">
          {error}{" "}
          <a href={`mailto:${SITE.email}`} className="font-semibold underline">{SITE.email}</a>
        </p>
      ) : null}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-body-lg font-semibold text-white transition-colors duration-150 hover:bg-primary-hover disabled:opacity-60 sm:w-auto"
      >
        {status === "submitting" ? "Sending…" : "Send message"}
        {status === "submitting" ? null : <ArrowRight size={18} aria-hidden />}
      </button>
    </form>
  );
}
