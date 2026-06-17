"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import ActionBar from "@/components/notification-generator/tabs/actionbar/action-bar";
import SoundIndicator from "@/components/notification-generator/tabs/sound/sound-indicator";
import Title from "@/components/notification-generator/tabs/title/title";
import { useSoundEffect, useTitleAnimation } from "../hooks";
import type { MinecraftPreviewProps } from "../types";
import BackgroundImage from "./background-image";
import { MinecraftText } from "./minecraft-text-parser";

const previewMotion = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
  transition: { duration: 0.25 },
};

export function MinecraftPreview({ notification, activeTab }: MinecraftPreviewProps) {
  const { showTitle, titleOpacity } = useTitleAnimation(notification);
  const { playSound, setPlaySound } = useSoundEffect(notification.sound);

  const rootRef = useRef<HTMLDivElement | null>(null);
  const [scaleVars, setScaleVars] = useState<Record<string, string>>({});

  useLayoutEffect(() => {
    const el = rootRef.current;
    if (!el) {
      return;
    }

    const updateScale = () => {
      const rect = el.getBoundingClientRect();
      const baseHeight = 540;
      const scale = Math.max(0.55, rect.height / baseHeight);

      const cssVars: Record<string, string> = {
        "--mc-scale": scale.toString(),
        "--mc-font-size": "calc(8px * var(--mc-scale))",
        "--mc-line-height": "calc(9px * var(--mc-scale))",
        "--mc-shadow": "calc(1px * var(--mc-scale))",
        "--mc-actionbar-bottom": "calc(72px * var(--mc-scale))",
        "--mc-title-font-size": "calc(32px * var(--mc-scale))",
        "--mc-subtitle-font-size": "calc(16px * var(--mc-scale))",
      };

      setScaleVars(cssVars);
    };

    updateScale();
    const observer = new ResizeObserver(updateScale);
    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if ((activeTab === "sound" || activeTab === "advanced") && notification.sound) {
      setPlaySound(true);
    }
  }, [activeTab, notification.sound, setPlaySound]);

  const chatLines = useMemo(() => {
    if (!notification.chat) {
      return null;
    }

    const lines = notification.chat.split("\n").filter(Boolean);
    if (lines.length === 0) {
      return null;
    }

    const counts = new Map<string, number>();
    const keyedLines = lines.map((line) => {
      const count = counts.get(line) ?? 0;
      counts.set(line, count + 1);
      return { id: `${line}-${count}`, text: line };
    });

    return (
      <div
        className="absolute bottom-10 left-6 z-10 flex max-w-[70%] flex-col gap-1 text-white"
        style={{
          fontSize: "var(--mc-font-size)",
          lineHeight: "var(--mc-line-height)",
          textShadow:
            "var(--mc-shadow) 0 0 #000, calc(-1 * var(--mc-shadow)) 0 0 #000, 0 var(--mc-shadow) 0 #000, 0 calc(-1 * var(--mc-shadow)) 0 #000",
        }}
      >
        {keyedLines.map((line) => (
          <div className="font-minecraft" key={line.id}>
            <MinecraftText text={line.text} />
          </div>
        ))}
      </div>
    );
  }, [notification.chat]);

  const actionBarComponent = useMemo(() => {
    if (!notification.actionbar) {
      return null;
    }
    return (
      <div
        className="absolute left-1/2 z-10 w-full"
        style={{
          bottom: "var(--mc-actionbar-bottom)",
          transform: "translateX(-50%)",
        }}
      >
        <ActionBar message={notification.actionbar} />
      </div>
    );
  }, [notification.actionbar]);

  const titleComponent = useMemo(() => {
    if (!(showTitle && (activeTab === "title" || activeTab === "advanced"))) {
      return null;
    }
    return (
      <Title
        showTitle={showTitle}
        subtitle={notification.subtitle}
        title={notification.title}
        titleOpacity={titleOpacity}
      />
    );
  }, [showTitle, notification.title, notification.subtitle, titleOpacity, activeTab]);

  const soundComponent = useMemo(() => {
    if (!(playSound && (activeTab === "sound" || activeTab === "advanced"))) {
      return null;
    }
    return <SoundIndicator playSound={playSound} sound={notification.sound} />;
  }, [playSound, notification.sound, activeTab]);

  const soundLabel = useMemo(() => {
    if (!(notification.sound && (activeTab === "sound" || activeTab === "advanced"))) {
      return null;
    }
    return (
      <div
        className="absolute bottom-6 left-6 z-10 rounded-lg border border-white/10 bg-black/60 px-3 py-2 text-white"
        style={{
          fontSize: "var(--mc-font-size)",
          lineHeight: "var(--mc-line-height)",
          textShadow:
            "var(--mc-shadow) 0 0 #000, calc(-1 * var(--mc-shadow)) 0 0 #000, 0 var(--mc-shadow) 0 #000, 0 calc(-1 * var(--mc-shadow)) 0 #000",
        }}
      >
        <span className="block text-[10px] text-white/70 uppercase tracking-[0.2em]">
          Selected Sound
        </span>
        <MinecraftText text={notification.sound} />
      </div>
    );
  }, [notification.sound, activeTab]);

  const placeholder = useMemo(() => {
    const messageMap: Record<string, string> = {
      chat: "Type a chat message to preview it here",
      actionbar: "Add an action bar message to preview it here",
      title: "Add a title or subtitle to preview it here",
      sound: "Pick a sound to preview it here",
      advanced: "Configure any notification to preview it here",
    };
    const message = messageMap[activeTab] || "Start building your notification";

    return (
      <motion.div
        className="absolute inset-0 flex items-center justify-center text-center text-white/70"
        {...previewMotion}
      >
        <div
          className="rounded-2xl border border-white/10 bg-black/40 px-6 py-4 text-xs uppercase tracking-wide"
          style={{
            fontSize: "var(--mc-font-size)",
            lineHeight: "var(--mc-line-height)",
            textShadow:
              "var(--mc-shadow) 0 0 #000, calc(-1 * var(--mc-shadow)) 0 0 #000, 0 var(--mc-shadow) 0 #000, 0 calc(-1 * var(--mc-shadow)) 0 #000",
          }}
        >
          {message}
        </div>
      </motion.div>
    );
  }, [activeTab]);

  const hasAnyContent =
    activeTab === "advanced"
      ? notification.chat ||
        notification.actionbar ||
        notification.title ||
        notification.subtitle ||
        notification.sound
      : {
          chat: notification.chat,
          actionbar: notification.actionbar,
          title: notification.title || notification.subtitle,
          sound: notification.sound,
        }[activeTab];

  const previewContent = useMemo(() => {
    if (!hasAnyContent) {
      return placeholder;
    }

    if (activeTab === "chat") {
      return <motion.div {...previewMotion}>{chatLines}</motion.div>;
    }

    if (activeTab === "actionbar") {
      return <motion.div {...previewMotion}>{actionBarComponent}</motion.div>;
    }

    if (activeTab === "title") {
      return <motion.div {...previewMotion}>{titleComponent}</motion.div>;
    }

    if (activeTab === "sound") {
      return (
        <motion.div {...previewMotion}>
          {soundLabel}
          {soundComponent}
        </motion.div>
      );
    }

    return (
      <motion.div {...previewMotion}>
        {chatLines}
        {actionBarComponent}
        {titleComponent}
        {soundLabel}
        {soundComponent}
      </motion.div>
    );
  }, [
    activeTab,
    hasAnyContent,
    placeholder,
    chatLines,
    actionBarComponent,
    titleComponent,
    soundLabel,
    soundComponent,
  ]);

  return (
    <div
      aria-label="Minecraft notification preview"
      className="relative overflow-hidden rounded-2xl border border-white/10 bg-black font-minecraft shadow-2xl"
      ref={rootRef}
      role="img"
      style={{
        width: "100%",
        aspectRatio: "16/9",
        ...scaleVars,
      }}
    >
      <BackgroundImage />
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/30 to-black/80" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.2),transparent_45%)]" />

      <AnimatePresence mode="wait">{previewContent}</AnimatePresence>

      <div className="absolute right-4 bottom-3 rounded-full border border-white/10 bg-black/60 px-3 py-1 text-[10px] text-white/70 uppercase tracking-[0.2em]">
        Preview
      </div>
    </div>
  );
}
