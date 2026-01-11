import { SiNetlify } from "react-icons/si";

export function NetlifyHighlight() {
  return (
    <div className="px-4 pt-3">
      <div className="flex items-center gap-3 rounded-xl border border-emerald-100 bg-white px-4 py-3 text-sm shadow-xs dark:border-emerald-900/40 dark:bg-gray-900/70">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 ring-1 ring-emerald-100 dark:bg-emerald-900/40 dark:text-emerald-200 dark:ring-emerald-800/60">
          <SiNetlify aria-hidden className="h-5 w-5" />
        </div>
        <div className="space-y-1">
          <p className="font-semibold text-gray-900 dark:text-emerald-100">Powered by Netlify</p>
          <a
            className="inline-flex items-center gap-1 text-emerald-700 text-xs font-semibold underline decoration-emerald-400 decoration-2 underline-offset-4 hover:text-emerald-800 dark:text-emerald-200 dark:hover:text-emerald-100"
            href="https://www.netlify.com/"
            rel="noopener noreferrer"
            target="_blank"
          >
            Explore Netlify
            <span aria-hidden>↗</span>
          </a>
        </div>
      </div>
    </div>
  );
}
