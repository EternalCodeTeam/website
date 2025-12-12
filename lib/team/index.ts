import { cache } from "react";
import { getPayloadClient } from "../payload/client";
import type { TeamMember } from "@/payload-types";
import type { Member, RoleSection } from "@/components/team/types";

export const getTeamData = cache(async (): Promise<RoleSection[]> => {
  const payload = await getPayloadClient();

  // Fetch roles sorted by priority
  const { docs: roles } = await payload.find({
    collection: "team-roles",
    sort: "priority",
    limit: 100,
  });

  // Fetch all members
  const { docs: members } = await payload.find({
    collection: "team-members",
    limit: 100,
    sort: "name",
  });

  const mappedMembers: Member[] = members.map((doc: TeamMember) => ({
    documentId: String(doc.id),
    name: doc.name,
    avatar_url: doc.avatar || "",
    team_roles:
      doc.roles?.map((r) => {
        if (typeof r === "object" && r !== null) {
          return { name: r.name };
        }
        return { name: "" };
      }) || [],
    github: doc.github || undefined,
    linkedin: doc.linkedin || undefined,
  }));

  const sections: RoleSection[] = [];

  // Create sections based on defined roles
  for (const role of roles) {
    const roleMembers = mappedMembers.filter((m) => m.team_roles.some((r) => r.name === role.name));

    if (roleMembers.length > 0) {
      sections.push({
        name: role.name,
        description: role.description || undefined,
        priority: role.priority || 999,
        members: roleMembers,
      });
    }
  }

  // Handle members without roles or with undefined roles
  // Optional: Add a "Contributors" section for members not in any defined role
  const assignedMemberIds = new Set(sections.flatMap((s) => s.members.map((m) => m.documentId)));
  const unassignedMembers = mappedMembers.filter((m) => !assignedMemberIds.has(m.documentId));

  if (unassignedMembers.length > 0) {
    sections.push({
      name: "Contributors",
      description: "Passionate individuals dedicated to the EternalCode mission.",
      priority: 999,
      members: unassignedMembers,
    });
  }

  return sections;
});
