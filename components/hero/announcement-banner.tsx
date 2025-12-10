"use client";

import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

export default function AnnouncementBanner() {
  return (
    <div className="relative isolate z-50 flex flex-col gap-2 overflow-hidden border-blue-100 border-b bg-gradient-to-r from-blue-50/80 via-white/80 to-blue-100/80 px-4 py-2.5 text-sm backdrop-blur-md md:flex-row md:items-center md:justify-center dark:border-blue-900/30 dark:from-blue-950/30 dark:via-gray-900/30 dark:to-blue-950/30">
      {/* Decorative gradients */}
      <div className="-z-10 absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-400/20 via-transparent to-transparent dark:from-blue-500/10" />

      {/* Content wrapper */}
      <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1.5 text-center">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-100/80 px-2.5 py-0.5 font-semibold text-blue-700 text-xs ring-1 ring-blue-200 ring-inset dark:bg-blue-500/10 dark:text-blue-300 dark:ring-blue-500/20">
          <Sparkles className="h-3 w-3" />
          <span>New</span>
        </span>

        <p className="text-gray-600 dark:text-gray-300">
          We just launched the new{" "}
          <span className="font-semibold text-gray-900 dark:text-white">
            Notification Generator
          </span>
        </p>

        <Link
          className="group inline-flex items-center gap-1 font-medium text-blue-600 transition-colors hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
          href="/notification-generator"
        >
          Check it out
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </div>
  );
}
