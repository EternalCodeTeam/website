"use client";

import { motion } from "framer-motion";
import { FieldType } from "../types";
import { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Bold, Italic, Underline, Strikethrough, Link, Terminal, MessageSquare, Eye, Palette, Trash2, Plus, X } from "lucide-react";
import { HexColorPicker } from "react-colorful";

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
  const [activeFormats, setActiveFormats] = useState<Record<string, boolean>>({
    bold: false,
    italic: false,
    underline: false,
    strikethrough: false
  });

  useEffect(() => {
    if (isGradient && colors.length > 0) {
      const gradientString = `linear-gradient(to right, ${colors.join(", ")})`;
      setGradientPreview(gradientString);
    }
  }, [isGradient, colors]);

  const allowedTags = {
    basic: {
      pattern: /^<(b|i|u|st)><\/(b|i|u|st)>$/,
      tags: ["<b></b>", "<i></i>", "<u></u>", "<st></st>"]
    },
    click: {
      pattern: /^<click:(open_url|run_command|suggest_command):'[^']*'><\/click>$/,
      tags: ["<click:open_url:'url'></click>", "<click:run_command:'/command'></click>", "<click:suggest_command:'/command'></click>"]
    },
    hover: {
      pattern: /^<hover:show_text:'[^']*'><\/hover>$/,
      tags: ["<hover:show_text:'text'></hover>"]
    },
    color: {
      pattern: /^<(color|gradient):[^>]*><\/(color|gradient)>$/,
      tags: ["<color:#000000></color>", "<gradient:#000000,#ffffff></gradient>"]
    }
  };

  const isValidTag = (tag: string): boolean => {
    return Object.values(allowedTags).some(category => 
      category.pattern.test(tag) || category.tags.includes(tag)
    );
  };

  const checkFormatting = () => {
    const input = type === "textarea" ? textareaRef.current : inputRef.current;
    if (!input) return;

    const start = input.selectionStart;
    const end = input.selectionEnd;
    if (start === null || end === null || start === end) return;

    const text = input.value;
    const selectedText = text.substring(start, end);
    
    const formats = {
      bold: /<b>.*?<\/b>/.test(selectedText),
      italic: /<i>.*?<\/i>/.test(selectedText),
      underline: /<u>.*?<\/u>/.test(selectedText),
      strikethrough: /<st>.*?<\/st>/.test(selectedText)
    };
    
    setActiveFormats(formats);
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
    
    const formatTags: Record<string, { open: string, close: string }> = {
      bold: { open: "<b>", close: "</b>" },
      italic: { open: "<i>", close: "</i>" },
      underline: { open: "<u>", close: "</u>" },
      strikethrough: { open: "<st>", close: "</st>" }
    };
    
    const { open, close } = formatTags[format];
    
    const regex = new RegExp(`^${open}.*?${close}$`);
    if (regex.test(selectedText)) {
      newValue = text.substring(0, start) + 
                 selectedText.substring(open.length, selectedText.length - close.length) + 
                 text.substring(end);
      newCursorPosition = end - (open.length + close.length);
    } else {
      newValue = text.substring(0, start) + 
                 open + selectedText + close + 
                 text.substring(end);
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
    
    setActiveFormats(prev => ({
      ...prev,
      [format]: !prev[format]
    }));
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
      newValue = value.substring(0, start) + tag.replace("></", `>${selectedText}</`) + value.substring(end);
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
    
    if (start === null || end === null || start === end) {
      const formatTags: Record<string, string> = {
        bold: "<b></b>",
        italic: "<i></i>",
        underline: "<u></u>",
        strikethrough: "<st></st>"
      };
      
      insertTag(formatTags[format]);
    } else {
      toggleFormatting(format);
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
    const newColors = [...colors];
    newColors.splice(index, 1);
    setColors(newColors);
    if (index === activeColorIndex) {
      setActiveColorIndex(0);
    }
  };

  const applyColor = () => {
    const colorTag = isGradient ? `<gradient:${colors.join(":")}></gradient>` : `<color:${colors[0]}></color>`;
    insertTag(colorTag);
    setShowColorPicker(false);
  };

  const inputClasses = `w-full border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800 dark:text-white px-2 py-1 text-sm transition-colors duration-150 hover:bg-gray-50 dark:hover:bg-gray-700 rounded ${
    error ? "border-red-500" : ""
  }`;

  return (
    <motion.div 
      className="mb-2"
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.15 }}
    >
      <motion.label 
        className="mb-0.5 block text-sm font-medium text-gray-700 dark:text-gray-300"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.1 }}
        htmlFor={`formfield-${name}`}
      >
        {label}
      </motion.label>
      <div className="flex space-x-1 mb-1">
        {showEditorButtons && (
          <>
            <Button type="button" variant="outline" size="sm" onClick={() => setShowColorPicker(!showColorPicker)} title="Color Picker"><Palette className="h-4 w-4" /></Button>
            {showColorPicker && (
              <div className="absolute z-10 mt-2 p-2 bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700">
                <div className="flex justify-between items-center mb-2">
                  <label className="flex items-center space-x-2 text-sm">
                    <input
                      type="checkbox"
                      checked={isGradient}
                      onChange={(e) => setIsGradient(e.target.checked)}
                      className="rounded border-gray-300 dark:border-gray-600"
                    />
                    <span>Gradient</span>
                  </label>
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
                    <div className="flex flex-wrap gap-2 mb-2">
                      {colors.map((color, index) => (
                        <div key={index} className="relative group">
                          <div
                            className={`w-8 h-8 rounded cursor-pointer border-2 ${
                              activeColorIndex === index
                                ? "border-blue-500"
                                : "border-gray-300 dark:border-gray-600"
                            }`}
                            style={{ backgroundColor: color }}
                            onClick={() => setActiveColorIndex(index)}
                          />
                          {colors.length > 1 && (
                            <Button
                              type="button"
                              variant="danger"
                              size="xs"
                              className="absolute -top-1 -right-1 w-4 h-4 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                              onClick={() => removeColor(index)}
                              title="Remove Color"
                            >
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          )}
                        </div>
                      ))}
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="w-8 h-8 p-0 border-dashed"
                        onClick={addColor}
                        title="Add Color"
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                    
                    <div className="mb-2">
                      <label className="block text-xs mb-1">Gradient Preview</label>
                      <div 
                        className="w-full h-10 rounded border border-gray-300 dark:border-gray-600"
                        style={{ background: gradientPreview }}
                      />
                    </div>
                  </>
                )}

                <HexColorPicker color={colors[activeColorIndex]} onChange={handleColorChange} />
                <div className="flex justify-between mt-2">
                  <div className="flex items-center">
                    <div 
                      className="w-6 h-6 rounded border border-gray-300 dark:border-gray-600 mr-2" 
                      style={{ backgroundColor: colors[activeColorIndex] }}
                    />
                    <input
                      type="text"
                      value={colors[activeColorIndex]}
                      onChange={(e) => handleColorChange(e.target.value)}
                      className="w-20 px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 dark:text-white"
                      placeholder="#000000"
                    />
                  </div>
                  <Button 
                    type="button"
                    variant="primary" 
                    size="sm" 
                    onClick={applyColor}
                  >
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
                <Button type="button" variant="outline" size="sm" onClick={() => insertTag("<click:open_url:'url'></click>")} title="Add Link"><Link className="h-4 w-4" /></Button>
                <Button type="button" variant="outline" size="sm" onClick={() => insertTag("<click:run_command:'/command'></click>")} title="Run Command"><Terminal className="h-4 w-4" /></Button>
                <Button type="button" variant="outline" size="sm" onClick={() => insertTag("<click:suggest_command:'/command'></click>")} title="Suggest Command"><MessageSquare className="h-4 w-4" /></Button>
                <Button type="button" variant="outline" size="sm" onClick={() => insertTag("<hover:show_text:'text'></hover>")} title="Hover"><Eye className="h-4 w-4" /></Button>
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
      <div className="h-4 mt-0.5">
        {error ? (
          <motion.p 
            className="text-xs text-red-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.1 }}
            id={`error-${name}`}
            role="alert"
          >
            {error}
          </motion.p>
        ) : helpText ? (
          <motion.p 
            className="text-xs text-gray-500 dark:text-gray-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.1, delay: 0.1 }}
            id={`help-${name}`}
          >
            {helpText}
          </motion.p>
        ) : null}
      </div>
    </motion.div>
  );
}; 