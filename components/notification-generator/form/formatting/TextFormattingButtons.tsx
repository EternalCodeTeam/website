"use client";

import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Link,
  Terminal,
  MessageSquare,
  Eye,
  Palette,
} from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";

import { ColorPicker } from "../color-picker/ColorPicker";
import { TextFormattingProps } from "../types";

const formattingButtonClass = "h-8 w-8 rounded-full p-0 text-blue-600 dark:text-blue-400 flex items-center justify-center";

export const TextFormattingButtons = ({
  onFormat,
  onInsertTag,
  editorButtonSet = "all",
  onColorApply,
}: TextFormattingProps & {
  onColorApply?: (color: string, isGradient: boolean, colors: string[]) => void;
}) => {
  const [showColorPicker, setShowColorPicker] = useState(false);

  const handleColorApply = (color: string, isGradient: boolean, colors: string[]) => {
    onColorApply?.(color, isGradient, colors);
    onInsertTag(color);
    setShowColorPicker(false);
  };

  const commonButtons = [
    { title: "Color", icon: Palette, onClick: () => setShowColorPicker((v) => !v) },
    { title: "Bold", icon: Bold, onClick: () => onFormat("bold") },
    { title: "Italic", icon: Italic, onClick: () => onFormat("italic") },
    { title: "Underline", icon: Underline, onClick: () => onFormat("underline") },
    { title: "Strikethrough", icon: Strikethrough, onClick: () => onFormat("strikethrough") },
  ];

  const extraButtons =
    editorButtonSet === "all"
      ? [
          { title: "Add Link", icon: Link, onClick: () => onInsertTag("<click:open_url:'url'></click>") },
          { title: "Run Command", icon: Terminal, onClick: () => onInsertTag("<click:run_command:'/command'></click>") },
          { title: "Suggest Command", icon: MessageSquare, onClick: () => onInsertTag("<click:suggest_command:'/command'></click>") },
          { title: "Hover", icon: Eye, onClick: () => onInsertTag("<hover:show_text:'text'></hover>") },
        ]
      : [];

  return (
    <div className="flex gap-1 mb-2">
      {showColorPicker && (
        <ColorPicker
          onApplyAction={handleColorApply}
          onCloseAction={() => setShowColorPicker(false)}
        />
      )}
      {[...commonButtons, ...extraButtons].map(({ title, icon: Icon, onClick }) => (
        <Button
          key={title}
          type="button"
          variant="ghost"
          size="sm"
          onClick={onClick}
          title={title}
          className={formattingButtonClass}
        >
          <Icon className="h-4 w-4" />
        </Button>
      ))}
    </div>
  );
};
