"use client";

import { useEffect } from "react";

/**
 * Humanitix inline embedded checkout.
 *
 * Renders the `<iframe data-checkout="...">` that Humanitix's widget script
 * turns into an on-page checkout, and loads that script.
 *
 * The script is a native ES module and must run AFTER the iframe is in the
 * DOM, so we inject it imperatively on mount (rather than next/script, which
 * is unreliable with `type="module"`), guarding against duplicate injection
 * if more than one checkout ever renders.
 */
const SCRIPT_SRC = "https://events.humanitix.com/scripts/widgets/inline.js";

export function HumanitixCheckout({ code }: { code: string }) {
  useEffect(() => {
    if (document.querySelector(`script[src="${SCRIPT_SRC}"]`)) return;
    const script = document.createElement("script");
    script.src = SCRIPT_SRC;
    script.type = "module";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <iframe
      data-checkout={code}
      title="Ticket checkout"
      className="w-full min-h-[640px] rounded-2xl border-0 bg-white"
    />
  );
}
