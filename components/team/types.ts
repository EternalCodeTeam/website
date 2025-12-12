export type TeamRole = {
  name: string;
};

export type Member = {
  documentId: string;
  avatar_url: string;
  name: string;
  team_roles: TeamRole[];
  github?: string;
  linkedin?: string;
};

export type RoleSection = {
  name: string;
  description?: string;
  priority: number;
  members: Member[];
};

export type TeamMemberProps = {
  member: Member;
  index: number;
};
