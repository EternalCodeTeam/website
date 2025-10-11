"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function AnnouncementBanner() {
  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <div className="relative isolate z-50 flex flex-col gap-2 overflow-hidden border-b border-gray-200 bg-gradient-to-r from-blue-50 via-white to-blue-100 px-4 py-3 text-sm dark:border-gray-700 dark:from-[#101010] dark:via-[#0f0f0f] dark:to-[#111] md:flex-row md:items-center md:justify-center">
        {/* Gradient background */}
        <div className="absolute inset-0 -z-10 blur-lg">
          <div className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-tr from-blue-300/30 via-indigo-300/20 to-transparent dark:from-blue-500/10" />
          <div className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-bl from-blue-300/30 via-purple-300/20 to-transparent dark:from-indigo-500/10" />
        </div>

        {/* Label */}
        <span className="inline-flex items-center gap-1 self-start rounded-full bg-white/70 px-3 py-0.5 text-xs font-semibold uppercase tracking-wide text-blue-800 shadow-sm ring-1 ring-inset ring-blue-200 backdrop-blur-sm dark:bg-white/5 dark:text-blue-300 dark:ring-blue-800/30 md:self-auto">
          <svg
            className="h-3.5 w-3.5 animate-pulse text-blue-500 dark:text-blue-400"
            fill="currentColor"
            viewBox="0 0 8 8"
          >
            <circle cx="4" cy="4" r="3" />
          </svg>
          New feature
        </span>

        {/* Text and CTA wrapper */}
        <div className="flex flex-col gap-1 md:flex-row md:items-center">
          <p className="font-medium text-gray-900 dark:text-white">
            We just launched the new{" "}
            <span className="font-semibold text-blue-700 dark:text-blue-400">
              Notification Generator
            </span>
            , fully interactive and customizable!
          </p>

          <Link
            href="/notification-generator"
            className="inline-flex items-center gap-1 text-sm font-semibold text-blue-700 transition-colors hover:text-indigo-700 dark:text-blue-400 dark:hover:text-indigo-300"
          >
            Try it now <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
