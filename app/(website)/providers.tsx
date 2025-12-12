"use client";

import { ThemeProvider } from "next-themes";
import { type ReactNode, useCallback, useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";

type ProvidersProps = {
  children: ReactNode;
};

export function Providers({ children }: ProvidersProps) {
  const [mounted, setMounted] = useState(false);

  const handleMount = useCallback(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    handleMount();
  }, [handleMount]);

  if (!mounted) {
    return null;
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="system" disableTransitionOnChange enableSystem>
      {children}
      <Toaster
        position="bottom-right"
        reverseOrder={false}
        toastOptions={{
          duration: 1500,
        }}
      />
    </ThemeProvider>
  );
}
