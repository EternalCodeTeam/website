"use client";

export default function TeamSkeleton() {
  const skeletons = Array.from({ length: 9 }, (_, i) => `skeleton-${i}`);

  return (
    <section id="team">
      <div className="relative mx-auto max-w-7xl px-4 py-20">
        <div className="mb-16 text-center">
          {/* Title Skeleton */}
          <div className="mx-auto mb-4 h-10 w-48 animate-pulse rounded-lg bg-gray-200 motion-reduce:animate-none dark:bg-gray-800/50" />
          <div className="mx-auto h-6 w-full max-w-2xl animate-pulse rounded-lg bg-gray-200 motion-reduce:animate-none dark:bg-gray-800/50" />
        </div>

        <div className="space-y-20">
          {/* Simulated Roles Group */}
          <div>
            <div className="mb-8">
              <div className="mb-2 h-8 w-32 animate-pulse rounded-lg bg-gray-200 motion-reduce:animate-none dark:bg-gray-800/50" />
              <div className="h-5 w-full max-w-xl animate-pulse rounded-lg bg-gray-200 motion-reduce:animate-none dark:bg-gray-800/50" />
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {skeletons.map((id) => (
                <div
                  className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900/40"
                  key={id}
                >
                  {/* Avatar Skeleton */}
                  <div className="h-20 w-20 shrink-0 animate-pulse rounded-lg bg-gray-200 motion-reduce:animate-none dark:bg-gray-800" />

                  {/* Info Skeleton */}
                  <div className="flex-1 space-y-3">
                    <div className="h-5 w-3/4 animate-pulse rounded bg-gray-200 motion-reduce:animate-none dark:bg-gray-800" />
                    <div className="space-y-1.5">
                      <div className="h-4 w-1/2 animate-pulse rounded bg-gray-200 motion-reduce:animate-none dark:bg-gray-800/60" />
                      <div className="h-4 w-1/3 animate-pulse rounded bg-gray-200 motion-reduce:animate-none dark:bg-gray-800/60" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
