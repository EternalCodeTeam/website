export interface SearchResult {
  title: string;
  path: string;
  excerpt: string;
}

export interface DocSearchProps {
  className?: string;
  placeholder?: string;
  minQueryLength?: number;
  debounceTime?: number;
}

export interface SearchResultItemProps {
  result: SearchResult;
  onSelect: (path: string) => void;
} 