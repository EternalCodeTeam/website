import type { Metadata } from "next";
import { generateOgImageMetadata } from "@/components/og-image";
import ContributeView from "./contribute-view";

export const metadata: Metadata = {
  title: "Contribute | EternalCode",
  description:
    "Join the EternalCode community. Contribute code, support us financially, or help with documentation and support.",
  ...generateOgImageMetadata({
    title: "Contribute",
    subtitle: "Join the EternalCode community",
  }),
};

interface CardData {
  id: string;
  title: string;
  description: string;
  icon: string;
  actionText: string;
  href: string;
  color: string;
}

export default function ContributePage() {
  const cards: CardData[] = [
    {
      id: "code",
      title: "Code",
      description:
        "Help us build the future by contributing to our open-source repositories and core libraries.",
      icon: "Code2",
      actionText: "View GitHub",
      href: "https://github.com/EternalCodeTeam",
      color: "#3b82f6",
    },
    {
      id: "sponsor",
      title: "Sponsor",
      description:
        "Support our work financially via Ko-fi to help us maintain infrastructure and cover costs.",
      icon: "Heart",
      actionText: "Support on Ko-fi",
      href: "https://ko-fi.com/eternalcodeteam",
      color: "#ec4899",
    },
    {
      id: "discord",
      title: "Community",
      description:
        "Join our Discord server to discuss ideas, help others, and stay updated with our progress.",
      icon: "MessageCircle",
      actionText: "Join Discord",
      href: "https://discord.com/invite/FQ7jmGBd6c",
      color: "#5865F2",
    },
    {
      id: "docs",
      title: "Documentation",
      description:
        "Help us improve our guides and API references to make our tools accessible to everyone.",
      icon: "BookOpen",
      actionText: "Read Docs",
      href: "/docs",
      color: "#10b981",
    },
    {
      id: "support",
      title: "Support",
      description:
        "Are you an expert in our tools? Help other users by answering questions on our Discord.",
      icon: "LifeBuoy",
      actionText: "Help Others",
      href: "https://discord.com/invite/FQ7jmGBd6c",
      color: "#f59e0b",
    },
    {
      id: "ideas",
      title: "Suggest Idea",
      description:
        "Have a great idea for a new feature? Share it with us by opening an issue on GitHub.",
      icon: "Lightbulb",
      actionText: "Open Issue",
      href: "https://github.com/EternalCodeTeam/",
      color: "#eab308",
    },
  ];

  return <ContributeView cards={cards} />;
}
