"use client";

import { useState, useEffect } from "react";

export type CookieConsent = {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  preferences: boolean;
};

const defaultConsent: CookieConsent = {
  necessary: true, // Always true as these are essential
  analytics: false,
  marketing: false,
  preferences: false,
};

export function useCookieConsent() {
  const [consent, setConsent] = useState<CookieConsent>(defaultConsent);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const savedConsent = localStorage.getItem("cookieConsent");
    if (savedConsent) {
      try {
        const parsedConsent = JSON.parse(savedConsent) as CookieConsent;

        if (
          typeof parsedConsent === "object" &&
          "necessary" in parsedConsent &&
          "analytics" in parsedConsent &&
          "marketing" in parsedConsent &&
          "preferences" in parsedConsent
        ) {
          setConsent(parsedConsent);
        }
      } catch (e) {
        console.error("Failed to parse cookie consent:", e);
      }
    }
    setIsInitialized(true);
  }, []);

  const updateConsent = (newConsent: Partial<CookieConsent>) => {
    const updatedConsent = { ...consent, ...newConsent };
    setConsent(updatedConsent);
    localStorage.setItem("cookieConsent", JSON.stringify(updatedConsent));
    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event("cookieConsentChanged"));
    }
  };

  const acceptAll = () => {
    const allAccepted = {
      necessary: true,
      analytics: true,
      marketing: true,
      preferences: true,
    };
    updateConsent(allAccepted);
  };

  const rejectAll = () => {
    const allRejected = {
      necessary: true, // Keep necessary cookies
      analytics: false,
      marketing: false,
      preferences: false,
    };
    updateConsent(allRejected);
  };

  return {
    consent,
    updateConsent,
    acceptAll,
    rejectAll,
    isInitialized,
  };
}
