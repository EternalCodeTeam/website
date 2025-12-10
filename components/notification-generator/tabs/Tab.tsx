"use client";

import { motion } from "framer-motion";

import type { TabType } from "../types";

type TabProps = {
  activeTab: TabType;
  tabName: TabType;
  label: string;
  onClick: (tab: TabType) => void;
};

export const Tab = ({ activeTab, tabName, label, onClick }: TabProps) => {
  const isActive = activeTab === tabName;

  return (
    <button
      aria-controls={`panel-${tabName}`}
      aria-selected={isActive}
      className={`relative cursor-pointer rounded-lg px-4 py-2 font-medium text-sm transition-colors duration-200 focus:outline-none ${
        isActive
          ? "text-gray-900 dark:text-white"
          : "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
      }`}
      id={`tab-${tabName}`}
      onClick={() => onClick(tabName)}
      role="tab"
      tabIndex={isActive ? 0 : -1}
      type="button"
    >
      {!!isActive && (
        <motion.div
          className="absolute inset-0 rounded-lg bg-white shadow-sm dark:bg-gray-800"
          initial={false}
          layoutId="activeTab"
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
      )}
      <span className="relative z-10">{label}</span>
    </button>
  );
};
