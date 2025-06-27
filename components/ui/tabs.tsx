"use client";

import { motion, AnimatePresence } from "framer-motion";
import React, { useState, useCallback } from "react";

import { cn } from "@/lib/utils";

import { Tab } from "./tab";

export interface TabsProps {
  children: React.ReactNode;
  defaultIndex?: number;
  onChange?: (index: number) => void;
  className?: string;
}

export interface TabItemProps {
  label: string;
  children: React.ReactNode;
  disabled?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Tabs: React.FC<TabsProps> = ({ children, defaultIndex = 0, onChange, className }) => {
  const [activeIndex, setActiveIndex] = useState(defaultIndex);

  const handleChange = useCallback(
    (index: number) => {
      setActiveIndex(index);
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
        mass: 0.8,
      }}
      className={cn("my-8 overflow-hidden rounded-lg bg-white dark:bg-gray-900", className)}
    >
      <div className="flex space-x-2 px-4 pb-0 pt-4" role="tablist">
        {React.Children.map(children, (child, idx) => {
          if (!React.isValidElement<TabItemProps>(child)) return null;

          const { label, disabled, leftIcon, rightIcon } = child.props;
          const isActive = activeIndex === idx;

          return (
            <Tab
              key={`${label}-${idx}`}
              isActive={isActive}
              disabled={disabled}
              leftIcon={leftIcon}
              rightIcon={rightIcon}
              onClick={() => !disabled && handleChange(idx)}
              role="tab"
              aria-selected={isActive}
              aria-controls={`panel-${idx}`}
              tabIndex={isActive ? 0 : -1}
            >
              {label}
            </Tab>
          );
        })}
      </div>
      <div className="mt-2 rounded-lg bg-gray-50 px-4 pb-6 pt-4 dark:bg-gray-800">
        <AnimatePresence mode="wait">
          {React.Children.map(children, (child, idx) => {
            if (!React.isValidElement<TabItemProps>(child)) return null;
            if (activeIndex !== idx) return null;

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{
                  type: "spring",
                  stiffness: 100,
                  damping: 20,
                  mass: 0.8,
                }}
                role="tabpanel"
                aria-labelledby={`tab-${idx}`}
              >
                {child.props.children}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export const TabItem = React.memo(function TabItem({ children }: TabItemProps) {
  return <>{children}</>;
});

TabItem.displayName = "TabItem";
