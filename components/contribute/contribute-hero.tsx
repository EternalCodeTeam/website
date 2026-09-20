import { ArrowRight, Github } from "lucide-react";
import { ContributeReveal } from "./contribute-motion";

export function ContributeHero() {
  return (
    <header className="contribute-hero section-shell">
      <div aria-hidden="true" className="contribute-hero-glow" />

      <div className="contribute-hero-copy">
        <ContributeReveal>
          <p className="page-kicker">Contribute</p>
          <h1>
            Build EternalCode <span>with us</span>.
          </h1>
        </ContributeReveal>
        <ContributeReveal delay={0.12}>
          <p className="contribute-hero-lead">
            Our plugins run on thousands of Minecraft servers, and every line of them was written by
            someone who decided to help. Code, docs, answers, or a cup of coffee — pick the
            contribution that fits you.
          </p>
        </ContributeReveal>
        <ContributeReveal className="contribute-hero-actions" delay={0.2}>
          <a className="contribute-primary-action" href="#contribute-ways">
            Find your way to help <ArrowRight aria-hidden="true" />
          </a>
          <a
            className="contribute-secondary-action"
            href="https://github.com/EternalCodeTeam"
            rel="noopener noreferrer"
            target="_blank"
          >
            <Github aria-hidden="true" /> GitHub
          </a>
        </ContributeReveal>
      </div>
    </header>
  );
}
