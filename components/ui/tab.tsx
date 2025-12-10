"use client";

import { motion } from "framer-motion";
import type React from "react";
import { forwardRef } from "react";

import { cn } from "@/lib/utils";

import { Button } from "./button";

export interface TabProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isActive?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  animate?: boolean;
}

const Tab = forwardRef<HTMLButtonElement, TabProps>(
  (
    { className, isActive = false, leftIcon, rightIcon, animate = true, children, ...props },
    ref
  ) => {
    const baseStyles =
      "relative px-3 py-2 text-sm font-medium transition-colors duration-200 ease-in-out";

    const activeStyles = isActive
      ? "border-b-2 border-blue-500 text-blue-600 dark:text-blue-400"
      : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300";

    const tabContent = (
      <>
        {leftIcon && <span className="mr-2">{leftIcon}</span>}
        {children}
        {rightIcon && <span className="ml-2">{rightIcon}</span>}
      </>
    );

    const tabClasses = cn(baseStyles, activeStyles, className);

    return (
      <div className="relative">
        <Button
          animate={animate}
          className={tabClasses}
          ref={ref}
          size="sm"
          variant={isActive ? "primary" : "ghost"}
          {...props}
        >
          {tabContent}
        </Button>
        {isActive && (
          <motion.div
            className="absolute bottom-0 left-0 h-0.5 w-full bg-blue-500"
            layoutId="activeTab"
            transition={{ type: "spring", stiffness: 300, damping: 30, duration: 0.1 }}
          />
        )}
      </div>
    );
  }
);

Tab.displayName = "Tab";

export { Tab };
