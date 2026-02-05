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
import { useSpotlight } from "@/hooks/use-spotlight";

import { validateField } from "./form/validation";
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
  const soundTabRef = useRef<SoundTabRef>(null);
  const spotlight = useSpotlight<HTMLDivElement>();

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
    <div
      className="spotlight-card relative h-full rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200 dark:bg-gray-900/40 dark:ring-gray-800"
      onPointerLeave={spotlight.onPointerLeave}
      onPointerMove={spotlight.onPointerMove}
    >
      <FadeIn>
        <div className="mb-8">
          <div
            aria-label="Notification type tabs"
            className="flex flex-wrap gap-2 rounded-xl bg-gray-100/50 p-1.5 dark:bg-gray-900/50"
            role="tablist"
          >
            {tabs}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            animate={{ opacity: 1, x: 0 }}
            aria-labelledby={`tab-${activeTab}`}
            className="min-h-[400px]"
            exit={{ opacity: 0, x: -10 }}
            initial={{ opacity: 0, x: 10 }}
            key={activeTab}
            role="tabpanel"
            transition={{ duration: 0.2 }}
          >
            {tabContent}
          </motion.div>
        </AnimatePresence>

        <motion.div
          animate={{ opacity: 1 }}
          className="mt-8 flex justify-end border-gray-200 border-t pt-6 dark:border-gray-800"
          initial={{ opacity: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Button
            aria-label="Reset form"
            className="transform-gpu transition-transform will-change-transform hover:scale-105 active:scale-95"
            onClick={resetForm}
            variant="danger"
          >
            Reset Form
          </Button>
        </motion.div>
      </FadeIn>
    </div>
  );
}
