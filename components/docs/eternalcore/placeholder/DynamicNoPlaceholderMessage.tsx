"use client";

import { motion } from "framer-motion";

export function DynamicNoPlaceholderMessage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="py-12 text-center text-gray-500 dark:text-gray-400"
    >
      No placeholders found.
    </motion.div>
  );
}
