"use client";

import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { AnimatePresence, motion } from "framer-motion";
import React, { Children, ComponentType, isValidElement, ReactNode, useCallback, useState } from "react";
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

const getIcon = (label: string) => {
  const key = label.trim().toLowerCase();
  const iconName =
    ICONS[key] ?? `Si${key.replace(/[^a-z0-9]/gi, "").replace(/^./, (c) => c.toUpperCase())}`;
  return (SIIcons as Record<string, ComponentType<any>>)[iconName];
};

const LanguageIcon = ({ label }: { label: string }) => {
  const Icon = getIcon(label);
  if (Icon)
    return <Icon className="mr-1" aria-label={label} width={18} height={18} aria-hidden="true" />;
  return (
    <span className="mr-1" title={label} aria-hidden="true">
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
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20, mass: 0.8 }}
      className={cn("my-8 overflow-hidden rounded-lg bg-white dark:bg-gray-800", className)}
    >
      <TabGroup selectedIndex={selectedIndex} onChange={handleChange}>
        <TabList className="flex space-x-2 px-4 pb-0 pt-4" aria-label="Code language selection">
          {Children.map(children, (child, idx) => {
            if (!isValidElement(child)) return null;
            const { label, disabled } = child.props;
            return (
              <Tab
                key={`${label}-${idx}`}
                disabled={disabled}
                className={({ selected }) =>
                  cn(
                    "relative rounded-lg px-4 py-2 text-sm font-semibold transition-colors",
                    "disabled:cursor-not-allowed disabled:opacity-50",
                    selected
                      ? "bg-gray-200 text-gray-900 dark:bg-gray-850 dark:text-white"
                      : "bg-white text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-850 dark:hover:text-white"
                  )
                }
              >
                {({ selected }) => (
                  <motion.span
                    className="flex items-center gap-1"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <LanguageIcon label={label} />
                    {label}
                    {selected && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 -z-10 rounded-lg bg-gray-200 dark:bg-gray-850"
                        transition={{
                          type: "spring",
                          bounce: 0.2,
                          duration: 0.6,
                          stiffness: 300,
                          damping: 30,
                        }}
                      />
                    )}
                  </motion.span>
                )}
              </Tab>
            );
          })}
        </TabList>
        <TabPanels>
          <AnimatePresence mode="wait">
            {Children.map(children, (child, idx) => {
              if (!isValidElement(child)) return null;
              return (
                <TabPanel
                  key={idx}
                  className={cn(
                    "px-4 pb-6 pt-4 transition-all duration-300",
                    "mt-2 rounded-lg bg-gray-100 dark:bg-gray-850"
                  )}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ type: "spring", stiffness: 100, damping: 20, mass: 0.8 }}
                  >
                    {child.props.children}
                  </motion.div>
                </TabPanel>
              );
            })}
          </AnimatePresence>
        </TabPanels>
      </TabGroup>
    </motion.div>
  );
};

export function CodeTab({
  children,
}: {
  label: string;
  children: ReactNode;
  disabled?: boolean;
}) {
  return <>{children}</>;
}
