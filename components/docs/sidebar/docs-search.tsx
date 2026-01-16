"use client";

import { useEffect, useState } from "react";
import { SearchModal } from "@/components/docs/search/search-modal";
import { SearchTrigger } from "@/components/docs/search/search-trigger";

interface DocsSearchProps {
  className?: string;
}

const DocsSearch = ({ className = "" }: DocsSearchProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Global keyboard shortcut (⌘K / Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsModalOpen(true);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <SearchTrigger className={className} onClick={() => setIsModalOpen(true)} />
      <SearchModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default DocsSearch;
