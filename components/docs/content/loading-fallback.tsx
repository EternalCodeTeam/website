"use client";

const skeletonKeys = Array.from({ length: 5 }, () => crypto.randomUUID());

export function LoadingFallback() {
  return (
    <div className="animate-pulse space-y-4">
      <div className="h-8 w-3/4 rounded-sm bg-gray-200 dark:bg-gray-700" />
      <div className="h-4 w-1/2 rounded-sm bg-gray-200 dark:bg-gray-700" />
      {skeletonKeys.map((key) => (
        <div className="h-4 rounded-sm bg-gray-200 dark:bg-gray-700" key={key} />
      ))}
    </div>
  );
}
