import { ArrowUpRight } from "lucide-react";
import { ContributeHero } from "@/components/contribute/contribute-hero";
import { ContributeIssues } from "@/components/contribute/contribute-issues";
import {
  ContributeReveal,
  ContributeStaggerGrid,
  ContributeStaggerItem,
} from "@/components/contribute/contribute-motion";
import {
  ContributionWayCard,
  type ContributionWayData,
} from "@/components/contribute/contribution-way-card";
import { CursorGlow } from "@/components/ui/cursor-glow";
import { getGoodFirstIssues } from "@/lib/contribute";

import "@/components/contribute/contribute.css";

interface ContributeViewProps {
  ways: readonly ContributionWayData[];
}

export default async function ContributeView({ ways }: ContributeViewProps) {
  const issues = await getGoodFirstIssues();

  return (
    <div className="contribute-page">
      <ContributeHero />

      <section className="contribute-ways section-shell" id="contribute-ways">
        <ContributeReveal className="contribute-ways-heading">
          <p className="page-kicker">Ways to help</p>
          <h2>Every contribution counts.</h2>
          <p>
            There is no application process and no minimum commitment. Pick the path that matches
            your skills and your schedule — you can always try another one later.
          </p>
        </ContributeReveal>

        <CursorGlow>
          <ContributeStaggerGrid className="contribute-ways-grid">
            {ways.map((way) => (
              <ContributeStaggerItem key={way.id}>
                <ContributionWayCard way={way} />
              </ContributeStaggerItem>
            ))}
          </ContributeStaggerGrid>
        </CursorGlow>
      </section>

      <ContributeIssues issues={issues} />

      <section className="contribute-join section-shell">
        <ContributeReveal className="contribute-join-inner">
          <div>
            <p className="page-kicker">Built in public</p>
            <h2>Want to see the team you will work with?</h2>
            <p>
              We are a small group of friends and contributors. Say hello, ask questions, and find
              out where you fit in.
            </p>
          </div>
          <div className="contribute-join-actions">
            <a
              className="contribute-primary-action"
              href="https://github.com/EternalCodeTeam"
              rel="noopener noreferrer"
              target="_blank"
            >
              Meet us on GitHub <ArrowUpRight aria-hidden="true" />
            </a>
            <a
              className="contribute-secondary-action"
              href="https://discord.com/invite/FQ7jmGBd6c"
              rel="noopener noreferrer"
              target="_blank"
            >
              Join the Discord
            </a>
          </div>
        </ContributeReveal>
      </section>
    </div>
  );
}
