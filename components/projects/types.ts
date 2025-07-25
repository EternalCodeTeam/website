export interface Project {
  documentId: string;
  name: string;
  description: string;
  repository_url: string;
  banner_url: string;
}

export interface ProjectItemProps {
  repo: Project;
  index: number;
}

export interface ProjectButtonProps {
  title: string;
}

export interface ApiResponse {
  data: Project[];
}
