"use client";

import React, { memo, useCallback } from "react";
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from "@headlessui/react";
import * as SIIcons from "react-icons/si";
import { cn } from "@/lib/utils";

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
  className 
}) => {
  const handleChange = useCallback((index: number) => {
    onChange?.(index);
  }, [onChange]);

  return (
    <div className={cn(
      "my-8 overflow-hidden rounded-lg bg-white dark:bg-gray-900",
      className
    )}>
      <TabGroup defaultIndex={defaultIndex} onChange={handleChange}>
        <TabList className="flex space-x-2 px-4 pt-4 pb-0" aria-label="Code language selection">
          {React.Children.map(children, (child, idx) => {
            if (!React.isValidElement<CodeTabProps>(child)) return null;
            
            const { label, disabled } = child.props;
            
            return (
              <Tab 
                key={`${label}-${idx}`} 
                disabled={disabled}
                className={({ selected }) => cn(
                  "relative rounded-lg px-4 py-2 text-sm font-semibold transition-colors duration-150",
                  "focus:outline-none",
                  "disabled:opacity-50 disabled:cursor-not-allowed",
                  selected
                    ? "bg-gray-200 text-gray-900 dark:bg-[#23272e] dark:text-white"
                    : "bg-white text-gray-500 hover:text-gray-900 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-300 dark:hover:text-white dark:hover:bg-[#23272e]"
                )}
              >
                <span className="flex items-center gap-1">
                  <LanguageIcon label={label} />
                  {label}
                </span>
              </Tab>
            );
          })}
        </TabList>
        <TabPanels>
          {React.Children.map(children, (child, idx) => {
            if (!React.isValidElement<CodeTabProps>(child)) return null;
            
            return (
              <TabPanel
                key={idx}
                className={cn(
                  "px-4 pb-6 pt-4 transition-all duration-300",
                  "bg-gray-50 dark:bg-[#23272e] rounded-lg mt-2",
                  "animate-fadein focus:outline-none"
                )}
              >
                {child.props.children}
              </TabPanel>
            );
          })}
        </TabPanels>
      </TabGroup>
    </div>
  );
};

export const CodeTab: React.FC<CodeTabProps> = memo(({ children }) => {
  return <>{children}</>;
});

CodeTab.displayName = "CodeTab";
