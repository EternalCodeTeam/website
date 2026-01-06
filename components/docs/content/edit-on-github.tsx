import GitHubIcon from "@/components/icons/github";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface EditOnGitHubProps {
  filePath: string;
  className?: string;
}

export const EditOnGitHub = ({ filePath, className }: EditOnGitHubProps) => {
  const githubUrl = `https://github.com/EternalCodeTeam/website/edit/master/content/docs/${filePath}.mdx`;

  return (
    <Button
      className={cn(
        "rounded-full bg-white text-gray-700 dark:bg-gray-800/50 dark:text-gray-300",
        className
      )}
      href={githubUrl}
      leftIcon={<GitHubIcon className="h-4 w-4" />}
      rel="noopener noreferrer"
      size="sm"
      target="_blank"
      variant="outline"
    >
      Edit on GitHub
    </Button>
  );
};
