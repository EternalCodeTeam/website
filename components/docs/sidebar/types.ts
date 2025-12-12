export type DocItem = {
  title: string;
  path: string;
  icon?: string;
  children?: DocItem[];
};

export type DocSidebarProps = {
  className?: string;
  onItemClick?: (path: string) => void;
};

export type DocItemProps = {
  item: DocItem;
  level: number;
  isActive: boolean;
  onItemClick?: (path: string) => void;
  index: number;
};
