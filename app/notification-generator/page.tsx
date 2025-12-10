"use client";

import { useState, useEffect, useCallback } from "react";
import { SlideIn, StaggerContainer, FadeIn } from "@/components/ui/motion/MotionComponents";
import { NotificationGeneratedCode } from "@/components/notification-generator/NotificationGeneratedCode";
import { NotificationGenerator as NotificationGeneratorForm } from "@/components/notification-generator/NotificationGenerator";
import { MinecraftPreview } from "@/components/notification-generator/preview/MinecraftPreview";
import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { NotificationConfig } from "@/components/notification-generator/types";

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

  return (
    <StaggerContainer className="w-full">
      <div className="mb-12 text-center">
        <SlideIn direction="down" delay={0.1}>
          <h1 className="bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent dark:from-white dark:to-gray-300 md:text-6xl">
            Notification Generator
          </h1>
        </SlideIn>
        <FadeIn delay={0.2}>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
            Design and preview your EternalCode notifications in real-time.
          </p>
        </FadeIn>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <SlideIn direction="left" delay={0.3} className="h-full">
          <NotificationGeneratorForm
            notification={notification}
            setNotification={setNotification}
          />
        </SlideIn>

        <SlideIn direction="right" delay={0.4} className="h-full">
          <div className="h-full rounded-2xl border border-white/20 bg-white/50 p-6 shadow-xl backdrop-blur-xl dark:border-white/10 dark:bg-white/5">
            <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
              Generated Configuration
            </h2>
            <NotificationGeneratedCode yamlCode={yamlCode} />
          </div>
        </SlideIn>
      </div>

      <SlideIn direction="up" delay={0.5} className="mt-8">
        <div className="rounded-2xl border border-white/20 bg-white/50 p-6 shadow-xl backdrop-blur-xl dark:border-white/10 dark:bg-white/5">
          <div className="mb-6 flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Live Preview</h2>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                See how your notification looks in-game.
              </p>
            </div>
            <Button
              onClick={handlePlayPreview}
              leftIcon={<Play className="h-4 w-4" />}
              variant="primary"
            >
              Replay Animation
            </Button>
          </div>

          <div className="overflow-hidden rounded-xl border border-gray-200 bg-black shadow-lg dark:border-gray-800">
            <MinecraftPreview key={previewKey} notification={notification} />
          </div>
        </div>
      </SlideIn>
    </StaggerContainer>
  );
}
