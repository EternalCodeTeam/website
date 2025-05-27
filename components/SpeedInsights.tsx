"use client";

import { SpeedInsights as VercelSpeedInsights } from "@vercel/speed-insights/next";
import { useEffect, useState, useCallback } from "react";
import { canLoadAnalytics } from "@/lib/cookie-utils";

export function SpeedInsights() {
  const [shouldLoad, setShouldLoad] = useState(canLoadAnalytics());

  const updateConsent = useCallback(() => {
    setShouldLoad(canLoadAnalytics());
  }, []);

  useEffect(() => {
    window.addEventListener("storage", updateConsent);
    return () => window.removeEventListener("storage", updateConsent);
  }, [updateConsent]);

  // Also update on tab where consent is changed
  useEffect(() => {
    window.addEventListener("cookieConsentChanged", updateConsent);
    return () =>
      window.removeEventListener("cookieConsentChanged", updateConsent);
  }, [updateConsent]);

  if (!shouldLoad) return null;

  return <VercelSpeedInsights />;
}
