"use client";

import { motion } from "framer-motion";
import { useState, useEffect, useCallback, useMemo, type ReactNode } from "react";

import { Play } from "@/components/icons/play";

import AnimatedElement from "../../components/animations/AnimatedElement";
import { NotificationGeneratedCode } from "@/components/notification-generator/NotificationGeneratedCode";
import { NotificationGenerator as NotificationGeneratorForm } from "../../components/notification-generator/NotificationGenerator";
import { MinecraftPreview } from "@/components/notification-generator/preview/MinecraftPreview";
import type { NotificationConfig } from "@/components/notification-generator/types";

interface PanelProps {
  title: ReactNode;
  children: ReactNode;
  delay: number;
  animationType?: "fade" | "fadeUp" | "fadeDown" | "fadeLeft" | "fadeRight" | "scale";
}

function Panel({ title, children, delay, animationType = "fade" }: PanelProps) {
  return (
    <AnimatedElement
      className="rounded-lg bg-white p-4 shadow-md dark:bg-gray-800 md:p-6"
      animationType={animationType}
      delay={delay}
    >
      <AnimatedElement
        as="h2"
        className="mb-4 text-lg font-semibold md:text-xl"
        animationType="fade"
        delay={delay + 0.1}
      >
        {title}
      </AnimatedElement>
      {children}
    </AnimatedElement>
  );
}

interface PreviewSectionProps {
  previewKey: number;
  notification: NotificationConfig;
  onPlay: () => void;
  delay: number;
}

function PreviewSection({ previewKey, notification, onPlay, delay }: PreviewSectionProps) {
  return (
    <AnimatedElement
      className="col-span-1 rounded-lg bg-white p-4 shadow-md dark:bg-gray-800 md:p-6 lg:col-span-2"
      animationType="fadeUp"
      delay={delay}
    >
      <AnimatedElement
        className="mb-4 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center"
        animationType="fade"
        delay={delay + 0.1}
      >
        <AnimatedElement
          as="h2"
          className="text-lg font-semibold md:text-xl"
          animationType="fade"
          delay={delay + 0.2}
        >
          Preview
        </AnimatedElement>
        <AnimatedElement as="span">
          <motion.button
            onClick={onPlay}
            className="flex items-center rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Play title animation"
          >
            <Play className="mr-2 h-5 w-5" />
            Play title
          </motion.button>
        </AnimatedElement>
      </AnimatedElement>
      <MinecraftPreview key={previewKey} notification={notification} />
    </AnimatedElement>
  );
}

export default function NotificationGeneratorPage() {
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
    volume: "1.0",
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
      const volumeValue = notification.volume || "1.0";
      const pitchValue = notification.pitch || "1.0";

      const volume = parseFloat(volumeValue).toFixed(1);
      const pitch = parseFloat(pitchValue).toFixed(1);

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
    () => (
      <NotificationGeneratorForm notification={notification} setNotification={setNotification} />
    ),
    [notification]
  );

  const codeComponent = useMemo(
    () => <NotificationGeneratedCode yamlCode={yamlCode} />,
    [yamlCode]
  );

  return (
    <AnimatedElement
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      <AnimatedElement
        as="h1"
        className="mb-6 text-2xl font-bold md:text-3xl"
        animationType="fadeDown"
        delay={0.1}
      >
        Notification Generator
      </AnimatedElement>

      <AnimatedElement
        className="grid grid-cols-1 gap-6 md:gap-8 lg:grid-cols-2"
        animationType="fadeUp"
        delay={0.2}
      >
        <Panel title="Create Your Notification" delay={0.3} animationType="fadeLeft">
          {formComponent}
        </Panel>
        <Panel title="Generated YAML" delay={0.3} animationType="fadeRight">
          {codeComponent}
        </Panel>
        <PreviewSection
          previewKey={previewKey}
          notification={notification}
          onPlay={handlePlayPreview}
          delay={0.4}
        />
      </AnimatedElement>
    </AnimatedElement>
  );
}
