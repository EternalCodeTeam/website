import { FadeIn } from "@/components/ui/motion/motion-components";

export function BuildHeader() {
  return (
    <div className="mb-12 text-center">
      <FadeIn>
        <h1 className="mb-4 text-balance bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-900 bg-clip-text font-extrabold text-4xl text-transparent dark:from-white dark:via-blue-100 dark:to-indigo-200">
          Build Explorer
        </h1>
        <p className="mx-auto mb-8 max-w-lg text-gray-600 dark:text-gray-400">
          Access stable releases and development builds for all our projects.
        </p>
      </FadeIn>
    </div>
  );
}
