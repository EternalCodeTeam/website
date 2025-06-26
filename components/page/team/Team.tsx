"use client";

import React, { useEffect, useState } from "react";

import AnimatedContainer from "@/components/animations/AnimatedContainer";
import AnimatedElement from "@/components/animations/AnimatedElement";
import AnimatedSection from "@/components/animations/AnimatedSection";
import SectionTitle from "@/components/SectionTitle";

import TeamError from "./TeamError";
import TeamMember from "./TeamMember";
import { fetchTeamMembers } from "./teamService";
import TeamSkeleton from "./TeamSkeleton";
import { Member } from "./types";

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
      }
      catch (error) {
        const err = error as Error;
        setError(err.message);
        console.error("Error fetching team members:", err);
      }
      finally {
        setLoading(false);
      }
    };

    loadTeamMembers();
  }, []);

  if (loading) {
    return <TeamSkeleton />;
  }

  if (error) {
    return <TeamError error={error} />;
  }

  return (
    <AnimatedSection id="team" animationType="fadeUp">
      <div className="mx-auto max-w-screen-xl px-4 py-16">
        <AnimatedElement as="div" animationType="fadeDown" delay={0.1}>
          <SectionTitle
            title="Our Team"
            description="EternalCodeTeam is a dedicated group of creative programmers who work on unique open source projects."
          />
        </AnimatedElement>

        {/* Grid of team members with staggered animation */}
        <AnimatedContainer
          className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
          staggerDelay={0.18}
        >
          {members.map((member, index) => (
            <TeamMember key={member.id} member={member.attributes} index={index} />
          ))}
        </AnimatedContainer>
      </div>
    </AnimatedSection>
  );
}
