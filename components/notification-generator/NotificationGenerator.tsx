"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useMemo, useRef, useState } from "react";

import { FadeIn } from "@/components/ui/motion/MotionComponents";
import { ActionBarTab } from "@/components/notification-generator/tabs/actionbar/ActionBarTab";
import { ChatTab } from "@/components/notification-generator/tabs/chat/ChatTab";
import {
  SoundTab,
  type SoundTabRef,
} from "@/components/notification-generator/tabs/sound/SoundTab";
import { TitleTab } from "@/components/notification-generator/tabs/title/TitleTab";
import { Button } from "@/components/ui/button";

import { validateField } from "./form/validation";
import { AdvancedTab } from "./tabs/advanced/AdvancedTab";
import { Tab } from "./tabs/Tab";
import type { FieldType, NotificationConfig, TabType } from "./types";

interface NotificationFormProps {
  notification: NotificationConfig;
  setNotification: (notification: NotificationConfig) => void;
}

export function NotificationGenerator({ notification, setNotification }: NotificationFormProps) {
  const [activeTab, setActiveTab] = useState<TabType>("chat");
  const [errors, setErrors] = useState<Record<string, string>>({});
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

  const tabContent = useMemo(() => {
    switch (activeTab) {
      case "chat":
        return <ChatTab notification={notification} onChange={handleChange} />;
      case "actionbar":
        return <ActionBarTab notification={notification} onChange={handleChange} />;
      case "title":
        return <TitleTab notification={notification} onChange={handleChange} errors={errors} />;
      case "sound":
        return (
          <SoundTab
            ref={soundTabRef}
            notification={notification}
            onChange={handleChange}
            errors={errors}
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
        key={tabName}
        activeTab={activeTab}
        tabName={tabName}
        label={tabName.charAt(0).toUpperCase() + tabName.slice(1)}
        onClick={setActiveTab}
      />
    ));
  }, [activeTab]);

  return (
    <div className="h-full rounded-2xl border border-white/20 bg-white/50 p-6 shadow-xl backdrop-blur-xl dark:border-white/10 dark:bg-white/5">
      <FadeIn>
        <div className="mb-8">
          <div
            className="flex flex-wrap gap-2 rounded-xl bg-gray-100/50 p-1.5 dark:bg-gray-900/50"
            role="tablist"
            aria-label="Notification type tabs"
          >
            {tabs}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.2 }}
            role="tabpanel"
            aria-labelledby={`tab-${activeTab}`}
            className="min-h-[400px]"
          >
            {tabContent}
          </motion.div>
        </AnimatePresence>

        <motion.div
          className="mt-8 flex justify-end border-t border-gray-200 pt-6 dark:border-gray-800"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Button
            variant="danger"
            onClick={resetForm}
            aria-label="Reset form"
            className="transition-transform hover:scale-105 active:scale-95"
          >
            Reset Form
          </Button>
        </motion.div>
      </FadeIn>
    </div>
  );
}
