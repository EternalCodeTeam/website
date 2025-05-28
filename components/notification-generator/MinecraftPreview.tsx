"use client";

import React, { useMemo } from "react";
import { AnimatePresence } from "framer-motion";
import { MinecraftPreviewProps } from "./types";
import { useTitleAnimation, useSoundEffect } from "./hooks";
import ChatMessage from "./ChatMessage";
import ActionBar from "./ActionBar";
import Title from "./Title";
import SoundIndicator from "./SoundIndicator";
import BackgroundImage from "./BackgroundImage";

export function MinecraftPreview({ notification }: MinecraftPreviewProps) {
  const { showTitle, titleOpacity } = useTitleAnimation(notification);
  const { playSound, setPlaySound } = useSoundEffect(notification.sound);

  return (
    <div
      className="font-minecraft relative overflow-hidden rounded-lg bg-[#1a1a1a]"
      style={{
        width: "100%",
        aspectRatio: "16/9",
        maxWidth: "1280px",
        margin: "0 auto",
      }}
    >
      <BackgroundImage />

      <AnimatePresence>
        {notification.chat && (
          <div className="absolute bottom-4 left-0">
            <ChatMessage message={notification.chat} />
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {notification.actionbar && (
          <div>
            <ActionBar message={notification.actionbar} />
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showTitle && (
          <div>
            <Title 
              title={notification.title} 
              subtitle={notification.subtitle} 
              showTitle={showTitle} 
              titleOpacity={titleOpacity} 
            />
          </div>
        )}
      </AnimatePresence>
      
      <AnimatePresence>
        {playSound && (
          <div>
            <SoundIndicator sound={notification.sound} playSound={playSound} />
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
