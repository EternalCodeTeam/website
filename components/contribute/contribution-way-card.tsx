import { ArrowUpRight } from "lucide-react";
import type { CSSProperties } from "react";
import { LucideIcon } from "@/components/lucide-icon";

export interface ContributionWayGlow {
  primary: string;
  secondary: string;
}

export interface ContributionWayData {
  id: string;
  title: string;
  description: string;
  icon: string;
  tags: readonly string[];
  actionText: string;
  href: string;
  glow: ContributionWayGlow;
}

export function ContributionWayCard({ way }: { way: ContributionWayData }) {
  const external = way.href.startsWith("http");

  return (
    <article
      className="contribute-way"
      data-glow-card
      style={
        {
          "--way-primary": way.glow.primary,
          "--way-secondary": way.glow.secondary,
        } as CSSProperties
      }
    >
      <div className="contribute-way-icon">
        <LucideIcon aria-hidden="true" name={way.icon} />
      </div>

      <h3>{way.title}</h3>
      <p>{way.description}</p>

      <div className="contribute-way-tags">
        {way.tags.map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </div>

      <a
        className="contribute-way-link"
        href={way.href}
        rel={external ? "noopener noreferrer" : undefined}
        target={external ? "_blank" : undefined}
      >
        <span className="sr-only">Open </span>
        {way.actionText} <ArrowUpRight aria-hidden="true" />
      </a>
    </article>
  );
}
