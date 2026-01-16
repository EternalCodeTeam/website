import { DOCS_PAGE_CONFIG } from "@/lib/docs-projects";

export function DocsHeader() {
  const { title, description } = DOCS_PAGE_CONFIG;

  return (
    <section className="relative pt-32 pb-8 lg:pt-48 lg:pb-12">
      <div className="relative z-10 mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-6 flex flex-col items-center">
            <h1 className="mb-6 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-600 bg-clip-text font-bold text-4xl text-transparent tracking-tight sm:text-5xl dark:from-white dark:via-gray-100 dark:to-gray-400">
              {title}
            </h1>
            <p className="max-w-2xl whitespace-pre-line text-gray-600 text-lg dark:text-gray-400">
              {description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
