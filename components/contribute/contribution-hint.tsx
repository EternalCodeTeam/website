"use client";

import { motion } from "framer-motion";
import { HelpCircle } from "lucide-react";
import Link from "next/link";

export function ContributionHint() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.8 }}
      className="mt-20 text-center"
    >
      <div className="inline-flex items-center rounded-full border border-gray-200 bg-white px-6 py-2 shadow-xs dark:border-gray-800 dark:bg-gray-900/50">
        <HelpCircle className="mr-2 h-4 w-4 text-gray-500" />
        <span className="text-gray-600 text-sm dark:text-gray-400">
          Not sure where to start? Check our{" "}
          <Link href="/team" className="text-blue-500 hover:underline">
            Team page
          </Link>{" "}
          to see who's building this.
        </span>
      </div>
    </motion.div>
  );
}
