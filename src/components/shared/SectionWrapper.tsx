import React from "react";
import { cn } from "@/lib/utils";

interface SectionWrapperProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  as?: "section" | "div" | "article";
}

export function SectionWrapper({
  children,
  className,
  id,
  as: Tag = "section",
}: SectionWrapperProps) {
  return (
    <Tag id={id} className={cn("py-16 sm:py-20 lg:py-24", className)}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">{children}</div>
    </Tag>
  );
}
