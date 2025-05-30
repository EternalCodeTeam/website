"use client";

import React, { memo, useCallback } from "react";
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from "@headlessui/react";
import * as SIIcons from "react-icons/si";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { fadeInUp } from "./DocHeader";

interface CodeTabsProps {
  children: React.ReactNode;
  defaultIndex?: number;
  onChange?: (index: number) => void;
  className?: string;
}

interface CodeTabProps {
  label: string;
  children: React.ReactNode;
  disabled?: boolean;
}

const LanguageIcon = memo(({ label }: { label: string }) => {
  const iconName =
    "Si" +
    label
      .replace(/[^a-zA-Z0-9]/g, "")
      .toLowerCase()
      .replace(/^./, (c) => c.toUpperCase());

  const Icon = (SIIcons as any)[iconName];

  if (Icon) {
    return <Icon className="mr-1" title={label} size={18} aria-hidden="true" />;
  }

  return (
    <span className="mr-1" title={label} aria-hidden="true">
      📄
    </span>
  );
});

LanguageIcon.displayName = "LanguageIcon";

export const CodeTabs: React.FC<CodeTabsProps> = ({
  children,
  defaultIndex = 0,
  onChange,
  className,
}) => {
  const handleChange = useCallback(
    (index: number) => {
      onChange?.(index);
    },
    [onChange]
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        type: "spring", 
        stiffness: 100, 
        damping: 20,
        mass: 0.8
      }}
      className={cn(
        "my-8 overflow-hidden rounded-lg bg-white dark:bg-gray-900",
        className
      )}
    >
      <TabGroup defaultIndex={defaultIndex} onChange={handleChange}>
        <TabList
          className="flex space-x-2 px-4 pb-0 pt-4"
          aria-label="Code language selection"
        >
          {React.Children.map(children, (child, idx) => {
            if (!React.isValidElement<CodeTabProps>(child)) return null;

            const { label, disabled } = child.props;

            return (
              <Tab
                key={`${label}-${idx}`}
                disabled={disabled}
                className={({ selected }) =>
                  cn(
                    "relative rounded-lg px-4 py-2 text-sm font-semibold transition-colors duration-150",
                    "disabled:cursor-not-allowed disabled:opacity-50",
                    selected
                      ? "bg-gray-200 text-gray-900 dark:bg-[#23272e] dark:text-white"
                      : "bg-white text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-[#23272e] dark:hover:text-white"
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
                        className="absolute inset-0 -z-10 rounded-lg bg-gray-200 dark:bg-[#23272e]"
                        transition={{
                          type: "spring",
                          bounce: 0.2,
                          duration: 0.6,
                          stiffness: 300,
                          damping: 30
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
            {React.Children.map(children, (child, idx) => {
              if (!React.isValidElement<CodeTabProps>(child)) return null;

              return (
                <TabPanel
                  key={idx}
                  className={cn(
                    "px-4 pb-6 pt-4 transition-all duration-300",
                    "mt-2 rounded-lg bg-gray-50 dark:bg-[#23272e]"
                  )}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ 
                      type: "spring", 
                      stiffness: 100, 
                      damping: 20,
                      mass: 0.8
                    }}
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

export const CodeTab = memo(function CodeTab({ children }: CodeTabProps) {
  return <>{children}</>;
});

CodeTab.displayName = "CodeTab";
