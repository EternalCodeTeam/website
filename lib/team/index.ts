import { cache } from "react";
import type { Member, RoleSection } from "@/components/team/types";
import { getContributors } from "@/lib/github";

export const getTeamData = cache(async (): Promise<RoleSection[]> => {
  const leaders: Member[] = [
    {
      documentId: "rollczi",
      name: "Norbert Dejlich",
      avatar_url: "https://github.com/Rollczi.png",
      team_roles: [{ name: "Team Leader" }, { name: "Maintainer" }],
      github: "https://github.com/Rollczi",
    },
    {
      documentId: "vluckyyy",
      name: "Martin Sulikowski",
      avatar_url: "https://github.com/vLuckyyy.png",
      team_roles: [{ name: "Team Leader" }],
      github: "https://github.com/vLuckyyy",
    },
    {
      documentId: "p1otrulla",
      name: "Piotr Zych",
      avatar_url: "https://github.com/P1otrulla.png",
      team_roles: [{ name: "Team Leader" }],
      github: "https://github.com/P1otrulla",
    },
  ];

  const team: Member[] = [
    {
      documentId: "noyzys",
      name: "Damian",
      avatar_url: "https://github.com/noyzys.png",
      team_roles: [{ name: "Developer" }],
      github: "https://github.com/noyzys",
    },
    {
      documentId: "igoyek",
      name: "Igor Michalski",
      avatar_url: "https://github.com/igoyek.png",
      team_roles: [{ name: "Developer" }],
      github: "https://github.com/igoyek",
    },
    {
      documentId: "jakubk15",
      name: "Jakub Kędziora",
      avatar_url: "https://github.com/Jakubk15.png",
      team_roles: [{ name: "Developer" }],
      github: "https://github.com/Jakubk15",
    },
    {
      documentId: "citralflo",
      name: "Michał Wojtas",
      avatar_url: "https://github.com/CitralFlo.png",
      team_roles: [{ name: "Developer" }],
      github: "https://github.com/CitralFlo",
    },
    {
      documentId: "imdmk",
      name: "DMK",
      avatar_url: "https://github.com/imDMK.png",
      team_roles: [{ name: "Developer" }],
      github: "https://github.com/imDMK",
    },
    {
      documentId: "chudziudgitoja",
      name: "Julian Zieliński",
      avatar_url: "https://github.com/ChudziudgiToJa.png",
      team_roles: [{ name: "Developer" }],
      github: "https://github.com/ChudziudgiToJa",
    },
  ];

  const students: Member[] = [
    {
      documentId: "mydelkonivea",
      name: "Kacper",
      avatar_url: "https://github.com/mydelkonivea.png",
      team_roles: [{ name: "Student" }],
      github: "https://github.com/mydelkonivea",
    },
    {
      documentId: "qbiterv",
      name: "Jakub Wawrzynowicz",
      avatar_url: "https://github.com/Qbiterv.png",
      team_roles: [{ name: "Student" }],
      github: "https://github.com/Qbiterv",
    },
    {
      documentId: "pawelusze",
      name: "Kowalski",
      avatar_url: "https://github.com/Pawelusze.png",
      team_roles: [{ name: "Student" }],
      github: "https://github.com/Pawelusze",
    },
  ];

  const sections: RoleSection[] = [
    {
      name: "Team Leaders",
      description: "Leading the EternalCode project.",
      priority: 1,
      members: leaders,
    },
    {
      name: "Team",
      description: "Core contributors and developers.",
      priority: 2,
      members: team,
    },
    {
      name: "Students",
      description: "Learning and contributing.",
      priority: 3,
      members: students,
    },
  ];

  try {
    const repos = [
      "EternalCodeTeam/website",
      "EternalCodeTeam/EternalCore",
      "EternalCodeTeam/EternalCombat",
      "EternalCodeTeam/ChatFormatter",
    ];
    // Fetch contributors but exclude those already in the main lists
    const contributors = await getContributors(repos);

    if (contributors.length > 0) {
      const contributorMembers: Member[] = contributors.map((c) => ({
        documentId: `gh-${c.id}`,
        name: c.login,
        avatar_url: c.avatar_url,
        team_roles: [],
        github: c.html_url,
      }));

      if (contributorMembers.length > 0) {
        sections.push({
          name: "Contributors",
          description: "Passionate individuals dedicated to the EternalCode mission.",
          priority: 1000,
          members: contributorMembers,
          variant: "contributors",
        });
      }
    }
  } catch (e) {
    console.error("Failed to load contributors", e);
  }

  return sections;
});
