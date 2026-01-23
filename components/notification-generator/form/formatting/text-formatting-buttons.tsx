"use client";

import { motion } from "framer-motion";
import {
  Bold,
  Eye,
  Italic,
  Link,
  MessageSquare,
  Palette,
  Strikethrough,
  Terminal,
  Underline,
  Wand2,
} from "lucide-react";
import { useState } from "react";

import { ColorPicker } from "../color-picker/color-picker";
import type { TextFormattingProps } from "../types";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { hoverScaleSoft, type MotionCustom } from "@/lib/animations/variants";

export const TextFormattingButtons = ({
  onFormat,
  onInsertTag,
  editorButtonSet = "all",
  onColorApply,
}: TextFormattingProps & {
  onColorApply?: (color: string, isGradient: boolean, colors: string[]) => void;
}) => {
  const [showColorPicker, setShowColorPicker] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const handleColorApply = (color: string, isGradient: boolean, colors: string[]) => {
    onColorApply?.(color, isGradient, colors);
    onInsertTag(color);
    setShowColorPicker(false);
  };

  const formattingButtons = [
    { title: "Bold", icon: Bold, action: () => onFormat("bold"), shortcut: "**" },
    { title: "Italic", icon: Italic, action: () => onFormat("italic"), shortcut: "*" },
    { title: "Underline", icon: Underline, action: () => onFormat("underline"), shortcut: "__" },
    {
      title: "Strikethrough",
      icon: Strikethrough,
      action: () => onFormat("strikethrough"),
      shortcut: "~~",
    },
    { title: "Obfuscated", icon: Wand2, action: () => onFormat("obfuscated"), shortcut: "||" },
  ];

  const interactionButtons =
    editorButtonSet === "all"
      ? [
          {
            title: "Add Link",
            icon: Link,
            action: () => onInsertTag("<click:open_url:'url'></click>"),
          },
          {
            title: "Run Command",
            icon: Terminal,
            action: () => onInsertTag("<click:run_command:'/command'></click>"),
          },
          {
            title: "Suggest Command",
            icon: MessageSquare,
            action: () => onInsertTag("<click:suggest_command:'/command'></click>"),
          },
          {
            title: "Hover Text",
            icon: Eye,
            action: () => onInsertTag("<hover:show_text:'text'></hover>"),
          },
        ]
      : [];

  return (
    <div className="mb-3 flex flex-wrap items-center gap-2">
      {/* Color Picker Section */}
      <div className="relative">
        <div className="flex items-center rounded-lg border border-gray-200 bg-white p-1 dark:border-white/10 dark:bg-white/5">
          <motion.button
            className={`flex h-8 w-8 cursor-pointer items-center justify-center rounded-md transition-colors ${
              showColorPicker
                ? "bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400"
                : "text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-white/10 dark:hover:text-white"
            }`}
            onClick={() => setShowColorPicker((v) => !v)}
            title="Text Color"
            type="button"
            custom={{ reduced: prefersReducedMotion, scale: 1.05, tapScale: 0.95 } satisfies MotionCustom}
            initial="initial"
            variants={hoverScaleSoft}
            whileHover="hover"
            whileTap="tap"
          >
            <Palette className="h-4 w-4" strokeWidth={2.5} />
          </motion.button>
        </div>

        {!!showColorPicker && (
          <ColorPicker
            onApplyAction={handleColorApply}
            onCloseAction={() => setShowColorPicker(false)}
          />
        )}
      </div>

      {/* Divider */}
      <div className="h-6 w-px bg-gray-200 dark:bg-white/10" />

      {/* Formatting Buttons */}
      <ButtonGroup buttons={formattingButtons} prefersReducedMotion={prefersReducedMotion} />

      {/* Interaction Buttons (if any) */}
      {interactionButtons.length > 0 && (
        <>
          <div className="h-6 w-px bg-gray-200 dark:bg-white/10" />
          <ButtonGroup buttons={interactionButtons} prefersReducedMotion={prefersReducedMotion} />
        </>
      )}
    </div>
  );
};

const ButtonGroup = ({
  buttons,
  prefersReducedMotion,
}: {
  buttons: {
    title: string;
    icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
    action: () => void;
  }[];
  prefersReducedMotion: boolean;
}) => (
  <div className="flex items-center gap-0.5 rounded-lg border border-gray-200 bg-white p-1 dark:border-white/10 dark:bg-white/5">
    {buttons.map(({ title, icon: Icon, action }) => (
      <motion.button
        className="group relative flex h-8 w-8 cursor-pointer items-center justify-center rounded-md text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-white/10 dark:hover:text-white"
        key={title}
        onClick={action}
        title={title}
        type="button"
        custom={{ reduced: prefersReducedMotion, scale: 1.05, tapScale: 0.95 } satisfies MotionCustom}
        initial="initial"
        variants={hoverScaleSoft}
        whileHover="hover"
        whileTap="tap"
      >
        <Icon className="h-4 w-4" strokeWidth={2.5} />
      </motion.button>
    ))}
  </div>
);
