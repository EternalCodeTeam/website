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
    <div className="my-6 overflow-hidden rounded-xl bg-gray-800 shadow">
      <TabGroup>
        <TabList className="flex space-x-1 px-2 pb-0 pl-4 pt-2">
          {React.Children.map(children, (child) => {
            if (React.isValidElement(child)) {
              const label = child.props.label;
              return (
                <Tab
                  className={({ selected }: { selected: boolean }) =>
                    `rounded-lg px-4 py-2 text-sm font-medium transition-colors focus:outline-none ${
                      selected
                        ? "bg-gray-700 text-white shadow"
                        : "text-gray-300 hover:text-white"
                    } `
                  }
                >
                  <span className="flex items-center">
                    {getLanguageIcon(label)}
                    {label}
                  </span>
                </Tab>
              );
            }
            return null;
          })}
        </TabList>
        <TabPanels>
          {React.Children.map(children, (child) => {
            if (React.isValidElement(child)) {
              return (
                <TabPanel className="px-4 pb-4 pt-4">
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
