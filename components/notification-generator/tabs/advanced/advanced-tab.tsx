"use client";

import { Switch } from "@/components/ui/switch";

import type { FieldType, NotificationConfig } from "../../types";

interface AdvancedTabProps {
  notification: NotificationConfig;
  onChange: (field: FieldType, value: boolean) => void;
}

export const AdvancedTab = ({ notification, onChange }: AdvancedTabProps) => (
  <div className="space-y-4">
    <div className="flex items-center space-x-3 rounded-lg border border-gray-100 bg-gray-50/50 p-4 dark:border-white/5 dark:bg-white/5">
      <Switch
        checked={notification.titleHide}
        id="titleHide"
        onChange={(checked) => onChange("titleHide", checked)}
      />
      <div className="flex flex-col">
        <label
          className="cursor-pointer font-medium text-gray-700 text-sm dark:text-gray-200"
          htmlFor="titleHide"
        >
          Clear Title Before Sending
        </label>
        <span className="text-gray-500 text-xs dark:text-gray-400">
          If enabled, the previous title will be cleared immediately before showing the new one.
        </span>
      </div>
    </div>
  </div>
);
