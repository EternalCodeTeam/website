import { DOCS_PAGE_CONFIG } from "@/lib/docs-projects";

export function DocsHeader() {
  const { title, description } = DOCS_PAGE_CONFIG;

  return (
    <section className="relative pt-32 pb-12 lg:pt-44 lg:pb-16">
      <div className="relative z-10 mx-auto max-w-360 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-6 flex flex-col items-center">
            <div className="section-kicker mb-7">
              <span>Library</span> Product documentation
            </div>
            <h1 className="mb-6 max-w-3xl font-semibold text-5xl text-[var(--ec-text)] leading-[.95] tracking-[-.06em] sm:text-7xl">
              {title}
            </h1>
            <p className="max-w-2xl whitespace-pre-line text-gray-600 text-lg dark:text-gray-400">
              {description}
            </p>
            <p className="mt-4 font-mono text-[11px] text-[var(--ec-faint)]">
              Written by humans. Tested by humans. Typos also provided by humans.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
