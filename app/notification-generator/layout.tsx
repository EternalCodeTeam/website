import type { Metadata } from "next";

import "@/components/notification-generator/preview/minecraft-font.css";

import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Notification Generator | Minecraft Plugin Tool",
  description:
    "Create and preview Minecraft notifications for EternalCode plugin. Generate YAML code for chat messages, titles, action bars, and sounds.",
  keywords:
    "Minecraft, EternalCode, notification generator, plugin, YAML, chat, title, action bar, sound",
  openGraph: {
    title: "Notification Generator",
    description: "Create and preview Minecraft notifications for EternalCode plugin",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Notification Generator",
    description: "Create and preview Minecraft notifications for EternalCode plugin",
  },
  robots: {
    index: true,
    follow: true,
  },
};

import { FacadePattern } from "@/components/ui/facade-pattern";

export default function NotificationGeneratorLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative z-10 min-h-screen overflow-hidden bg-gray-50 pt-28 text-gray-900 md:pt-32 dark:bg-gray-950 dark:text-white">
      {/* Background Decor */}
      <div className="pointer-events-none absolute inset-0 z-0 select-none">
        <div className="absolute -top-20 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-blue-500/10 blur-3xl filter dark:bg-blue-500/5" />
        <div className="absolute top-[40%] left-0 h-[800px] w-[800px] -translate-x-1/3 rounded-full bg-purple-500/10 mix-blend-multiply blur-3xl filter dark:bg-purple-500/5 dark:mix-blend-screen" />
        <div className="absolute right-0 bottom-0 h-[600px] w-[600px] translate-x-1/3 rounded-full bg-cyan-500/10 mix-blend-multiply blur-3xl filter dark:bg-cyan-500/5 dark:mix-blend-screen" />

        <FacadePattern className="absolute inset-0 h-full opacity-30 dark:opacity-10" />
      </div>

      <div className="relative z-10 mx-auto min-h-screen max-w-(--breakpoint-xl) px-4 py-8 pt-32 antialiased">
        {children}
      </div>
    </div>
  );
}
