"use client";

export default function TeamSkeleton() {
  const skeletons = Array.from({ length: 9 }, (_, i) => `skeleton-${i}`);

  return (
    <section id="team">
      <div className="relative mx-auto max-w-(--breakpoint-xl) px-4 py-20">
        <div className="mb-16 text-center">
          {/* Title Skeleton */}
          <div className="mx-auto h-10 w-48 rounded-lg bg-gray-200 dark:bg-gray-800/50 animate-pulse mb-4" />
          <div className="mx-auto h-6 w-full max-w-2xl rounded-lg bg-gray-200 dark:bg-gray-800/50 animate-pulse" />
        </div>

        <div className="space-y-20">
          {/* Simulated Roles Group */}
          <div>
            <div className="mb-8">
              <div className="h-8 w-32 rounded-lg bg-gray-200 dark:bg-gray-800/50 animate-pulse mb-2" />
              <div className="h-5 w-full max-w-xl rounded-lg bg-gray-200 dark:bg-gray-800/50 animate-pulse" />
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {skeletons.map((id) => (
                <div
                  key={id}
                  className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900/40"
                >
                  {/* Avatar Skeleton */}
                  <div className="h-20 w-20 shrink-0 rounded-lg bg-gray-200 dark:bg-gray-800 animate-pulse" />

                  {/* Info Skeleton */}
                  <div className="flex-1 space-y-3">
                    <div className="h-5 w-3/4 rounded bg-gray-200 dark:bg-gray-800 animate-pulse" />
                    <div className="space-y-1.5">
                      <div className="h-4 w-1/2 rounded bg-gray-200 dark:bg-gray-800/60 animate-pulse" />
                      <div className="h-4 w-1/3 rounded bg-gray-200 dark:bg-gray-800/60 animate-pulse" />
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
