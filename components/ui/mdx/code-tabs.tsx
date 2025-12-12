"use client";

import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { AnimatePresence, motion } from "framer-motion";
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
  const [selectedIndex, setSelectedIndex] = useState(defaultIndex);

  const handleChange = useCallback(
    (index: number) => {
      setSelectedIndex(index);
      onChange?.(index);
    },
    [onChange]
  );

  return (
    <div
      className={cn(
        "my-6 overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900/50",
        className
      )}
    >
      <TabGroup onChange={handleChange} selectedIndex={selectedIndex}>
        <TabList
          aria-label="Code language selection"
          className="flex space-x-1 border-gray-200 border-b bg-gray-50/50 p-2 dark:border-gray-800 dark:bg-gray-900/50"
        >
          {Children.map(children, (child) => {
            if (!isValidElement(child)) {
              return null;
            }
            const { label, disabled } = child.props as { label: string; disabled?: boolean };
            return (
              <Tab
                className={({ selected }) =>
                  cn(
                    "relative cursor-pointer rounded-lg px-4 py-2 font-medium text-sm outline-none transition-all duration-200",
                    "disabled:cursor-not-allowed disabled:opacity-50",
                    selected
                      ? "bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400"
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-200"
                  )
                }
                disabled={disabled}
                key={label}
              >
                {() => (
                  <span className="flex items-center gap-2">
                    <LanguageIcon label={label} />
                    {label}
                  </span>
                )}
              </Tab>
            );
          })}
        </TabList>
        <TabPanels>
          <AnimatePresence mode="wait">
            {Children.map(children, (child) => {
              if (!isValidElement(child)) {
                return null;
              }
              const { label, children: tabChildren } = child.props as {
                label: string;
                children: ReactNode;
              };
              return (
                <TabPanel
                  className={cn(
                    "p-4 ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
                    "bg-gray-50 dark:bg-black/20"
                  )}
                  key={label}
                >
                  <motion.div
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    initial={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    {tabChildren}
                  </motion.div>
                </TabPanel>
              );
            })}
          </AnimatePresence>
        </TabPanels>
      </TabGroup>
    </div>
  );
};

export function CodeTab({ children }: { label: string; children: ReactNode; disabled?: boolean }) {
  return <>{children}</>;
}
