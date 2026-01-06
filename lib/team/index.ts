import { cache } from "react";
import type { Member, RoleSection } from "@/components/team/types";
import { getContributors } from "@/lib/github";

export const getTeamData = cache(async (): Promise<RoleSection[]> => {
  const teamMembers: Member[] = [
    {
      documentId: "1",
      name: "Cyprian K",
      avatar_url: "https://avatars.githubusercontent.com/u/43166542?v=4",
      team_roles: [{ name: "Founder" }, { name: "Lead Developer" }],
      github: "https://github.com/vluck77",
      linkedin: undefined,
    },
    {
      documentId: "2",
      name: "Martin",
      avatar_url: "https://avatars.githubusercontent.com/u/60662243?v=4",
      team_roles: [{ name: "Project Manager" }, { name: "Developer" }],
      github: "https://github.com/vhypn0",
      linkedin: undefined,
    },
    {
      documentId: "3",
      name: "Piotr",
      avatar_url: "https://avatars.githubusercontent.com/u/53056157?v=4",
      team_roles: [{ name: "Developer" }],
      github: "https://github.com/PiotrKotnowski",
      linkedin: undefined,
    },
  ];

  const sections: RoleSection[] = [
    {
      name: "Core Team",
      description: "The minds behind EternalCode.",
      priority: 1,
      members: teamMembers,
    },
  ];

  try {
    const repos = [
      "EternalCodeTeam/website",
      "EternalCodeTeam/EternalCore",
      "EternalCodeTeam/EternalCombat",
      "EternalCodeTeam/ChatFormatter",
    ];
    const contributors = await getContributors(repos);

    if (contributors.length > 0) {
      const contributorMembers: Member[] = contributors.map((c) => ({
        documentId: `gh-${c.id}`,
        name: c.login,
        avatar_url: c.avatar_url,
        team_roles: [],
        github: c.html_url,
      }));

      sections.push({
        name: "Contributors",
        description: "Passionate individuals dedicated to the EternalCode mission.",
        priority: 1000,
        members: contributorMembers,
        variant: "contributors",
      });
    }
  } catch (e) {
    console.error("Failed to load contributors", e);
  }

  return sections;
});
