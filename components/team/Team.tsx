"use client";

import { useEffect, useState } from "react";

import AnimatedContainer from "@/components/animations/AnimatedContainer";
import AnimatedElement from "@/components/animations/AnimatedElement";
import AnimatedSection from "@/components/animations/AnimatedSection";
import SectionTitle from "@/components/SectionTitle";

import TeamError from "./TeamError";
import TeamMember from "./TeamMember";
import { fetchTeamMembers } from "./teamService";
import TeamSkeleton from "./TeamSkeleton";
import type { Member } from "./types";

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
      } catch (error) {
        const err = error as Error;
        setError(err.message);
        console.error("Error fetching team members:", err);
      } finally {
        setLoading(false);
      }
    };

    loadTeamMembers();
  }, []);

  if (loading) return <TeamSkeleton />;
  if (error) return <TeamError error={error} />;

  return (
    <AnimatedSection id="team" animationType="fadeUp">
      <div className="relative mx-auto max-w-(--breakpoint-xl) px-4 py-20">
        <AnimatedElement as="div" animationType="fadeDown" delay={0.1}>
          <SectionTitle
            title="Meet the Team"
            description="EternalCodeTeam is a creative collective of open-source developers pushing the limits of Minecraft innovation."
          />
        </AnimatedElement>

        {/* Grid with nice hover effects and spacing */}
        <AnimatedContainer
          className="relative z-10 mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
          staggerDelay={0.15}
        >
          {members.map((member, index) => (
            <AnimatedElement
              key={member.documentId || index}
              animationType="fadeUp"
              delay={index * 0.05}
              className="transform transition duration-300 hover:scale-[1.03]"
            >
              <TeamMember member={member} index={index} />
            </AnimatedElement>
          ))}
        </AnimatedContainer>
      </div>
    </AnimatedSection>
  );
}
