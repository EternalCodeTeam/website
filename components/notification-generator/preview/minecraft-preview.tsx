"use client";

import { AnimatePresence } from "framer-motion";
import { useLayoutEffect, useMemo, useRef, useState } from "react";
import ActionBar from "@/components/notification-generator/tabs/actionbar/action-bar";
import ChatMessage from "@/components/notification-generator/tabs/chat/chat-message";
import SoundIndicator from "@/components/notification-generator/tabs/sound/sound-indicator";
import Title from "@/components/notification-generator/tabs/title/title";
import { useSoundEffect, useTitleAnimation } from "../hooks";
import type { MinecraftPreviewProps } from "../types";
import BackgroundImage from "./background-image";

export function MinecraftPreview({ notification }: MinecraftPreviewProps) {
  const { showTitle, titleOpacity } = useTitleAnimation(notification);
  const { playSound } = useSoundEffect(notification.sound);

  const rootRef = useRef<HTMLDivElement | null>(null);
  const [scaleVars, setScaleVars] = useState<Record<string, string>>({});

  useLayoutEffect(() => {
    const el = rootRef.current;
    if (!el) {
      return;
    }

    const rect = el.getBoundingClientRect();
    const baseHeight = 540;
    const scale = Math.max(0.5, rect.height / baseHeight);

    const cssVars: Record<string, string> = {
      "--mc-scale": scale.toString(),
      "--mc-font-size": "calc(8px * var(--mc-scale))",
      "--mc-line-height": "calc(9px * var(--mc-scale))",
      "--mc-shadow": "calc(1px * var(--mc-scale))",

      "--mc-chat-left": "calc(4px * var(--mc-scale))",
      "--mc-chat-bottom": "calc(48px * var(--mc-scale))",
      "--mc-chat-width": "calc(320px * var(--mc-scale))",

      "--mc-actionbar-bottom": "calc(67px * var(--mc-scale))",

      "--mc-title-font-size": "calc(32px * var(--mc-scale))",
      "--mc-subtitle-font-size": "calc(16px * var(--mc-scale))",
    };

    setScaleVars(cssVars);
  }, []);

  const chatComponent = useMemo(() => {
    if (!notification.chat) {
      return null;
    }
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
    if (!notification.actionbar) {
      return null;
    }
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
    if (!showTitle) {
      return null;
    }
    return (
      <div>
        <Title
          showTitle={showTitle}
          subtitle={notification.subtitle}
          title={notification.title}
          titleOpacity={titleOpacity}
        />
      </div>
    );
  }, [showTitle, notification.title, notification.subtitle, titleOpacity]);

  const soundComponent = useMemo(() => {
    if (!playSound) {
      return null;
    }
    return (
      <div>
        <SoundIndicator playSound={playSound} sound={notification.sound} />
      </div>
    );
  }, [playSound, notification.sound]);

  return (
    <div
      aria-label="Minecraft notification preview"
      className="relative overflow-hidden rounded-xl bg-black font-minecraft"
      ref={rootRef}
      role="img"
      style={{
        width: "100%",
        aspectRatio: "16/9",
        maxWidth: "1280px",
        margin: "0 auto",
        ...scaleVars,
      }}
    >
      <BackgroundImage />

      <AnimatePresence>{chatComponent}</AnimatePresence>

      <AnimatePresence>{actionBarComponent}</AnimatePresence>

      <AnimatePresence>{titleComponent}</AnimatePresence>

      <AnimatePresence>{soundComponent}</AnimatePresence>
    </div>
  );
}
