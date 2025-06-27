"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Settings, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { useCookieConsent } from "@/hooks/useCookieConsent";

export function CookiePreferencesMenu() {
  const { consent, updateConsent, acceptAll } = useCookieConsent();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        onClick={() => setIsOpen((v) => !v)}
        className="fixed bottom-6 right-6 z-50 rounded-full bg-blue-600 p-3 text-white shadow-xl hover:bg-blue-700"
        aria-label="Cookie Preferences"
        style={{ boxShadow: "0 4px 24px 0 rgba(0,0,0,0.18)" }}
      >
        <Settings className="h-6 w-6" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 30 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed bottom-20 right-6 z-50"
          >
            <div className="w-[350px] max-w-sm rounded-lg border border-gray-200 bg-white p-6 shadow-lg dark:border-gray-800 dark:bg-gray-900">
              <div className="mb-4 flex items-start justify-between">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Cookie Preferences
                </h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                  aria-label="Close cookie preferences"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                      Necessary Cookies
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Required for the website to function properly
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={consent.necessary}
                    disabled
                    className="h-4 w-4 rounded-sm border-gray-300 text-blue-600"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                      Analytics Cookies
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Help us understand how visitors interact with our website
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={consent.analytics}
                    onChange={(e) => updateConsent({ analytics: e.target.checked })}
                    className="h-4 w-4 rounded-sm border-gray-300 text-blue-600"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                      Marketing Cookies
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Used to track visitors across websites for marketing purposes
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={consent.marketing}
                    onChange={(e) => updateConsent({ marketing: e.target.checked })}
                    className="h-4 w-4 rounded-sm border-gray-300 text-blue-600"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                      Preference Cookies
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Remember your settings and preferences
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={consent.preferences}
                    onChange={(e) => updateConsent({ preferences: e.target.checked })}
                    className="h-4 w-4 rounded-sm border-gray-300 text-blue-600"
                  />
                </div>
              </div>

              <div className="mt-6 flex w-full flex-row gap-3">
                <button
                  onClick={() => {
                    acceptAll();
                    setIsOpen(false);
                  }}
                  className="inline-flex flex-1 items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                >
                  Accept All
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="inline-flex flex-1 items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
                >
                  Save
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
        )}
      </AnimatePresence>
    </>
  );
}
