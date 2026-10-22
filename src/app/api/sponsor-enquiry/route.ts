import { Resend } from "resend";
import { getSiteSettings } from "@/lib/sanity/get-site-settings";

/**
 * Sponsor-enquiry submission endpoint.
 *
 * The /sponsors page's `<SponsorEnquiryForm />` POSTs JSON here. Same
 * mechanics as /api/contact (validate, honeypot, email via Resend to the
 * Site Settings contact address) — it's a separate route only so the
 * enquiry carries the extra Business / Phone fields and lands in Andrea's
 * inbox with its own subject line.
 *
 * Required env var: RESEND_API_KEY (same one /api/contact uses).
 */

const FROM_ADDRESS = "PetFest Market <noreply@petfest.com.au>";
const FALLBACK_TO_ADDRESS = "petfest@nonconformity.com.au";
const EMAIL_SUBJECT = "Sponsorship Enquiry";

const MAX_NAME_LENGTH = 200;
const MAX_BUSINESS_LENGTH = 200;
const MAX_PHONE_LENGTH = 50;
const MAX_EMAIL_LENGTH = 200;
const MAX_MESSAGE_LENGTH = 5000;

interface SponsorEnquiryPayload {
  name?: string;
  business?: string;
  phone?: string;
  email?: string;
  message?: string;
  /** Bot trap — humans never see / fill this field. */
  honeypot?: string;
}

export async function POST(req: Request) {
  let body: SponsorEnquiryPayload;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid request body" }, { status: 400 });
  }

  // Honeypot — if filled, pretend success without sending anything.
  if (body.honeypot && body.honeypot.trim() !== "") {
    return Response.json({ ok: true });
  }

  const name = (body.name ?? "").trim();
  const business = (body.business ?? "").trim();
  const phone = (body.phone ?? "").trim();
  const email = (body.email ?? "").trim();
  const message = (body.message ?? "").trim();

  const fieldErrors: Record<string, string> = {};
  if (!name) fieldErrors.name = "Required";
  else if (name.length > MAX_NAME_LENGTH) fieldErrors.name = "Too long";

  if (!business) fieldErrors.business = "Required";
  else if (business.length > MAX_BUSINESS_LENGTH) fieldErrors.business = "Too long";

  // Phone is optional — only validated when supplied.
  if (phone.length > MAX_PHONE_LENGTH) fieldErrors.phone = "Too long";
  else if (phone && !/^[0-9+()\-\s.]{6,}$/.test(phone)) fieldErrors.phone = "Invalid phone";

  if (!email) fieldErrors.email = "Required";
  else if (email.length > MAX_EMAIL_LENGTH) fieldErrors.email = "Too long";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) fieldErrors.email = "Invalid email";

  if (!message) fieldErrors.message = "Required";
  else if (message.length > MAX_MESSAGE_LENGTH) fieldErrors.message = "Too long";

  if (Object.keys(fieldErrors).length > 0) {
    return Response.json({ error: "Validation failed", fields: fieldErrors }, { status: 400 });
  }

  const siteSettings = await getSiteSettings();
  const to = siteSettings?.contactEmail?.trim() || FALLBACK_TO_ADDRESS;

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error(
      "[sponsor-enquiry] RESEND_API_KEY not configured — message NOT sent. " +
        "Set the env var in Vercel and redeploy.",
    );
    return Response.json({ error: "Email service not configured" }, { status: 500 });
  }

  const resend = new Resend(apiKey);

  const textBody = [
    `Name: ${name}`,
    `Business: ${business}`,
    `Phone: ${phone || "(not provided)"}`,
    `Email: ${email}`,
    "",
    message,
    "",
    "—",
    "Sent via the PetFest Market website sponsor enquiry form.",
    `Hit Reply to respond directly to ${name}.`,
  ].join("\n");

  const htmlBody = `
    <p>
      <strong>Name:</strong> ${escapeHtml(name)}<br/>
      <strong>Business:</strong> ${escapeHtml(business)}<br/>
      <strong>Phone:</strong> ${phone ? escapeHtml(phone) : "(not provided)"}<br/>
      <strong>Email:</strong> ${escapeHtml(email)}
    </p>
    <hr/>
    <p style="white-space: pre-wrap;">${escapeHtml(message)}</p>
    <hr/>
    <p style="color:#888;font-size:12px;">
      Sent via the PetFest Market website sponsor enquiry form.
      Hit Reply to respond directly to ${escapeHtml(name)}.
    </p>
  `.trim();

  try {
    const result = await resend.emails.send({
      from: FROM_ADDRESS,
      to: [to],
      replyTo: email,
      subject: EMAIL_SUBJECT,
      text: textBody,
      html: htmlBody,
    });

    if (result.error) {
      console.error("[sponsor-enquiry] Resend reported error", result.error);
      return Response.json({ error: "Send failed" }, { status: 500 });
    }

    return Response.json({ ok: true });
  } catch (error) {
    console.error("[sponsor-enquiry] Resend send threw", error);
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
