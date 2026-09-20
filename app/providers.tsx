"use client";

import { domAnimation, LazyMotion } from "framer-motion";
import { ThemeProvider } from "next-themes";
import type { ReactNode } from "react";
import { Toaster } from "react-hot-toast";

import { ServiceWorkerRegistration } from "@/components/pwa/service-worker";
import SmoothScrolling from "@/components/smooth-scrolling";

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <LazyMotion features={domAnimation}>
        <SmoothScrolling>{children}</SmoothScrolling>
        <ServiceWorkerRegistration />
        <Toaster
          position="bottom-right"
          reverseOrder={false}
          toastOptions={{
            duration: 1500,
          }}
        />
      </LazyMotion>
    </ThemeProvider>
  );
}
