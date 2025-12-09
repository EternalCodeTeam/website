"use client";

import { useId } from "react";

import { cn } from "@/lib/utils";

export function FacadePattern({ className }: { className?: string }) {
  const id = useId();

  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden [mask-image:radial-gradient(ellipse_at_center,black_0%,transparent_80%)]",
        className
      )}
    >
      <svg
        className="absolute inset-0 h-full w-full stroke-gray-300/30 dark:stroke-gray-700/30"
        aria-hidden="true"
      >
        <defs>
          <pattern id={id} width="40" height="40" patternUnits="userSpaceOnUse" x="50%" y="-1">
            <path d="M.5 40V.5H40" fill="none" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" strokeWidth="0" fill={`url(#${id})`} />
      </svg>
    </div>
  );
}
