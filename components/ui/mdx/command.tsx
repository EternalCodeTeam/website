"use client";

import { Check, Copy, Terminal } from "lucide-react";
import { isValidElement, type ReactNode } from "react";
import { CopyToClipboard } from "@/components/ui/copy-to-clipboard";
import { cn } from "@/lib/utils";

interface CommandProps {
  command?: string;
  children?: ReactNode;
  className?: string;
  variant?: "default" | "gradle" | "maven" | "npm" | "bash";
  theme?: "dark" | "light";
}

const variantStyles: Record<string, { dark: string; light: string }> = {
  default: {
    dark: "bg-gray-900 text-gray-100 dark:bg-gray-900 dark:text-gray-100",
    light: "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-100",
  },
  gradle: {
    dark: "bg-gray-900 text-green-400 dark:bg-gray-900 dark:text-green-400",
    light: "bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-300",
  },
  maven: {
    dark: "bg-gray-900 text-yellow-400 dark:bg-gray-900 dark:text-yellow-400",
    light: "bg-yellow-50 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300",
  },
  npm: {
    dark: "bg-gray-900 text-red-400 dark:bg-gray-900 dark:text-red-400",
    light: "bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-300",
  },
  bash: {
    dark: "bg-gray-900 text-blue-400 dark:bg-gray-900 dark:text-blue-400",
    light: "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
  },
};

// Helper function to extract text content from ReactNode
function extractText(node: ReactNode): string {
  if (node === null || node === undefined) {
    return "";
  }
  if (typeof node === "string") {
    // Trim whitespace from individual strings but preserve actual content
    const trimmed = node.trim();
    return trimmed;
  }
  if (typeof node === "number" || typeof node === "boolean") {
    return String(node);
  }
  if (Array.isArray(node)) {
    // Extract and filter out empty strings
    return node
      .map((item) => extractText(item as ReactNode))
      .filter((text) => text.length > 0)
      .join(" "); // Join with space to separate words
  }
  // Handle React elements - extract children from props
  if (isValidElement(node)) {
    const props = node.props as { children?: ReactNode };
    if (props.children !== undefined) {
      return extractText(props.children);
    }
  }
  return "";
}

export function Command({
  command,
  children,
  className,
  variant = "default",
  theme = "dark",
}: CommandProps) {
  const displayCommand = children ? extractText(children) : command || "";
  const styles = variantStyles[variant];
  const themeStyles = theme === "light" ? styles.light : styles.dark;
  const iconColor = theme === "light" ? "text-gray-600" : "text-gray-400";
  const copyIconColor =
    theme === "light" ? "text-gray-600 hover:text-gray-900" : "text-gray-400 hover:text-gray-300";

  return (
    <div
      className={cn(
        "group relative my-4 flex cursor-pointer touch-manipulation items-center gap-3 overflow-hidden rounded-lg border px-4 py-3",
        theme === "light"
          ? "border-gray-300 dark:border-gray-700"
          : "border-gray-800 dark:border-gray-700",
        themeStyles,
        className
      )}
    >
      <Terminal aria-hidden="true" className={cn("h-4 w-4 shrink-0", iconColor)} />
      <code className="flex-1 font-mono text-inherit text-sm">{displayCommand}</code>
      <CopyToClipboard
        className="shrink-0 cursor-pointer opacity-0 transition-opacity duration-200 group-hover:opacity-100"
        showIcon={false}
        text={displayCommand}
      >
        {({ copied }) =>
          copied ? (
            <Check className="h-4 w-4 text-green-400" />
          ) : (
            <Copy className={cn("h-4 w-4 cursor-pointer", copyIconColor)} />
          )
        }
      </CopyToClipboard>
    </div>
  );
}
