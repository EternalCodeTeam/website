"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import React, { useCallback, useId } from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

interface AccordionContextType {
  activeItem: string | undefined;
  setActiveItem: (item: string | undefined) => void;
}

const AccordionContext = React.createContext<AccordionContextType | undefined>(undefined);

interface AccordionProps {
  children: React.ReactNode;
  className?: string;
  defaultValue?: string;
}

export function Accordion({ children, className, defaultValue }: AccordionProps) {
  const [activeItem, setActiveItem] = React.useState<string | undefined>(defaultValue);

  return (
    <AccordionContext.Provider value={{ activeItem, setActiveItem }}>
      <div className={cn("flex flex-col items-stretch justify-start gap-4", className)}>
        {children}
      </div>
    </AccordionContext.Provider>
  );
}

interface AccordionItemProps {
  children: React.ReactNode;
  value: string;
  className?: string;
}

export function AccordionItem({ children, value, className }: AccordionItemProps) {
  const itemId = useId();
  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border border-gray-200/60 bg-white/40 shadow-sm backdrop-blur-md transition-colors duration-300 hover:border-gray-300 dark:border-gray-800/60 dark:bg-gray-900/40 dark:hover:border-gray-700",
        className
      )}
    >
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          // biome-ignore lint/suspicious/noExplicitAny: React generic fallback
          return React.cloneElement(child as React.ReactElement<any>, {
            value,
            itemId,
          });
        }
        return child;
      })}
    </div>
  );
}

interface AccordionTriggerProps {
  children: React.ReactNode;
  className?: string;
  value?: string;
  itemId?: string;
}

export function AccordionTrigger({ children, className, value, itemId }: AccordionTriggerProps) {
  const context = React.useContext(AccordionContext);
  const prefersReducedMotion = useReducedMotion();
  if (!context) {
    throw new Error("AccordionTrigger must be used within Accordion");
  }

  const isOpen = context.activeItem === value;
  const toggle = useCallback(() => {
    context.setActiveItem(isOpen ? undefined : value);
  }, [context, isOpen, value]);

  const contentId = itemId ? `${itemId}-content` : undefined;

  return (
    <motion.button
      animate={
        prefersReducedMotion ? {} : { backgroundColor: isOpen ? "rgba(0,0,0,0.02)" : "transparent" }
      }
      aria-controls={contentId}
      aria-expanded={isOpen}
      className={cn(
        "flex w-full cursor-pointer items-center justify-between px-6 py-4 text-left font-medium transition-colors hover:bg-gray-50/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:hover:bg-gray-800/50",
        className
      )}
      initial={false}
      onClick={toggle}
      type="button"
    >
      <span className="text-gray-800 dark:text-gray-100">{children}</span>
      <motion.div
        animate={prefersReducedMotion ? {} : { rotate: isOpen ? 180 : 0 }}
        className="text-gray-500 dark:text-gray-400"
        transition={
          prefersReducedMotion
            ? { duration: 0 }
            : { duration: 0.3, type: "spring", stiffness: 300, damping: 20 }
        }
      >
        <ChevronDown className="h-5 w-5" />
      </motion.div>
    </motion.button>
  );
}

interface AccordionContentProps {
  children: React.ReactNode;
  className?: string;
  value?: string;
  itemId?: string;
}

export function AccordionContent({ children, className, value, itemId }: AccordionContentProps) {
  const context = React.useContext(AccordionContext);
  const prefersReducedMotion = useReducedMotion();
  if (!context) {
    throw new Error("AccordionContent must be used within Accordion");
  }

  const isOpen = context.activeItem === value;
  const contentRef = React.useRef<HTMLDivElement>(null);
  const contentId = itemId ? `${itemId}-content` : undefined;

  return (
    <motion.div
      animate={
        prefersReducedMotion
          ? {}
          : {
              height: isOpen ? "auto" : 0,
              opacity: isOpen ? 1 : 0,
            }
      }
      className="overflow-hidden"
      id={contentId}
      initial={false}
      style={prefersReducedMotion ? { display: isOpen ? "block" : "none" } : {}}
      transition={
        prefersReducedMotion
          ? { duration: 0 }
          : {
              height: {
                duration: 0.4,
                ease: "easeInOut",
              },
              opacity: {
                duration: 0.25,
                delay: isOpen ? 0.2 : 0,
              },
            }
      }
    >
      <div
        className={cn("px-6 pt-1 pb-4 text-gray-600 dark:text-gray-300", className)}
        ref={contentRef}
      >
        {children}
      </div>
    </motion.div>
  );
}
