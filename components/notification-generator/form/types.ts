import type { FieldType } from "../types";

export type TagCategory = {
  pattern: RegExp;
  tags: string[];
};

export type MinecraftColor = {
  name: string;
  hex: string;
};

export type FormFieldProps = {
  label: string;
  name: FieldType;
  value: string;
  onChange: (name: FieldType, value: string) => void;
  placeholder?: string;
  error?: string;
  type?: "text" | "textarea";
  rows?: number;
  helpText?: string;
  showEditorButtons?: boolean;
  editorButtonSet?: "all" | "basic";
};

export type ColorPickerProps = {
  onApplyAction: (color: string, isGradient: boolean, colors: string[]) => void;
  onCloseAction: () => void;
};

export type TextFormattingProps = {
  onFormat: (format: string) => void;
  onInsertTag: (tag: string) => void;
  editorButtonSet?: "all" | "basic";
};
