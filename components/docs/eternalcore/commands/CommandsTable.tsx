"use client";

import { AnimatePresence, motion } from "framer-motion";

import type { CommandData } from "@/components/docs/eternalcore/commands/types";
import { CopyToClipboard } from "@/components/ui/CopyToClipboard";

interface CommandsTableProps {
  commands: CommandData[];
}

export function CommandsTable({ commands }: CommandsTableProps) {
  return (
    <div className="my-6 overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900/50">
      <table className="w-full border-collapse text-left text-sm">
        <thead className="border-b border-gray-200 bg-gray-50/50 text-gray-900 dark:border-gray-800 dark:bg-gray-900/50 dark:text-gray-100">
          <tr>
            {["Source", "Permission", "Description", "Argument's"].map((h) => (
              <th key={h} className="px-4 py-3 font-semibold text-gray-900 dark:text-gray-100">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
          <AnimatePresence>
            {commands.map((c, i) => (
              <motion.tr
                key={`${c.name}-${i}`}
                initial={{ opacity: 0, y: 3 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -3 }}
                transition={{ duration: 0.15, delay: i * 0.01 }}
                className="transition-colors hover:bg-gray-50/50 dark:hover:bg-gray-800/50"
              >
                <td className="px-4 py-2 text-sm font-medium text-gray-900 dark:text-gray-100">
                  <CopyToClipboard text={c.name} className="inline-flex">
                    <code className="rounded-md border border-gray-200 bg-gray-100 px-1.5 py-0.5 text-blue-600 dark:border-gray-700/50 dark:bg-blue-500/10 dark:text-blue-400">
                      {c.name}
                    </code>
                  </CopyToClipboard>
                </td>
                <td className="px-4 py-2 text-sm text-gray-600 dark:text-gray-300">
                  {c.permission !== "-" ? (
                    <CopyToClipboard text={c.permission} className="inline-flex">
                      <code className="rounded-md border border-gray-200 bg-gray-100 px-1.5 py-0.5 text-purple-600 dark:border-gray-700/50 dark:bg-purple-500/10 dark:text-purple-400">
                        {c.permission}
                      </code>
                    </CopyToClipboard>
                  ) : (
                    <span className="text-gray-400">-</span>
                  )}
                </td>
                <td className="px-4 py-2 text-sm text-gray-600 dark:text-gray-300">
                  {c.description}
                </td>
                <td className="px-4 py-2 text-sm font-mono text-gray-500 dark:text-gray-400">
                  {c.arguments}
                </td>
              </motion.tr>
            ))}
          </AnimatePresence>
        </tbody>
      </table>
    </div>
  );
}
