"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import React, { useCallback } from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import {
  accordionHighlight,
  expandCollapse,
  rotateChevron,
  type MotionCustom,
} from "@/lib/animations/variants";
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
  // Use value as stable ID to prevent hydration mismatches
  const itemId = value;
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
      aria-controls={contentId}
      aria-expanded={isOpen}
      className={cn(
        "flex w-full cursor-pointer items-center justify-between px-6 py-4 text-left font-medium transition-colors hover:bg-gray-50/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:hover:bg-gray-800/50",
        className
      )}
      custom={{ reduced: prefersReducedMotion } satisfies MotionCustom}
      initial={false}
      variants={accordionHighlight}
      animate={isOpen ? "open" : "closed"}
      onClick={toggle}
      type="button"
    >
      <span className="text-gray-800 dark:text-gray-100">{children}</span>
      <motion.div
        className="text-gray-500 dark:text-gray-400"
        custom={{ reduced: prefersReducedMotion } satisfies MotionCustom}
        initial="closed"
        variants={rotateChevron}
        animate={isOpen ? "open" : "closed"}
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
      className="overflow-hidden"
      id={contentId}
      initial={false}
      custom={{ reduced: prefersReducedMotion } satisfies MotionCustom}
      variants={expandCollapse}
      animate={isOpen ? "visible" : "hidden"}
      style={prefersReducedMotion ? { display: isOpen ? "block" : "none" } : {}}
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
