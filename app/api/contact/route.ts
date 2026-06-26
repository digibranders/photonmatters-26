import { NextResponse } from "next/server";
import { SITE } from "@/lib/site";

interface ContactPayload {
  name?: string;
  email?: string;
  company?: string;
  country?: string;
  message?: string;
  /** Honeypot — must stay empty for real users. */
  botcheck?: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request): Promise<NextResponse> {
  let data: ContactPayload;
  try {
    data = (await req.json()) as ContactPayload;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  // Bot caught by honeypot — accept silently so the bot sees success.
  if (data.botcheck) {
    return NextResponse.json({ ok: true });
  }

  const name = data.name?.trim();
  const email = data.email?.trim();
  const country = data.country?.trim();
  const message = data.message?.trim();

  if (!name || !email || !country || !message) {
    return NextResponse.json(
      { ok: false, error: "Please complete all required fields." },
      { status: 400 },
    );
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json(
      { ok: false, error: "Please enter a valid email address." },
      { status: 400 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const text = [
    `Name: ${name}`,
    `Email: ${email}`,
    `Company: ${data.company?.trim() || "—"}`,
    `Country/region: ${country}`,
    "",
    message,
  ].join("\n");

  if (apiKey) {
    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: process.env.CONTACT_FROM ?? "PhotonMatters <onboarding@resend.dev>",
          to: [process.env.CONTACT_TO ?? SITE.email],
          reply_to: email,
          subject: `New enquiry — ${name}`,
          text,
        }),
      });
      if (!res.ok) {
        throw new Error(`Email provider responded ${res.status}`);
      }
    } catch {
      return NextResponse.json(
        { ok: false, error: "Could not send your message. Please email us directly." },
        { status: 502 },
      );
    }
  } else {
    // No email provider configured yet — log so the submission isn't lost in dev.
    console.info("[contact] received (no email provider configured):", {
      name,
      email,
      company: data.company,
      country,
    });
  }

  return NextResponse.json({ ok: true });
}
