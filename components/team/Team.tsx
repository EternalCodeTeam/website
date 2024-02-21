"use client";

import React, { useEffect, useState } from "react";
import SectionTitle from "@/components/SectionTitle";
import Image from "next/image";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import GitHubIcon from "../icons/github";
import LinkedinIcon from "../icons/linkedin";

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

export default function Team() {
  const [members, setMembers] = useState<Member[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await fetch("/api/team");

        if (!response.ok) {
          throw new Error("Failed to fetch team members");
        }

        const data = await response.json();

        if (data && data.data) {
          setMembers(data.data);
        } else {
          throw new Error("Invalid data structure in API response");
        }
      } catch (error) {
        const err = error as Error;
        setError(err.message);
        console.error("Error fetching team members:", err);
      }
    };

    fetchMembers();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <section id="team">
      <div className="mx-auto max-w-screen-xl px-4 py-16">
        <SectionTitle
          title="Our Team"
          description="EternalCodeTeam is a dedicated group of creative programmers who work on unique open source projects."
        />

        <div
          className={`mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4`}
        >
          {members.map((member, index) => (
            <TeamMember
              key={member.id}
              member={member.attributes}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export function TeamMember({ member, index }: TeamMemberProps) {
  const controls = useAnimation();
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      controls.start({ opacity: 1, y: 0 });
    }
  }, [controls, inView]);

  return (
    <motion.div
      key={index}
      className="text-center text-gray-500 dark:text-gray-400"
      initial={{ opacity: 0, y: 30 }}
      animate={controls}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      ref={ref}
    >
      <Image
        className="mx-auto mb-4 h-36 w-36 rounded-full"
        src={member.avatar_url}
        alt={`${member.name} Avatar`}
        title={member.name}
        width={144}
        height={144}
      />

      <h3 className="mb-1 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {member.name}
      </h3>

      {member.team_roles.data.map((role, roleIndex) => (
        <p key={roleIndex}>{role.attributes.name}</p>
      ))}

      <ul className="mt-4 flex justify-center space-x-4">
        {member.github && (
          <li>
            <a
              href={member.github}
              className="transition duration-500 hover:text-gray-900 dark:hover:text-white"
            >
              <GitHubIcon />
            </a>
          </li>
        )}

        {member.linkedin && (
          <li>
            <a
              href={member.linkedin}
              className="transition duration-500 hover:text-gray-900 dark:hover:text-white"
            >
              <LinkedinIcon />
            </a>
          </li>
        )}
      </ul>
    </motion.div>
  );
}
