"use client";

interface AppErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function AppError({ error, reset }: AppErrorProps) {
  return (
    <div className="grid min-h-[60vh] place-items-center px-4 py-16">
      <div className="w-full max-w-lg rounded-2xl border border-red-200 bg-red-50 p-6 text-center dark:border-red-900/40 dark:bg-red-950/30">
        <h2 className="font-semibold text-red-900 text-xl dark:text-red-200">
          Something went wrong
        </h2>
        <p className="mt-2 text-red-800 text-sm dark:text-red-300">
          An unexpected error occurred while rendering this page.
        </p>
        {process.env.NODE_ENV === "development" && (
          <p className="mt-2 break-all text-red-700 text-xs dark:text-red-300">{error.message}</p>
        )}
        <div className="mt-5 flex justify-center">
          <button
            className="rounded-lg bg-red-600 px-4 py-2 font-medium text-sm text-white hover:bg-red-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
            onClick={reset}
            type="button"
          >
            Try again
          </button>
        </div>
      </div>
    </div>
  );
}
