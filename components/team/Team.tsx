"use client";

import { useEffect, useMemo, useState } from "react";

import { SlideIn, StaggerContainer } from "@/components/ui/motion/motion-components";

import TeamError from "./team-error";
import TeamMember from "./team-member";
import { fetchTeamMembers } from "./team-service";
import TeamSkeleton from "./team-skeleton";
import type { Member } from "./types";

const EXPANDED_ROLE_DESCRIPTIONS: Record<string, string> = {
  "Team Lead":
    "The visionaries guiding our projects, setting the course, and ensuring our team performs at their absolute best.",
  "Team Developer":
    "The architects of our code, constructing the robust core and innovative features that power our ecosystem.",
  Student:
    "Aspiring developers learning and growing with us, contributing fresh perspectives and energy to the project.",
};

const DEFAULT_DESCRIPTION = "Passionate individuals dedicated to the EternalCode mission.";

const ROLE_PRIORITY = ["Team Lead", "Team Developer", "Student"];

function groupMembersByRole(members: Member[]) {
  const groups: Record<string, Member[]> = {};

  for (const member of members) {
    const roles = member.team_roles ?? [];

    if (roles.length === 0) {
      const defaultRole = "Contributor";
      if (!groups[defaultRole]) {
        groups[defaultRole] = [];
      }
      groups[defaultRole].push(member);
      continue;
    }

    for (const role of roles) {
      const roleName = role.name;
      if (!groups[roleName]) {
        groups[roleName] = [];
      }
      groups[roleName].push(member);
    }
  }

  return groups;
}

export default function Team() {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadTeamMembers = async () => {
      try {
        setLoading(true);
        const data = await fetchTeamMembers();
        setMembers(data);
      } catch (err) {
        const fetchError = err as Error;
        setError(fetchError.message);
        console.error("Error fetching team members:", fetchError);
      } finally {
        setLoading(false);
      }
    };

    loadTeamMembers();
  }, []);

  const groupedMembers = useMemo(() => groupMembersByRole(members), [members]);

  const sortedRoles = useMemo(
    () =>
      Object.keys(groupedMembers).sort((a, b) => {
        const prioA = ROLE_PRIORITY.indexOf(a);
        const prioB = ROLE_PRIORITY.indexOf(b);

        const isAInPriority = prioA !== -1;
        const isBInPriority = prioB !== -1;

        if (isAInPriority && isBInPriority) {
          return prioA - prioB;
        }
        if (isAInPriority) {
          return -1;
        }
        if (isBInPriority) {
          return 1;
        }

        return a.localeCompare(b);
      }),
    [groupedMembers]
  );

  if (loading) {
    return <TeamSkeleton />;
  }
  if (error) {
    return <TeamError error={error} />;
  }

  return (
    <section id="team">
      <div className="relative mx-auto max-w-(--breakpoint-xl) px-4 pt-4 pb-20">
        <div className="mt-8 space-y-20">
          {sortedRoles.map(
            (role) =>
              groupedMembers[role].length > 0 && (
                <div key={role}>
                  <SlideIn className="mb-8" direction="up">
                    <h2 className="font-bold text-2xl text-gray-900 dark:text-white">{role}s</h2>
                    <p className="mt-2 max-w-2xl text-base text-gray-600 dark:text-gray-400">
                      {EXPANDED_ROLE_DESCRIPTIONS[role] || DEFAULT_DESCRIPTION}
                    </p>
                  </SlideIn>

                  <StaggerContainer className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {groupedMembers[role].map((member, index) => (
                      <SlideIn
                        delay={index * 0.05}
                        direction="up"
                        key={`${role}-${member.documentId || index}`}
                      >
                        <TeamMember index={index} member={member} />
                      </SlideIn>
                    ))}
                  </StaggerContainer>
                </div>
              )
          )}

          {sortedRoles.length === 0 && !loading && (
            <div className="mt-12 text-center text-gray-500">No team members found.</div>
          )}
        </div>
      </div>
    </section>
  );
}
