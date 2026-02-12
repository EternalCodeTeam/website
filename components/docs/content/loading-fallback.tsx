"use client";

const skeletonKeys = Array.from({ length: 5 }, () => crypto.randomUUID());

export function LoadingFallback() {
  return (
    <div
      className="animate-pulse space-y-4 motion-reduce:animate-none"
      style={{
        contentVisibility: "auto",
        containIntrinsicSize: "auto 500px",
      }}
    >
      {/* Heading skeleton */}
      <div className="h-8 w-3/4 rounded-sm bg-gray-200 dark:bg-gray-700" />
      {/* Subheading skeleton */}
      <div className="h-4 w-1/2 rounded-sm bg-gray-200 dark:bg-gray-700" />
      {/* Content lines */}
      {skeletonKeys.map((key) => (
        <div className="h-4 rounded-sm bg-gray-200 dark:bg-gray-700" key={key} />
      ))}
      {/* Additional content blocks for more realistic loading */}
      <div className="mt-8 space-y-2">
        <div className="h-6 w-2/3 rounded-sm bg-gray-200 dark:bg-gray-700" />
        <div className="h-4 w-full rounded-sm bg-gray-200 dark:bg-gray-700" />
        <div className="h-4 w-5/6 rounded-sm bg-gray-200 dark:bg-gray-700" />
      </div>
    </div>
  );
}
