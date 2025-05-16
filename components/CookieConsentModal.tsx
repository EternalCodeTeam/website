"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCookieConsent } from "@/hooks/useCookieConsent";
import { X, ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";

export function CookieConsentModal() {
  const { consent, updateConsent, acceptAll, rejectAll, isInitialized } =
    useCookieConsent();
  const [isOpen, setIsOpen] = useState(true);
  const [showDetails, setShowDetails] = useState(false);

  // Show modal only if consent is default (user hasn't set preferences)
  const isDefaultConsent =
    consent.necessary === true &&
    consent.analytics === false &&
    consent.marketing === false &&
    consent.preferences === false;

  if (!isInitialized || !isOpen || !isDefaultConsent) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 40 }}
        className="fixed bottom-4 left-4 z-50 w-full max-w-sm rounded-lg border border-gray-200 bg-white shadow-lg dark:border-gray-800 dark:bg-gray-900"
      >
        <div className="p-4">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Cookie Preferences
              </h3>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                We use cookies to enhance your browsing experience, serve
                personalized content, and analyze our traffic.
              </p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="ml-4 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="mt-4">
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="flex items-center text-sm text-blue-600 hover:underline dark:text-blue-400"
            >
              {showDetails ? (
                <>
                  <ChevronUp className="mr-1 h-4 w-4" />
                  Hide Details
                </>
              ) : (
                <>
                  <ChevronDown className="mr-1 h-4 w-4" />
                  Show Details
                </>
              )}
            </button>

            {showDetails && (
              <div className="mt-4 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                      Necessary Cookies
                    </h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Required for the website to function properly
                    </p>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={consent.necessary}
                      disabled
                      className="h-4 w-4 rounded border-gray-300 text-blue-600"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                      Analytics Cookies
                    </h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Help us understand how visitors interact with our website
                    </p>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={consent.analytics}
                      onChange={(e) =>
                        updateConsent({ analytics: e.target.checked })
                      }
                      className="h-4 w-4 rounded border-gray-300 text-blue-600"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                      Marketing Cookies
                    </h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Used to track visitors across websites for marketing
                      purposes
                    </p>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={consent.marketing}
                      onChange={(e) =>
                        updateConsent({ marketing: e.target.checked })
                      }
                      className="h-4 w-4 rounded border-gray-300 text-blue-600"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                      Preference Cookies
                    </h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Remember your settings and preferences
                    </p>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={consent.preferences}
                      onChange={(e) =>
                        updateConsent({ preferences: e.target.checked })
                      }
                      className="h-4 w-4 rounded border-gray-300 text-blue-600"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="mt-6 flex flex-col gap-3">
            <button
              onClick={() => {
                acceptAll();
                setIsOpen(false);
              }}
              className="inline-flex w-full items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              Accept All
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="inline-flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
            >
              Save Preferences
            </button>
          </div>
          <div className="mt-3 text-center">
            <Link
              href="/privacy-policy"
              className="text-xs text-blue-600 hover:underline dark:text-blue-400"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
