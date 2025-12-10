"use client";

import { motion } from "framer-motion";

import type { TabType } from "../types";

interface TabProps {
  activeTab: TabType;
  tabName: TabType;
  label: string;
  onClick: (tab: TabType) => void;
}

export const Tab = ({ activeTab, tabName, label, onClick }: TabProps) => {
  const isActive = activeTab === tabName;

  return (
    <button
      type="button"
      id={`tab-${tabName}`}
      className={`relative rounded-lg px-4 py-2 text-sm font-medium transition-colors duration-200 focus:outline-none cursor-pointer ${
        isActive
          ? "text-gray-900 dark:text-white"
          : "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
      }`}
      onClick={() => onClick(tabName)}
      role="tab"
      aria-selected={isActive}
      aria-controls={`panel-${tabName}`}
      tabIndex={isActive ? 0 : -1}
    >
      {isActive && (
        <motion.div
          layoutId="activeTab"
          className="absolute inset-0 rounded-lg bg-white shadow-sm dark:bg-gray-800"
          initial={false}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
      )}
      <span className="relative z-10">{label}</span>
    </button>
  );
};
