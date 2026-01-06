import ContributeView from "./contribute-view";

export const metadata = {
  title: "Contribute | EternalCode",
  description:
    "Join the EternalCode community. Contribute code, support us financially, or help with documentation and support.",
};

// Define the type locally since we removed payload-types-generated
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
  // Static data replacement
  const cards: CardData[] = [
    {
      id: "1",
      title: "Code",
      description: "Help us build the future of our projects by contributing code.",
      icon: "Code2",
      actionText: "Check Repositories",
      href: "https://github.com/EternalCodeTeam",
      color: "#3b82f6",
    },
    {
      id: "2",
      title: "Discord",
      description: "Join our community to discuss ideas, get help, and hang out.",
      icon: "MessageCircle",
      actionText: "Join Discord",
      href: "https://discord.gg/eternalcode",
      color: "#5865F2",
    },
    {
      id: "3",
      title: "Sponsor",
      description: "Support our work financially to help us keep the servers running.",
      icon: "Heart",
      actionText: "Sponsor Us",
      href: "https://github.com/sponsors/EternalCodeTeam",
      color: "#ec4899",
    },
  ];

  return <ContributeView cards={cards} />;
}
