import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import logo from "@/public/logo.svg";

const groups = [
  {
    title: "Explore",
    links: [
      ["Documentation", "/docs"],
      ["Team", "/team"],
      ["Contribute", "/contribute"],
      ["Builds", "/builds"],
    ],
  },
  {
    title: "Projects",
    links: [
      ["EternalCore", "/projects/eternalcore"],
      ["EternalCombat", "/projects/eternalcombat"],
      ["Multification", "/docs/multification"],
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-[var(--ec-line)] border-t bg-[var(--ec-footer)] text-[var(--ec-text)]">
      <div className="section-shell grid grid-cols-2 gap-10 py-14 sm:gap-14 lg:grid-cols-[1.4fr_.6fr_.6fr] lg:py-20">
        <div className="col-span-2 lg:col-span-1">
          <Link className="inline-flex items-center gap-3" href="/">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-[var(--ec-accent)]">
              <Image alt="" height={25} src={logo} width={25} />
            </span>
            <span className="font-semibold tracking-[-.03em]">EternalCode.</span>
          </Link>
          <p className="mt-6 max-w-sm text-[var(--ec-muted)] text-sm leading-6">
            Open-source infrastructure for ambitious Minecraft communities, designed and maintained
            in Poland.
          </p>
          <a
            className="mt-7 inline-flex items-center gap-2 text-[var(--ec-accent-text)] text-sm"
            href="https://github.com/EternalCodeTeam"
            rel="noreferrer"
            target="_blank"
          >
            Follow development <ArrowUpRight className="h-4 w-4" />
          </a>
          <a
            aria-label="This site is powered by Netlify"
            className="group mt-8 flex w-fit items-center gap-3 rounded-xl border border-[var(--ec-line)] bg-[var(--ec-panel)] px-4 py-3 transition duration-200 hover:border-[#32e6e2]/60 hover:shadow-[0_0_0_3px_rgb(50_230_226_/_0.15)]"
            href="https://www.netlify.com"
            rel="noreferrer"
            target="_blank"
          >
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-[#0e1e25] text-[#32e6e2]">
              <svg
                aria-hidden="true"
                className="h-5 w-5 transition duration-200 group-hover:scale-110"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M6.49 19.04h-.23L5.13 17.9v-.23l1.73-1.71h1.2l.15.15v1.2L6.5 19.04ZM5.13 6.31V6.1l1.13-1.13h.23L8.2 6.68v1.2l-.15.15h-1.2L5.13 6.31Zm9.96 9.09h-1.65l-.14-.13v-3.83c0-.68-.27-1.2-1.1-1.23-.42 0-.9 0-1.43.02l-.07.08v4.96l-.14.14H8.9l-.13-.14V8.73l.13-.14h3.7a2.6 2.6 0 0 1 2.61 2.6v4.08l-.13.14Zm-8.37-2.44H.14L0 12.82v-1.64l.14-.14h6.58l.14.14v1.64l-.14.14Zm17.14 0h-6.58l-.14-.14v-1.64l.14-.14h6.58l.14.14v1.64l-.14.14ZM11.05 6.55V1.64l.14-.14h1.65l.14.14v4.9l-.14.14h-1.65l-.14-.13Zm0 15.81v-4.9l.14-.14h1.65l.14.13v4.91l-.14.14h-1.65l-.14-.14Z" />
              </svg>
            </span>
            <span className="flex flex-col leading-tight">
              <span className="font-medium text-sm">Powered by Netlify</span>
              <span className="text-[var(--ec-muted)] text-xs">
                This site runs fast thanks to Netlify.
              </span>
            </span>
          </a>
        </div>
        {groups.map((group) => (
          <div key={group.title}>
            <h2 className="font-mono text-[10px] text-[var(--ec-faint)] uppercase tracking-[.18em]">
              {group.title}
            </h2>
            <div className="mt-5 space-y-3">
              {group.links.map(([label, href]) => (
                <Link
                  className="block text-[var(--ec-muted)] text-sm transition hover:text-[var(--ec-text)]"
                  href={href}
                  key={href}
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="site-footer-bar section-shell flex flex-col gap-3 border-[var(--ec-line)] border-t py-5 text-[11px] text-[var(--ec-faint)] sm:flex-row sm:items-center sm:justify-between">
        <span>Copyright © {new Date().getFullYear()} EternalCodeTeam</span>
        <span>Open source. Built with care. Occasionally fixed after midnight.</span>
      </div>
    </footer>
  );
}
