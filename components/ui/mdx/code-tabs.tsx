"use client";

import { Icon } from "@iconify/react";
import {
  Content as TabsContent,
  List as TabsList,
  Root as TabsRoot,
  Trigger as TabsTrigger,
} from "@radix-ui/react-tabs";
import { motion } from "framer-motion";
import { Children, isValidElement, type ReactNode, useCallback, useMemo, useState } from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

const ICONS: Record<string, string> = {
  maven: "simple-icons:apachemaven",
  gradle: "simple-icons:gradle",
  "gradle.kts": "simple-icons:gradle",
  npm: "simple-icons:npm",
  yarn: "simple-icons:yarn",
  pnpm: "simple-icons:pnpm",
  bash: "simple-icons:gnubash",
  shell: "simple-icons:gnubash",
  sh: "simple-icons:gnubash",
  kotlin: "simple-icons:kotlin",
  kt: "simple-icons:kotlin",
  typescript: "simple-icons:typescript",
  ts: "simple-icons:typescript",
  tsx: "simple-icons:typescript",
  javascript: "simple-icons:javascript",
  js: "simple-icons:javascript",
  jsx: "simple-icons:javascript",
  python: "simple-icons:python",
  py: "simple-icons:python",
  docker: "simple-icons:docker",
  dockerfile: "simple-icons:docker",
  go: "simple-icons:go",
  php: "simple-icons:php",
  ruby: "simple-icons:ruby",
  rb: "simple-icons:ruby",
  csharp: "simple-icons:sharp",
  cs: "simple-icons:sharp",
  cpp: "simple-icons:cplusplus",
  "c++": "simple-icons:cplusplus",
  c: "simple-icons:c",
  rust: "simple-icons:rust",
  rs: "simple-icons:rust",
  swift: "simple-icons:swift",
  scala: "simple-icons:scala",
  perl: "simple-icons:perl",
  pl: "simple-icons:perl",
  lua: "simple-icons:lua",
  modrinth: "simple-icons:modrinth",
};

const getIcon = (label: string): string | null => {
  const key = label.trim().toLowerCase();
  return ICONS[key] ?? null;
};

const LanguageIcon = ({ label }: { label: string }) => {
  const iconName = useMemo(() => getIcon(label), [label]);

  if (iconName) {
    return (
      <Icon
        aria-hidden="true"
        aria-label={label}
        className="mr-1"
        height={18}
        icon={iconName}
        width={18}
      />
    );
  }
  return (
    <span aria-hidden="true" className="mr-1" title={label}>
      📄
    </span>
  );
};

export const CodeTabs = ({
  children,
  defaultIndex = 0,
  onChange,
  className,
}: {
  children: ReactNode;
  defaultIndex?: number;
  onChange?: (index: number) => void;
  className?: string;
}) => {
  const prefersReducedMotion = useReducedMotion();
  const childrenArray = Children.toArray(children);
  const validChildren = useMemo(() => childrenArray.filter(isValidElement), [childrenArray]);

  const defaultLabel = useMemo(
    () =>
      validChildren[defaultIndex]
        ? (validChildren[defaultIndex].props as { label: string }).label
        : undefined,
    [validChildren, defaultIndex]
  );

  const [selectedValue, setSelectedValue] = useState(defaultLabel);

  const handleValueChange = useCallback(
    (value: string) => {
      setSelectedValue(value);
      if (onChange) {
        const index = validChildren.findIndex(
          (child) => (child.props as { label: string }).label === value
        );
        if (index !== -1) {
          onChange(index);
        }
      }
    },
    [onChange, validChildren]
  );

  return (
    <div
      className={cn(
        "my-6 overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900/50",
        className
      )}
    >
      <TabsRoot defaultValue={defaultLabel} onValueChange={handleValueChange} value={selectedValue}>
        <TabsList
          aria-label="Code language selection"
          className="flex space-x-1 border-gray-200 border-b bg-gray-50/50 p-2 dark:border-gray-800 dark:bg-gray-900/50"
        >
          {validChildren.map((child) => {
            const { label, disabled } = child.props as { label: string; disabled?: boolean };
            return (
              <TabsTrigger
                className={cn(
                  "relative cursor-pointer rounded-lg px-4 py-2 font-medium text-sm outline-none transition-all duration-200",
                  "disabled:cursor-not-allowed disabled:opacity-50",
                  "data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600 dark:data-[state=active]:bg-blue-900/20 dark:data-[state=active]:text-blue-400",
                  "data-[state=inactive]:text-gray-600 data-[state=inactive]:hover:bg-gray-100 data-[state=inactive]:hover:text-gray-900 dark:data-[state=inactive]:text-gray-400 dark:data-[state=inactive]:hover:bg-gray-800 dark:data-[state=inactive]:hover:text-gray-200"
                )}
                disabled={disabled}
                key={label}
                value={label}
              >
                <span className="flex items-center gap-2">
                  <LanguageIcon label={label} />
                  {label}
                </span>
              </TabsTrigger>
            );
          })}
        </TabsList>

        {validChildren.map((child) => {
          const { label, children: tabChildren } = child.props as {
            label: string;
            children: ReactNode;
          };
          return (
            <TabsContent
              className={cn(
                "p-4 ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
                "bg-gray-50 dark:bg-black/20"
              )}
              key={label}
              value={label}
            >
              <motion.div
                animate={prefersReducedMotion ? {} : { opacity: 1, x: 0 }}
                // Exit animation is removed because Radix unmounts content immediately.
                // To support exit animations, we would need to control rendering manually outside of Tabs.Content
                // or use forceMount with standard AnimatePresence, but simple entry animation is usually sufficient.
                initial={prefersReducedMotion ? {} : { opacity: 0, x: -10 }}
                transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.2 }}
              >
                {tabChildren}
              </motion.div>
            </TabsContent>
          );
        })}
      </TabsRoot>
    </div>
  );
};

interface CodeTabProps {
  label: string;
  children: ReactNode;
  disabled?: boolean;
}

export function CodeTab({ children }: CodeTabProps) {
  return <>{children}</>;
}
