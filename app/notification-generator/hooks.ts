import { useState, useEffect, useCallback } from 'react';
import { NotificationConfig } from './types';

export const useTitleAnimation = (notification: Pick<NotificationConfig, 'title' | 'subtitle' | 'fadeIn' | 'stay' | 'fadeOut'>) => {
  const [showTitle, setShowTitle] = useState(false);
  const [titleOpacity, setTitleOpacity] = useState(0);

  const parseTime = useCallback((timeStr: string) => {
    if (!timeStr) return 0;
    const match = timeStr.match(/^(\d+(\.\d+)?)s$/);
    if (!match) return 0;
    return parseFloat(match[1]);
  }, []);

  useEffect(() => {
    if (!notification.title && !notification.subtitle) return;

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
      
      const stayTimeout = setTimeout(() => {
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
      }, (fadeIn + stay) * 1000);
      
      return () => {
        clearTimeout(stayTimeout);
        clearInterval(fadeInInterval);
      };
    }, 500);
    
    return () => clearTimeout(startTimeout);
  }, [
    notification.title,
    notification.subtitle,
    notification.fadeIn,
    notification.stay,
    notification.fadeOut,
    parseTime
  ]);

  return { showTitle, titleOpacity };
};

export const useSoundEffect = (sound: string) => {
  const [playSound, setPlaySound] = useState(false);

  useEffect(() => {
    if (sound && playSound) {
      const timeout = setTimeout(() => {
        setPlaySound(false);
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [sound, playSound]);

  return { playSound, setPlaySound };
}; 