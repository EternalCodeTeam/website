"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Settings, X, ChevronDown, ChevronUp, ShieldCheck, Cookie } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

import { useCookieConsent } from "@/hooks/useCookieConsent";
import { softSpring } from "@/lib/animations/variants";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

export function CookieConsentModal() {
  const { consent, updateConsent, acceptAll, isInitialized } = useCookieConsent();
  const [isOpen, setIsOpen] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const isDefaultConsent =
    consent.necessary && !consent.analytics && !consent.marketing && !consent.preferences;

  // Open automatically if it's the first visit (default consent)
  useEffect(() => {
    if (isInitialized && isDefaultConsent) {
      setIsOpen(true);
    }
  }, [isInitialized, isDefaultConsent]);

  const handleOpenPreferences = () => {
    setIsOpen(true);
    // If opening from the settings button, show details by default for better UX
    setShowDetails(true);
  };

  const handleAcceptAll = () => {
    acceptAll();
    setIsOpen(false);
  };

  const handleSave = () => {
    setIsOpen(false);
  };

  if (!isInitialized) return null;

  return (
    <>
      {/* Floating Preferences Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            key="cookie-settings-button"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.15 } }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            onClick={handleOpenPreferences}
            className="cursor-pointer fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full border border-white/20 bg-blue-600 text-white shadow-xl backdrop-blur-md hover:bg-blue-700 focus:outline-hidden focus:ring-4 focus:ring-blue-500/30 dark:border-white/10"
            aria-label="Cookie Preferences"
            whileHover={{ scale: 1.1, rotate: 15, transition: { duration: 0.2 } }}
            whileTap={{ scale: 0.9, transition: { duration: 0.1 } }}
          >
            <Settings className="h-6 w-6" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Main Modal/Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="cookie-modal"
            initial={{ opacity: 0, y: 50, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.98 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="fixed bottom-6 right-6 z-50 w-full max-w-sm overflow-hidden rounded-2xl border border-white/20 bg-white/80 p-6 shadow-2xl backdrop-blur-xl dark:border-white/10 dark:bg-gray-900/80"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                  <Cookie className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                    Cookies & Privacy
                  </h3>
                  <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                    Transparent & Secure
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="cursor-pointer rounded-full p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-500 dark:hover:bg-gray-800 dark:hover:text-gray-300"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <p className="mt-4 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
              We use cookies to ensure you get the best experience on our website. Some are
              necessary, while others help us improve our services.
            </p>

            <div className="mt-4">
              <button
                type="button"
                onClick={() => setShowDetails(!showDetails)}
                className="cursor-pointer group flex items-center gap-2 text-sm font-medium text-blue-600 transition-colors hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
              >
                {showDetails ? (
                  <>
                    <ChevronUp className="h-4 w-4 transition-transform group-hover:-translate-y-0.5" />
                    Hide Details
                  </>
                ) : (
                  <>
                    <ChevronDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
                    Customize Preferences
                  </>
                )}
              </button>

              <AnimatePresence>
                {showDetails && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ ...softSpring, stiffness: 300, damping: 30 }}
                    className="overflow-hidden"
                  >
                    <div className="mt-4 space-y-4 rounded-xl bg-gray-50/50 p-4 dark:bg-gray-800/50">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="flex items-center gap-2 text-sm font-medium text-gray-900 dark:text-white">
                            <ShieldCheck className="h-4 w-4 text-green-500" />
                            Necessary
                          </h4>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            Essential for the site to work
                          </p>
                        </div>
                        <Switch checked={consent.necessary} disabled />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                            Analytics
                          </h4>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            Usage patterns & improvements
                          </p>
                        </div>
                        <Switch
                          checked={consent.analytics}
                          onChange={(c) => updateConsent({ analytics: c })}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                            Marketing
                          </h4>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            Personalized content & ads
                          </p>
                        </div>
                        <Switch
                          checked={consent.marketing}
                          onChange={(c) => updateConsent({ marketing: c })}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                            Preferences
                          </h4>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            Site settings & customization
                          </p>
                        </div>
                        <Switch
                          checked={consent.preferences}
                          onChange={(c) => updateConsent({ preferences: c })}
                        />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="mt-6 flex flex-col gap-3">
              <Button variant="primary" fullWidth onClick={handleAcceptAll} shine>
                Accept All Cookies
              </Button>
              <Button variant="outline" fullWidth onClick={handleSave}>
                Save Preferences
              </Button>
            </div>

            <div className="mt-4 text-center">
              <Link
                href="/privacy-policy"
                className="text-xs text-gray-400 hover:text-gray-600 hover:underline dark:text-gray-500 dark:hover:text-gray-400"
              >
                Read our Privacy Policy
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
