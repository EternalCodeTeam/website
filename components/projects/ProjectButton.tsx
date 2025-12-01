import GitHubIcon from "@/components/icons/github";
import { Button } from "@/components/ui/button";

import type { ProjectButtonProps } from "./types";

export default function ProjectButton({ title }: ProjectButtonProps) {
  return (
    <Button
      variant="primary"
      leftIcon={<GitHubIcon className="mb-[0.5px]" />}
      aria-label="Go to repository"
    >
      {title}
    </Button>
  );
}
