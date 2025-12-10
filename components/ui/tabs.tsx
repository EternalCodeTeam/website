"use client";

import { motion } from "framer-motion";
import { createContext, useContext, useState, useId } from "react";
import { cn } from "@/lib/utils";

type TabsContextType = {
  activeTab: string;
  setActiveTab: (value: string) => void;
  layoutId: string;
};

const TabsContext = createContext<TabsContextType | undefined>(undefined);

function useTabs() {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error("Tabs components must be used within a Tabs provider");
  }
  return context;
}

interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultValue: string;
  onValueChange?: (value: string) => void;
  children: React.ReactNode;
}

export function Tabs({ defaultValue, onValueChange, className, children, ...props }: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultValue);
  const layoutId = useId();

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    onValueChange?.(value);
  };

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab: handleTabChange, layoutId }}>
      <div className={cn("w-full", className)} {...props}>
        {children}
      </div>
    </TabsContext.Provider>
  );
}

interface TabsListProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function TabsList({ className, children, ...props }: TabsListProps) {
  return (
    <div
      className={cn(
        "inline-flex h-12 items-center justify-center rounded-full bg-gray-100 p-1 dark:bg-gray-900/50 backdrop-blur-sm border border-gray-200 dark:border-white/10",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

interface TabsTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
  children: React.ReactNode;
}

export function TabsTrigger({ className, value, children, ...props }: TabsTriggerProps) {
  const { activeTab, setActiveTab, layoutId } = useTabs();
  const isActive = activeTab === value;

  return (
    <button
      type="button"
      onClick={() => setActiveTab(value)}
      className={cn(
        "relative inline-flex items-center justify-center whitespace-nowrap rounded-full px-6 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 disabled:pointer-events-none disabled:opacity-50",
        isActive
          ? "text-blue-600 dark:text-blue-400"
          : "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200",
        className
      )}
      {...props}
    >
      {isActive && (
        <motion.div
          layoutId={`tab-bg-${layoutId}`}
          className="absolute inset-0 z-0 rounded-full bg-white shadow-sm dark:bg-white/10"
          initial={false}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
      )}
      <span className="relative z-10">{children}</span>
    </button>
  );
}

interface TabsContentProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
  children: React.ReactNode;
}

export function TabsContent({ className, value, children, ...props }: TabsContentProps) {
  const { activeTab } = useTabs();
  const isActive = activeTab === value;

  if (!isActive) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.98 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={cn(
        "mt-6 ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2",
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
}
