"use client";

import { Plus, Trash2, X } from "lucide-react";
import { useState } from "react";
import { HexColorPicker } from "react-colorful";

import { Button } from "@/components/ui/button";

import type { ColorPickerProps } from "../types";

export const ColorPicker = ({ onApplyAction, onCloseAction }: ColorPickerProps) => {
  const [isGradient, setIsGradient] = useState(false);
  const [colors, setColors] = useState<string[]>(["#000000"]);
  const [activeColorIndex, setActiveColorIndex] = useState(0);
  const [colorError, setColorError] = useState<string | null>(null);

  const isValidHex = (color: string): boolean => /^#([A-Fa-f0-9]{3}){1,2}$/.test(color);

  const isValidHexInput = (color: string): boolean => {
    if (color === "" || color === "#") return true;
    return /^#([A-Fa-f0-9]{3}){1,2}$/.test(color) || /^#[A-Fa-f0-9]{1,5}$/.test(color);
  };

  const handleColorChange = (color: string, isTextInput = false) => {
    if (isTextInput) {
      if (isValidHexInput(color)) {
        if (isValidHex(color)) {
          updateColor(color);
          setColorError(null);
        } else {
          setColorError(null);
        }
      } else {
        setColorError("Invalid hex color format. Use #RGB or #RRGGBB format.");
      }
    } else if (isValidHex(color)) {
      updateColor(color);
      setColorError(null);
    }
  };

  const updateColor = (color: string) => {
    setColors((prev) => prev.map((c, i) => (i === activeColorIndex ? color : c)));
  };

  const addColor = () => {
    setColors((prev) => [...prev, "#000000"]);
    setActiveColorIndex(colors.length);
    setColorError(null);
  };

  const removeColor = (index: number) => {
    if (colors.length <= 1) return;
    const newColors = colors.filter((_, i) => i !== index);
    setColors(newColors);
    setActiveColorIndex((prev) => Math.min(prev, newColors.length - 1));
    setColorError(null);
  };

  const handleApply = () => {
    const result =
      isGradient && colors.length > 1
        ? `<gradient:${colors.join(":")}></gradient>`
        : `<color:${colors[activeColorIndex]}></color>`;
    onApplyAction(result, isGradient, colors);
  };

  const currentColor = colors[activeColorIndex];
  const gradientStyle = { background: `linear-gradient(to right, ${colors.join(", ")})` };

  return (
    <div className="absolute z-10 mt-10 rounded-lg border border-gray-300 bg-white p-4 shadow-lg dark:border-gray-600 dark:bg-gray-800">
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center">
          <input
            type="checkbox"
            id="gradient-toggle"
            checked={isGradient}
            onChange={(e) => setIsGradient(e.target.checked)}
            className="mr-2 h-4 w-4 rounded-sm border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700"
          />
          <label htmlFor="gradient-toggle" className="text-sm text-gray-700 dark:text-gray-300">
            Gradient
          </label>
        </div>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={onCloseAction}
          className="h-6 w-6 p-0"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      {isGradient && (
        <>
          <div className="mb-2 flex flex-wrap gap-2">
            {colors.map((color, idx) => {
              const key = `${color}-${idx}`;
              return (
                <div key={key} className="group relative">
                  <button
                    type="button"
                    className={`h-8 w-8 cursor-pointer rounded border-2 focus:outline-hidden ${
                      activeColorIndex === idx
                        ? "border-blue-500"
                        : "border-gray-300 dark:border-gray-600"
                    }`}
                    style={{ backgroundColor: color }}
                    onClick={() => {
                      setActiveColorIndex(idx);
                      setColorError(null);
                    }}
                    aria-label={`Select color ${idx + 1}`}
                  />
                  {colors.length > 1 && (
                    <Button
                      type="button"
                      variant="danger"
                      size="xs"
                      className="absolute -right-1 -top-1 h-4 w-4 p-0 opacity-0 transition-opacity group-hover:opacity-100"
                      onClick={() => removeColor(idx)}
                      title="Remove Color"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  )}
                </div>
              );
            })}

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
              className="h-10 w-full rounded-sm border border-gray-300 dark:border-gray-600"
              style={gradientStyle}
            />
          </div>
        </>
      )}

      <HexColorPicker
        className="mx-auto w-full"
        color={currentColor}
        onChange={handleColorChange}
      />

      <div className="mt-2 flex justify-between">
        <div className="flex items-center">
          <div
            className="mr-2 h-6 w-6 rounded-sm border border-gray-300 dark:border-gray-600"
            style={{ backgroundColor: currentColor }}
          />
          <div className="relative flex flex-col">
            <input
              type="text"
              value={currentColor}
              onChange={(e) => handleColorChange(e.target.value, true)}
              className={`w-20 rounded border px-2 py-1 text-sm ${
                colorError ? "border-red-500" : "border-gray-300 dark:border-gray-600"
              } bg-white dark:bg-gray-800 dark:text-white`}
              placeholder="#000000"
            />
            {colorError && (
              <div className="absolute top-8 z-20 w-48 rounded-sm bg-red-100 p-1 text-xs text-red-700 dark:bg-red-900 dark:text-red-200">
                {colorError}
              </div>
            )}
          </div>
        </div>
        <Button type="button" variant="primary" size="sm" onClick={handleApply}>
          Apply
        </Button>
      </div>
    </div>
  );
};
