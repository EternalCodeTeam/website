"use client";

import { m } from "framer-motion";
import { LucideIcon } from "@/components/lucide-icon";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1],
    },
  },
} as const;

interface ContributionCardProps {
  icon: string;
  title: string;
  description: string;
  actionText: string;
  href: string;
  color: string;
}

export function ContributionCard({
  icon,
  title,
  description,
  actionText,
  href,
  color,
}: ContributionCardProps) {
  const external = href.startsWith("http");

  return (
    <m.div className="h-full" variants={itemVariants}>
      <Card className="group flex h-full flex-col p-6 transition-colors duration-300 hover:bg-gray-50 hover:shadow-md dark:hover:bg-gray-800/60">
        <div
          className="pointer-events-none absolute inset-0 bg-linear-to-br opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background: `linear-gradient(to bottom right, ${color}20, ${color}40)`,
          }}
        />

        <div className="relative z-10 flex h-full flex-col">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-gray-50 shadow-inner ring-1 ring-gray-200 transition-colors group-hover:bg-white dark:bg-gray-800 dark:ring-gray-700 dark:group-hover:bg-gray-700">
            <LucideIcon
              className="h-6 w-6 transform-gpu transition-transform duration-300 will-change-transform group-hover:scale-110"
              name={icon}
              style={{ color }}
            />
          </div>

          <h3 className="mb-2 font-bold text-gray-900 text-xl dark:text-white">{title}</h3>

          <p className="mb-6 grow text-gray-600 dark:text-gray-400">{description}</p>

          <Button
            className="w-full"
            href={href}
            target={external ? "_blank" : undefined}
            variant="primary"
          >
            {actionText}
          </Button>
        </div>
      </Card>
    </m.div>
  );
}
