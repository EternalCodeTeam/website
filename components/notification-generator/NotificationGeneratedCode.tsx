"use client";

import AnimatedContainer from "@/components/animations/AnimatedContainer";
import AnimatedElement from "@/components/animations/AnimatedElement";
import { AlertBox } from "@/components/ui/alert-box";

interface NotificationCodeProps {
  yamlCode: string;
}

export function NotificationGeneratedCode({ yamlCode }: NotificationCodeProps) {
  return (
    <AnimatedElement animationType="fade">
      <AlertBox type="important" title="How to disable message completely?">
        If you want to disable this message completely, set its value to{" "}
        <code className="rounded bg-gray-200 px-1 py-0.5 text-xs text-gray-800 dark:bg-gray-700 dark:text-gray-100">
          []
        </code>{" "}
        in your configuration file.
      </AlertBox>

      <AnimatedElement animationType="fadeUp" delay={0.1} className="relative">
        <AnimatedElement as="pre" animationType="fade" delay={0.2}
          className="overflow-x-auto rounded-md bg-gray-100 p-4 font-mono text-sm dark:bg-gray-900">
          <AnimatedElement as="code" animationType="fade" delay={0.3}
            className="text-gray-800 dark:text-gray-200 whitespace-pre"
          >
            {yamlCode}
          </AnimatedElement>
        </AnimatedElement>
      </AnimatedElement>

      <AnimatedElement animationType="fadeUp" delay={0.4} className="mt-4">
        <AnimatedElement as="h3" animationType="fade" delay={0.5}
          className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
          How to use this code:
        </AnimatedElement>

        <AnimatedContainer as="ol" staggerDelay={0.1} delay={0.6}
          className="list-inside list-decimal space-y-1 text-sm text-gray-600 dark:text-gray-400">
          <AnimatedElement as="li" animationType="fadeLeft">
            Copy the generated YAML code
          </AnimatedElement>
          <AnimatedElement as="li" animationType="fadeLeft">
            Paste it into your EternalCore configuration file
          </AnimatedElement>
          <AnimatedElement as="li" animationType="fadeLeft">
            Replace "example" with your desired notification name
          </AnimatedElement>
          <AnimatedElement as="li" animationType="fadeLeft">
            Save the file and reload your server
          </AnimatedElement>
        </AnimatedContainer>
      </AnimatedElement>
    </AnimatedElement>
  );
}
