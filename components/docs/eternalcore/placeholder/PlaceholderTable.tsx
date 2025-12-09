"use client";

import { AnimatePresence, motion } from "framer-motion";

import type { Placeholder } from "@/components/docs/eternalcore/placeholder/types";
import { CopyToClipboard } from "@/components/ui/CopyToClipboard";
import { cn } from "@/lib/utils";

interface PlaceholderTableProps {
  placeholders: Placeholder[];
}

export function PlaceholderTable({ placeholders }: PlaceholderTableProps) {
  return (
    <div className="my-6 overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900/50">
      <table className="w-full text-left text-sm">
        <thead className="border-b border-gray-200 bg-gray-50/50 text-gray-900 dark:border-gray-800 dark:bg-gray-900/50 dark:text-gray-100">
          <tr>
            {["Placeholder", "Description", "Type", "Category", "Player Context"].map((header) => (
              <th key={header} className="px-4 py-3 font-semibold text-gray-900 dark:text-gray-100">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
          <AnimatePresence>
            {placeholders.map((p, i) => (
              <motion.tr
                key={p.name}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.2, delay: i * 0.01 }}
                className="transition-colors hover:bg-gray-50/50 dark:hover:bg-gray-800/50"
              >
                <td className="px-4 py-2 text-sm font-medium">
                  <CopyToClipboard text={p.name} className="inline-flex">
                    <code className="rounded-md border border-gray-200 bg-gray-100 px-1.5 py-0.5 font-mono text-blue-600 dark:border-gray-700/50 dark:bg-blue-500/10 dark:text-blue-400">
                      {p.name}
                    </code>
                  </CopyToClipboard>
                </td>
                <td className="px-4 py-2 text-gray-600 dark:text-gray-300">{p.description}</td>
                <td className="px-4 py-2">
                  <span className="rounded bg-purple-100 px-2 py-0.5 text-xs font-medium text-purple-700 dark:bg-purple-900/30 dark:text-purple-300">
                    {p.returnType}
                  </span>
                </td>
                <td className="px-4 py-2">
                  <span className="rounded bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600 dark:bg-gray-700 dark:text-gray-300">
                    {p.category}
                  </span>
                </td>
                <td className="px-4 py-2 text-center">
                  <span
                    className={cn(
                      "rounded px-2 py-0.5 text-xs font-medium",
                      p.requiresPlayer
                        ? "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300"
                        : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400"
                    )}
                  >
                    {p.requiresPlayer ? "Required" : "Optional"}
                  </span>
                </td>
              </motion.tr>
            ))}
          </AnimatePresence>
        </tbody>
      </table>
    </div>
  );
}
