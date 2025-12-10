"use client";

import { useRouter } from "next/navigation";
import { Dropdown } from "@/components/ui/dropdown";

export const TOOLS_OPTIONS = [
  { label: "Notification Generator", value: "/notification-generator" },
  { label: "Build Explorer", value: "/builds" },
];

export function ToolsDropdown() {
  const router = useRouter();

  return (
    <div className="relative flex justify-center">
      <Dropdown
        variant="ghost"
        placeholder="Tools"
        options={TOOLS_OPTIONS}
        value=""
        onChange={(value) => router.push(value)}
        menuClassName="min-w-[210px]"
        buttonClassName="!py-2 !text-gray-600 hover:!bg-black/5 hover:!text-black dark:!text-gray-300 dark:hover:!bg-white/10 dark:hover:!text-white"
      />
    </div>
  );
}
