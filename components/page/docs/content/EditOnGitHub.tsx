import Link from "next/link";

import GitHubIcon from "@/components/icons/github";
import { Button } from "@/components/ui/button";

interface EditOnGitHubProps {
  filePath: string;
  className?: string;
}

export const EditOnGitHub = ({ filePath, className }: EditOnGitHubProps) => {
  const githubUrl = `https://github.com/EternalCodeTeam/website/edit/main/content/docs/${filePath}.md`;

  return (
    <Link href={githubUrl} target="_blank" rel="noopener noreferrer">
      <Button
        variant="secondary"
        size="sm"
        leftIcon={<GitHubIcon className="h-4 w-4" />}
        className={className}
        aria-label="Edit this page on GitHub"
      >
        Edit on GitHub
      </Button>
    </Link>
  );
};
