export interface DocItem {
  title: string;
  path: string;
  children?: DocItem[];
}

export interface DocSidebarProps {
  className?: string;
  onItemClick?: (path: string) => void;
}

export interface DocItemProps {
  item: DocItem;
  level: number;
  isActive: boolean;
  onItemClick?: (path: string) => void;
  index: number;
}
