// eslint-disable-next-line import/order
import { Metadata } from "next";

import "../../components/notification-generator/preview/minecraft-font.css";

import { ReactNode } from "react";

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

export default function NotificationGeneratorLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative mx-auto min-h-screen max-w-screen-xl bg-lightGray-100 px-4 py-8 pt-32 antialiased dark:bg-gray-900">
      {children}
    </div>
  );
}
