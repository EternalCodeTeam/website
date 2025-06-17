"use client";

import { motion } from "framer-motion";
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
  Trash2,
  Plus,
  X,
} from "lucide-react";
import { useRef, useState, useEffect, useMemo } from "react";
import { HexColorPicker } from "react-colorful";

import { Button } from "@/components/ui/button";

import { FieldType } from "../types";

type TagCategory = {
  pattern: RegExp;
  tags: string[];
};

interface FormFieldProps {
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

export const FormField = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  error,
  type = "text",
  rows = 8,
  helpText,
  showEditorButtons = true,
  editorButtonSet = "all",
}: FormFieldProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [isGradient, setIsGradient] = useState(false);
  const [colors, setColors] = useState<string[]>(["#000000"]);
  const [activeColorIndex, setActiveColorIndex] = useState(0);
  const [gradientPreview, setGradientPreview] = useState("");

  const minecraftColors = useMemo(
    () => [
      { name: "Black", hex: "#000000" },
      { name: "Dark Blue", hex: "#0000AA" },
      { name: "Dark Green", hex: "#00AA00" },
      { name: "Dark Aqua", hex: "#00AAAA" },
      { name: "Dark Red", hex: "#AA0000" },
      { name: "Dark Purple", hex: "#AA00AA" },
      { name: "Gold", hex: "#FFAA00" },
      { name: "Gray", hex: "#AAAAAA" },
      { name: "Dark Gray", hex: "#555555" },
      { name: "Blue", hex: "#5555FF" },
      { name: "Green", hex: "#55FF55" },
      { name: "Aqua", hex: "#55FFFF" },
      { name: "Red", hex: "#FF5555" },
      { name: "Light Purple", hex: "#FF55FF" },
      { name: "Yellow", hex: "#FFFF55" },
      { name: "White", hex: "#FFFFFF" },
    ],
    []
  );

  useEffect(() => {
    if (isGradient && colors.length > 0) {
      const gradientString = `linear-gradient(to right, ${colors.join(", ")})`;
      setGradientPreview(gradientString);
    }
  }, [isGradient, colors]);

  const allowedTags: Record<string, TagCategory> = {
    basic: {
      pattern: /^<(b|i|u|st)><\/\1>$/,
      tags: ["<b></b>", "<i></i>", "<u></u>", "<st></st>"],
    },
    click: {
      pattern: /^<click:(open_url|run_command|suggest_command):'[^']*'><\/click>$/,
      tags: [
        "<click:open_url:'url'></click>",
        "<click:run_command:'/command'></click>",
        "<click:suggest_command:'/command'></click>",
      ],
    },
    hover: {
      pattern: /^<hover:show_text:'[^']*'><\/hover>$/,
      tags: ["<hover:show_text:'text'></hover>"],
    },
    color: {
      pattern: /^<(color):#[0-9a-fA-F]{6}><\/(color)>$|^<(gradient):#[0-9a-fA-F]{6}(?::#[0-9a-fA-F]{6})*><\/(gradient)>$/,
      tags: ["<color:#000000></color>", "<gradient:#000000:#ffffff></gradient>"],
    },
    minecraftColor: {
      pattern:
        /^<(black|dark_blue|dark_green|dark_aqua|dark_red|dark_purple|gold|gray|dark_gray|blue|green|aqua|red|light_purple|yellow|white)>$/,
      tags: [],
    },
  };

  const isValidTag = (tag: string): boolean => {
    return (Object.values(allowedTags) as TagCategory[]).some(
      (category) => category.pattern.test(tag) || category.tags.includes(tag)
    );
  };

  const checkFormatting = () => {
    const input = type === "textarea" ? textareaRef.current : inputRef.current;
    if (!input) return;

    const start = input.selectionStart;
    const end = input.selectionEnd;
    if (start === null || end === null) return;
  };

  const toggleFormatting = (format: string) => {
    const input = type === "textarea" ? textareaRef.current : inputRef.current;
    if (!input) return;

    const start = input.selectionStart;
    const end = input.selectionEnd;
    if (start === null || end === null) return;

    const text = input.value;
    const selectedText = text.substring(start, end);

    let newValue = text;
    let newCursorPosition = end;

    const formatTags: Record<string, { open: string; close: string }> = {
      bold: { open: "<b>", close: "</b>" },
      italic: { open: "<i>", close: "</i>" },
      underline: { open: "<u>", close: "</u>" },
      strikethrough: { open: "<st>", close: "</st>" },
    };

    const { open, close } = formatTags[format];

    const regex = new RegExp(`^${open}.*?${close}$`);
    if (regex.test(selectedText)) {
      newValue =
        text.substring(0, start) +
        selectedText.substring(open.length, selectedText.length - close.length) +
        text.substring(end);
      newCursorPosition = end - (open.length + close.length);
    } else {
      newValue = text.substring(0, start) + open + selectedText + close + text.substring(end);
      newCursorPosition = end + open.length + close.length;
    }

    onChange(name, newValue);

    requestAnimationFrame(() => {
      if (input) {
        input.selectionStart = newCursorPosition;
        input.selectionEnd = newCursorPosition;
        input.focus();
      }
    });
  };

  const handleSelectionChange = () => {
    checkFormatting();
  };

  const insertTag = (tag: string) => {
    if (!isValidTag(tag)) {
      console.warn(`Invalid tag format: ${tag}`);
      return;
    }

    const input = type === "textarea" ? textareaRef.current : inputRef.current;
    if (!input) return;

    const start = input.selectionStart;
    const end = input.selectionEnd;
    if (start === null || end === null) return;

    const value = input.value;
    let newValue;
    let newCursorPosition;

    if (start !== end) {
      const selectedText = value.substring(start, end);
      newValue =
        value.substring(0, start) + tag.replace("></", `>${selectedText}</`) + value.substring(end);
      newCursorPosition = start + tag.replace("></", `>${selectedText}</`).length;
    } else {
      newValue = value.substring(0, start) + tag + value.substring(end);
      newCursorPosition = start + tag.length;
    }

    onChange(name, newValue);

    requestAnimationFrame(() => {
      if (input) {
        input.selectionStart = newCursorPosition;
        input.selectionEnd = newCursorPosition;
        input.focus();
      }
    });
  };

  const handleFormatButtonClick = (format: string) => {
    const input = type === "textarea" ? textareaRef.current : inputRef.current;
    if (!input) return;

    const start = input.selectionStart;
    const end = input.selectionEnd;
    if (start === null || end === null) return;

    const text = input.value;
    const selectedText = text.substring(start, end);

    const formatToTag: Record<string, string> = {
      bold: "b",
      italic: "i",
      underline: "u",
      strikethrough: "st"
    };

    if (selectedText) {
      toggleFormatting(format);
    } else {
      const tag = formatToTag[format] || format;
      insertTag(`<${tag}></${tag}>`);
    }
  };

  const handleColorChange = (color: string) => {
    const newColors = [...colors];
    newColors[activeColorIndex] = color;
    setColors(newColors);
  };

  const addColor = () => {
    setColors([...colors, "#000000"]);
    setActiveColorIndex(colors.length);
  };

  const removeColor = (index: number) => {
    if (colors.length <= 1) return;
    const newColors = colors.filter((_, i) => i !== index);
    setColors(newColors);
    setActiveColorIndex(Math.min(activeColorIndex, newColors.length - 1));
  };

  const applyColor = () => {
    if (isGradient) {
      insertTag(`<gradient:${colors.join(":")}></gradient>`);
    } else {
      const selectedHex = colors[0];
      const matchingMinecraftColor = minecraftColors.find(
        (mcColor) => mcColor.hex.toLowerCase() === selectedHex.toLowerCase()
      );
      if (matchingMinecraftColor) {
        insertTag(`<${matchingMinecraftColor.name.toLowerCase().replace(/ /g, '_')}>`);
      } else {
        insertTag(`<color:${selectedHex}></color>`);
      }
    }
    setShowColorPicker(false);
  };

  const inputClasses = `w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 ${
    error ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""
  }`;

  return (
    <div className="mb-4">
      <label
        htmlFor={`formfield-${name}`}
        className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
      >
        {label}
      </label>
      <div className="mb-2 flex flex-wrap gap-1">
        {showEditorButtons && (
          <>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setShowColorPicker(!showColorPicker)}
              title="Color"
            >
              <Palette className="h-4 w-4" />
            </Button>
            {showColorPicker && (
              <div className="absolute z-10 mt-10 rounded-lg border border-gray-300 bg-white p-4 shadow-lg dark:border-gray-600 dark:bg-gray-800">
                <div className="mb-2 flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="gradient-toggle"
                      checked={isGradient}
                      onChange={(e) => setIsGradient(e.target.checked)}
                      className="mr-2 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700"
                    />
                    <label
                      htmlFor="gradient-toggle"
                      className="text-sm text-gray-700 dark:text-gray-300"
                    >
                      Gradient
                    </label>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowColorPicker(false)}
                    className="h-6 w-6 p-0"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                {isGradient && (
                  <>
                    <div className="mb-2 flex flex-wrap gap-2">
                      {colors.map((color, index) => (
                        <div key={index} className="group relative">
                          <div
                            className={`h-8 w-8 cursor-pointer rounded border-2 ${
                              activeColorIndex === index
                                ? "border-blue-500"
                                : "border-gray-300 dark:border-gray-600"
                            }`}
                            style={{ backgroundColor: color }}
                            onClick={() => setActiveColorIndex(index)}
                            onKeyDown={(e) => {
                              if (e.key === "Enter" || e.key === " ") {
                                setActiveColorIndex(index);
                              }
                            }}
                            role="button"
                            tabIndex={0}
                            aria-label={`Select color ${index + 1}`}
                          />
                          {colors.length > 1 && (
                            <Button
                              type="button"
                              variant="danger"
                              size="xs"
                              className="absolute -right-1 -top-1 h-4 w-4 p-0 opacity-0 transition-opacity group-hover:opacity-100"
                              onClick={() => removeColor(index)}
                              title="Remove Color"
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          )}
                        </div>
                      ))}
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="h-8 w-8 border-dashed p-0"
                        onClick={addColor}
                        title="Add Color"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="mb-2">
                      <label htmlFor="gradient-preview" className="mb-1 block text-xs">
                        Gradient Preview
                      </label>
                      <div
                        id="gradient-preview"
                        className="h-10 w-full rounded border border-gray-300 dark:border-gray-600"
                        style={{ background: gradientPreview }}
                      />
                    </div>
                  </>
                )}

                <HexColorPicker
                  className="mx-auto w-full"
                  color={colors[activeColorIndex]}
                  onChange={handleColorChange}
                />
                <div className="mt-2 flex justify-between">
                  <div className="flex items-center">
                    <div
                      className="mr-2 h-6 w-6 rounded border border-gray-300 dark:border-gray-600"
                      style={{ backgroundColor: colors[activeColorIndex] }}
                    />
                    <input
                      type="text"
                      value={colors[activeColorIndex]}
                      onChange={(e) => handleColorChange(e.target.value)}
                      className="w-20 rounded border border-gray-300 bg-white px-2 py-1 text-sm dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                      placeholder="#000000"
                    />
                  </div>
                  <Button type="button" variant="primary" size="sm" onClick={applyColor}>
                    Apply
                  </Button>
                </div>
              </div>
            )}
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => handleFormatButtonClick("bold")}
              title="Bold"
            >
              <Bold className="h-4 w-4" />
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => handleFormatButtonClick("italic")}
              title="Italic"
            >
              <Italic className="h-4 w-4" />
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => handleFormatButtonClick("underline")}
              title="Underline"
            >
              <Underline className="h-4 w-4" />
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => handleFormatButtonClick("strikethrough")}
              title="Strikethrough"
            >
              <Strikethrough className="h-4 w-4" />
            </Button>
            {editorButtonSet === "all" && (
              <>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => insertTag("<click:open_url:'url'></click>")}
                  title="Add Link"
                >
                  <Link className="h-4 w-4" />
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => insertTag("<click:run_command:'/command'></click>")}
                  title="Run Command"
                >
                  <Terminal className="h-4 w-4" />
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => insertTag("<click:suggest_command:'/command'></click>")}
                  title="Suggest Command"
                >
                  <MessageSquare className="h-4 w-4" />
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => insertTag("<hover:show_text:'text'></hover>")}
                  title="Hover"
                >
                  <Eye className="h-4 w-4" />
                </Button>
              </>
            )}
          </>
        )}
      </div>
      {type === "textarea" ? (
        <motion.textarea
          className={inputClasses}
          rows={rows}
          value={value}
          onChange={(e) => onChange(name, e.target.value)}
          onSelect={handleSelectionChange}
          placeholder={placeholder}
          initial={{ opacity: 0, y: 3 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.1, delay: 0.05 }}
          whileFocus={{ scale: 1.01 }}
          ref={textareaRef}
          id={`formfield-${name}`}
          aria-describedby={error ? `error-${name}` : helpText ? `help-${name}` : undefined}
          aria-invalid={error ? "true" : "false"}
        />
      ) : (
        <motion.input
          className={inputClasses}
          type={type}
          value={value}
          onChange={(e) => onChange(name, e.target.value)}
          onSelect={handleSelectionChange}
          placeholder={placeholder}
          initial={{ opacity: 0, y: 3 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.1, delay: 0.05 }}
          whileFocus={{ scale: 1.01 }}
          ref={inputRef}
          id={`formfield-${name}`}
          aria-describedby={error ? `error-${name}` : helpText ? `help-${name}` : undefined}
          aria-invalid={error ? "true" : "false"}
        />
      )}
      {error && (
        <motion.p
          id={`error-${name}`}
          className="mt-1 text-xs text-red-500 dark:text-red-400"
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          {error}
        </motion.p>
      )}
      {helpText && !error && (
        <motion.p
          id={`help-${name}`}
          className="mt-1 text-xs text-gray-500 dark:text-gray-400"
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          {helpText}
        </motion.p>
      )}
    </div>
  );
};
