import type { Metadata } from "next";
import { generateOgImageMetadata } from "@/components/og-image";
import ContributeView from "./contribute-view";

export const metadata: Metadata = {
  title: "Contribute | EternalCode",
  description:
    "Join the EternalCode community and make an impact. Contribute code to our open source projects, support us financially, help with documentation, or assist users on Discord.",
  alternates: {
    canonical: "https://eternalcode.pl/contribute",
  },
  ...generateOgImageMetadata({
    title: "Contribute",
    subtitle: "Join the EternalCode community",
  }),
};

const ways = [
  {
    id: "code",
    title: "Code",
    description:
      "Pick an issue, open a pull request, and ship features that thousands of Minecraft servers run in production. Java, Kotlin, or TypeScript — there is always something to build.",
    icon: "Code2",
    tags: ["Java", "TypeScript", "Code review"],
    actionText: "Browse the organization",
    href: "https://github.com/EternalCodeTeam",
    glow: { primary: "#34d399", secondary: "#059669" },
  },
  {
    id: "docs",
    title: "Documentation",
    description:
      "Turn confusing configuration into clear guides. Fix a typo, add a real-world example, or explain one tricky concept — no Java knowledge required.",
    icon: "BookOpen",
    tags: ["MDX", "Guides", "Examples"],
    actionText: "Read the docs",
    href: "/docs",
    glow: { primary: "#fbbf24", secondary: "#d97706" },
  },
  {
    id: "community",
    title: "Community",
    description:
      "Answer questions on Discord, report bugs with useful detail, and share feedback from your server. A good bug report saves maintainers hours of guessing.",
    icon: "MessageCircle",
    tags: ["Discord", "Bug reports", "Feedback"],
    actionText: "Join our Discord",
    href: "https://discord.com/invite/FQ7jmGBd6c",
    glow: { primary: "#818cf8", secondary: "#6366f1" },
  },
  {
    id: "sponsor",
    title: "Sponsor",
    description:
      "Open source runs on free time. Sponsorships cover infrastructure and give maintainers more evenings to spend on features instead of day jobs.",
    icon: "Heart",
    tags: ["Ko-fi", "Infrastructure", "Sustainability"],
    actionText: "Support on Ko-fi",
    href: "https://ko-fi.com/eternalcodeteam",
    glow: { primary: "#fb7185", secondary: "#e11d48" },
  },
] as const;

export default function ContributePage() {
  return <ContributeView ways={ways} />;
}
