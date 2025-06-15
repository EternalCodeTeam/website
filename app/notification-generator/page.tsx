"use client";

import { motion } from "framer-motion";
import { useState, useEffect, useCallback, useMemo } from "react";

import { MinecraftPreview } from "../../components/notification-generator/MinecraftPreview";
import { NotificationCode } from "../../components/notification-generator/NotificationCode";
import { NotificationForm } from "../../components/notification-generator/NotificationForm";
import { NotificationConfig } from "../../components/notification-generator/types";

export default function NotificationGenerator() {
  const [notification, setNotification] = useState<NotificationConfig>({
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
    pitch: "1.0",
    volume: "2.0",
  });

  const [yamlCode, setYamlCode] = useState("");
  const [previewKey, setPreviewKey] = useState(0);

  const generateYaml = useCallback(() => {
    const parts = [];

    if (notification.chat) {
      if (notification.chat.includes("\n")) {
        const lines = notification.chat.split("\n");
        parts.push("chat:");
        lines.forEach((line) => {
          parts.push(`  - "${line}"`);
        });
      } else {
        parts.push(`chat: "${notification.chat}"`);
      }
    }

    if (notification.actionbar) {
      parts.push(`actionbar: "${notification.actionbar}"`);
    }

    if (notification.title) {
      parts.push(`title: "${notification.title}"`);
    }

    if (notification.subtitle) {
      parts.push(`subtitle: "${notification.subtitle}"`);
    }

    if (notification.fadeIn || notification.stay || notification.fadeOut) {
      const fadeIn = notification.fadeIn || "0s";
      const stay = notification.stay || "0s";
      const fadeOut = notification.fadeOut || "0s";
      parts.push(`times: "${fadeIn} ${stay} ${fadeOut}"`);
    }

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

    if (notification.titleHide) {
      parts.push("titleHide: true");
    }

    if (parts.length === 0) {
      return "example: []";
    }

    return `example:\n  ${parts.join("\n  ")}`;
  }, [notification]);

  useEffect(() => {
    setYamlCode(generateYaml());
  }, [generateYaml]);

  const handlePlayPreview = useCallback(() => {
    setPreviewKey((prev) => prev + 1);
  }, []);

  const formComponent = useMemo(
    () => <NotificationForm notification={notification} setNotification={setNotification} />,
    [notification, setNotification]
  );

  const codeComponent = useMemo(() => <NotificationCode yamlCode={yamlCode} />, [yamlCode]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      <motion.h1
        className="mb-6 text-2xl font-bold md:text-3xl"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, type: "spring", stiffness: 100 }}
      >
        Notification Generator
      </motion.h1>

      <motion.div
        className="grid grid-cols-1 gap-6 md:gap-8 lg:grid-cols-2"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <motion.div
          className="rounded-lg bg-white p-4 shadow-md dark:bg-gray-800 md:p-6"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <motion.h2
            className="mb-4 text-lg font-semibold md:text-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            Create Your Notification
          </motion.h2>
          {formComponent}
        </motion.div>
        <motion.div
          className="rounded-lg bg-white p-4 shadow-md dark:bg-gray-800 md:p-6"
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <motion.h2
            className="mb-4 text-lg font-semibold md:text-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.4 }}
          >
            Generated YAML
          </motion.h2>
          {codeComponent}
        </motion.div>
        <motion.div
          className="col-span-1 rounded-lg bg-white p-4 shadow-md dark:bg-gray-800 md:p-6 lg:col-span-2"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <motion.div
            className="mb-4 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.5 }}
          >
            <motion.h2
              className="text-lg font-semibold md:text-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.6 }}
            >
              Preview
            </motion.h2>
            <motion.button
              onClick={handlePlayPreview}
              className="flex items-center rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Play title animation"
            >
              <motion.svg
                xmlns="http://www.w3.org/2000/svg"
                className="mr-2 h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                  clipRule="evenodd"
                />
              </motion.svg>
              Play title
            </motion.button>
          </motion.div>
          <MinecraftPreview key={previewKey} notification={notification} />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
