"use client";



import { AlertBox } from "@/components/ui/alert-box";
import { CodeBlock } from "@/components/ui/mdx/CodeBlock";
import { FadeIn, SlideIn } from "@/components/ui/motion/MotionComponents";

interface NotificationCodeProps {
  yamlCode: string;
}

export function NotificationGeneratedCode({ yamlCode }: NotificationCodeProps) {
  return (
    <div className="space-y-6">
      <FadeIn>
        <AlertBox type="important" title="Disable Message">
          To disable this message, set its value to{" "}
          <code className="rounded-md bg-gray-100 px-1.5 py-0.5 text-xs font-medium text-gray-800 dark:bg-gray-800 dark:text-gray-200">
            []
          </code>{" "}
          in your config.
        </AlertBox>
      </FadeIn>

      <SlideIn direction="up" delay={0.1}>
        <CodeBlock language="yaml" className="my-0">
          {yamlCode}
        </CodeBlock>
      </SlideIn>

      <SlideIn direction="up" delay={0.2}>
        <div className="rounded-xl bg-gray-50/50 p-4 dark:bg-white/5">
          <h3 className="mb-3 text-sm font-medium text-gray-900 dark:text-gray-100">
            Quick Start Guide
          </h3>
          <ol className="list-decimal list-inside space-y-2 text-sm text-gray-600 dark:text-gray-400">
            <li>Copy the generated YAML code above</li>
            <li>Paste it into your EternalCore configuration file</li>
            <li>Replace "example" with your desired notification name</li>
            <li>Reload your server to apply changes</li>
          </ol>
        </div>
      </SlideIn>
    </div>
  );
}
