"use client";

import React, { useState, useEffect } from "react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function getTimeLeft(target: Date): TimeLeft | null {
  const now = new Date();
  const diff = target.getTime() - now.getTime();
  if (diff <= 0) return null;

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((diff % (1000 * 60)) / 1000),
  };
}

type Variant = "dark" | "light";

const variantStyles: Record<Variant, { cell: string; label: string; finished: string }> = {
  // Original styling — designed to sit on the dark orange gradient in
  // CountdownSection. Kept as the default for backwards compatibility.
  dark: {
    cell: "bg-white/20 text-white",
    label: "text-brand-100",
    finished: "text-white",
  },
  // Light surface — for use on the hero gradient (brand-50 → brand-100).
  light: {
    cell: "bg-brand-600 text-white shadow-sm",
    label: "text-brand-700",
    finished: "text-brand-900",
  },
};

function TimeUnit({ value, label, variant }: { value: number; label: string; variant: Variant }) {
  const styles = variantStyles[variant];
  return (
    <div className="flex flex-col items-center gap-1">
      <div
        className={`flex h-16 w-16 items-center justify-center rounded-2xl text-3xl font-bold tabular-nums sm:h-20 sm:w-20 sm:text-4xl ${styles.cell}`}
      >
        {String(value).padStart(2, "0")}
      </div>
      <span className={`text-xs font-medium uppercase tracking-widest ${styles.label}`}>{label}</span>
    </div>
  );
}

interface CountdownTimerProps {
  /**
   * Target date as an ISO string (e.g. "2026-07-26T09:00:00+10:00").
   * Sourced from the current event in Site Settings.
   */
  eventDate: string;
  variant?: Variant;
}

export function CountdownTimer({ eventDate, variant = "dark" }: CountdownTimerProps) {
  const target = new Date(eventDate);
  const targetValid = !Number.isNaN(target.getTime());

  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);
  const styles = variantStyles[variant];

  useEffect(() => {
    if (!targetValid) return;
    setTimeLeft(getTimeLeft(target));
    const interval = setInterval(() => setTimeLeft(getTimeLeft(target)), 1000);
    return () => clearInterval(interval);
    // target is derived from `eventDate` — re-run when the date string changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eventDate]);

  if (!targetValid) return null;

  if (!timeLeft) {
    return (
      <div className="text-center">
        <p className={`text-2xl font-bold ${styles.finished}`}>
          The event has started — see you there! 🐾
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap justify-center gap-4" aria-label="Countdown to PetFest Market">
      <TimeUnit value={timeLeft.days} label="Days" variant={variant} />
      <TimeUnit value={timeLeft.hours} label="Hours" variant={variant} />
      <TimeUnit value={timeLeft.minutes} label="Mins" variant={variant} />
      <TimeUnit value={timeLeft.seconds} label="Secs" variant={variant} />
    </div>
  );
}
