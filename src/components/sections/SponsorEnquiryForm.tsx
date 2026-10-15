"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

type FormState = "idle" | "submitting" | "success" | "error";

interface FormData {
  name: string;
  business: string;
  phone: string;
  email: string;
  message: string;
  /** Bot honeypot — hidden field humans don't see. */
  honeypot: string;
}

type FieldErrors = Partial<Omit<FormData, "honeypot">>;

const EMPTY_FORM: FormData = {
  name: "",
  business: "",
  phone: "",
  email: "",
  message: "",
  honeypot: "",
};

// Shown when the API call fails so the visitor can still reach the team.
const FALLBACK_CONTACT_EMAIL = "petfest@nonconformity.com.au";

export function SponsorEnquiryForm() {
  const [formState, setFormState] = useState<FormState>("idle");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const [data, setData] = useState<FormData>(EMPTY_FORM);

  function validate(): boolean {
    const newErrors: FieldErrors = {};
    if (!data.name.trim()) newErrors.name = "Please enter your name.";
    if (!data.business.trim()) newErrors.business = "Please enter your business name.";
    if (data.phone.trim() && !/^[0-9+()\-\s.]{6,}$/.test(data.phone.trim()))
      newErrors.phone = "Please enter a valid phone number.";
    if (!data.email.trim()) newErrors.email = "Please enter your email address.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
      newErrors.email = "Please enter a valid email address.";
    if (!data.message.trim()) newErrors.message = "Please enter a message.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
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
      const res = await fetch("/api/sponsor-enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const json = (await res.json().catch(() => ({}))) as {
          error?: string;
          fields?: FieldErrors;
        };
        if (json.fields) setErrors(json.fields);
        setServerError(json.error || "Send failed");
        setFormState("error");
        return;
      }

      setFormState("success");
    } catch (err) {
      console.error("[sponsor-enquiry] submit failed", err);
      setServerError("Network error — please try again, or email us directly.");
      setFormState("error");
    }
  }

  if (formState === "success") {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl bg-brand-50 p-12 text-center ring-1 ring-brand-100">
        <div className="text-4xl">🎉</div>
        <h3 className="mt-4 text-xl font-semibold text-gray-900">Enquiry sent!</h3>
        <p className="mt-2 text-gray-500">
          Thanks for your interest in sponsoring PetFest Market. We&apos;ll be in touch soon.
        </p>
        <Button
          variant="ghost"
          className="mt-6"
          onClick={() => {
            setFormState("idle");
            setData(EMPTY_FORM);
            setErrors({});
            setServerError(null);
          }}
        >
          Send another enquiry
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl bg-white p-6 text-left shadow-sm ring-1 ring-gray-100 sm:p-8"
      noValidate
    >
      <div className="space-y-5">
        {/* Honeypot — hidden off-screen and from assistive tech; the API
            silently swallows any submission where it's filled in. */}
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
          <label htmlFor="sponsor-website">Website (leave blank)</label>
          <input
            type="text"
            id="sponsor-website"
            name="honeypot"
            tabIndex={-1}
            autoComplete="off"
            value={data.honeypot}
            onChange={handleChange}
          />
        </div>

        {/* Name */}
        <div className="space-y-1.5">
          <Label htmlFor="sponsor-name">Name</Label>
          <Input
            id="sponsor-name"
            name="name"
            type="text"
            autoComplete="name"
            value={data.name}
            onChange={handleChange}
            aria-describedby={errors.name ? "sponsor-name-error" : undefined}
            aria-invalid={!!errors.name}
          />
          {errors.name && (
            <p id="sponsor-name-error" className="text-xs text-red-500">
              {errors.name}
            </p>
          )}
        </div>

        {/* Business */}
        <div className="space-y-1.5">
          <Label htmlFor="sponsor-business">Business</Label>
          <Input
            id="sponsor-business"
            name="business"
            type="text"
            autoComplete="organization"
            value={data.business}
            onChange={handleChange}
            aria-describedby={errors.business ? "sponsor-business-error" : undefined}
            aria-invalid={!!errors.business}
          />
          {errors.business && (
            <p id="sponsor-business-error" className="text-xs text-red-500">
              {errors.business}
            </p>
          )}
        </div>

        {/* Phone (optional) */}
        <div className="space-y-1.5">
          <Label htmlFor="sponsor-phone">
            Phone <span className="font-normal text-gray-400">(optional)</span>
          </Label>
          <Input
            id="sponsor-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            value={data.phone}
            onChange={handleChange}
            aria-describedby={errors.phone ? "sponsor-phone-error" : undefined}
            aria-invalid={!!errors.phone}
          />
          {errors.phone && (
            <p id="sponsor-phone-error" className="text-xs text-red-500">
              {errors.phone}
            </p>
          )}
        </div>

        {/* Email */}
        <div className="space-y-1.5">
          <Label htmlFor="sponsor-email">Email</Label>
          <Input
            id="sponsor-email"
            name="email"
            type="email"
            autoComplete="email"
            value={data.email}
            onChange={handleChange}
            aria-describedby={errors.email ? "sponsor-email-error" : undefined}
            aria-invalid={!!errors.email}
          />
          {errors.email && (
            <p id="sponsor-email-error" className="text-xs text-red-500">
              {errors.email}
            </p>
          )}
        </div>

        {/* Message */}
        <div className="space-y-1.5">
          <Label htmlFor="sponsor-message">Message</Label>
          <Textarea
            id="sponsor-message"
            name="message"
            value={data.message}
            onChange={handleChange}
            rows={5}
            aria-describedby={errors.message ? "sponsor-message-error" : undefined}
            aria-invalid={!!errors.message}
          />
          {errors.message && (
            <p id="sponsor-message-error" className="text-xs text-red-500">
              {errors.message}
            </p>
          )}
        </div>

        {formState === "error" && serverError && (
          <div className="rounded-xl bg-red-50 p-4 text-sm text-red-700 ring-1 ring-red-100">
            <p className="font-medium">Something went wrong sending your enquiry.</p>
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
          {formState === "submitting" ? "Sending…" : "Send Enquiry"}
        </Button>
      </div>
    </form>
  );
}
