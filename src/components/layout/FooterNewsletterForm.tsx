"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function FooterNewsletterForm() {
  return (
    <form className="flex flex-col gap-2" onSubmit={(e) => e.preventDefault()}>
      <Input
        type="email"
        placeholder="your@email.com.au"
        aria-label="Email address"
        className="border-teal-700 bg-teal-800 text-white placeholder:text-teal-500 focus-visible:ring-teal-400"
      />
      <Button type="submit" variant="secondary" className="w-full">
        Subscribe
      </Button>
    </form>
  );
}
