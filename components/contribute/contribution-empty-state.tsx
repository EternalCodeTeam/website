import { Sparkles } from "lucide-react";

export function ContributionEmptyState() {
  return (
    <div className="py-20 text-center">
      <Sparkles className="mx-auto mb-6 h-16 w-16 text-gray-400 dark:text-gray-600" />
      <h3 className="mb-3 font-semibold text-2xl text-gray-900 dark:text-white">
        No contributions available yet
      </h3>
      <p className="text-gray-600 text-lg dark:text-gray-400">
        We are currently updating our contribution opportunities. Please check back soon!
      </p>
    </div>
  );
}
