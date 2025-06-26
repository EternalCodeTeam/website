import { FieldType } from "../types";

export type TagCategory = {
  pattern: RegExp;
  tags: string[];
};

export interface MinecraftColor {
  name: string;
  hex: string;
}

export interface FormFieldProps {
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
}

export interface ColorPickerProps {
  onApplyAction: (color: string, isGradient: boolean, colors: string[]) => void;
  onCloseAction: () => void;
}

export interface TextFormattingProps {
  onFormat: (format: string) => void;
  onInsertTag: (tag: string) => void;
  editorButtonSet?: "all" | "basic";
} 