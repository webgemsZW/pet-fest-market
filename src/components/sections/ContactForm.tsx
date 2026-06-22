"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

type FormState = "idle" | "submitting" | "success" | "error";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  /** Bot honeypot — hidden field humans don't see. */
  honeypot: string;
}

type FieldErrors = Partial<Omit<FormData, "honeypot">>;

const SUBJECTS = [
  "General Enquiry",
  "Stallholder Application",
  "Sponsorship",
  "Media / Press",
  "Feedback",
  "Other",
];

// Fallback email shown to visitors when the form's API call fails — gives
// them a way to still reach Andrea even if the email service is down.
const FALLBACK_CONTACT_EMAIL = "petfest@nonconformity.com.au";

export function ContactForm() {
  const [formState, setFormState] = useState<FormState>("idle");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const [data, setData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
    honeypot: "",
  });

  function validate(): boolean {
    const newErrors: FieldErrors = {};
    if (!data.name.trim()) newErrors.name = "Please enter your name.";
    if (!data.email.trim()) newErrors.email = "Please enter your email address.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
      newErrors.email = "Please enter a valid email address.";
    if (!data.message.trim()) newErrors.message = "Please enter a message.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
    if (name in errors && errors[name as keyof FieldErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
    if (serverError) setServerError(null);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setFormState("submitting");
    setServerError(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        // Read the error body if we can — server may have returned
        // field-level validation errors as { fields: {...} }.
        const json = (await res.json().catch(() => ({}))) as {
          error?: string;
          fields?: FieldErrors;
        };
        if (json.fields) {
          setErrors(json.fields);
        }
        setServerError(json.error || "Send failed");
        setFormState("error");
        return;
      }

      setFormState("success");
    } catch (err) {
      // Network-level failure (offline, DNS, etc.) — fetch itself rejected.
      console.error("[contact] submit failed", err);
      setServerError("Network error — please try again, or email us directly.");
      setFormState("error");
    }
  }

  if (formState === "success") {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl bg-brand-50 p-12 text-center ring-1 ring-brand-100">
        <div className="text-4xl">🎉</div>
        <h3 className="mt-4 text-xl font-semibold text-gray-900">Message sent!</h3>
        <p className="mt-2 text-gray-500">
          Thanks for reaching out. We&apos;ll be in touch soon.
        </p>
        <Button
          variant="ghost"
          className="mt-6"
          onClick={() => {
            setFormState("idle");
            setData({ name: "", email: "", subject: "", message: "", honeypot: "" });
            setErrors({});
            setServerError(null);
          }}
        >
          Send another message
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100 sm:p-8"
      noValidate
    >
      <div className="space-y-5">
        {/*
          Honeypot field — bots auto-fill any visible input named like
          a contact field; humans never see this one because it's hidden
          off-screen AND from screen readers + the tab order. The API
          treats any non-empty value as a bot and silently swallows the
          submission.
        */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            left: "-9999px",
            top: "auto",
            width: "1px",
            height: "1px",
            overflow: "hidden",
          }}
        >
          <label htmlFor="contact-website">Website (leave blank)</label>
          <input
            type="text"
            id="contact-website"
            name="honeypot"
            tabIndex={-1}
            autoComplete="off"
            value={data.honeypot}
            onChange={handleChange}
          />
        </div>

        {/* Name */}
        <div className="space-y-1.5">
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder="Jane Smith"
            value={data.name}
            onChange={handleChange}
            aria-describedby={errors.name ? "name-error" : undefined}
            aria-invalid={!!errors.name}
          />
          {errors.name && (
            <p id="name-error" className="text-xs text-red-500">
              {errors.name}
            </p>
          )}
        </div>

        {/* Email */}
        <div className="space-y-1.5">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="jane@example.com.au"
            value={data.email}
            onChange={handleChange}
            aria-describedby={errors.email ? "email-error" : undefined}
            aria-invalid={!!errors.email}
          />
          {errors.email && (
            <p id="email-error" className="text-xs text-red-500">
              {errors.email}
            </p>
          )}
        </div>

        {/* Subject */}
        <div className="space-y-1.5">
          <Label htmlFor="subject">Subject</Label>
          <select
            id="subject"
            name="subject"
            value={data.subject}
            onChange={handleChange}
            className="flex h-11 w-full rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm text-gray-900 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
          >
            <option value="">Select a topic…</option>
            {SUBJECTS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        {/* Message */}
        <div className="space-y-1.5">
          <Label htmlFor="message">Message</Label>
          <Textarea
            id="message"
            name="message"
            placeholder="How can we help?"
            value={data.message}
            onChange={handleChange}
            rows={5}
            aria-describedby={errors.message ? "message-error" : undefined}
            aria-invalid={!!errors.message}
          />
          {errors.message && (
            <p id="message-error" className="text-xs text-red-500">
              {errors.message}
            </p>
          )}
        </div>

        {/* Server error — shown only when the API call failed. Provides
            a mailto fallback so the visitor isn't stuck. */}
        {formState === "error" && serverError && (
          <div className="rounded-xl bg-red-50 p-4 text-sm text-red-700 ring-1 ring-red-100">
            <p className="font-medium">Something went wrong sending your message.</p>
            <p className="mt-1">
              Please try again, or email us directly at{" "}
              <a
                className="underline underline-offset-2 hover:text-red-800"
                href={`mailto:${FALLBACK_CONTACT_EMAIL}`}
              >
                {FALLBACK_CONTACT_EMAIL}
              </a>
              .
            </p>
          </div>
        )}

        <Button type="submit" className="w-full" disabled={formState === "submitting"}>
          {formState === "submitting" ? "Sending…" : "Send Message"}
        </Button>
      </div>
    </form>
  );
}
