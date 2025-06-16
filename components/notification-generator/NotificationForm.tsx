"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useCallback, useRef, useMemo } from "react";

import { Button } from "@/components/ui/button";

import { ActionBarTab } from "./form/ActionBarTab";
import { AdvancedTab } from "./form/AdvancedTab";
import { ChatTab } from "./form/ChatTab";
import { SoundTab, SoundTabRef } from "./form/SoundTab";
import { Tab } from "./form/Tab";
import { TitleTab } from "./form/TitleTab";
import { validateField } from "./form/validation";
import { NotificationConfig, TabType, FieldType } from "./types";

interface NotificationFormProps {
  notification: NotificationConfig;
  setNotification: (notification: NotificationConfig) => void;
}

export function NotificationForm({ notification, setNotification }: NotificationFormProps) {
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
  }, [activeTab, setActiveTab]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
      <motion.div
        className="mb-4"
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.2, type: "spring", stiffness: 100 }}
      >
        <div
          className="flex flex-wrap border-b border-gray-200 dark:border-gray-700"
          role="tablist"
          aria-label="Notification type tabs"
        >
          {tabs}
        </div>
      </motion.div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -10 }}
          transition={{ duration: 0.15 }}
          role="tabpanel"
          aria-labelledby={`tab-${activeTab}`}
        >
          {tabContent}
        </motion.div>
      </AnimatePresence>

      <motion.div
        className="mt-6 flex justify-end"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2, delay: 0.1 }}
      >
        <Button variant="secondary" onClick={resetForm} aria-label="Reset form">
          Reset
        </Button>
      </motion.div>
    </motion.div>
  );
}
