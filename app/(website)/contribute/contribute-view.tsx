"use client";

import { motion } from "framer-motion";
import { ContributeHero } from "@/components/contribute/contribute-hero";
import { ContributionHint } from "@/components/contribute/contribution-hint";
import { ContributionEmptyState } from "@/components/contribute/contribution-empty-state";
import { ContributionCard } from "@/components/contribute/contribution-card";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export type ContributionCardData = {
  id?: string | null;
  title: string;
  description: string;
  icon?: string | null;
  actionText: string;
  href: string;
  color: string;
};

export default function ContributeView({ cards }: { cards: ContributionCardData[] }) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gray-50 dark:bg-[#0a0a0a]">
      {/* Background decoration */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="-left-[10%] absolute top-[20%] h-[500px] w-[500px] rounded-full bg-purple-500/10 blur-[100px]" />
        <div className="-right-[10%] absolute top-[50%] h-[500px] w-[500px] rounded-full bg-blue-500/10 blur-[100px]" />
      </div>

      <ContributeHero />

      <div className="relative z-10 mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        {cards.length > 0 ? (
          <motion.div
            animate="visible"
            className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
            initial="hidden"
            variants={containerVariants}
          >
            {cards.map((card, index) => (
              <ContributionCard
                actionText={card.actionText}
                color={card.color}
                description={card.description}
                href={card.href}
                icon={card.icon || "HelpCircle"}
                key={card.id || index}
                title={card.title}
              />
            ))}
          </motion.div>
        ) : (
          <ContributionEmptyState />
        )}

        <ContributionHint />
      </div>
    </div>
  );
}
