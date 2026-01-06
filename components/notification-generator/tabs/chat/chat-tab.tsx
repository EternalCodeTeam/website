"use client";

import { FormField } from "../../form/form-field";
import type { FieldType, NotificationConfig } from "../../types";

interface ChatTabProps {
  notification: NotificationConfig;
  onChange: (field: FieldType, value: string) => void;
}

export const ChatTab = ({ notification, onChange }: ChatTabProps) => (
  <div>
    <FormField
      editorButtonSet="all"
      helpText="Use multiple lines to create a multiline chat message."
      label="Chat Message"
      name="chat"
      onChange={onChange}
      placeholder="Enter your chat message (use multiple lines for multiline chat)"
      type="textarea"
      value={notification.chat}
    />
  </div>
);
