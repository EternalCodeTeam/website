import Link from "next/link";
import SectionTitle from "@/components/SectionTitle";

// Enable static generation
export const dynamic = 'force-static';
export const revalidate = 3600; // Revalidate every hour

// Pre-fetch documentation links
const docLinks = [
  {
    href: "/docs/getting-started",
    title: "Getting Started",
    description: "Learn the basics of EternalCode.pl and get started with your first project."
  },
  {
    href: "/docs/guides",
    title: "Guides",
    description: "Step-by-step guides for common tasks and features."
  },
  {
    href: "/docs/api",
    title: "API Reference",
    description: "Detailed API documentation and examples."
  }
];

export default function DocsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <SectionTitle
        title="Documentation"
        description="Welcome to the EternalCode.pl documentation. Here you'll find comprehensive guides and documentation to help you start working with our platform as quickly as possible."
      />

      <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {docLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="group rounded-lg border border-gray-200 p-6 transition-colors hover:border-gray-300 dark:border-gray-700 dark:hover:border-gray-600"
          >
            <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
              {link.title}
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              {link.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
