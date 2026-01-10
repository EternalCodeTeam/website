"use client";

import { cva, type VariantProps } from "class-variance-authority";
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

const alertContainerVariants = cva(
  "my-6 rounded-lg p-4 shadow-xs backdrop-blur-xs transition-colors duration-200",
  {
    variants: {
      type: {
        info: "border border-blue-500/20 bg-blue-500/10 dark:border-blue-500/20 dark:bg-blue-500/10",
        warning:
          "border border-yellow-500/20 bg-yellow-500/10 dark:border-yellow-500/20 dark:bg-yellow-500/10",
        danger: "border border-red-500/20 bg-red-500/10 dark:border-red-500/20 dark:bg-red-500/10",
        tip: "border border-green-500/20 bg-green-500/10 dark:border-green-500/20 dark:bg-green-500/10",
        success:
          "border border-emerald-500/20 bg-emerald-500/10 dark:border-emerald-500/20 dark:bg-emerald-500/10",
        note: "border border-purple-500/20 bg-purple-500/10 dark:border-purple-500/20 dark:bg-purple-500/10",
        question:
          "border border-indigo-500/20 bg-indigo-500/10 dark:border-indigo-500/20 dark:bg-indigo-500/10",
        important:
          "border border-amber-500/20 bg-amber-500/10 dark:border-amber-500/20 dark:bg-amber-500/10",
        example:
          "border border-cyan-500/20 bg-cyan-500/10 dark:border-cyan-500/20 dark:bg-cyan-500/10",
      },
    },
    defaultVariants: {
      type: "info",
    },
  }
);

const alertIconVariants = cva("h-5 w-5", {
  variants: {
    type: {
      info: "text-blue-500 dark:text-blue-400",
      warning: "text-yellow-500 dark:text-yellow-400",
      danger: "text-red-500 dark:text-red-400",
      tip: "text-green-500 dark:text-green-400",
      success: "text-emerald-500 dark:text-emerald-400",
      note: "text-purple-500 dark:text-purple-400",
      question: "text-indigo-500 dark:text-indigo-400",
      important: "text-amber-500 dark:text-amber-400",
      example: "text-cyan-500 dark:text-cyan-400",
    },
  },
  defaultVariants: {
    type: "info",
  },
});

const alertTextVariants = cva("prose-sm wrap-break-word md:prose-base max-w-full overflow-x-auto", {
  variants: {
    type: {
      info: "text-blue-800 dark:text-blue-200",
      warning: "text-yellow-800 dark:text-yellow-200",
      danger: "text-red-800 dark:text-red-200",
      tip: "text-green-800 dark:text-green-200",
      success: "text-emerald-800 dark:text-emerald-200",
      note: "text-purple-800 dark:text-purple-200",
      question: "text-indigo-800 dark:text-indigo-200",
      important: "text-amber-800 dark:text-amber-200",
      example: "text-cyan-800 dark:text-cyan-200",
    },
  },
  defaultVariants: {
    type: "info",
  },
});

const alertTitleVariants = cva("mb-1 font-semibold text-sm md:text-base", {
  variants: {
    type: {
      info: "text-blue-900 dark:text-blue-100",
      warning: "text-yellow-900 dark:text-yellow-100",
      danger: "text-red-900 dark:text-red-100",
      tip: "text-green-900 dark:text-green-100",
      success: "text-emerald-900 dark:text-emerald-100",
      note: "text-purple-900 dark:text-purple-100",
      question: "text-indigo-900 dark:text-indigo-100",
      important: "text-amber-900 dark:text-amber-100",
      example: "text-cyan-900 dark:text-cyan-100",
    },
  },
  defaultVariants: {
    type: "info",
  },
});

export type AlertBoxType = NonNullable<VariantProps<typeof alertContainerVariants>["type"]>;

export interface AlertBoxProps {
  type: AlertBoxType;
  children: ReactNode;
  title?: ReactNode;
  className?: string;
}

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

const defaultTitles: Record<AlertBoxType, string> = {
  info: "INFO!",
  warning: "Read this!",
  danger: "Danger!",
  tip: "TIP",
  success: "Success!",
  note: "Note",
  question: "Question",
  important: "Important",
  example: "Example",
};

const roles: Record<AlertBoxType, string> = {
  info: "status",
  warning: "alert",
  danger: "alert",
  tip: "status",
  success: "status",
  note: "note",
  question: "note",
  important: "alert",
  example: "note",
};

export const AlertBox = memo(function AlertBoxComponent({
  type,
  children,
  title,
  className,
}: AlertBoxProps) {
  const Icon = icons[type];
  const defaultTitle = defaultTitles[type];
  const role = roles[type];

  const ariaLabel =
    typeof title === "string"
      ? title
      : `${defaultTitle} - ${type.charAt(0).toUpperCase() + type.slice(1)} alert message`;

  return (
    <div
      role={role}
      {...(ariaLabel ? { "aria-label": ariaLabel } : {})}
      className={cn(alertContainerVariants({ type }), className)}
    >
      <div className="flex flex-wrap items-start gap-3">
        {/* Alert icon */}
        <div aria-hidden="true" className="mt-0.5 shrink-0">
          <Icon className={alertIconVariants({ type })} />
        </div>

        {/* Alert content */}
        <div className="min-w-0 flex-1">
          {!!(title || defaultTitle) && (
            <h5 className={alertTitleVariants({ type })}>{title || defaultTitle}</h5>
          )}
          <div className={alertTextVariants({ type })}>{children}</div>
        </div>
      </div>
    </div>
  );
});

AlertBox.displayName = "AlertBox";
