"use client";

import { m } from "framer-motion";
import { HelpCircle } from "lucide-react";
import Link from "next/link";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

export function ContributionHint() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <m.div
      className="mt-20 text-center"
      initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
      transition={prefersReducedMotion ? { duration: 0 } : { delay: 0.2, duration: 0.5 }}
      viewport={prefersReducedMotion ? undefined : { once: true, margin: "-50px" }}
      whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
    >
      <div className="inline-flex items-center rounded-full border border-gray-200 bg-white px-6 py-2 shadow-xs dark:border-gray-800 dark:bg-gray-900/50">
        <HelpCircle className="mr-2 h-4 w-4 text-gray-500" />
        <span className="text-gray-600 text-sm dark:text-gray-400">
          Not sure where to start? Check our{" "}
          <Link className="text-blue-500 hover:underline" href="/team">
            Team page
          </Link>{" "}
          to see who's building this.
        </span>
      </div>
    </m.div>
  );
}
