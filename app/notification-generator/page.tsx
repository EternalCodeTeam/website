"use client";

import { Play } from "lucide-react";
import dynamic from "next/dynamic";
import { useCallback, useEffect, useState } from "react";
import type { NotificationConfig } from "@/components/notification-generator/types";
import { Button } from "@/components/ui/button";
import { FadeIn, SlideIn, StaggerContainer } from "@/components/ui/motion/motion-components";

const NotificationGeneratedCode = dynamic(
  () =>
    import("@/components/notification-generator/notification-generated-code").then(
      (mod) => mod.NotificationGeneratedCode
    ),
  { ssr: false }
);
const NotificationGeneratorForm = dynamic(
  () =>
    import("@/components/notification-generator/notification-generator").then(
      (mod) => mod.NotificationGenerator
    ),
  { ssr: false }
);
const SimpleNotificationPreview = dynamic(
  () =>
    import("@/components/notification-generator/preview/simple-notification-preview").then(
      (mod) => mod.SimpleNotificationPreview
    ),
  { ssr: false }
);

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

  const generateYaml = useCallback(() => generateYamlString(notification), [notification]);

  useEffect(() => {
    setYamlCode(generateYaml());
  }, [generateYaml]);

  const handlePlayPreview = useCallback(() => {
    setPreviewKey((prev) => prev + 1);
  }, []);

  return (
    <StaggerContainer className="w-full">
      <div className="mb-8 text-center">
        <SlideIn delay={0.1} direction="down">
          <h1 className="bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text font-extrabold text-4xl text-transparent tracking-tight md:text-6xl dark:from-white dark:to-gray-300">
            Notification Generator
          </h1>
        </SlideIn>
        <FadeIn delay={0.2}>
          <p className="mt-4 text-gray-600 text-lg dark:text-gray-400">
            Design and preview your EternalCode notifications in real-time.
          </p>
        </FadeIn>
      </div>

      {/* Preview Section - Top Priority */}
      <SlideIn className="mb-8" delay={0.3} direction="down">
        <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200 dark:bg-gray-900/40 dark:ring-gray-800">
          <div className="mb-6 flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div>
              <h2 className="font-semibold text-gray-900 text-xl dark:text-white">Live Preview</h2>
              <p className="mt-1 text-gray-500 text-sm dark:text-gray-400">
                See how your notification looks in real-time
              </p>
            </div>
            <Button
              leftIcon={<Play className="h-4 w-4" />}
              onClick={handlePlayPreview}
              variant="primary"
            >
              Replay Animation
            </Button>
          </div>

          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg dark:border-gray-800 dark:bg-gray-900/40">
            <SimpleNotificationPreview key={previewKey} notification={notification} />
          </div>
        </div>
      </SlideIn>

      {/* Form and Code Section - Side by Side on Large Screens */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Form - Takes 1 column (50%) on large screens */}
        <SlideIn className="h-full" delay={0.4} direction="left">
          <NotificationGeneratorForm
            notification={notification}
            setNotification={setNotification}
          />
        </SlideIn>

        {/* Generated Code - Takes 1 column (50%) on large screens, full width on small */}
        <SlideIn className="h-full" delay={0.5} direction="right">
          <div className="sticky top-4 min-h-full rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200 dark:bg-gray-900/40 dark:ring-gray-800">
            <h2 className="mb-4 font-semibold text-gray-900 text-xl dark:text-white">
              Generated Configuration
            </h2>
            <NotificationGeneratedCode yamlCode={yamlCode} />
          </div>
        </SlideIn>
      </div>
    </StaggerContainer>
  );
}

function generateYamlString(notification: NotificationConfig): string {
  const parts: string[] = [];

  if (notification.chat) {
    parts.push(...generateChatYaml(notification.chat));
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
    parts.push(generateSoundYaml(notification));
  }

  if (notification.titleHide) {
    parts.push("titleHide: true");
  }

  if (parts.length === 0) {
    return "example: []";
  }

  return `example:\n  ${parts.join("\n  ")}`;
}

function generateChatYaml(chat: string): string[] {
  if (chat.includes("\n")) {
    const lines = chat.split("\n");
    const result = ["chat:"];
    for (const line of lines) {
      result.push(`  - "${line}"`);
    }
    return result;
  }
  return [`chat: "${chat}"`];
}

function generateSoundYaml(notification: NotificationConfig): string {
  const volumeValue = notification.volume || "1.0";
  const pitchValue = notification.pitch || "1.0";

  const volume = Number.parseFloat(volumeValue).toFixed(1);
  const pitch = Number.parseFloat(pitchValue).toFixed(1);

  if (notification.soundCategory) {
    return `sound: "${notification.sound} ${notification.soundCategory} ${volume} ${pitch}"`;
  }
  return `sound: "${notification.sound} ${volume} ${pitch}"`;
}
