"use client";

import { FormField } from "../../form/FormField";
import type { FieldType, NotificationConfig } from "../../types";

interface TitleTabProps {
  notification: NotificationConfig;
  onChange: (field: FieldType, value: string) => void;
  errors: Record<string, string>;
}

export const TitleTab = ({ notification, onChange, errors }: TitleTabProps) => (
  <div>
    <FormField
      editorButtonSet="basic"
      label="Title"
      name="title"
      onChange={onChange}
      placeholder="Enter your title"
      value={notification.title}
    />

    <FormField
      editorButtonSet="basic"
      label="Subtitle"
      name="subtitle"
      onChange={onChange}
      placeholder="Enter your subtitle"
      value={notification.subtitle}
    />

    <div className="mb-4 grid grid-cols-3 gap-4">
      <FormField
        error={errors.fadeIn}
        label="Fade In"
        name="fadeIn"
        onChange={onChange}
        placeholder="e.g. 1s"
        showEditorButtons={false}
        value={notification.fadeIn}
      />

      <FormField
        error={errors.stay}
        label="Stay"
        name="stay"
        onChange={onChange}
        placeholder="e.g. 2s"
        showEditorButtons={false}
        value={notification.stay}
      />

      <FormField
        error={errors.fadeOut}
        label="Fade Out"
        name="fadeOut"
        onChange={onChange}
        placeholder="e.g. 1s"
        showEditorButtons={false}
        value={notification.fadeOut}
      />
    </div>
  </div>
);
