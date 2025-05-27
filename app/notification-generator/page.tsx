"use client";

import { useState, useEffect } from "react";
import { MinecraftPreview } from "./MinecraftPreview";
import { NotificationForm } from "./NotificationForm";
import { NotificationCode } from "./NotificationCode";

export default function NotificationGenerator() {
  const [notification, setNotification] = useState({
    chat: "",
    actionbar: "",
    title: "",
    subtitle: "",
    fadeIn: "",
    stay: "",
    fadeOut: "",
    sound: "",
    soundCategory: "",
    titleHide: false,
    useMiniMessage: false,
    pitch: "1.0",
    volume: "2.0",
  });

  const [yamlCode, setYamlCode] = useState("");
  const [previewKey, setPreviewKey] = useState(0); // Used to force re-render of preview

  useEffect(() => {
    // Generate YAML code based on notification state
    const generateYaml = () => {
      const parts = [];

      // Add chat if it exists
      if (notification.chat) {
        if (notification.chat.includes("\n")) {
          // Multiline chat
          const lines = notification.chat.split("\n");
          parts.push("chat:");
          lines.forEach((line) => {
            parts.push(`  - "${line}"`);
          });
        } else {
          // Single line chat
          parts.push(`chat: "${notification.chat}"`);
        }
      }

      // Add actionbar if it exists
      if (notification.actionbar) {
        parts.push(`actionbar: "${notification.actionbar}"`);
      }

      // Add title if it exists
      if (notification.title) {
        parts.push(`title: "${notification.title}"`);
      }

      // Add subtitle if it exists
      if (notification.subtitle) {
        parts.push(`subtitle: "${notification.subtitle}"`);
      }

      // Add times if any of the time fields exist
      if (notification.fadeIn || notification.stay || notification.fadeOut) {
        const fadeIn = notification.fadeIn || "0s";
        const stay = notification.stay || "0s";
        const fadeOut = notification.fadeOut || "0s";
        parts.push(`times: "${fadeIn} ${stay} ${fadeOut}"`);
      }

      // Add sound if it exists
      if (notification.sound) {
        const volume = notification.volume || "2.0";
        const pitch = notification.pitch || "1.0";
        if (notification.soundCategory) {
          parts.push(
            `sound: "${notification.sound} ${notification.soundCategory} ${volume} ${pitch}"`
          );
        } else {
          parts.push(`sound: "${notification.sound} ${volume} ${pitch}"`);
        }
      }

      // Add titleHide if it's true
      if (notification.titleHide) {
        parts.push("titleHide: true");
      }

      // If no parts, return empty array
      if (parts.length === 0) {
        return "example: []";
      }

      return `example:\n  ${parts.join("\n  ")}`;
    };

    setYamlCode(generateYaml());
  }, [notification]);

  const handlePlayPreview = () => {
    // Force re-render of preview by changing the key
    setPreviewKey((prev) => prev + 1);
  };

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold">
        EternalCode Notification Generator
      </h1>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
          <h2 className="mb-4 text-xl font-semibold">
            Create Your Notification
          </h2>
          <NotificationForm
            notification={notification}
            setNotification={setNotification}
          />
        </div>
        <div className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
          <h2 className="mb-4 text-xl font-semibold">Generated YAML</h2>
          <NotificationCode yamlCode={yamlCode} />
        </div>
        <div className="col-span-1 rounded-lg bg-white p-6 shadow-md dark:bg-gray-800 lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold">Preview</h2>
            <button
              onClick={handlePlayPreview}
              className="flex items-center rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="mr-2 h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                  clipRule="evenodd"
                />
              </svg>
              Play title
            </button>
          </div>
          <MinecraftPreview key={previewKey} notification={notification} />
        </div>
      </div>
    </div>
  );
}
