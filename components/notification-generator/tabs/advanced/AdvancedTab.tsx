"use client";

import type { FieldType, NotificationConfig } from "../../types";

interface AdvancedTabProps {
  notification: NotificationConfig;
  onChange: (field: FieldType, value: boolean) => void;
}

export const AdvancedTab = ({ notification, onChange }: AdvancedTabProps) => (
  <div>
    <div className="mb-4">
      <div className="flex items-center">
        <input
          type="checkbox"
          id="titleHide"
          className="h-4 w-4 rounded-sm border-gray-300 text-blue-600 focus:ring-blue-500"
          checked={notification.titleHide}
          onChange={(e) => onChange("titleHide", e.target.checked)}
        />
        <label htmlFor="titleHide" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
          Clear title/subtitle before sending new one
        </label>
      </div>
    </div>
  </div>
);
