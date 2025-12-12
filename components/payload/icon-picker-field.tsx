"use client";

import type React from "react";
import { useState, useMemo } from "react";
import { useField } from "@payloadcms/ui";
// biome-ignore lint/performance/noNamespaceImport: Need all icons dynamically
import * as LucideIcons from "lucide-react";

// Define a type for the Lucide icons
type LucideIconComponent = React.ComponentType<{ className?: string; size?: number | string }>;

// Filter and prepare icons once
const iconList = Object.keys(LucideIcons)
  .filter((key) => {
    // Exclude known non-icon exports and ensure it's a component (function)
    return (
      key !== "createLucideIcon" &&
      key !== "icons" &&
      key !== "LucideIcon" &&
      key !== "LucideProps" &&
      !key.startsWith("Icon") &&
      // @ts-expect-error - checking if it is a component
      // biome-ignore lint/performance/noDynamicNamespaceImportAccess: needed for picker
      typeof LucideIcons[key] !== "string"
    );
  })
  .sort();

export const IconPickerField: React.FC<{ path: string; label?: string }> = ({ path, label }) => {
  const { value, setValue } = useField<string>({ path });
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  // biome-ignore lint/suspicious/noExplicitAny: Accessing module exports dynamically
  const icons: any = LucideIcons;

  const filteredIcons = useMemo(() => {
    if (!searchTerm) {
      return iconList.slice(0, 100); // Show first 100 by default for performance
    }
    const lowerTerm = searchTerm.toLowerCase();
    return iconList.filter((name) => name.toLowerCase().includes(lowerTerm)).slice(0, 100);
  }, [searchTerm]);

  const SelectedIcon = value && (icons[value] as LucideIconComponent);

  return (
    <div className="field-type text">
      <label className="field-label" htmlFor={path} style={{ marginBottom: "10px", display: "block" }}>
        {label || "Icon"}
      </label>

      <div style={{ position: "relative" }}>
        <button
          id={path}
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          style={{
            padding: "10px",
            borderRadius: "4px",
            border: "1px solid var(--theme-elevation-400)",
            background: "var(--theme-bg)",
            color: "var(--theme-text)",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "10px",
            width: "100%",
            textAlign: "left",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            {SelectedIcon ? <SelectedIcon size={20} /> : <span>Select an icon...</span>}
            {value ? <span style={{ opacity: 0.7 }}>({value})</span> : null}
          </div>
          {/* Simple chevron down */}
          <svg
            role="img"
            aria-label="Toggle icon picker"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 0.2s",
            }}
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </button>

        {isOpen ? (
          <div
            style={{
              position: "absolute",
              top: "100%",
              left: 0,
              right: 0,
              zIndex: 10,
              background: "var(--theme-bg)",
              border: "1px solid var(--theme-elevation-400)",
              borderRadius: "4px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              marginTop: "5px",
              maxHeight: "300px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div style={{ padding: "10px", borderBottom: "1px solid var(--theme-elevation-200)" }}>
              <input
                type="text"
                placeholder="Search icons..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                autoFocus
                style={{
                  width: "100%",
                  padding: "8px",
                  background: "var(--theme-elevation-100)",
                  border: "none",
                  borderRadius: "4px",
                  color: "var(--theme-text)",
                  outline: "none",
                }}
              />
            </div>

            <div style={{ overflowY: "auto", padding: "5px" }}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(40px, 1fr))",
                  gap: "5px",
                }}
              >
                {filteredIcons.map((iconName) => {
                  const Icon = icons[iconName] as LucideIconComponent;
                  const isSelected = value === iconName;

                  return (
                    <button
                      key={iconName}
                      type="button"
                      onClick={() => {
                        setValue(iconName);
                        setIsOpen(false);
                      }}
                      title={iconName}
                      style={{
                        padding: "8px",
                        borderRadius: "4px",
                        cursor: "pointer",
                        background: isSelected ? "var(--theme-primary-500)" : "transparent",
                        color: isSelected ? "white" : "var(--theme-text)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        border: "none",
                      }}
                      onMouseEnter={(e) => {
                        if (!isSelected) {
                          e.currentTarget.style.background = "var(--theme-elevation-100)";
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isSelected) { e.currentTarget.style.background = "transparent"; }
                      }}
                    >
                      <Icon size={20} />
                    </button>
                  );
                })}
              </div>

              {filteredIcons.length === 0 && (
                <div style={{ padding: "20px", textAlign: "center", opacity: 0.7 }}>
                  No icons found
                </div>
              )}
            </div>
          </div>
        ) : null}
      </div>

      {/* Overlay to close when clicking outside */}
      {isOpen ? (
        // biome-ignore lint/a11y/useKeyWithClickEvents: Backdrop click handling
        // biome-ignore lint/a11y/noStaticElementInteractions: Backdrop click handling
        // biome-ignore lint/a11y/noNoninteractiveElementInteractions: Backdrop click handling
        <div style={{ position: "fixed", inset: 0, zIndex: 9 }} onClick={() => setIsOpen(false)} />
      ) : null}
    </div>
  );
};
