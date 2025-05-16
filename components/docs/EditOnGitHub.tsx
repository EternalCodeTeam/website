import { FC } from 'react';
import Link from 'next/link';
import GitHubIcon from '@/components/icons/github';
import { cn } from '@/lib/utils';

/**
 * Props for the EditOnGitHub component
 * @interface EditOnGitHubProps
 * @property {string} filePath - The path to the file in the GitHub repository
 * @property {string} [className] - Optional additional CSS classes
 */
interface EditOnGitHubProps {
  filePath: string;
  className?: string;
}

/**
 * EditOnGitHub component that provides a link to edit the current page on GitHub
 * @param {EditOnGitHubProps} props - Component props
 * @returns {JSX.Element} A styled link to edit the page on GitHub
 */
export const EditOnGitHub: FC<EditOnGitHubProps> = ({ filePath, className }) => {
  // Construct the GitHub URL with proper error handling
  const githubUrl = `https://github.com/EternalCodeTeam/website/edit/main/content/docs/${encodeURIComponent(filePath)}.md`;

  return (
    <Link
      href={githubUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'inline-flex items-center space-x-2 rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 no-underline',
        className
      )}
      aria-label="Edit this page on GitHub"
    >
      <GitHubIcon className="h-4 w-4" aria-hidden="true" />
      <span>Edit on GitHub</span>
    </Link>
  );
}; 