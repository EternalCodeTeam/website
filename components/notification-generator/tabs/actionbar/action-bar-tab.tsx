"use client";

import { FormField } from "../../form/form-field";
import type { FieldType, NotificationConfig } from "../../types";

type ActionBarTabProps = {
  notification: NotificationConfig;
  onChange: (field: FieldType, value: string) => void;
};

export const ActionBarTab = ({ notification, onChange }: ActionBarTabProps) => (
  <div>
    <FormField
      editorButtonSet="basic"
      label="Action Bar Message"
      name="actionbar"
      onChange={onChange}
      placeholder="Enter your action bar message"
      value={notification.actionbar}
    />
  </div>
);
