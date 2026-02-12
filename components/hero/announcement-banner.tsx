"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Sparkles, X } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

const BANNER_DISMISS_KEY = "announcement-banner-dismissed-v1";

export default function AnnouncementBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const dismissed = sessionStorage.getItem(BANNER_DISMISS_KEY);
    if (!dismissed) {
      setIsVisible(true);
    }
  }, []);

  const dismiss = useCallback(() => {
    setIsVisible(false);
    sessionStorage.setItem(BANNER_DISMISS_KEY, "1");
  }, []);

  return (
    <AnimatePresence>
      {!!isVisible && (
        <motion.div
          animate={{ height: "auto", opacity: 1 }}
          className="relative isolate overflow-hidden border-blue-200/60 border-b bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 dark:border-blue-800/40 dark:from-blue-900/90 dark:via-indigo-900/90 dark:to-blue-900/90"
          exit={{ height: 0, opacity: 0 }}
          initial={{ height: "auto", opacity: 1 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
        >
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMSIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjA1KSIvPjwvc3ZnPg==')] opacity-50" />

          <div className="relative mx-auto flex max-w-[90rem] items-center justify-center px-4 py-2">
            <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-center">
              <span className="inline-flex items-center gap-1 rounded-full bg-white/15 px-2 py-0.5 font-semibold text-white/95 text-xs backdrop-blur-sm">
                <Sparkles className="h-3 w-3" />
                New
              </span>

              <p className="text-sm text-white/90">
                Explore the latest <span className="font-semibold text-white">stable</span> and{" "}
                <span className="font-semibold text-white">dev</span> builds using the{" "}
                <span className="font-semibold text-white">Build Explorer</span>.
              </p>

              <Link
                className="group inline-flex items-center gap-1 font-medium text-sm text-white/95 underline decoration-white/30 underline-offset-2 transition-colors hover:decoration-white/60"
                href="/builds"
              >
                Check it out
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>

            <button
              aria-label="Dismiss announcement"
              className="absolute top-1/2 right-3 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full text-white/60 transition-colors hover:bg-white/10 hover:text-white"
              onClick={dismiss}
              type="button"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
