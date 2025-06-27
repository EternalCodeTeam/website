"use client";

import { FormField } from "../../form/FormField";
import { NotificationConfig, FieldType } from "../../types";
import { MiniMessageInfoBox } from "../MiniMessageInfoBox";

interface ChatTabProps {
  notification: NotificationConfig;
  onChange: (field: FieldType, value: string) => void;
}

export const ChatTab = ({ notification, onChange }: ChatTabProps) => (
  <div>
    <FormField
      label="Chat Message"
      name="chat"
      value={notification.chat}
      onChange={onChange}
      placeholder="Enter your chat message (use multiple lines for multiline chat)"
      type="textarea"
      helpText="Use multiple lines to create a multiline chat message."
      editorButtonSet="all"
    />
    <MiniMessageInfoBox />
  </div>
);
