"use client";

import { motion } from "framer-motion";
import { FaExclamationTriangle } from "react-icons/fa";

interface TeamErrorProps {
  error: string;
}

export default function TeamError({ error }: TeamErrorProps) {
  return (
    <section className="py-20" id="team">
      <div className="mx-auto max-w-(--breakpoint-xl) px-4">
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center rounded-2xl border border-red-200 bg-red-50 p-12 text-center dark:border-red-900/30 dark:bg-red-900/10"
          initial={{ opacity: 0, y: 20 }}
        >
          <div className="mb-4 rounded-full bg-red-100 p-4 text-red-500 dark:bg-red-900/20">
            <FaExclamationTriangle className="h-8 w-8" />
          </div>
          <h3 className="mb-2 font-bold text-gray-900 text-xl dark:text-white">
            Something went wrong
          </h3>
          <p className="max-w-md text-gray-600 dark:text-gray-400">
            We couldn't load the team members at this time. Please try again later.
          </p>
          <div className="mt-6 rounded-lg bg-red-100 px-4 py-2 font-mono text-red-600 text-sm dark:bg-red-900/30 dark:text-red-400">
            Error: {error}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
