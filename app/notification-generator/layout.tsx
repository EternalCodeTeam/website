import { Metadata } from "next";
import "./minecraft-font.css";

export const metadata: Metadata = {
  title: "EternalCode Notification Generator",
  description:
    "Create and preview Minecraft notifications for EternalCode plugin",
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
