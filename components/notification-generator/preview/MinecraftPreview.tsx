"use client";

import { AnimatePresence } from "framer-motion";
import React, { useMemo, useRef, useLayoutEffect, useState } from "react";

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

  const rootRef = useRef<HTMLDivElement | null>(null);
  const [scaleVars, setScaleVars] = useState<React.CSSProperties>({});

  useLayoutEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const baseHeight = 540;
    const scale = Math.max(0.5, rect.height / baseHeight);

    const cssVars: React.CSSProperties = {
      ["--mc-scale" as any]: scale.toString(),
      ["--mc-font-size" as any]: `calc(8px * var(--mc-scale))`,
      ["--mc-line-height" as any]: `calc(9px * var(--mc-scale))`,
      ["--mc-shadow" as any]: `calc(1px * var(--mc-scale))`,

      ["--mc-chat-left" as any]: `calc(4px * var(--mc-scale))`,
      ["--mc-chat-bottom" as any]: `calc(48px * var(--mc-scale))`,
      ["--mc-chat-width" as any]: `calc(320px * var(--mc-scale))`,

      ["--mc-actionbar-bottom" as any]: `calc(67px * var(--mc-scale))`,

      ["--mc-title-font-size" as any]: `calc(32px * var(--mc-scale))`,
      ["--mc-subtitle-font-size" as any]: `calc(16px * var(--mc-scale))`,
    };

    setScaleVars(cssVars);
  }, []);

  const chatComponent = useMemo(() => {
    if (!notification.chat) return null;
    return (
      <div
        className="absolute"
        style={{
          left: "var(--mc-chat-left)",
          bottom: "var(--mc-chat-bottom)",
          width: "var(--mc-chat-width)",
          zIndex: 5,
        }}
      >
        <ChatMessage message={notification.chat} />
      </div>
    );
  }, [notification.chat]);

  const actionBarComponent = useMemo(() => {
    if (!notification.actionbar) return null;
    return (
      <div
        className="absolute left-1/2"
        style={{
          bottom: "var(--mc-actionbar-bottom)",
          transform: "translateX(-50%)",
          width: "100%",
          maxWidth: "100%",
          zIndex: 10,
        }}
      >
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
      ref={rootRef}
      className="font-minecraft relative overflow-hidden rounded-lg bg-gray-900 shadow-lg"
      style={{
        width: "100%",
        aspectRatio: "16/9",
        maxWidth: "1280px",
        margin: "0 auto",
        ...scaleVars,
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
