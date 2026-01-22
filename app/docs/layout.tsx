import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import type { ReactNode } from "react";

const poppins = Poppins({
  weight: "500",
  subsets: ["latin"],
  display: "swap",
  preload: true,
  fallback: ["system-ui", "arial"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | EternalCode.pl",
    default: "Documentation | EternalCode.pl",
  },
  description: "Comprehensive documentation for EternalCode.pl projects and services",
};

import { FacadePattern } from "@/components/ui/facade-pattern";

export default function DocsLayout({ children }: { children: ReactNode }) {
  return (
    <div
      className={`${poppins.className} relative min-h-screen bg-gray-50 antialiased transition-colors duration-200 dark:bg-gray-950`}
      style={{
        contain: "layout style paint",
      }}
    >
      {/* Background Decor */}
      <div
        className="pointer-events-none absolute inset-0 z-0 select-none overflow-hidden"
        style={{
          contain: "strict",
          contentVisibility: "auto",
        }}
      >
        <div
          className="absolute top-0 left-[-10%] h-150 w-150 rounded-full bg-indigo-500/10 mix-blend-multiply blur-3xl filter dark:bg-indigo-500/5 dark:mix-blend-screen"
          style={{ willChange: "transform" }}
        />
        <div
          className="absolute right-[-10%] bottom-0 h-150 w-150 rounded-full bg-cyan-500/10 mix-blend-multiply blur-3xl filter dark:bg-cyan-500/5 dark:mix-blend-screen"
          style={{ willChange: "transform" }}
        />
        <FacadePattern className="absolute inset-0 h-full opacity-30 dark:opacity-10" />
      </div>

      {children}
    </div>
  );
}
