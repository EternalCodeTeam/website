"use client";
import { ContributeHero } from "@/components/contribute/contribute-hero";
import { ContributionCard } from "@/components/contribute/contribution-card";
import { ContributionEmptyState } from "@/components/contribute/contribution-empty-state";
import { ContributionHint } from "@/components/contribute/contribution-hint";
import { MotionSection } from "@/components/ui/motion/motion-components";

export interface ContributionCardData {
  id?: string | null;
  title: string;
  description: string;
  icon?: string | null;
  actionText: string;
  href: string;
  color: string;
}

export default function ContributeView({ cards }: { cards: ContributionCardData[] }) {
  return (
    <div className="relative z-10 min-h-screen overflow-hidden bg-gray-50 pt-28 md:pt-32 dark:bg-[#0a0a0a]">
      {/* Background decoration */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-[20%] -left-[10%] h-[500px] w-[500px] rounded-full bg-purple-500/10 blur-[100px]" />
        <div className="absolute top-[50%] -right-[10%] h-[500px] w-[500px] rounded-full bg-blue-500/10 blur-[100px]" />
      </div>

      <ContributeHero />

      <div className="relative z-10 mx-auto max-w-[90rem] px-4 pb-24 sm:px-6 lg:px-8">
        {cards.length > 0 ? (
          <MotionSection className="grid gap-8 md:grid-cols-2 lg:grid-cols-3" stagger={0.1}>
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
          </MotionSection>
        ) : (
          <ContributionEmptyState />
        )}

        <ContributionHint />
      </div>
    </div>
  );
}
