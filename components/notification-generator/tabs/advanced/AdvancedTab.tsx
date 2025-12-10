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
        onChange={(checked) => onChange("titleHide", checked)}
      />
      <div className="flex flex-col">
        {/* biome-ignore lint/a11y/useKeyWithClickEvents: Label is interactive for switch */}
        <label
          htmlFor="titleHide"
          className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-200"
          onClick={() => onChange("titleHide", !notification.titleHide)}
        >
          Clear Title Before Sending
        </label>
        <span className="text-xs text-gray-500 dark:text-gray-400">
          If enabled, the previous title will be cleared immediately before showing the new one.
        </span>
      </div>
    </div>
  </div>
);
