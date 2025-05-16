import React, { useMemo } from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { docsStructure } from './sidebar-structure';

interface BreadcrumbItem {
  title: string;
  path: string;
}

interface BreadcrumbsProps {
  currentPath: string;
  className?: string;
}

const findDocItem = (path: string) => {
  for (const item of docsStructure) {
    if (item.path === path) return item;
    if (item.children) {
      const child = item.children.find(child => child.path === path);
      if (child) return child;
    }
  }
  return null;
};

export const Breadcrumbs: React.FC<BreadcrumbsProps> = React.memo(({ 
  currentPath,
  className = ''
}) => {
  const breadcrumbs = useMemo(() => {
    const paths = currentPath.split('/').filter(Boolean);
    const items: BreadcrumbItem[] = [];
    let accumulatedPath = '';

    for (const path of paths) {
      accumulatedPath += `/${path}`;
      const item = findDocItem(accumulatedPath);
      if (item) {
        items.push({
          title: item.title,
          path: accumulatedPath,
        });
      }
    }

    return items;
  }, [currentPath]);

  if (breadcrumbs.length === 0) {
    return null;
  }

  return (
    <nav 
      className={`flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400 mb-4 ${className}`}
      aria-label="Breadcrumb navigation"
    >
      <Link 
        href="/" 
        className="hover:text-gray-900 dark:hover:text-white no-underline transition-colors duration-200"
        aria-label="Go to home page"
      >
        Home
      </Link>
      {breadcrumbs.map((crumb, index) => (
        <React.Fragment key={crumb.path}>
          <ChevronRight 
            className="h-4 w-4 flex-shrink-0" 
            aria-hidden="true"
          />
          <Link
            href={crumb.path}
            className={`hover:text-gray-900 dark:hover:text-white no-underline transition-colors duration-200 ${
              index === breadcrumbs.length - 1
                ? 'text-gray-900 dark:text-white font-medium'
                : ''
            }`}
            aria-current={index === breadcrumbs.length - 1 ? 'page' : undefined}
          >
            {crumb.title}
          </Link>
        </React.Fragment>
      ))}
    </nav>
  );
});

Breadcrumbs.displayName = 'Breadcrumbs';