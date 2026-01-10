"use client";

import { domAnimation, LazyMotion } from "framer-motion";
import { ThemeProvider } from "next-themes";
import { type ReactNode, useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";

import SmoothScrolling from "@/components/smooth-scrolling";

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="system" disableTransitionOnChange enableSystem>
      <LazyMotion features={domAnimation}>
        <SmoothScrolling>{children}</SmoothScrolling>
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
