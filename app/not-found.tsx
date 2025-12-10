import type { FC } from "react";
import { FacadePattern } from "@/components/ui/facade-pattern";
import { Button } from "@/components/ui/button";

const NotFound: FC = () => {
  return (
    <div className="relative min-h-[70vh] overflow-hidden bg-gray-50 dark:bg-gray-950 flex flex-col items-center justify-center text-center">
      <div className="absolute inset-0 z-0 pointer-events-none select-none">
        <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/10 blur-3xl filter dark:bg-blue-500/5 mix-blend-multiply dark:mix-blend-screen" />

        <FacadePattern className="absolute inset-0 opacity-30 dark:opacity-10 h-full" />
      </div>

      <div className="relative z-10 px-4 py-16">
        <h1 className="mb-4 text-6xl font-extrabold text-gray-900 dark:text-white sm:text-8xl">
          404
        </h1>
        <h2 className="mb-6 text-2xl font-bold text-gray-800 dark:text-gray-200 sm:text-3xl">
          Page Not Found
        </h2>
        <p className="mb-10 max-w-md mx-auto text-lg text-gray-600 dark:text-gray-400">
          The page you are looking for might have been removed, had its name changed, or is
          temporarily unavailable.
        </p>
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button href="/" variant="primary" size="lg">
            Go to Homepage
          </Button>
          <Button href="/docs" variant="outline" size="lg">
            Browse Documentation
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
