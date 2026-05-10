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
}

const SUBJECTS = [
  "General Enquiry",
  "Vendor / Stall Application",
  "Sponsorship",
  "Media / Press",
  "Feedback",
  "Other",
];

export function ContactForm() {
  const [formState, setFormState] = useState<FormState>("idle");
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [data, setData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  function validate(): boolean {
    const newErrors: Partial<FormData> = {};
    if (!data.name.trim()) newErrors.name = "Please enter your name.";
    if (!data.email.trim()) newErrors.email = "Please enter your email address.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
      newErrors.email = "Please enter a valid email address.";
    if (!data.message.trim()) newErrors.message = "Please enter a message.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setFormState("submitting");
    // Simulate async submit (no backend yet)
    await new Promise((r) => setTimeout(r, 800));
    setFormState("success");
  }

  if (formState === "success") {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl bg-teal-50 p-12 text-center ring-1 ring-teal-100">
        <div className="text-4xl">🎉</div>
        <h3 className="mt-4 text-xl font-semibold text-gray-900">Message sent!</h3>
        <p className="mt-2 text-gray-500">
          Thanks for reaching out. We&apos;ll get back to you within 1–2 business days.
        </p>
        <Button
          variant="ghost"
          className="mt-6"
          onClick={() => {
            setFormState("idle");
            setData({ name: "", email: "", subject: "", message: "" });
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
            className="flex h-11 w-full rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm text-gray-900 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2"
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

        <Button
          type="submit"
          className="w-full"
          disabled={formState === "submitting"}
        >
          {formState === "submitting" ? "Sending…" : "Send Message"}
        </Button>
      </div>
    </form>
  );
}
