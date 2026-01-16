"use client";

import { useEffect, useState } from "react";

export interface ConsentPreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  preferences: boolean;
}

export interface CookieConsent {
  consent: ConsentPreferences;
  updateConsent: (updates: Partial<ConsentPreferences>) => void;
  acceptAll: () => void;
  isInitialized: boolean;
}

const CONSENT_KEY = "cookie-consent";

const DEFAULT_CONSENT: ConsentPreferences = {
  necessary: true,
  analytics: false,
  marketing: false,
  preferences: false,
};

export function useCookieConsent(): CookieConsent {
  const [consent, setConsent] = useState<ConsentPreferences>(DEFAULT_CONSENT);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(CONSENT_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as ConsentPreferences;
        setConsent(parsed);
      } catch {
        setConsent(DEFAULT_CONSENT);
      }
    }
    setIsInitialized(true);
  }, []);

  const updateConsent = (updates: Partial<ConsentPreferences>) => {
    const newConsent = { ...consent, ...updates };
    setConsent(newConsent);
    localStorage.setItem(CONSENT_KEY, JSON.stringify(newConsent));
  };

  const acceptAll = () => {
    const allAccepted: ConsentPreferences = {
      necessary: true,
      analytics: true,
      marketing: true,
      preferences: true,
    };
    setConsent(allAccepted);
    localStorage.setItem(CONSENT_KEY, JSON.stringify(allAccepted));
  };

  return {
    consent,
    updateConsent,
    acceptAll,
    isInitialized,
  };
}
