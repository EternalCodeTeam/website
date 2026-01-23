"use client";

import { motion } from "framer-motion";
import type React from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { interactionSpring } from "@/lib/animations/variants";
import { cn } from "@/lib/utils";

import { Button } from "./button";

export interface TabProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isActive?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  animate?: boolean;
}

const Tab = ({
  className,
  isActive = false,
  leftIcon,
  rightIcon,
  animate = true,
  children,
  ref,
  ...props
}: TabProps & {
  ref?: React.Ref<HTMLButtonElement>;
}) => {
  const prefersReducedMotion = useReducedMotion();
  const baseStyles =
    "relative px-3 py-2 text-sm font-medium transition-colors duration-200 ease-in-out";

  const activeStyles = isActive
    ? "border-b-2 border-blue-500 text-blue-600 dark:text-blue-400"
    : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300";

  const tabContent = (
    <>
      {leftIcon ? <span className="mr-2">{leftIcon}</span> : null}
      {children}
      {rightIcon ? <span className="ml-2">{rightIcon}</span> : null}
    </>
  );

  const tabClasses = cn(baseStyles, activeStyles, className);

  return (
    <div className="relative">
      <Button
        animate={animate && !prefersReducedMotion}
        className={tabClasses}
        ref={ref}
        size="sm"
        variant={isActive ? "primary" : "ghost"}
        {...props}
      >
        {tabContent}
      </Button>
      {isActive ? (
        <motion.div
          className="absolute bottom-0 left-0 h-0.5 w-full bg-blue-500"
          layoutId={prefersReducedMotion ? undefined : "activeTab"}
          transition={prefersReducedMotion ? { duration: 0 } : interactionSpring}
        />
      ) : null}
    </div>
  );
};

Tab.displayName = "Tab";

export { Tab };
