"use client";

import { motion } from "framer-motion";
import { HelpCircle, Sparkles } from "lucide-react";
import Link from "next/link";
import { ContributeHero } from "@/components/contribute/contribute-hero";
import { LucideIcon } from "@/components/lucide-icon";
import { Button } from "@/components/ui/button";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring" as const,
      stiffness: 100,
    },
  },
};

function ContributionCard({
  icon,
  title,
  description,
  actionText,
  href,
  color,
}: {
  icon: string;
  title: string;
  description: string;
  actionText: string;
  href: string;
  color: string;
}) {
  return (
    <motion.div
      className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 shadow-xl transition-colors transition-shadow duration-300 hover:shadow-2xl dark:border-gray-800 dark:bg-gray-950/50"
      variants={itemVariants}
      whileHover={{ borderColor: color }}
    >
      <div className="relative z-10 flex h-full flex-col">
        <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100 transition-transform duration-300 group-hover:scale-110 dark:bg-gray-900">
          <LucideIcon className="h-6 w-6" name={icon} style={{ color }} />
        </div>

        <h3 className="mb-2 font-bold text-gray-900 text-xl dark:text-white">{title}</h3>

        <p className="mb-6 flex-grow text-gray-600 dark:text-gray-400">{description}</p>

        <Button
          className="w-full"
          href={href}
          // biome-ignore lint/nursery/noLeakedRender: undefined is correct
          rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
          // biome-ignore lint/nursery/noLeakedRender: undefined is correct
          target={href.startsWith("http") ? "_blank" : undefined}
          variant="primary"
        >
          {actionText}
        </Button>
      </div>

      <div className="-right-12 -top-12 absolute h-64 w-64 rounded-full bg-gradient-to-br from-white/5 to-white/10 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />
    </motion.div>
  );
}

// Define the type for card data from CMS
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
          <div className="py-20 text-center">
            <Sparkles className="mx-auto mb-6 h-16 w-16 text-gray-400 dark:text-gray-600" />
            <h3 className="mb-3 font-semibold text-2xl text-gray-900 dark:text-white">
              No contributions available yet
            </h3>
            <p className="text-gray-600 text-lg dark:text-gray-400">
              We are currently updating our contribution opportunities. Please check back soon!
            </p>
          </div>
        )}

        <motion.div
          animate={{ opacity: 1 }}
          className="mt-20 text-center"
          initial={{ opacity: 0 }}
          transition={{ delay: 0.8 }}
        >
          <div className="inline-flex items-center rounded-full border border-gray-200 bg-white px-6 py-2 shadow-xs dark:border-gray-800 dark:bg-gray-900/50">
            <HelpCircle className="mr-2 h-4 w-4 text-gray-500" />
            <span className="text-gray-600 text-sm dark:text-gray-400">
              Not sure where to start? Check our{" "}
              <Link className="text-blue-500 hover:underline" href="/team">
                Team page
              </Link>{" "}
              to see who's building this.
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
