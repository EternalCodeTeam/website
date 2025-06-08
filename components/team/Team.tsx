"use client";

import React, { useEffect, useState } from "react";
import SectionTitle from "@/components/SectionTitle";
import Image from "next/image";
import { motion } from "framer-motion";
import GitHubIcon from "../icons/github";
import LinkedinIcon from "../icons/linkedin";
import AnimatedSection from "@/components/animations/AnimatedSection";
import AnimatedElement from "@/components/animations/AnimatedElement";
import AnimatedContainer from "@/components/animations/AnimatedContainer";

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 60,
      damping: 16,
      mass: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const cardHover = {
  scale: 1.03,
  boxShadow: "0 8px 32px 0 rgba(31, 41, 55, 0.12)",
  transition: { type: "spring", stiffness: 300, damping: 18 },
};

const avatarHover = {
  scale: 1.08,
  transition: { type: "spring", stiffness: 300, damping: 18 },
};

const iconHover = {
  scale: 1.18,
  color: "#2563eb",
  transition: { type: "spring", stiffness: 400, damping: 15 },
};

interface TeamRole {
  attributes: {
    name: string;
  };
}

interface MemberData {
  avatar_url: string;
  name: string;
  team_roles: {
    data: TeamRole[];
  };
  github?: string;
  linkedin?: string;
}

interface TeamMemberProps {
  member: MemberData;
  index: number;
}

interface Member {
  id: string;
  attributes: {
    avatar_url: string;
    name: string;
    team_roles: {
      data: TeamRole[];
    };
    github?: string;
    linkedin?: string;
  };
}

interface StrapiResponse {
  data: Member[];
  meta?: any;
}

export default function Team() {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/team", {
          headers: { Accept: "application/json" },
        });
        if (!response.ok) {
          throw new Error(`Failed to fetch team members: ${response.status}`);
        }
        const data = (await response.json()) as StrapiResponse;
        if (data && Array.isArray(data.data)) {
          setMembers(data.data);
        } else {
          throw new Error("Invalid data structure in API response");
        }
      } catch (error) {
        const err = error as Error;
        setError(err.message);
        console.error("Error fetching team members:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchMembers();
  }, []);

  if (loading) {
    return (
      <AnimatedSection id="team" animationType="fadeUp">
        <div className="mx-auto max-w-screen-xl px-4 py-16">
          <AnimatedElement as="div" animationType="fadeDown" delay={0.1}>
            <SectionTitle
              title="Our Team"
              description="EternalCodeTeam is a dedicated group of creative programmers who work on unique open source projects."
            />
          </AnimatedElement>
          <AnimatedContainer className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4" staggerDelay={0.18}>
            {[...Array(8)].map((_, index) => (
              <AnimatedElement
                key={index}
                as="div"
                animationType="fadeUp"
                interactive={false}
                style={{ minHeight: 320 }}
              >
                <div className="mx-auto mb-4 h-36 w-36 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                <div className="mx-auto mb-2 h-6 w-3/4 rounded bg-gray-200 dark:bg-gray-700"></div>
                <div className="mx-auto mb-4 h-4 w-1/2 rounded bg-gray-200 dark:bg-gray-700"></div>
                <div className="mt-4 flex justify-center space-x-4">
                  <div className="h-6 w-6 rounded bg-gray-200 dark:bg-gray-700"></div>
                  <div className="h-6 w-6 rounded bg-gray-200 dark:bg-gray-700"></div>
                </div>
              </AnimatedElement>
            ))}
          </AnimatedContainer>
        </div>
      </AnimatedSection>
    );
  }

  if (error) {
    return (
      <AnimatedSection id="team" animationType="fadeUp">
        <div className="mx-auto max-w-screen-xl px-4 py-16">
          <div className="flex h-64 items-center justify-center">
            <div className="text-xl text-red-500">Error: {error}</div>
          </div>
        </div>
      </AnimatedSection>
    );
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
        <AnimatedContainer className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4" staggerDelay={0.18}>
          {members.map((member, index) => (
            <TeamMember
              key={member.id}
              member={member.attributes}
              index={index}
            />
          ))}
        </AnimatedContainer>
      </div>
    </AnimatedSection>
  );
}

export function TeamMember({ member, index }: TeamMemberProps) {
  return (
    <motion.div
      className="text-center text-gray-500 dark:text-gray-400"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      style={{ background: "transparent", boxShadow: "none", border: "none", padding: 0, cursor: "pointer" }}
    >
      <motion.div
        className="mx-auto mb-4 h-36 w-36 rounded-full overflow-hidden shadow-md"
        whileHover={avatarHover}
        transition={{ type: "spring", stiffness: 300, damping: 18 }}
      >
        <Image
          className="object-cover"
          src={member.avatar_url}
          alt={`${member.name} Avatar`}
          title={member.name}
          width={144}
          height={144}
        />
      </motion.div>
      <h3 className="mb-1 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {member.name}
      </h3>
      {member.team_roles.data.map((role, roleIndex) => (
        <p key={roleIndex}>{role.attributes.name}</p>
      ))}
      <ul className="mt-4 flex justify-center space-x-4">
        {member.github && (
          <motion.li whileHover={iconHover} whileTap={{ scale: 0.95 }}>
            <a
              href={member.github}
              className="transition duration-500 hover:text-blue-600 dark:hover:text-blue-400"
              target="_blank"
              rel="noopener noreferrer"
            >
              <GitHubIcon />
            </a>
          </motion.li>
        )}
        {member.linkedin && (
          <motion.li whileHover={iconHover} whileTap={{ scale: 0.95 }}>
            <a
              href={member.linkedin}
              className="transition duration-500 hover:text-blue-600 dark:hover:text-blue-400"
              target="_blank"
              rel="noopener noreferrer"
            >
              <LinkedinIcon />
            </a>
          </motion.li>
        )}
      </ul>
    </motion.div>
  );
}
