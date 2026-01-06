"use client";

import type { CookieConsent } from "@/hooks/use-cookie-consent";

export function getCookieConsent(): CookieConsent {
  if (typeof window === "undefined") {
    return {
      necessary: true,
      analytics: false,
      marketing: false,
      preferences: false,
    };
  }

  const savedConsent = localStorage.getItem("cookieConsent");
  if (!savedConsent) {
    return {
      necessary: true,
      analytics: false,
      marketing: false,
      preferences: false,
    };
  }

  try {
    const parsedConsent = JSON.parse(savedConsent) as CookieConsent;
    return {
      necessary: true,
      analytics: parsedConsent.analytics ?? false,
      marketing: parsedConsent.marketing ?? false,
      preferences: parsedConsent.preferences ?? false,
    };
  } catch (e) {
    console.error("Failed to parse cookie consent:", e);
    return {
      necessary: true,
      analytics: false,
      marketing: false,
      preferences: false,
    };
  }
}

export function canLoadAnalytics(): boolean {
  const consent = getCookieConsent();
  return consent.analytics;
}

export function canLoadMarketing(): boolean {
  const consent = getCookieConsent();
  return consent.marketing;
}

export function canLoadPreferences(): boolean {
  const consent = getCookieConsent();
  return consent.preferences;
}
