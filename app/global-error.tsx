"use client";

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  return (
    <html lang="en">
      <body className="m-0 bg-gray-950 text-white">
        <div className="grid min-h-screen place-items-center px-4">
          <div className="w-full max-w-xl rounded-2xl border border-gray-800 bg-gray-900 p-8 text-center">
            <h2 className="font-semibold text-2xl">Critical application error</h2>
            <p className="mt-2 text-gray-300 text-sm">
              The app failed to render. You can retry or refresh the page.
            </p>
            {process.env.NODE_ENV === "development" && (
              <p className="mt-2 break-all text-gray-400 text-xs">{error.message}</p>
            )}
            <div className="mt-6 flex justify-center">
              <button
                className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-sm text-white hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                onClick={reset}
                type="button"
              >
                Retry rendering
              </button>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
