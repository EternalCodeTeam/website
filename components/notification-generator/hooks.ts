import { useCallback, useEffect, useRef, useState } from "react";

import type { NotificationConfig } from "./types";

const TIME_REGEX = /^(\d+(\.\d+)?)s$/;

export const useTitleAnimation = (
  notification: Pick<NotificationConfig, "title" | "subtitle" | "fadeIn" | "stay" | "fadeOut">
) => {
  const [showTitle, setShowTitle] = useState(false);
  const [titleOpacity, setTitleOpacity] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const parseTime = useCallback((timeStr: string) => {
    if (!timeStr) {
      return 0;
    }
    const match = timeStr.match(TIME_REGEX);
    if (!match) {
      return 0;
    }
    return Number.parseFloat(match[1]);
  }, []);

  useEffect(() => {
    if (!(notification.title || notification.subtitle)) {
      return;
    }

    const fadeIn = parseTime(notification.fadeIn) || 1;
    const stay = parseTime(notification.stay) || 2;
    const fadeOut = parseTime(notification.fadeOut) || 1;

    setShowTitle(false);
    setTitleOpacity(0);

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setShowTitle(true);

      intervalRef.current = setInterval(() => {
        setTitleOpacity((prev) => {
          if (prev >= 1) {
            if (intervalRef.current) {
              clearInterval(intervalRef.current);
            }
            return 1;
          }
          return prev + 0.1;
        });
      }, fadeIn * 100);

      timeoutRef.current = setTimeout(
        () => {
          intervalRef.current = setInterval(() => {
            setTitleOpacity((prev) => {
              if (prev <= 0) {
                if (intervalRef.current) {
                  clearInterval(intervalRef.current);
                }
                setShowTitle(false);
                return 0;
              }
              return prev - 0.1;
            });
          }, fadeOut * 100);
        },
        (fadeIn + stay) * 1000
      );
    }, 500);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [
    notification.title,
    notification.subtitle,
    notification.fadeIn,
    notification.stay,
    notification.fadeOut,
    parseTime,
  ]);

  return { showTitle, titleOpacity };
};

export const useSoundEffect = (sound: string) => {
  const [playSound, setPlaySound] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (sound && playSound) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        setPlaySound(false);
      }, 1000);

      return () => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
      };
    }
  }, [sound, playSound]);

  return { playSound, setPlaySound };
};
