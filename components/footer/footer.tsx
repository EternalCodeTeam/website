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
      <div className="section-shell grid gap-14 py-14 lg:grid-cols-[1.4fr_.6fr_.6fr] lg:py-20">
        <div>
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
      <div className="section-shell flex flex-col gap-3 border-[var(--ec-line)] border-t py-5 text-[11px] text-[var(--ec-faint)] sm:flex-row sm:items-center sm:justify-between">
        <span>© {new Date().getFullYear()} EternalCodeTeam</span>
        <span>Open source. Built with care. Occasionally fixed after midnight.</span>
      </div>
    </footer>
  );
}
