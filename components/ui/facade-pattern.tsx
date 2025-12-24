"use client";

import { useId } from "react";

import { cn } from "@/lib/utils";

export function FacadePattern({ className }: { className?: string }) {
  const id = useId();

  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 transform-gpu overflow-hidden will-change-transform [mask-image:radial-gradient(ellipse_at_center,black_0%,transparent_80%)]",
        className
      )}
    >
      <svg
        aria-hidden="true"
        className="absolute inset-0 h-full w-full stroke-gray-300/30 dark:stroke-gray-700/30"
      >
        <defs>
          <pattern height="40" id={id} patternUnits="userSpaceOnUse" width="40" x="50%" y="-1">
            <path d="M.5 40V.5H40" fill="none" />
          </pattern>
        </defs>
        <rect fill={`url(#${id})`} height="100%" strokeWidth="0" width="100%" />
      </svg>
    </div>
  );
}
