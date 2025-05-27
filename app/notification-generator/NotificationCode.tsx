"use client";

import { useState } from "react";

interface NotificationCodeProps {
  yamlCode: string;
}

export function NotificationCode({ yamlCode }: NotificationCodeProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(yamlCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div>
      <div className="relative">
        <pre className="overflow-x-auto rounded-md bg-gray-100 p-4 font-mono text-sm dark:bg-gray-900">
          <code className="text-gray-800 dark:text-gray-200">{yamlCode}</code>
        </pre>
      </div>

      <div className="mt-4">
        <h3 className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
          How to use this code:
        </h3>
        <ol className="list-inside list-decimal space-y-1 text-sm text-gray-600 dark:text-gray-400">
          <li>Copy the generated YAML code</li>
          <li>Paste it into your EternalCore configuration file</li>
          <li>Replace "example" with your desired notification name</li>
          <li>Save the file and reload your server</li>
        </ol>
      </div>
    </div>
  );
}
