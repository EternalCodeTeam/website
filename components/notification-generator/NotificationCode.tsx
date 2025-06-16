"use client";

import { motion } from "framer-motion";

import { AlertBox } from "@/components/ui/AlertBox";

interface NotificationCodeProps {
  yamlCode: string;
}

export function NotificationCode({ yamlCode }: NotificationCodeProps) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <AlertBox type="important" title="How to disable message completely?">
        If you want to disable this message completely, set its value to{" "}
        <code className="rounded bg-gray-200 px-1 py-0.5 text-xs text-gray-800 dark:bg-gray-700 dark:text-gray-100">
          []
        </code>{" "}
        in your configuration file.
      </AlertBox>
      <motion.div
        className="relative"
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.4, type: "spring", stiffness: 100 }}
      >
        <motion.pre
          className="overflow-x-auto rounded-md bg-gray-100 p-4 font-mono text-sm dark:bg-gray-900"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <motion.code
            className="text-gray-800 dark:text-gray-200"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            {yamlCode}
          </motion.code>
        </motion.pre>
      </motion.div>

      <motion.div
        className="mt-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.3 }}
      >
        <motion.h3
          className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2, delay: 0.4 }}
        >
          How to use this code:
        </motion.h3>
        <motion.ol
          className="list-inside list-decimal space-y-1 text-sm text-gray-600 dark:text-gray-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.5 }}
        >
          <motion.li
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2, delay: 0.6 }}
          >
            Copy the generated YAML code
          </motion.li>
          <motion.li
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2, delay: 0.7 }}
          >
            Paste it into your EternalCore configuration file
          </motion.li>
          <motion.li
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2, delay: 0.8 }}
          >
            Replace "example" with your desired notification name
          </motion.li>
          <motion.li
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2, delay: 0.9 }}
          >
            Save the file and reload your server
          </motion.li>
        </motion.ol>
      </motion.div>
    </motion.div>
  );
}
