export interface TeamRole {
  name: string;
}

export interface Member {
  documentId: string;
  avatar_url: string;
  name: string;
  team_roles: TeamRole[];
  github?: string;
  linkedin?: string;
}

export interface RoleSection {
  name: string;
  description?: string;
  priority: number;
  members: Member[];
  variant?: "default" | "contributors";
}

export interface TeamMemberProps {
  member: Member;
  index: number;
}
