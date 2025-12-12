"use client";

import { Analytics as VercelAnalytics } from "@vercel/analytics/react";
import { useCallback, useEffect, useState } from "react";

import { canLoadAnalytics } from "@/lib/cookie-utils";

export function Analytics() {
  const [shouldLoad, setShouldLoad] = useState(canLoadAnalytics());

  const updateConsent = useCallback(() => {
    setShouldLoad(canLoadAnalytics());
  }, []);

  useEffect(() => {
    window.addEventListener("storage", updateConsent);
    return () => window.removeEventListener("storage", updateConsent);
  }, [updateConsent]);

  useEffect(() => {
    window.addEventListener("cookieConsentChanged", updateConsent);
    return () => window.removeEventListener("cookieConsentChanged", updateConsent);
  }, [updateConsent]);

  if (!shouldLoad) {
    return null;
  }

  return <VercelAnalytics />;
}
