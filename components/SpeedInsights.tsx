"use client";

import { SpeedInsights as VercelSpeedInsights } from "@vercel/speed-insights/next";
import { useEffect, useState } from "react";
import { canLoadAnalytics } from "@/lib/cookie-utils";

export function SpeedInsights() {
  const [shouldLoad, setShouldLoad] = useState(canLoadAnalytics());

  useEffect(() => {
    const updateConsent = () => setShouldLoad(canLoadAnalytics());
    window.addEventListener("storage", updateConsent);
    return () => window.removeEventListener("storage", updateConsent);
  }, []);

  // Also update on tab where consent is changed
  useEffect(() => {
    const updateConsent = () => setShouldLoad(canLoadAnalytics());
    window.addEventListener("cookieConsentChanged", updateConsent);
    return () =>
      window.removeEventListener("cookieConsentChanged", updateConsent);
  }, []);

  if (!shouldLoad) return null;

  return <VercelSpeedInsights />;
} 