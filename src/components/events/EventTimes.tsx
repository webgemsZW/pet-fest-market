import type { EventTimeLine } from "@/lib/format-event-date";

/**
 * Trading hours from `formatEventTimes`: one line for a single-day market (or
 * identical hours every day), one line per day when the hours differ.
 */
export function EventTimes({ lines }: { lines: EventTimeLine[] }) {
  return (
    <span className="flex flex-col">
      {lines.map((line) => (
        <span key={line.label ?? line.text}>
          {line.label ? `${line.label}: ` : ""}
          {line.text}
        </span>
      ))}
    </span>
  );
}
