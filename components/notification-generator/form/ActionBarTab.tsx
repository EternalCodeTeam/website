"use client";

import { MiniMessageInfoBox } from "../MiniMessageInfoBox";
import { NotificationConfig, FieldType } from "../types";

import { FormField } from "./FormField";

interface ActionBarTabProps {
  notification: NotificationConfig;
  onChange: (field: FieldType, value: string) => void;
}

export const ActionBarTab = ({ notification, onChange }: ActionBarTabProps) => (
  <div>
    <FormField
      label="Action Bar Message"
      name="actionbar"
      value={notification.actionbar}
      onChange={onChange}
      placeholder="Enter your action bar message"
      editorButtonSet="basic"
    />
    <MiniMessageInfoBox />
  </div>
);
