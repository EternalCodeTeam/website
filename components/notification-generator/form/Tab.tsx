"use client";

import { motion } from "framer-motion";
import { TabType } from "../types";

interface TabProps {
  activeTab: TabType;
  tabName: TabType;
  label: string;
  onClick: (tab: TabType) => void;
}

export const Tab = ({ activeTab, tabName, label, onClick }: TabProps) => {
  const isActive = activeTab === tabName;
  
  return (
    <motion.button
      id={`tab-${tabName}`}
      className={`relative px-3 py-2 text-sm font-medium transition-colors duration-200 ease-in-out ${
        isActive
          ? "border-b-2 border-blue-500 text-blue-600 dark:text-blue-400"
          : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
      }`}
      onClick={() => onClick(tabName)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: -5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.1 }}
      role="tab"
      aria-selected={isActive}
      aria-controls={`panel-${tabName}`}
      tabIndex={isActive ? 0 : -1}
    >
      {label}
      {isActive && (
        <motion.div
          className="absolute bottom-0 left-0 h-0.5 w-full bg-blue-500"
          layoutId="activeTab"
          transition={{ type: "spring", stiffness: 300, damping: 30, duration: 0.1 }}
        />
      )}
    </motion.button>
  );
}; 