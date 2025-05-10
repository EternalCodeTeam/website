"use client";

import React from "react";
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from "@headlessui/react";
import * as SIIcons from "react-icons/si";

interface CodeTabsProps {
  children: React.ReactNode;
}

function getLanguageIcon(label: string) {
  const iconName =
    "Si" +
    label
      .replace(/[^a-zA-Z0-9]/g, "")
      .toLowerCase()
      .replace(/^./, (c) => c.toUpperCase());
  const Icon = (SIIcons as any)[iconName];
  if (Icon) return <Icon className="mr-1" title={label} size={18} />;
  return (
    <span className="mr-1" title={label}>
      📄
    </span>
  );
}

export const CodeTabs: React.FC<CodeTabsProps> = ({ children }) => {
  return (
    <div className="my-8 overflow-hidden rounded-2xl bg-gradient-to-br from-gray-800/80 via-gray-900/80 to-gray-800/60 ring-1 ring-white/10 backdrop-blur-md">
      <TabGroup>
        <TabList className="flex space-x-2 px-4 pt-4 pb-0">
          {React.Children.map(children, (child, idx) => {
            if (React.isValidElement(child)) {
              const label = child.props.label;
              return (
                <Tab key={label + idx} as={React.Fragment}>
                  {({ selected }: { selected: boolean }) => (
                    <button
                      className={`relative rounded-xl px-4 py-2 text-sm font-semibold transition-colors duration-150 focus:outline-none
                        ${
                          selected
                            ? "bg-gray-700/60 text-white shadow-md"
                            : "text-gray-300 hover:text-white hover:bg-gray-700/60"
                        }
                      `}
                      type="button"
                    >
                      <span className="flex items-center gap-1">
                        {getLanguageIcon(label)}
                        {label}
                      </span>
                    </button>
                  )}
                </Tab>
              );
            }
            return null;
          })}
        </TabList>
        <TabPanels>
          {React.Children.map(children, (child, idx) => {
            if (React.isValidElement(child)) {
              return (
                <TabPanel
                  key={idx}
                  className="px-4 pb-6 pt-4 transition-all duration-300 bg-gray-900/80 rounded-xl shadow-lg border border-white/10 mt-2 animate-fadein"
                >
                  {child.props.children}
                </TabPanel>
              );
            }
            return null;
          })}
        </TabPanels>
      </TabGroup>
    </div>
  );
};

interface CodeTabProps {
  label: string;
  children: React.ReactNode;
}

export const CodeTab: React.FC<CodeTabProps> = ({ children }) => {
  return <>{children}</>;
};
