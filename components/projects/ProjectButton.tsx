import React from "react";
import GitHubIcon from "@/components/icons/github";
import { Button } from "@/components/ui/button";

export default function ProjectButton({ title }: Readonly<{ title: string }>) {
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
