import { SiNetlify } from "react-icons/si";

export function NetlifyHighlight() {
  return (
    <a
      href="https://www.netlify.com/"
      target="_blank"
      rel="noopener noreferrer"
      className="group block px-4 pt-3"
    >
      <div className="relative overflow-hidden rounded-xl border border-gray-200 bg-gray-50/50 transition-all duration-300 hover:border-[#05BDBA]/40 hover:shadow-md dark:border-gray-800 dark:bg-gray-900/20 dark:hover:border-[#32E6E2]/40">

        <div className="flex items-center gap-3 px-4 py-3">

          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#E6FFFA] text-[#05BDBA] transition-transform duration-300 group-hover:scale-105 dark:bg-[#1E2124] dark:text-[#32E6E2]">
            <SiNetlify className="h-5 w-5" />
          </div>

          <div className="flex flex-col leading-tight">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Hosting & Deploy
            </span>

            <span className="flex items-center gap-1.5 text-sm font-semibold text-gray-900 transition-colors group-hover:text-[#05BDBA] dark:text-gray-100 dark:group-hover:text-[#32E6E2]">
              Powered by Netlify
              <span className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                ↗
              </span>
            </span>
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-transparent via-[#05BDBA]/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:via-[#32E6E2]/60" />
      </div>
    </a>
  );
}
