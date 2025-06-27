"use client";

import { FormField } from "../../form/FormField";
import { NotificationConfig, FieldType } from "../../types";
import { MiniMessageInfoBox } from "../MiniMessageInfoBox";

interface TitleTabProps {
  notification: NotificationConfig;
  onChange: (field: FieldType, value: string) => void;
  errors: Record<string, string>;
}

export const TitleTab = ({ notification, onChange, errors }: TitleTabProps) => (
  <div>
    <FormField
      label="Title"
      name="title"
      value={notification.title}
      onChange={onChange}
      placeholder="Enter your title"
      editorButtonSet="basic"
    />

    <FormField
      label="Subtitle"
      name="subtitle"
      value={notification.subtitle}
      onChange={onChange}
      placeholder="Enter your subtitle"
      editorButtonSet="basic"
    />

    <div className="mb-4 grid grid-cols-3 gap-4">
      <FormField
        label="Fade In"
        name="fadeIn"
        value={notification.fadeIn}
        onChange={onChange}
        placeholder="e.g. 1s"
        error={errors.fadeIn}
        showEditorButtons={false}
      />

      <FormField
        label="Stay"
        name="stay"
        value={notification.stay}
        onChange={onChange}
        placeholder="e.g. 2s"
        error={errors.stay}
        showEditorButtons={false}
      />

      <FormField
        label="Fade Out"
        name="fadeOut"
        value={notification.fadeOut}
        onChange={onChange}
        placeholder="e.g. 1s"
        error={errors.fadeOut}
        showEditorButtons={false}
      />
    </div>
    <MiniMessageInfoBox />
  </div>
);
