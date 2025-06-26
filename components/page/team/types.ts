export interface TeamRole {
  attributes: {
    name: string;
  };
}

export interface MemberData {
  avatar_url: string;
  name: string;
  team_roles: {
    data: TeamRole[];
  };
  github?: string;
  linkedin?: string;
}

export interface TeamMemberProps {
  member: MemberData;
  index: number;
}

export interface Member {
  id: string;
  attributes: MemberData;
}

export interface StrapiResponse {
  data: Member[];
  meta?: Record<string, unknown>;
}
