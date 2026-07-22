"use client";

import { useEffect } from "react";

/**
 * Loads Humanitix's pop-up widget script. Once loaded, it scans the page for
 * links whose href is a Humanitix ticket URL and turns them into pop-up
 * checkout triggers — the checkout opens in a modal over the site instead of
 * navigating away. If the script fails to load, those links still work as
 * ordinary links (graceful fallback).
 *
 * The script is a native ES module and must run after the trigger links are
 * in the DOM, so we inject it imperatively on mount (next/script is
 * unreliable with `type="module"`), guarded against duplicate injection.
 */
const SCRIPT_SRC = "https://events.humanitix.com/scripts/widgets/popup.js";

export function HumanitixPopup() {
  useEffect(() => {
    if (document.querySelector(`script[src="${SCRIPT_SRC}"]`)) return;
    const script = document.createElement("script");
    script.src = SCRIPT_SRC;
    script.type = "module";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return null;
}
