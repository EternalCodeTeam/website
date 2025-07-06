export interface TeamRole {
  name: string;
}

export interface Member {
  documentId: string;
  avatar_url: string;
  name: string;
  team_roles: { data: TeamRole[] };
  github?: string;
  linkedin?: string;
}

export interface TeamMemberProps {
  member: Member;
  index: number;
}

export interface StrapiResponse {
  data: Member[];
  meta?: Record<string, unknown>;
}
