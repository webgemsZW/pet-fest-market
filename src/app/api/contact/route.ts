import { Resend } from "resend";
import { getSiteSettings } from "@/lib/sanity/get-site-settings";

/**
 * Contact-form submission endpoint.
 *
 * The Contact page's `<ContactForm />` POSTs JSON here. We validate the
 * payload, run a honeypot check for bots, and send an email via Resend
 * to the destination address from Sanity Site Settings (falling back to
 * the hardcoded address below if Sanity isn't reachable).
 *
 * Required env var:
 *   RESEND_API_KEY — server-only, set in Vercel Production scope. The
 *   API key must have Sending Access on the verified `petfest.com.au`
 *   domain so the From address is allowed.
 *
 * Reply path: the visitor's email goes into the `replyTo` header so
 * Andrea can hit Reply in Gmail and respond directly without exposing
 * any other PetFest address.
 */

const FROM_ADDRESS = "PetFest Market <noreply@petfest.com.au>";
const FALLBACK_TO_ADDRESS = "petfest@nonconformity.com.au";

// Defensive length caps — protect against runaway form submissions or
// abuse. These are generous; the form's textarea allows much less in
// practice.
const MAX_NAME_LENGTH = 200;
const MAX_EMAIL_LENGTH = 200;
const MAX_SUBJECT_LENGTH = 200;
const MAX_MESSAGE_LENGTH = 5000;

interface ContactPayload {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
  /** Bot trap — humans never see / fill this field. */
  honeypot?: string;
}

export async function POST(req: Request) {
  let body: ContactPayload;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid request body" }, { status: 400 });
  }

  // Honeypot — if filled, pretend success without sending anything.
  // Telling the bot it was blocked just encourages probing.
  if (body.honeypot && body.honeypot.trim() !== "") {
    return Response.json({ ok: true });
  }

  const name = (body.name ?? "").trim();
  const email = (body.email ?? "").trim();
  const subject = (body.subject ?? "").trim();
  const message = (body.message ?? "").trim();

  const fieldErrors: Record<string, string> = {};
  if (!name) fieldErrors.name = "Required";
  else if (name.length > MAX_NAME_LENGTH) fieldErrors.name = "Too long";

  if (!email) fieldErrors.email = "Required";
  else if (email.length > MAX_EMAIL_LENGTH) fieldErrors.email = "Too long";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) fieldErrors.email = "Invalid email";

  if (subject.length > MAX_SUBJECT_LENGTH) fieldErrors.subject = "Too long";

  if (!message) fieldErrors.message = "Required";
  else if (message.length > MAX_MESSAGE_LENGTH) fieldErrors.message = "Too long";

  if (Object.keys(fieldErrors).length > 0) {
    return Response.json({ error: "Validation failed", fields: fieldErrors }, { status: 400 });
  }

  // Destination email — prefer the Sanity-managed value so Andrea can
  // change it in Studio without a redeploy.
  const siteSettings = await getSiteSettings();
  const to = siteSettings?.contactEmail?.trim() || FALLBACK_TO_ADDRESS;

  // The API key has to be present in production. If it's missing here
  // (e.g. forgot to set the env var on Vercel) we fail loudly server-
  // side and bubble a 500 to the client so the form shows an error and
  // the visitor knows to email directly. Better than silently dropping
  // their message.
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error(
      "[contact] RESEND_API_KEY not configured — message NOT sent. " +
        "Set the env var in Vercel and redeploy.",
    );
    return Response.json({ error: "Email service not configured" }, { status: 500 });
  }

  const resend = new Resend(apiKey);

  const subjectLine = subject
    ? `[Website] ${subject} — from ${name}`
    : `[Website] Contact form — from ${name}`;

  // Plain-text body (for email clients that prefer it).
  const textBody = [
    `From: ${name} <${email}>`,
    subject ? `Subject: ${subject}` : null,
    "",
    message,
    "",
    "—",
    "Sent via the PetFest Market website contact form.",
    `Hit Reply to respond directly to ${name}.`,
  ]
    .filter((line): line is string => line !== null)
    .join("\n");

  // HTML body — same content, nicer formatting.
  const htmlBody = `
    <p><strong>From:</strong> ${escapeHtml(name)} &lt;${escapeHtml(email)}&gt;</p>
    ${subject ? `<p><strong>Subject:</strong> ${escapeHtml(subject)}</p>` : ""}
    <hr/>
    <p style="white-space: pre-wrap;">${escapeHtml(message)}</p>
    <hr/>
    <p style="color:#888;font-size:12px;">
      Sent via the PetFest Market website contact form.
      Hit Reply to respond directly to ${escapeHtml(name)}.
    </p>
  `.trim();

  try {
    const result = await resend.emails.send({
      from: FROM_ADDRESS,
      to: [to],
      replyTo: email,
      subject: subjectLine,
      text: textBody,
      html: htmlBody,
    });

    if (result.error) {
      console.error("[contact] Resend reported error", result.error);
      return Response.json({ error: "Send failed" }, { status: 500 });
    }

    return Response.json({ ok: true });
  } catch (error) {
    console.error("[contact] Resend send threw", error);
    return Response.json({ error: "Send failed" }, { status: 500 });
  }
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
