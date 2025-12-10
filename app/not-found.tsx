import type { FC } from "react";
import { Button } from "@/components/ui/button";
import { FacadePattern } from "@/components/ui/facade-pattern";

const NotFound: FC = () => {
  const navigationButtons = (
    <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
      <Button href="/" size="lg" variant="primary">
        Go to Homepage
      </Button>
      <Button href="/docs" size="lg" variant="outline">
        Browse Documentation
      </Button>
    </div>
  );

  const overlay = (
    <div className="pointer-events-none absolute inset-0 z-0 select-none">
      <div className="-translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2 h-[600px] w-[600px] rounded-full bg-blue-500/10 mix-blend-multiply blur-3xl filter dark:bg-blue-500/5 dark:mix-blend-screen" />

      <FacadePattern className="absolute inset-0 h-full opacity-30 dark:opacity-10" />
    </div>
  );

  return (
    <div className="relative flex min-h-[70vh] flex-col items-center justify-center overflow-hidden bg-gray-50 text-center dark:bg-gray-950">
      {overlay}

      <div className="relative z-10 px-4 py-16">
        <h1 className="mb-4 font-extrabold text-6xl text-gray-900 sm:text-8xl dark:text-white">
          404
        </h1>
        <h2 className="mb-6 font-bold text-2xl text-gray-800 sm:text-3xl dark:text-gray-200">
          Page Not Found
        </h2>
        <p className="mx-auto mb-10 max-w-md text-gray-600 text-lg dark:text-gray-400">
          The page you are looking for might have been removed, had its name changed, or is
          temporarily unavailable.
        </p>
        {navigationButtons}
      </div>
    </div>
  );
};

export default NotFound;
