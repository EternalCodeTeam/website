"use client";

import { AnimatePresence } from "framer-motion";
import React, { useMemo } from "react";

import ActionBar from "@/components/notification-generator/tabs/actionbar/ActionBar";
import ChatMessage from "@/components/notification-generator/tabs/chat/ChatMessage";
import SoundIndicator from "@/components/notification-generator/tabs/sound/SoundIndicator";
import Title from "@/components/notification-generator/tabs/title/Title";

import { useTitleAnimation, useSoundEffect } from "../hooks";
import { MinecraftPreviewProps } from "../types";

import BackgroundImage from "./BackgroundImage";

export function MinecraftPreview({ notification }: MinecraftPreviewProps) {
  const { showTitle, titleOpacity } = useTitleAnimation(notification);
  const { playSound } = useSoundEffect(notification.sound);

  const chatComponent = useMemo(() => {
    if (!notification.chat) return null;
    return (
      <div className="absolute bottom-4 left-0">
        <ChatMessage message={notification.chat} />
      </div>
    );
  }, [notification.chat]);

  const actionBarComponent = useMemo(() => {
    if (!notification.actionbar) return null;
    return (
      <div>
        <ActionBar message={notification.actionbar} />
      </div>
    );
  }, [notification.actionbar]);

  const titleComponent = useMemo(() => {
    if (!showTitle) return null;
    return (
      <div>
        <Title
          title={notification.title}
          subtitle={notification.subtitle}
          showTitle={showTitle}
          titleOpacity={titleOpacity}
        />
      </div>
    );
  }, [showTitle, notification.title, notification.subtitle, titleOpacity]);

  const soundComponent = useMemo(() => {
    if (!playSound) return null;
    return (
      <div>
        <SoundIndicator sound={notification.sound} playSound={playSound} />
      </div>
    );
  }, [playSound, notification.sound]);

  return (
    <div
      className="font-minecraft relative overflow-hidden rounded-lg bg-gray-900 shadow-lg"
      style={{
        width: "100%",
        aspectRatio: "16/9",
        maxWidth: "1280px",
        margin: "0 auto",
      }}
      role="img"
      aria-label="Minecraft notification preview"
    >
      <BackgroundImage />

      <AnimatePresence>{chatComponent}</AnimatePresence>

      <AnimatePresence>{actionBarComponent}</AnimatePresence>

      <AnimatePresence>{titleComponent}</AnimatePresence>

      <AnimatePresence>{soundComponent}</AnimatePresence>
    </div>
  );
}
