"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useState } from "react";
import type { NotificationConfig } from "@/components/notification-generator/types";
import { FadeIn, MotionSection, SlideIn } from "@/components/ui/motion/motion-components";

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
  const generateYaml = useCallback(() => generateYamlString(notification), [notification]);

  useEffect(() => {
    setYamlCode(generateYaml());
  }, [generateYaml]);

  return (
    <MotionSection className="relative w-full overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-32 left-[-10%] h-[420px] w-[420px] rounded-full bg-blue-500/15 blur-[120px]" />
        <div className="absolute right-[-5%] bottom-0 h-[480px] w-[480px] rounded-full bg-emerald-500/10 blur-[140px]" />
        <div className="absolute top-0 right-[20%] h-[260px] w-[260px] rounded-full bg-orange-400/10 blur-[110px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-[90rem] px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <SlideIn delay={0.1} direction="down">
            <p className="font-semibold text-gray-500 text-sm uppercase tracking-[0.3em] dark:text-gray-400">
              Minecraft Notification Studio
            </p>
          </SlideIn>
          <SlideIn delay={0.18} direction="down">
            <h1 className="mt-4 bg-gradient-to-r from-gray-900 via-gray-700 to-gray-500 bg-clip-text font-extrabold text-4xl text-transparent tracking-tight md:text-6xl dark:from-white dark:via-gray-200 dark:to-gray-400">
              Notification Generator
            </h1>
          </SlideIn>
          <FadeIn delay={0.26}>
            <p className="mx-auto mt-4 max-w-2xl text-gray-600 text-lg dark:text-gray-400">
              Build, preview, and ship polished in-game notifications with modern formatting and
              legacy-friendly color support.
            </p>
          </FadeIn>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
          <SlideIn className="h-full" delay={0.3} direction="left">
            <NotificationGeneratorForm
              notification={notification}
              setNotification={setNotification}
            />
          </SlideIn>

          <SlideIn className="h-full" delay={0.4} direction="right">
            <div className="h-full rounded-3xl border border-white/10 bg-white/80 p-6 shadow-lg backdrop-blur-sm dark:border-gray-800 dark:bg-gray-950/60">
              <div className="mb-6">
                <p className="font-semibold text-gray-500 text-xs uppercase tracking-[0.25em] dark:text-gray-400">
                  Output
                </p>
                <h2 className="mt-2 font-semibold text-2xl text-gray-900 dark:text-white">
                  Generated Configuration
                </h2>
                <p className="mt-2 text-gray-500 text-sm dark:text-gray-400">
                  Copy the YAML and paste it into the EternalCore notification config.
                </p>
              </div>
              <NotificationGeneratedCode yamlCode={yamlCode} />
            </div>
          </SlideIn>
        </div>
      </div>
    </MotionSection>
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
