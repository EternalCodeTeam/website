"use client";

import { ThemeProvider } from "next-themes";
import { ReactNode, useEffect, useState, useCallback } from "react";

interface ProvidersProps {
  children: ReactNode;
}

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
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      {children}
    </ThemeProvider>
  );
}
