"use client";

import { useRouter } from "next/navigation";
import { Dropdown } from "@/components/ui/dropdown";

export const PROJECT_OPTIONS = [
  { label: "EternalCore", value: "/projects/eternalcore" },
  { label: "EternalCombat", value: "/projects/eternalcombat" },
];

export function ProjectsDropdown() {
  const router = useRouter();

  return (
    <div className="relative flex justify-center">
      <Dropdown
        variant="ghost"
        placeholder="Projects"
        options={PROJECT_OPTIONS}
        value=""
        onChange={(value) => router.push(value)}
        menuClassName="min-w-[200px]"
        buttonClassName="!py-2 !text-gray-600 hover:!bg-black/5 hover:!text-black dark:!text-gray-300 dark:hover:!bg-white/10 dark:hover:!text-white"
      />
    </div>
  );
}
