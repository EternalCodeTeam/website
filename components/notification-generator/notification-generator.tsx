"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useMemo, useRef, useState } from "react";
import { ActionBarTab } from "@/components/notification-generator/tabs/actionbar/action-bar-tab";
import { ChatTab } from "@/components/notification-generator/tabs/chat/chat-tab";
import {
  SoundTab,
  type SoundTabRef,
} from "@/components/notification-generator/tabs/sound/sound-tab";
import { TitleTab } from "@/components/notification-generator/tabs/title/title-tab";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/ui/motion/motion-components";

import { validateField } from "./form/validation";
import { MinecraftPreview } from "./preview/minecraft-preview";
import { AdvancedTab } from "./tabs/advanced/advanced-tab";
import { Tab } from "./tabs/tab";
import type { FieldType, NotificationConfig, TabType } from "./types";

interface NotificationFormProps {
  notification: NotificationConfig;
  setNotification: (notification: NotificationConfig) => void;
}

export function NotificationGenerator({ notification, setNotification }: NotificationFormProps) {
  const [activeTab, setActiveTab] = useState<TabType>("chat");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [previewSeed, setPreviewSeed] = useState(0);
  const soundTabRef = useRef<SoundTabRef>(null);

  const handleChange = useCallback(
    (field: FieldType, value: string | boolean) => {
      setNotification({
        ...notification,
        [field]: value,
      });

      if (["fadeIn", "stay", "fadeOut", "volume", "pitch", "sound"].includes(field)) {
        const error = validateField(field, value as string);
        setErrors((prev) => ({
          ...prev,
          [field]: error,
        }));
      } else if (errors[field]) {
        setErrors((prev) => ({
          ...prev,
          [field]: "",
        }));
      }
    },
    [notification, setNotification, errors]
  );

  const resetForm = useCallback(() => {
    soundTabRef.current?.stopSound();

    setNotification({
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
      pitch: "",
      volume: "",
    });
    setErrors({});
  }, [setNotification]);

  const handleReplayPreview = useCallback(() => {
    setPreviewSeed((prev) => prev + 1);
  }, []);

  const tabContent = useMemo(() => {
    switch (activeTab) {
      case "chat":
        return <ChatTab notification={notification} onChange={handleChange} />;
      case "actionbar":
        return <ActionBarTab notification={notification} onChange={handleChange} />;
      case "title":
        return <TitleTab errors={errors} notification={notification} onChange={handleChange} />;
      case "sound":
        return (
          <SoundTab
            errors={errors}
            notification={notification}
            onChange={handleChange}
            ref={soundTabRef}
          />
        );
      case "advanced":
        return <AdvancedTab notification={notification} onChange={handleChange} />;
      default:
        return null;
    }
  }, [activeTab, notification, handleChange, errors]);

  const previewTitle = useMemo(() => {
    const labels: Record<TabType, string> = {
      chat: "Chat Preview",
      actionbar: "Action Bar Preview",
      title: "Title Preview",
      sound: "Sound Preview",
      advanced: "Full Notification Preview",
    };
    return labels[activeTab];
  }, [activeTab]);

  const previewDescription = useMemo(() => {
    const descriptions: Record<TabType, string> = {
      chat: "Your message sits directly on the game view without the old chat box.",
      actionbar: "Action bar text stays centered and clean for quick attention.",
      title: "Titles and subtitles use the timing you set below.",
      sound: "Trigger a sound cue and preview the overlay indicator.",
      advanced: "Preview how all notification layers work together.",
    };
    return descriptions[activeTab];
  }, [activeTab]);

  const tabs = useMemo(() => {
    const tabItems: TabType[] = ["chat", "actionbar", "title", "sound", "advanced"];
    return tabItems.map((tabName) => (
      <Tab
        activeTab={activeTab}
        key={tabName}
        label={tabName.charAt(0).toUpperCase() + tabName.slice(1)}
        onClick={setActiveTab}
        tabName={tabName}
      />
    ));
  }, [activeTab]);

  return (
    <div className="relative h-full overflow-hidden rounded-3xl border border-white/10 bg-white/80 p-6 shadow-lg backdrop-blur-sm dark:border-gray-800 dark:bg-gray-950/60">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.12),transparent_45%)]" />
      <FadeIn>
        <div className="relative z-10">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="font-semibold text-gray-900 text-sm uppercase tracking-[0.2em] dark:text-gray-200">
                Notification Builder
              </p>
              <h2 className="mt-2 font-semibold text-2xl text-gray-900 dark:text-white">
                Craft the perfect message
              </h2>
              <p className="mt-1 max-w-xl text-gray-500 text-sm dark:text-gray-400">
                Switch between tabs to fine-tune every delivery channel.
              </p>
            </div>
            <Button
              aria-label="Replay preview"
              className="transition-transform hover:scale-105 active:scale-95"
              onClick={handleReplayPreview}
              variant="secondary"
            >
              Replay Preview
            </Button>
          </div>

          <div
            aria-label="Notification type tabs"
            className="flex flex-wrap gap-2 rounded-2xl border border-gray-200 bg-white/70 p-2 shadow-sm dark:border-gray-800 dark:bg-gray-900/60"
            role="tablist"
          >
            {tabs}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              animate={{ opacity: 1, x: 0 }}
              aria-labelledby={`tab-${activeTab}`}
              className="mt-6 min-h-[320px]"
              exit={{ opacity: 0, x: -10 }}
              initial={{ opacity: 0, x: 10 }}
              key={activeTab}
              role="tabpanel"
              transition={{ duration: 0.2 }}
            >
              {tabContent}
            </motion.div>
          </AnimatePresence>

          <div className="mt-8 rounded-2xl border border-gray-200 bg-white/60 p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900/50">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="font-semibold text-gray-900 text-lg dark:text-white">
                  {previewTitle}
                </h3>
                <p className="text-gray-500 text-sm dark:text-gray-400">{previewDescription}</p>
              </div>
              <span className="rounded-full border border-gray-200 bg-white px-3 py-1 font-medium text-gray-600 text-xs uppercase tracking-[0.2em] dark:border-gray-700 dark:bg-gray-900/70 dark:text-gray-300">
                Live
              </span>
            </div>
            <MinecraftPreview
              activeTab={activeTab}
              key={`${activeTab}-${previewSeed}`}
              notification={notification}
            />
          </div>

          <motion.div
            animate={{ opacity: 1 }}
            className="mt-8 flex justify-end border-gray-200 border-t pt-6 dark:border-gray-800"
            initial={{ opacity: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Button
              aria-label="Reset form"
              className="transition-transform hover:scale-105 active:scale-95"
              onClick={resetForm}
              variant="danger"
            >
              Reset Form
            </Button>
          </motion.div>
        </div>
      </FadeIn>
    </div>
  );
}
