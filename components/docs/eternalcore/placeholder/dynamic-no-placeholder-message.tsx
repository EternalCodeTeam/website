"use client";

import { FadeIn } from "@/components/ui/motion/motion-components";

export function DynamicNoPlaceholderMessage() {
  return (
    <FadeIn className="py-12 text-center text-gray-500 dark:text-gray-400">
      No placeholders found.
    </FadeIn>
  );
}
