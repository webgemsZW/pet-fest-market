import React from "react";
import Image from "next/image";
import { urlFor } from "@/lib/sanity/image";
import type { EventDoc } from "@/lib/sanity/get-events";

const FALLBACK_IMAGE = "/images/og-default.png";

/**
 * Event artwork in a fixed frame (16:10 by default), showing the WHOLE image
 * with no cropping. Any aspect ratio the client uploads is fitted inside the
 * frame (object-contain), and the leftover space is filled with a blurred,
 * scaled copy of the same image — so a landscape photo, a portrait poster, or
 * a square flyer all look intentional. When the uploaded image is exactly the
 * frame's ratio (16:10 → recommend 2000×1250), it fills edge-to-edge and the
 * blur is never visible.
 *
 * Pass the frame ratio / alignment via `className` (e.g. "aspect-[16/10]").
 */
export function EventImage({
  event,
  className = "aspect-[16/10]",
  sizes,
  priority = false,
}: {
  event: EventDoc;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  const alt = event.image?.alt || event.eventName;
  const ref = event.image?.asset?._ref;

  // No per-event artwork → show the branded default image, filled.
  if (!ref) {
    return (
      <div className={`relative overflow-hidden bg-brand-50 ${className}`}>
        <Image
          src={FALLBACK_IMAGE}
          alt={alt}
          fill
          className="object-cover"
          sizes={sizes}
          priority={priority}
        />
      </div>
    );
  }

  const img = event.image as Parameters<typeof urlFor>[0];
  // Foreground: the whole image, never cropped (fit within the box).
  const foreground = urlFor(img).width(1920).height(1200).fit("max").url();
  // Background: a small cover crop, blurred via CSS to fill any letterbox gaps.
  const background = urlFor(img).width(640).height(400).fit("crop").url();

  return (
    <div className={`relative overflow-hidden bg-brand-50 ${className}`}>
      <Image
        src={background}
        alt=""
        aria-hidden="true"
        fill
        className="scale-110 object-cover blur-2xl"
        sizes={sizes}
      />
      <Image
        src={foreground}
        alt={alt}
        fill
        className="object-contain"
        sizes={sizes}
        priority={priority}
      />
    </div>
  );
}
