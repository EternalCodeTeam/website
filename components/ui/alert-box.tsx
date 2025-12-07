"use client";

import {
  AlertCircle,
  AlertTriangle,
  BookOpen,
  CheckCircle2,
  FileText,
  HelpCircle,
  Info,
  Lightbulb,
  Star,
} from "lucide-react";
import { memo, type ReactNode } from "react";

import { cn } from "@/lib/utils";

export type AlertBoxType =
  | "info"
  | "warning"
  | "danger"
  | "tip"
  | "success"
  | "note"
  | "question"
  | "important"
  | "example";

export interface AlertBoxProps {
  type: AlertBoxType; // Alert type (affects style and icon)
  children: ReactNode; // Main alert content
  title?: ReactNode; // Optional alert title
  className?: string; // Optional extra CSS classes
}

const alertStyles = {
  info: {
    container:
      "bg-blue-500/10 border border-blue-500/20 dark:bg-blue-500/10 dark:border-blue-500/20",
    icon: "text-blue-500 dark:text-blue-400",
    text: "text-blue-800 dark:text-blue-200",
    title: "text-blue-900 dark:text-blue-100",
    role: "status",
  },
  warning: {
    container:
      "bg-yellow-500/10 border border-yellow-500/20 dark:bg-yellow-500/10 dark:border-yellow-500/20",
    icon: "text-yellow-500 dark:text-yellow-400",
    text: "text-yellow-800 dark:text-yellow-200",
    title: "text-yellow-900 dark:text-yellow-100",
    role: "alert",
  },
  danger: {
    container: "bg-red-500/10 border border-red-500/20 dark:bg-red-500/10 dark:border-red-500/20",
    icon: "text-red-500 dark:text-red-400",
    text: "text-red-800 dark:text-red-200",
    title: "text-red-900 dark:text-red-100",
    role: "alert",
  },
  tip: {
    container:
      "bg-green-500/10 border border-green-500/20 dark:bg-green-500/10 dark:border-green-500/20",
    icon: "text-green-500 dark:text-green-400",
    text: "text-green-800 dark:text-green-200",
    title: "text-green-900 dark:text-green-100",
    role: "status",
  },
  success: {
    container:
      "bg-emerald-500/10 border border-emerald-500/20 dark:bg-emerald-500/10 dark:border-emerald-500/20",
    icon: "text-emerald-500 dark:text-emerald-400",
    text: "text-emerald-800 dark:text-emerald-200",
    title: "text-emerald-900 dark:text-emerald-100",
    role: "status",
  },
  note: {
    container:
      "bg-purple-500/10 border border-purple-500/20 dark:bg-purple-500/10 dark:border-purple-500/20",
    icon: "text-purple-500 dark:text-purple-400",
    text: "text-purple-800 dark:text-purple-200",
    title: "text-purple-900 dark:text-purple-100",
    role: "note",
  },
  question: {
    container:
      "bg-indigo-500/10 border border-indigo-500/20 dark:bg-indigo-500/10 dark:border-indigo-500/20",
    icon: "text-indigo-500 dark:text-indigo-400",
    text: "text-indigo-800 dark:text-indigo-200",
    title: "text-indigo-900 dark:text-indigo-100",
    role: "note",
  },
  important: {
    container:
      "bg-amber-500/10 border border-amber-500/20 dark:bg-amber-500/10 dark:border-amber-500/20",
    icon: "text-amber-500 dark:text-amber-400",
    text: "text-amber-800 dark:text-amber-200",
    title: "text-amber-900 dark:text-amber-100",
    role: "alert",
  },
  example: {
    container:
      "bg-cyan-500/10 border border-cyan-500/20 dark:bg-cyan-500/10 dark:border-cyan-500/20",
    icon: "text-cyan-500 dark:text-cyan-400",
    text: "text-cyan-800 dark:text-cyan-200",
    title: "text-cyan-900 dark:text-cyan-100",
    role: "note",
  },
} as const;

const icons = {
  info: Info,
  warning: AlertTriangle,
  danger: AlertCircle,
  tip: Lightbulb,
  success: CheckCircle2,
  note: FileText,
  question: HelpCircle,
  important: Star,
  example: BookOpen,
} as const;

const defaultTitles = {
  info: "INFO!",
  warning: "Read this!",
  danger: "Danger!",
  tip: "TIP",
  success: "Success!",
  note: "Note",
  question: "Question",
  important: "Important",
  example: "Example",
} as const;

export const AlertBox = memo(function AlertBox({
  type,
  children,
  title,
  className,
}: AlertBoxProps) {
  const Icon = icons[type];
  const styles = alertStyles[type];
  const defaultTitle = defaultTitles[type];

  const ariaLabel =
    typeof title === "string"
      ? title
      : `${defaultTitle} - ${type.charAt(0).toUpperCase() + type.slice(1)} alert message`;

  return (
    <div
      role={styles.role}
      {...(ariaLabel && { "aria-label": ariaLabel })}
      className={cn(
        "my-6 rounded-lg p-4 shadow-xs backdrop-blur-xs transition-colors duration-200",
        styles.container,
        className
      )}
    >
      <div className="flex flex-wrap items-start gap-3">
        {/* Alert icon */}
        <div className="mt-0.5 shrink-0" aria-hidden="true">
          <Icon className={`h-5 w-5 ${styles.icon}`} />
        </div>

        {/* Alert content */}
        <div className="min-w-0 flex-1">
          {(title || defaultTitle) && (
            <h5 className={`mb-1 text-sm font-semibold md:text-base ${styles.title}`}>
              {title || defaultTitle}
            </h5>
          )}
          <div
            className={`prose-sm max-w-full overflow-x-auto wrap-break-word md:prose-base ${styles.text}`}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
});

AlertBox.displayName = "AlertBox";
