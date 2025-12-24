"use client";

export default function SentryTestPage() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-8">
      <h1 className="font-bold text-3xl">Sentry Integration Test</h1>

      <div className="flex gap-4">
        <button
          type="button"
          className="rounded-lg bg-red-500 px-6 py-3 font-medium text-white shadow-md transition-colors hover:bg-red-600 hover:shadow-lg active:scale-95"
          onClick={() => {
            throw new Error("Sentry Test Error: Client-Side Button Click");
          }}
        >
          Throw Error (Client-Side)
        </button>

        <a
          href="/api/sentry-test"
          className="flex items-center rounded-lg bg-blue-500 px-6 py-3 text-center font-medium text-white shadow-md transition-colors hover:bg-blue-600 hover:shadow-lg active:scale-95"
          target="_blank"
          rel="noopener"
        >
          Trigger API Error (Server-Side)
        </a>
      </div>

      <p className="max-w-md text-center text-gray-500 text-sm">
        Note: Ensure you have added <code>NEXT_PUBLIC_SENTRY_DSN</code> to your environment
        variables for these errors to be reported.
      </p>
    </div>
  );
}
