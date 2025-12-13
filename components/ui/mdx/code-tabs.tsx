"use client";

import {
  Content as TabsContent,
  List as TabsList,
  Root as TabsRoot,
  Trigger as TabsTrigger,
} from "@radix-ui/react-tabs";
import { motion } from "framer-motion";
import {
  Children,
  type ComponentType,
  isValidElement,
  type ReactNode,
  type SVGProps,
  useCallback,
  useState,
} from "react";
// biome-ignore lint/performance/noNamespaceImport: Dynamic icon accessing
import * as SIIcons from "react-icons/si";

import { cn } from "@/lib/utils";

const ICONS: Record<string, string> = {
  maven: "SiApachemaven",
  gradle: "SiGradle",
  "gradle.kts": "SiGradle",
  npm: "SiNpm",
  yarn: "SiYarn",
  pnpm: "SiPnpm",
  bash: "SiGnubash",
  shell: "SiGnubash",
  kotlin: "SiKotlin",
  java: "SiJava",
  xml: "SiXml",
  json: "SiJson",
  typescript: "SiTypescript",
  javascript: "SiJavascript",
  python: "SiPython",
  docker: "SiDocker",
  go: "SiGo",
  php: "SiPhp",
  ruby: "SiRuby",
  csharp: "SiCsharp",
  cpp: "SiCplusplus",
  c: "SiC",
  rust: "SiRust",
  swift: "SiSwift",
  scala: "SiScala",
  perl: "SiPerl",
  lua: "SiLua",
  modrinth: "SiModrinth",
  spigot: "SiSpigot",
};

const NON_ALPHANUMERIC_REGEX = /[^a-z0-9]/gi;
const FIRST_CHAR_REGEX = /^./;

const getIcon = (label: string) => {
  const key = label.trim().toLowerCase();
  const iconName =
    ICONS[key] ??
    `Si${key.replace(NON_ALPHANUMERIC_REGEX, "").replace(FIRST_CHAR_REGEX, (c) => c.toUpperCase())}`;

  return (SIIcons as Record<string, ComponentType<SVGProps<SVGSVGElement>>>)[iconName];
};

const LanguageIcon = ({ label }: { label: string }) => {
  const Icon = getIcon(label);
  if (Icon) {
    return <Icon aria-hidden="true" aria-label={label} className="mr-1" height={18} width={18} />;
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
  const childrenArray = Children.toArray(children);
  const validChildren = childrenArray.filter(isValidElement);

  const defaultLabel = validChildren[defaultIndex]
    ? (validChildren[defaultIndex].props as { label: string }).label
    : undefined;

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
      <TabsRoot value={selectedValue} onValueChange={handleValueChange} defaultValue={defaultLabel}>
        <TabsList
          aria-label="Code language selection"
          className="flex space-x-1 border-gray-200 border-b bg-gray-50/50 p-2 dark:border-gray-800 dark:bg-gray-900/50"
        >
          {validChildren.map((child) => {
            const { label, disabled } = child.props as { label: string; disabled?: boolean };
            return (
              <TabsTrigger
                disabled={disabled}
                key={label}
                value={label}
                className={cn(
                  "relative cursor-pointer rounded-lg px-4 py-2 font-medium text-sm outline-none transition-all duration-200",
                  "disabled:cursor-not-allowed disabled:opacity-50",
                  "data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600 dark:data-[state=active]:bg-blue-900/20 dark:data-[state=active]:text-blue-400",
                  "data-[state=inactive]:text-gray-600 data-[state=inactive]:hover:bg-gray-100 data-[state=inactive]:hover:text-gray-900 dark:data-[state=inactive]:text-gray-400 dark:data-[state=inactive]:hover:bg-gray-800 dark:data-[state=inactive]:hover:text-gray-200"
                )}
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
                animate={{ opacity: 1, x: 0 }}
                // Exit animation is removed because Radix unmounts content immediately.
                // To support exit animations, we would need to control rendering manually outside of Tabs.Content
                // or use forceMount with standard AnimatePresence, but simple entry animation is usually sufficient.
                initial={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
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

export function CodeTab({ children }: { label: string; children: ReactNode; disabled?: boolean }) {
  return <>{children}</>;
}
