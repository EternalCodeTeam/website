import { ArrowUpRight, Github } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { getTeamData } from "@/lib/team";
import TeamMember from "./team-member";
import { TeamCounter, TeamReveal, TeamStaggerGrid, TeamStaggerItem } from "./team-motion";

import "./team.css";

function getSectionTitle(name: string) {
  if (name === "Team") {
    return "Core team";
  }

  return name.endsWith("s") ? name : `${name}s`;
}

export default async function Team() {
  const sections = await getTeamData();
  const rosterSections = sections.filter((section) => section.variant !== "contributors");
  const contributors = sections.find((section) => section.variant === "contributors");
  const memberCount = rosterSections.reduce((total, section) => total + section.members.length, 0);

  return (
    <>
      <section className="team-hero section-shell">
        <div aria-hidden="true" className="team-hero-glow" />

        <div className="team-hero-copy">
          <TeamReveal>
            <p className="page-kicker">Our team</p>
            <h1>
              The people behind <span>EternalCode</span>.
            </h1>
          </TeamReveal>
          <TeamReveal delay={0.12}>
            <p className="team-hero-lead">
              A small, distributed crew of developers, maintainers, and students building
              open-source tools for Minecraft servers. We review each other&apos;s code, argue about
              naming, and ship software that thousands of servers rely on every day.
            </p>
          </TeamReveal>
        </div>

        <TeamReveal className="team-hero-side" delay={0.2}>
          <a
            className="team-github-link"
            href="https://github.com/EternalCodeTeam"
            rel="noopener noreferrer"
            target="_blank"
          >
            <Github aria-hidden="true" /> EternalCode on GitHub
          </a>

          <dl className="team-hero-stats">
            <div>
              <dt>Team members</dt>
              <dd>
                <TeamCounter value={memberCount} />
              </dd>
            </div>
            {!!contributors && contributors.members.length > 0 && (
              <div>
                <dt>Contributors</dt>
                <dd>
                  <TeamCounter value={contributors.members.length} />
                </dd>
              </div>
            )}
          </dl>
        </TeamReveal>
      </section>

      <section className="team-roster section-shell" id="team-roster">
        {rosterSections.map((section, sectionIndex) => (
          <section className="team-roster-section" key={section.name}>
            <TeamReveal className="team-section-heading">
              <span aria-hidden="true" className="team-section-index">
                {String(sectionIndex + 1).padStart(2, "0")}
              </span>
              <h2>{getSectionTitle(section.name)}</h2>
              <p>{section.description}</p>
            </TeamReveal>

            <TeamStaggerGrid className="team-member-grid">
              {section.members.map((member, memberIndex) => (
                <TeamStaggerItem key={`${section.name}-${member.documentId || memberIndex}`}>
                  <TeamMember eager={sectionIndex === 0} member={member} />
                </TeamStaggerItem>
              ))}
            </TeamStaggerGrid>
          </section>
        ))}

        {!!contributors && (
          <section className="team-contributors">
            <TeamReveal className="team-contributors-copy">
              <p className="page-kicker">Contributors</p>
              <h2>Thank you for making the projects better.</h2>
              <p>{contributors.description}</p>
            </TeamReveal>
            <TeamStaggerGrid className="team-contributor-list">
              {contributors.members.map((member, index) => (
                <TeamStaggerItem key={member.documentId}>
                  <a
                    aria-label={`View ${member.name}'s GitHub profile`}
                    href={member.github}
                    rel="noopener noreferrer"
                    target="_blank"
                    title={member.name}
                  >
                    <Image
                      alt=""
                      height={72}
                      loading={index > 10 ? "lazy" : undefined}
                      src={member.avatar_url}
                      width={72}
                    />
                    <span>{member.name}</span>
                  </a>
                </TeamStaggerItem>
              ))}
            </TeamStaggerGrid>
          </section>
        )}

        {sections.length === 0 && (
          <p className="team-empty">No team members yet. Check back soon.</p>
        )}
      </section>

      <TeamReveal className="team-join section-shell">
        <div>
          <p className="page-kicker">Want to help?</p>
          <h2>You do not need a title to contribute.</h2>
          <p>
            Fix a bug, improve the docs, test a release, or start a useful discussion — every
            contribution counts, no matter how small.
          </p>
        </div>
        <Link href="/contribute">
          See how to contribute <ArrowUpRight aria-hidden="true" />
        </Link>
      </TeamReveal>
    </>
  );
}
