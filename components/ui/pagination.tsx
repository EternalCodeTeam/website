"use client";

import Link from "next/link";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  slug: string;
  className?: string;
}

const baseBtn =
  "inline-flex items-center justify-center font-medium transition-colors focus:outline-hidden focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none border text-xs rounded-xs";
const outlineBtn =
  "border-gray-300 bg-transparent hover:bg-light-gray-200 text-gray-900 dark:border-gray-700 dark:hover:bg-gray-800 dark:text-gray-200";
const primaryBtn =
  "bg-blue-600 text-white hover:bg-blue-700 border-blue-600 dark:bg-blue-500 dark:hover:bg-blue-600 dark:border-blue-500";

function getPageHref(slug: string, page: number) {
  return `/author/${slug}?page=${page}`;
}

export function Pagination({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  slug,
  className = "",
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  const visiblePages: number[] = [];

  if (totalPages <= 5) {
    for (let i = 1; i <= totalPages; i++) visiblePages.push(i);
  } else if (currentPage <= 3) {
    visiblePages.push(1, 2, 3, 4, 5);
  } else if (currentPage >= totalPages - 2) {
    for (let i = totalPages - 4; i <= totalPages; i++) visiblePages.push(i);
  } else {
    for (let i = currentPage - 2; i <= currentPage + 2; i++) visiblePages.push(i);
  }

  return (
    <div className={`flex items-center justify-between ${className}`}>
      <div className="text-xs text-gray-500 dark:text-gray-400">
        {totalItems > 0 ? (
          <>
            {startItem}-{endItem} of {totalItems}
          </>
        ) : (
          "0 items"
        )}
      </div>
      <div className="flex space-x-1">
        <Link
          href={getPageHref(slug, currentPage - 1)}
          className={`${baseBtn} ${outlineBtn} h-8 px-2 ${currentPage === 1 ? "pointer-events-none opacity-50" : ""}`}
          aria-disabled={currentPage === 1}
        >
          Previous
        </Link>

        {visiblePages.map((pageNumber) => (
          <Link
            key={pageNumber}
            href={getPageHref(slug, pageNumber)}
            className={`${baseBtn} ${
              currentPage === pageNumber ? primaryBtn : outlineBtn
            } h-8 w-8 justify-center p-0`}
            aria-current={currentPage === pageNumber ? "page" : undefined}
          >
            {pageNumber}
          </Link>
        ))}

        <Link
          href={getPageHref(slug, currentPage + 1)}
          className={`${baseBtn} ${outlineBtn} h-8 px-2 ${
            currentPage === totalPages ? "pointer-events-none opacity-50" : ""
          }`}
          aria-disabled={currentPage === totalPages}
        >
          Next
        </Link>
      </div>
    </div>
  );
}
