"use client";

import type React from "react";
import { useState, useEffect, useRef } from "react";
import { useField } from "@payloadcms/ui";
import { HexColorPicker } from "react-colorful";

export const ColorPickerField: React.FC<{ path: string; label?: string }> = ({ path, label }) => {
    const { value, setValue } = useField<string>({ path });
    const [isOpen, setIsOpen] = useState(false);

    // Local state for immediate UI feedback
    const [localColor, setLocalColor] = useState(value || "#000000");
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    // Sync from Payload value to local state (when not editing hopefully, or just keep in sync)
    // We only sync if the value is different to avoid loops if setValue updates value derived from localColor
    // biome-ignore lint/correctness/useExhaustiveDependencies: avoid loop
    useEffect(() => {
        if (value && value !== localColor) {
            setLocalColor(value);
        }
    }, [value]); // Removing localColor from dep array to avoid loop based on logic? No, useEffect checks value.

    const handleColorChange = (newColor: string) => {
        setLocalColor(newColor);

        // Debounce the heavy setValue call to Payload
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = setTimeout(() => {
            setValue(newColor);
        }, 150);
    };

    // Cleanup timeout
    useEffect(() => () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
    }, []);

    return (
        <div className="field-type text">
            <label className="field-label" htmlFor={path} style={{ marginBottom: "10px", display: "block" }}>
                {label || "Color"}
            </label>

            <div style={{ position: "relative", display: "flex", alignItems: "center", gap: "10px" }}>
                <button
                    type="button"
                    onClick={() => setIsOpen(!isOpen)}
                    style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "4px",
                        backgroundColor: localColor,
                        border: "1px solid var(--theme-elevation-400)",
                        cursor: "pointer",
                        padding: 0,
                    }}
                    aria-label="Pick color"
                />
                <input
                    id={path}
                    type="text"
                    value={localColor}
                    onChange={(e) => handleColorChange(e.target.value)}
                    style={{
                        padding: "10px",
                        borderRadius: "4px",
                        border: "1px solid var(--theme-elevation-400)",
                        background: "var(--theme-bg)",
                        color: "var(--theme-text)",
                        minWidth: "100px",
                    }}
                />

                {isOpen ? (
                    <div style={{ position: "absolute", top: "50px", left: 0, zIndex: 10 }}>
                        {/* biome-ignore lint/a11y/useKeyWithClickEvents: Backdrop click handling */}
                        {/* biome-ignore lint/a11y/noStaticElementInteractions: Backdrop click handling */}
                        {/* biome-ignore lint/a11y/noNoninteractiveElementInteractions: Backdrop click handling */}
                        <div
                            style={{
                                position: "fixed",
                                top: 0,
                                right: 0,
                                bottom: 0,
                                left: 0,
                            }}
                            onClick={() => setIsOpen(false)}
                        />
                        <div style={{ position: "relative", zIndex: 11 }}>
                            <HexColorPicker color={localColor} onChange={handleColorChange} />
                        </div>
                    </div>
                ) : null}
            </div>
        </div>
    );
};
