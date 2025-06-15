import Link from "next/link";
import { FC } from "react";

import GitHubIcon from "@/components/icons/github";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface EditOnGitHubProps {
  filePath: string;
  className?: string;
}

export const EditOnGitHub: FC<EditOnGitHubProps> = ({ filePath, className }) => {
  const githubUrl = `https://github.com/EternalCodeTeam/website/edit/main/content/docs/${encodeURIComponent(filePath)}.md`;

  return (
    <Link href={githubUrl} target="_blank" rel="noopener noreferrer">
      <Button
        variant="secondary"
        size="sm"
        leftIcon={<GitHubIcon className="h-4 w-4" aria-hidden="true" />}
        className={className}
        aria-label="Edit this page on GitHub"
      >
        Edit on GitHub
      </Button>
    </Link>
  );
};
