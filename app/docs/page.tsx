import Link from "next/link";
import SectionTitle from "@/components/SectionTitle";

export default function DocsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <SectionTitle
        title="Documentation"
        description="Welcome to the EternalCode.pl documentation. Here you'll find comprehensive guides and documentation to help you start working with our platform as quickly as possible."
      />

      <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <Link
          href="/docs/getting-started"
          className="group rounded-lg border border-gray-200 p-6 transition-colors hover:border-gray-300 dark:border-gray-700 dark:hover:border-gray-600"
        >
          <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
            Getting Started
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Learn the basics of EternalCode.pl and get started with your first
            project.
          </p>
        </Link>

        <Link
          href="/docs/guides"
          className="group rounded-lg border border-gray-200 p-6 transition-colors hover:border-gray-300 dark:border-gray-700 dark:hover:border-gray-600"
        >
          <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
            Guides
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Step-by-step guides for common tasks and features.
          </p>
        </Link>

        <Link
          href="/docs/api"
          className="group rounded-lg border border-gray-200 p-6 transition-colors hover:border-gray-300 dark:border-gray-700 dark:hover:border-gray-600"
        >
          <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
            API Reference
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Detailed API documentation and examples.
          </p>
        </Link>
      </div>
    </div>
  );
}
