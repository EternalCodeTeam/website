import Link from "next/link";

import GitHubIcon from "@/components/icons/github";
import { cn } from "@/lib/utils";

interface EditOnGitHubProps {
  filePath: string;
  className?: string;
}

export const EditOnGitHub = ({ filePath, className }: EditOnGitHubProps) => {
  const githubUrl = `https://github.com/EternalCodeTeam/website/edit/master/content/docs/${filePath}.mdx`;

  return (
    <Link href={githubUrl} target="_blank" rel="noopener noreferrer">
      <div
        className={cn(
          "inline-flex h-9 items-center gap-2 rounded-full border border-gray-200 bg-white px-4 text-sm font-medium text-gray-700 shadow-sm transition-all hover:bg-gray-50 hover:text-gray-900 dark:border-gray-800 dark:bg-gray-800/50 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-gray-100",
          className
        )}
      >
        <GitHubIcon className="h-4 w-4" />
        <span>Edit on GitHub</span>
      </div>
    </Link>
  );
};
