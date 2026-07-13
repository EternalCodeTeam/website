import { FadeIn } from "@/components/ui/motion/motion-components";

export function BuildHeader() {
  return (
    <div className="mb-12 text-center">
      <FadeIn>
        <div className="section-kicker mb-6 justify-center">
          <span>Releases</span> Distribution center
        </div>
        <h1 className="mb-4 text-balance font-semibold text-5xl text-[var(--ec-text)] tracking-[-.06em] sm:text-6xl">
          Build Explorer
        </h1>
        <p className="mx-auto mb-8 max-w-lg text-gray-600 dark:text-gray-400">
          Access stable releases and development builds for all our projects.
        </p>
        <p className="font-mono text-[11px] text-[var(--ec-faint)]">
          Stable means tested. Dev means you enjoy surprises.
        </p>
      </FadeIn>
    </div>
  );
}
