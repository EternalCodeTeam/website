"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import * as React from "react";
import { cn } from "@/lib/utils";

type AccordionContextType = {
  activeItem: string | undefined;
  setActiveItem: (item: string | undefined) => void;
};

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
      <div className={cn("flex flex-col gap-4 justify-start items-stretch", className)}>
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
}

export function AccordionTrigger({ children, className, value }: AccordionTriggerProps) {
  const context = React.useContext(AccordionContext);
  if (!context) {
    throw new Error("AccordionTrigger must be used within Accordion");
  }

  const isOpen = context.activeItem === value;
  const toggle = () => {
    context.setActiveItem(isOpen ? undefined : value);
  };

  return (
    <motion.button
      onClick={toggle}
      className={cn(
        "flex w-full cursor-pointer items-center justify-between px-6 py-4 text-left font-medium transition-colors hover:bg-gray-50/50 dark:hover:bg-gray-800/50",
        className
      )}
      initial={false}
      animate={{ backgroundColor: isOpen ? "rgba(0,0,0,0.02)" : "transparent" }}
    >
      <span className="text-gray-800 dark:text-gray-100">{children}</span>
      <motion.div
        animate={{ rotate: isOpen ? 180 : 0 }}
        transition={{ duration: 0.3, type: "spring", stiffness: 300, damping: 20 }}
        className="text-gray-500 dark:text-gray-400"
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
}

export function AccordionContent({ children, className, value }: AccordionContentProps) {
  const context = React.useContext(AccordionContext);
  if (!context) {
    throw new Error("AccordionContent must be used within Accordion");
  }

  const isOpen = context.activeItem === value;
  const contentRef = React.useRef<HTMLDivElement>(null);

  return (
    <motion.div
      initial={false}
      animate={{
        height: isOpen ? "auto" : 0,
        opacity: isOpen ? 1 : 0,
      }}
      transition={{
        height: {
          duration: 0.4,
          ease: "easeInOut",
        },
        opacity: {
          duration: 0.25,
          delay: isOpen ? 0.2 : 0,
        },
      }}
      className="overflow-hidden"
      style={{ transformOrigin: "top" }}
    >
      <div
        ref={contentRef}
        className={cn("px-6 pb-4 pt-1 text-gray-600 dark:text-gray-300", className)}
      >
        {children}
      </div>
    </motion.div>
  );
}
