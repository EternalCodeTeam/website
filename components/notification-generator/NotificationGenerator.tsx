"use client";

import { AnimatePresence } from "framer-motion";
import { useCallback, useMemo, useRef, useState } from "react";

import AnimatedElement from "@/components/animations/AnimatedElement";
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
    <AnimatedElement animationType="fade">
      <AnimatedElement animationType="fadeDown" className="mb-4">
        <div
          className="flex flex-wrap border-b border-gray-200 dark:border-gray-700"
          role="tablist"
          aria-label="Notification type tabs"
        >
          {tabs}
        </div>
      </AnimatedElement>

      <AnimatePresence mode="wait">
        <AnimatedElement
          key={activeTab}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -10 }}
          transition={{ duration: 0.15 }}
          role="tabpanel"
          aria-labelledby={`tab-${activeTab}`}
        >
          {tabContent}
        </AnimatedElement>
      </AnimatePresence>

      <AnimatedElement animationType="fadeUp" delay={0.1} className="mt-6 flex justify-end">
        <Button variant="secondary" onClick={resetForm} aria-label="Reset form">
          Reset
        </Button>
      </AnimatedElement>
    </AnimatedElement>
  );
}
