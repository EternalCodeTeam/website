"use client";

import React, { useState, useEffect } from "react";
import { parseMinecraftText } from '../parser/minecraftTextParser';

interface MinecraftPreviewProps {
  notification: {
    chat: string;
    actionbar: string;
    title: string;
    subtitle: string;
    fadeIn: string;
    stay: string;
    fadeOut: string;
    sound: string;
    soundCategory: string;
    titleHide: boolean;
    useMiniMessage: boolean;
  };
}

export function MinecraftPreview({ notification }: MinecraftPreviewProps) {
  const [showTitle, setShowTitle] = useState(false);
  const [titleOpacity, setTitleOpacity] = useState(0);
  const [showActionBar, setShowActionBar] = useState(false);
  const [actionBarOpacity, setActionBarOpacity] = useState(0);
  const [playSound, setPlaySound] = useState(false);

  // Parse time string (e.g. "1s", "0.5s")
  const parseTime = (timeStr: string) => {
    if (!timeStr) return 0;
    const match = timeStr.match(/^(\d+(\.\d+)?)s$/);
    if (!match) return 0;
    return parseFloat(match[1]);
  };

  // Handle title animation
  useEffect(() => {
    if (notification.title || notification.subtitle) {
      const fadeIn = parseTime(notification.fadeIn) || 1;
      const stay = parseTime(notification.stay) || 2;
      const fadeOut = parseTime(notification.fadeOut) || 1;
      setShowTitle(false);
      setTitleOpacity(0);
      const startTimeout = setTimeout(() => {
        setShowTitle(true);
        const fadeInInterval = setInterval(() => {
          setTitleOpacity((prev) => {
            if (prev >= 1) {
              clearInterval(fadeInInterval);
              return 1;
            }
            return prev + 0.1;
          });
        }, fadeIn * 100);
        const stayTimeout = setTimeout(
          () => {
            const fadeOutInterval = setInterval(() => {
              setTitleOpacity((prev) => {
                if (prev <= 0) {
                  clearInterval(fadeOutInterval);
                  setShowTitle(false);
                  return 0;
                }
                return prev - 0.1;
              });
            }, fadeOut * 100);
          },
          (fadeIn + stay) * 1000
        );
        return () => {
          clearTimeout(startTimeout);
          clearTimeout(stayTimeout);
          clearInterval(fadeInInterval);
        };
      }, 500);
      return () => clearTimeout(startTimeout);
    }
  }, [
    notification.title,
    notification.subtitle,
    notification.fadeIn,
    notification.stay,
    notification.fadeOut,
  ]);

  // ActionBar is always shown if set
  const showActionBarAlways = !!notification.actionbar;

  // Handle sound
  useEffect(() => {
    if (notification.sound && playSound) {
      const timeout = setTimeout(() => {
        setPlaySound(false);
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [notification.sound, playSound]);

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
      {/* Minecraft background as image */}
      <img
        src="/mc-bg.png"
        alt="Minecraft background"
        className="pointer-events-none absolute inset-0 h-full w-full select-none object-cover"
        style={{ zIndex: 0 }}
      />

      {/* Chat messages */}
      <div className="absolute bottom-4 left-0">
        {notification.chat && (
          <div
            className="relative flex h-8 items-center"
            style={{ width: "50vw", minWidth: 320 }}
          >
            {/* Minecraft chat background - sharp, 50% szerokości, przyklejony do lewej */}
            <div
              className="absolute left-0 top-0 h-8 w-full bg-black/40"
              style={{ zIndex: 0, borderRadius: 0 }}
            />
            {notification.chat.includes("\n") ? (
              notification.chat.split("\n").map((line, index) => (
                <div
                  key={index}
                  className="font-minecraft relative px-4 text-white drop-shadow-[2px_2px_0px_rgba(0,0,0,0.5)]"
                  style={{ zIndex: 1, height: "32px", lineHeight: "32px" }}
                >
                  {parseMinecraftText(line)}
                </div>
              ))
            ) : (
              <div
                className="font-minecraft relative px-4 text-white drop-shadow-[2px_2px_0px_rgba(0,0,0,0.5)]"
                style={{ zIndex: 1, height: "32px", lineHeight: "32px" }}
              >
                {parseMinecraftText(notification.chat)}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Action bar */}
      {showActionBarAlways && (
        <div
          className="absolute left-1/2"
          style={{
            bottom: "12%",
            transform: "translateX(-50%)",
            width: "100%",
            textAlign: "center",
            pointerEvents: "none",
            zIndex: 10,
            background: "none",
            border: "none",
            boxShadow: "none",
            padding: 0,
          }}
        >
          <span
            className="font-minecraft"
            style={{
              color: "#fff",
              fontSize: "1.5rem",
              textShadow:
                "2px 0 0 #000, -2px 0 0 #000, 0 2px 0 #000, 0 -2px 0 #000, 1px 1px #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000",
              fontWeight: "normal",
              lineHeight: 1.2,
              padding: 0,
              margin: 0,
              letterSpacing: 0,
              userSelect: "none",
              background: "none",
              border: "none",
              boxShadow: "none",
            }}
          >
            {notification.actionbar}
          </span>
        </div>
      )}

      {/* Title and subtitle */}
      {showTitle && (
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform text-center transition-opacity duration-500"
          style={{ opacity: titleOpacity }}
        >
          {notification.title && (
            <div className="font-minecraft mb-2 text-3xl font-bold text-white drop-shadow-[2px_2px_0px_rgba(0,0,0,0.5)]">
              {parseMinecraftText(notification.title)}
            </div>
          )}
          {notification.subtitle && (
            <div className="font-minecraft text-xl text-gray-300 drop-shadow-[2px_2px_0px_rgba(0,0,0,0.5)]">
              {parseMinecraftText(notification.subtitle)}
            </div>
          )}
        </div>
      )}

      {/* Sound indicator */}
      {notification.sound && playSound && (
        <div className="absolute right-4 top-4 flex items-center rounded-md bg-black bg-opacity-50 px-3 py-1 text-sm text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="mr-1 h-4 w-4"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM12.293 7.293a1 1 0 011.414 0L15 8.586l1.293-1.293a1 1 0 111.414 1.414L16.414 10l1.293 1.293a1 1 0 01-1.414 1.414L15 11.414l-1.293 1.293a1 1 0 01-1.414-1.414L13.586 10l-1.293-1.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
          {notification.sound}
        </div>
      )}
    </div>
  );
}
