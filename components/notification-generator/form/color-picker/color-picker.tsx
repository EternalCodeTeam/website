"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Plus, RefreshCcw, Trash2, X } from "lucide-react";
import { useEffect, useState } from "react";
import { HexColorPicker } from "react-colorful";

import { gradientPresets, minecraftColors } from "../color-constants";
import type { ColorPickerProps, MinecraftColor } from "../types";

export const ColorPicker = ({ onApplyAction, onCloseAction }: ColorPickerProps) => {
  const [activeTab, setActiveTab] = useState<"solid" | "gradient" | "presets" | "legacy">("solid");
  const [solidColor, setSolidColor] = useState("#FFFFFF");
  const [gradientColors, setGradientColors] = useState<string[]>(["#55FFFF", "#FF55FF"]);
  const [legacyColor, setLegacyColor] = useState<MinecraftColor>(minecraftColors[0]);
  const [_copied, _setCopied] = useState(false);

  // Sync solid color with first gradient color for smoother transitions
  useEffect(() => {
    if (activeTab === "solid" && gradientColors.length > 0) {
      setSolidColor(gradientColors[0]);
    }
  }, [activeTab, gradientColors.length, gradientColors[0]]);

  const handleApply = () => {
    if (activeTab === "gradient") {
      const result = `<gradient:${gradientColors.join(":")}></gradient>`;
      onApplyAction(result, true, gradientColors);
      return;
    }

    if (activeTab === "legacy") {
      onApplyAction(legacyColor.legacyCode, false, [legacyColor.hex]);
      return;
    }

    const result = `<color:${solidColor}></color>`;
    onApplyAction(result, false, [solidColor]);
  };

  const handlePresetClick = (color: MinecraftColor) => {
    setSolidColor(color.hex);
    if (activeTab === "presets") {
      // Optional: Auto-switch to solid tab or just apply directly?
      // Let's just update the solid color state for now, user can click apply.
      // Actually, for better UX, let's switch to Solid tab to let them tweak it if they want.
      setActiveTab("solid");
    }
  };

  const addGradientStop = () => {
    setGradientColors([...gradientColors, "#FFFFFF"]);
  };

  const removeGradientStop = (index: number) => {
    if (gradientColors.length > 2) {
      const newColors = [...gradientColors];
      newColors.splice(index, 1);
      setGradientColors(newColors);
    }
  };

  const updateGradientColor = (index: number, color: string) => {
    const newColors = [...gradientColors];
    newColors[index] = color;
    setGradientColors(newColors);
  };

  const reverseGradient = () => {
    setGradientColors([...gradientColors].reverse());
  };

  const handleGradientPresetClick = (colors: string[]) => {
    setGradientColors(colors);
    setActiveTab("gradient");
  };

  return (
    <motion.div
      animate={{ opacity: 1, y: 0, scale: 1 }}
      className="absolute top-full left-0 z-50 mt-2 w-72 rounded-xl border border-gray-200 bg-white shadow-2xl dark:border-gray-800 dark:bg-gray-950"
      exit={{ opacity: 0, y: 10, scale: 0.95 }}
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between border-gray-100 border-b p-3 dark:border-gray-800">
        <h3 className="font-semibold text-gray-900 dark:text-gray-100">Color Picker</h3>
        <button
          className="cursor-pointer rounded-md p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-200"
          onClick={onCloseAction}
          type="button"
        >
          <X size={16} />
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-gray-100 border-b dark:border-gray-800">
        {(["solid", "gradient", "presets", "legacy"] as const).map((tab) => (
          <button
            className={`flex-1 cursor-pointer px-3 py-2 font-medium text-sm transition-colors ${
              activeTab === tab
                ? "border-blue-500 border-b-2 text-blue-600 dark:text-blue-400"
                : "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
            }`}
            key={tab}
            onClick={() => setActiveTab(tab)}
            type="button"
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="p-4">
        <AnimatePresence mode="wait">
          {activeTab === "solid" && (
            <motion.div
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              initial={{ opacity: 0, x: -10 }}
              key="solid"
              transition={{ duration: 0.2 }}
            >
              <div className="mb-4 flex justify-center">
                <HexColorPicker
                  color={solidColor}
                  onChange={setSolidColor}
                  style={{ width: "100%", height: "160px" }}
                />
              </div>
              <div className="flex items-center gap-2">
                <div
                  className="h-9 w-9 rounded-md border border-gray-200 shadow-xs dark:border-gray-700"
                  style={{ backgroundColor: solidColor }}
                />
                <input
                  className="flex-1 rounded-md border border-gray-300 bg-white px-3 py-1.5 text-gray-900 text-sm uppercase focus:border-blue-500 focus:outline-hidden focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
                  onChange={(e) => setSolidColor(e.target.value)}
                  spellCheck={false}
                  type="text"
                  value={solidColor}
                />
              </div>
            </motion.div>
          )}

          {activeTab === "gradient" && (
            <motion.div
              animate={{ opacity: 1, x: 0 }}
              className="space-y-4"
              exit={{ opacity: 0, x: 10 }}
              initial={{ opacity: 0, x: -10 }}
              key="gradient"
              transition={{ duration: 0.2 }}
            >
              <div
                className="h-12 w-full rounded-md border border-gray-200 shadow-sm dark:border-gray-700"
                style={{
                  background: `linear-gradient(to right, ${gradientColors.join(", ")})`,
                }}
              />

              <div className="flex gap-2">
                <button
                  className="flex flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-md border border-gray-200 bg-white py-1.5 font-medium text-gray-700 text-xs hover:bg-gray-50 hover:text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white"
                  onClick={reverseGradient}
                  type="button"
                >
                  <RefreshCcw className={activeTab === "gradient" ? "" : ""} size={12} /> Reverse
                </button>
              </div>

              <div className="max-h-48 space-y-2 overflow-y-auto pr-1">
                {gradientColors.map((color, index) => (
                  <div className="flex items-center gap-2" key={color}>
                    <div className="relative h-8 w-8 overflow-hidden rounded-md border border-gray-200 dark:border-gray-700">
                      <input
                        className="absolute -top-1/2 -left-1/2 h-[200%] w-[200%] cursor-pointer p-0"
                        onChange={(e) => updateGradientColor(index, e.target.value)}
                        type="color"
                        value={color}
                      />
                    </div>
                    <input
                      className="flex-1 rounded-md border border-gray-300 bg-white px-2 py-1 text-gray-900 text-sm uppercase focus:border-blue-500 focus:outline-hidden focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
                      onChange={(e) => updateGradientColor(index, e.target.value)}
                      type="text"
                      value={color}
                    />
                    <button
                      className="cursor-pointer rounded-md p-1.5 text-gray-500 transition-colors hover:bg-red-50 hover:text-red-600 disabled:opacity-50 dark:hover:bg-red-900/20 dark:hover:text-red-400"
                      disabled={gradientColors.length <= 2}
                      onClick={() => removeGradientStop(index)}
                      title="Remove stop"
                      type="button"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
              </div>

              <button
                className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-md border border-gray-300 border-dashed py-2 font-medium text-gray-600 text-sm transition-colors hover:border-gray-400 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-800"
                onClick={addGradientStop}
                type="button"
              >
                <Plus size={14} /> Add Color Stop
              </button>
            </motion.div>
          )}

          {activeTab === "presets" && (
            <motion.div
              animate={{ opacity: 1, x: 0 }}
              className="space-y-4"
              exit={{ opacity: 0, x: 10 }}
              initial={{ opacity: 0, x: -10 }}
              key="presets"
              transition={{ duration: 0.2 }}
            >
              <div>
                <h4 className="mb-2 font-semibold text-gray-500 text-xs uppercase dark:text-gray-400">
                  Solid Colors
                </h4>
                <div className="grid grid-cols-5 gap-2">
                  {minecraftColors.map((mcColor) => (
                    <button
                      className="group relative flex aspect-square cursor-pointer flex-col items-center justify-center rounded-md border border-gray-200 transition-all hover:scale-110 hover:shadow-md dark:border-gray-700"
                      key={mcColor.hex}
                      onClick={() => handlePresetClick(mcColor)}
                      style={{ backgroundColor: mcColor.hex }}
                      title={mcColor.name}
                      type="button"
                    >
                      <span className="sr-only">{mcColor.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="mb-2 font-semibold text-gray-500 text-xs uppercase dark:text-gray-400">
                  Gradients
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  {gradientPresets.map((preset) => (
                    <button
                      className="group relative h-10 w-full cursor-pointer overflow-hidden rounded-md border border-gray-200 transition-all hover:scale-105 hover:shadow-md dark:border-gray-700"
                      key={preset.name}
                      onClick={() => handleGradientPresetClick(preset.colors)}
                      style={{
                        background: `linear-gradient(to right, ${preset.colors.join(", ")})`,
                      }}
                      title={preset.name}
                      type="button"
                    >
                      <span className="sr-only">{preset.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "legacy" && (
            <motion.div
              animate={{ opacity: 1, x: 0 }}
              className="space-y-4"
              exit={{ opacity: 0, x: 10 }}
              initial={{ opacity: 0, x: -10 }}
              key="legacy"
              transition={{ duration: 0.2 }}
            >
              <div>
                <h4 className="mb-2 font-semibold text-gray-500 text-xs uppercase dark:text-gray-400">
                  Legacy Colors (with & codes)
                </h4>
                <div className="grid grid-cols-4 gap-2">
                  {minecraftColors.map((mcColor) => (
                    <button
                      className={`group relative flex aspect-square cursor-pointer flex-col items-center justify-center rounded-md border transition-all hover:scale-105 hover:shadow-md ${
                        legacyColor.name === mcColor.name
                          ? "border-blue-500 ring-2 ring-blue-500/40"
                          : "border-gray-200 dark:border-gray-700"
                      }`}
                      key={mcColor.hex}
                      onClick={() => setLegacyColor(mcColor)}
                      style={{ backgroundColor: mcColor.hex }}
                      title={`${mcColor.name} (${mcColor.legacyCode})`}
                      type="button"
                    >
                      <span className="sr-only">{mcColor.name}</span>
                      <span className="rounded bg-black/50 px-1.5 py-0.5 font-mono text-[10px] text-white">
                        {mcColor.legacyCode}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-gray-600 text-xs dark:border-gray-800 dark:bg-gray-900/60 dark:text-gray-300">
                Legacy codes are classic Minecraft formatting codes that work in older configs.
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {activeTab !== "presets" && (
          <button
            className="mt-4 w-full cursor-pointer rounded-md bg-blue-600 py-2 font-medium text-sm text-white shadow-xs transition-colors hover:bg-blue-700 focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
            onClick={handleApply}
            type="button"
          >
            {(() => {
              if (activeTab === "gradient") {
                return "Apply Gradient";
              }
              if (activeTab === "legacy") {
                return "Insert Legacy Code";
              }
              return "Apply Color";
            })()}
          </button>
        )}
      </div>
    </motion.div>
  );
};
