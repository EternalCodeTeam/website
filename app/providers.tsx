"use client";

import { domAnimation, LazyMotion } from "framer-motion";
import { ThemeProvider } from "next-themes";
import type { ReactNode } from "react";
import { Toaster } from "react-hot-toast";

import { SearchProvider } from "@/components/docs/search/search-context";
import { ServiceWorkerRegistration } from "@/components/pwa/service-worker";
import SmoothScrolling from "@/components/smooth-scrolling";

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <LazyMotion features={domAnimation}>
        <SearchProvider>
          <SmoothScrolling>{children}</SmoothScrolling>
          <ServiceWorkerRegistration />
          <Toaster
            position="bottom-right"
            reverseOrder={false}
            toastOptions={{
              duration: 1500,
            }}
          />
        </SearchProvider>
      </LazyMotion>
    </ThemeProvider>
  );
}
