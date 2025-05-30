import { Metadata } from "next";
import "../../components/notification-generator/minecraft-font.css";

export const metadata: Metadata = {
  title: "EternalCode Notification Generator | Minecraft Plugin Tool",
  description:
    "Create and preview Minecraft notifications for EternalCode plugin. Generate YAML code for chat messages, titles, action bars, and sounds.",
  keywords: "Minecraft, EternalCode, notification generator, plugin, YAML, chat, title, action bar, sound",
  openGraph: {
    title: "EternalCode Notification Generator",
    description: "Create and preview Minecraft notifications for EternalCode plugin",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "EternalCode Notification Generator",
    description: "Create and preview Minecraft notifications for EternalCode plugin",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function NotificationGeneratorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative mx-auto min-h-screen max-w-screen-xl px-4 py-8 pt-32">
      {children}
    </div>
  );
}
