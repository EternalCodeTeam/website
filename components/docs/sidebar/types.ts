export interface DocItem {
  title: string;
  path: string;
  icon?: string;
  children?: DocItem[];
  sidebar_position?: number;
}

export interface DocSidebarProps {
  className?: string;
  onItemClick?: (path: string) => void;
  sidebarStructure: DocItem[];
}

export interface DocItemProps {
  item: DocItem;
  level: number;
  isActive: boolean;
  onItemClick?: (path: string) => void;
  index: number;
}
