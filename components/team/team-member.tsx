import { Github, Linkedin } from "lucide-react";
import Image from "next/image";
import type { TeamMemberProps } from "./types";

export default function TeamMember({ member, eager = false }: TeamMemberProps) {
  const githubUsername = member.github?.split("/").pop() ?? "GitHub";
  const linkedinUsername = member.linkedin?.split("/").filter(Boolean).pop() ?? "LinkedIn";

  return (
    <article className="team-member-profile">
      <div className="team-member-avatar">
        <Image
          alt=""
          fill
          loading={eager ? "eager" : "lazy"}
          sizes="96px"
          src={member.avatar_url}
        />
      </div>

      <div className="team-member-body">
        <h3>{member.name}</h3>

        <div className="team-member-roles">
          {member.team_roles.map((role) => (
            <span key={role.name}>{role.name}</span>
          ))}
        </div>

        <div className="team-member-socials">
          {!!member.github && (
            <a href={member.github} rel="noopener noreferrer" target="_blank">
              <Github aria-hidden="true" /> @{githubUsername}
            </a>
          )}
          {!!member.linkedin && (
            <a href={member.linkedin} rel="noopener noreferrer" target="_blank">
              <Linkedin aria-hidden="true" /> {linkedinUsername}
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
