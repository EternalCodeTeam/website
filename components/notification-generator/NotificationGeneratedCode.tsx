"use client";

import { motion } from "framer-motion";

import { AlertBox } from "@/components/ui/alert-box";
import { fadeIn, slideInLeft, containerStagger } from "@/lib/animations/variants";
import { FadeIn, SlideIn } from "@/components/ui/motion/MotionComponents";

interface NotificationCodeProps {
  yamlCode: string;
}

export function NotificationGeneratedCode({ yamlCode }: NotificationCodeProps) {
  return (
    <FadeIn>
      <AlertBox type="important" title="How to disable message completely?">
        If you want to disable this message completely, set its value to{" "}
        <code className="rounded-sm bg-gray-200 px-1 py-0.5 text-xs text-gray-800 dark:bg-gray-700 dark:text-gray-100">
          []
        </code>{" "}
        in your configuration file.
      </AlertBox>

      <SlideIn direction="up" delay={0.1} className="relative">
        <motion.pre
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          transition={{ delay: 0.2 }}
          className="overflow-x-auto rounded-md bg-gray-100 p-4 font-mono text-sm dark:bg-gray-900"
        >
          <motion.code
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: 0.3 }}
            className="whitespace-pre text-gray-800 dark:text-gray-200"
          >
            {yamlCode}
          </motion.code>
        </motion.pre>
      </SlideIn>

      <SlideIn direction="up" delay={0.4} className="mt-4">
        <motion.h3
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          transition={{ delay: 0.5 }}
          className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          How to use this code:
        </motion.h3>

        <motion.ol
          variants={containerStagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          transition={{ delay: 0.6 }}
          className="list-inside list-decimal space-y-1 text-sm text-gray-600 dark:text-gray-400"
        >
          <motion.li variants={slideInLeft}>Copy the generated YAML code</motion.li>
          <motion.li variants={slideInLeft}>
            Paste it into your EternalCore configuration file
          </motion.li>
          <motion.li variants={slideInLeft}>
            Replace &quot;example&quot; with your desired notification name
          </motion.li>
          <motion.li variants={slideInLeft}>Save the file and reload your server</motion.li>
        </motion.ol>
      </SlideIn>
    </FadeIn>
  );
}
