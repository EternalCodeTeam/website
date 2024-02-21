"use client";

import { useEffect, useState, useMemo } from "react";
import GitBranchIcon from "../../../icons/git-branch";
import CodeHideIcon from "../../../icons/code-hide";
import GitCommitIcon from "../../../icons/git-commit";
import GitHubIcon from "../../../icons/github";
import SharpMoreVertIcon from "../../../icons/sharp-more-vert";
import FolderIcon from "../../../icons/folder";
import TerminalIcon from "../../../icons/terminal-fill";
import { motion } from "framer-motion";
import { TerminalLine } from "@/components/header/hero/terminal/TerminalLine";
import { TabFile } from "@/components/header/hero/terminal/TerminalTabFile";

interface Line {
  line: string;
  formatting?: string;
  special?: boolean;
  locale?: boolean;
  url?: string;
  endLine: boolean;
}

export default function Terminal() {
  const lines: Line[] = useMemo(
    () => [
      {
        line: "> eternalcode --help",
        formatting: "dark:text-gray-100 text-black-300 text-sm",
        endLine: true,
      },
      {
        line: "",
        endLine: true,
      },
      {
        line: "Help requested!",
        formatting: "text-slate-600 text-sm",
        endLine: true,
      },
      {
        line: "Try finding answers in our ",
        formatting: "text-slate-600 text-sm",
        endLine: false,
      },
      {
        line: "documentation!",
        formatting: "text-blue-500 text-sm",
        special: true,
        locale: false,
        url: "https://docs.eternalcode.pl/",
        endLine: true,
      },
      {
        line: "",
        endLine: true,
      },
      {
        line: "> eternalcode --tree",
        formatting: "dark:text-gray-100 text-black-300 text-sm",
        endLine: true,
      },
      {
        line: "",
        endLine: true,
      },
      {
        line: "├── 📁 ",
        formatting: "text-slate-600 text-sm",
        endLine: false,
      },
      {
        line: "Home",
        formatting: "text-blue-500 text-sm",
        special: true,
        locale: true,
        url: "/",
        endLine: true,
      },
      {
        line: "│   ├── 📁 ",
        formatting: "text-slate-600 text-sm",
        endLine: false,
      },
      {
        line: "Team",
        formatting: "text-blue-500 text-sm",
        special: true,
        locale: true,
        url: "/team",
        endLine: true,
      },
      {
        line: "│   ├── 📁 ",
        formatting: "text-slate-600 text-sm",
        endLine: false,
      },
      {
        line: "Projects",
        formatting: "text-blue-500 text-sm",
        special: true,
        locale: true,
        url: "/projects",
        endLine: true,
      },
      {
        line: "├── 📁 Faq",
        formatting: "text-slate-600 text-sm",
        endLine: true,
      },
      {
        line: "│   │   ├── 📁 ",
        formatting: "text-slate-600 text-sm",
        endLine: false,
      },
      {
        line: "Docs",
        formatting: "text-blue-500 text-sm",
        special: true,
        locale: false,
        url: "https://docs.eternalcode.pl/",
        endLine: true,
      },
    ],
    []
  );

  const icons = [
    GitBranchIcon,
    CodeHideIcon,
    GitCommitIcon,
    GitHubIcon,
    SharpMoreVertIcon,
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < lines.length) {
      const delay = lines[currentIndex].endLine ? 300 : 0;
      const timer = setTimeout(
        () => setCurrentIndex((prevIndex) => prevIndex + 1),
        delay
      );
      return () => clearTimeout(timer);
    }
  }, [currentIndex, lines]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.55 }}
    >
      <div
        id="terminal"
        className=" w-full md:mt-3 md:flex md:flex-row lg:mt-0"
        aria-hidden="true"
      >
        <div className="flex w-full flex-col">
          <div className="flex w-full rounded-t-lg border-b-2 border-rose-500 bg-[#d8dde6] dark:border-gray-900 dark:bg-[#4B5563]">
            <div
              id="on-off-buttons"
              className="h-6 select-none rounded-lg bg-[#d8dde6] dark:bg-[#4B5563]"
            >
              <div
                className="ml-2 flex h-full select-none items-center justify-center space-x-1.5 rounded-lg bg-[#d8dde6] dark:bg-[#4B5563]"
                style={{ width: "fit-content" }}
              >
                <div className="h-[12px] w-[12px] rounded-full bg-[#f9644e]"></div>
                <div className="h-[12px] w-[12px] rounded-full bg-[#ffb630]"></div>
                <div className="h-[12px] w-[12px] rounded-full bg-[#3cc548]"></div>
              </div>
            </div>
            <div
              id="file-name"
              className="text-2xs mx-auto select-none text-center text-gray-800 dark:text-gray-400"
            >
              <span className="font-medium">EternalCode</span>
            </div>
          </div>
          <div id="section-left" className="flex flex-row">
            <div id="settings" className="flex h-full w-1/5">
              <div
                id="project-settings"
                className="center flex h-full w-1/4 flex-col items-center space-y-2 rounded-bl-lg bg-[#cfd0d1] px-2 py-2 dark:bg-[#374151]"
              >
                {icons.map((Icon, i) => (
                  <span key={i}>
                    <Icon className="mb-[3px] dark:text-slate-500" />
                  </span>
                ))}
              </div>
              <div
                id="files"
                className="h-full w-3/4 select-none bg-[#d8dde6] pl-4 text-sm font-light text-gray-400 dark:bg-[#4B5563]"
              >
                <p>▄▄▄▄</p>
                <p>▄▄▄▄▄▄</p>
                <p>▄▄▄</p>
                <p>▄▄▄▄▄</p>
                <p>▄▄▄</p>
                <p>▄▄▄▄▄</p>
                <p>▄▄▄▄</p>
                <p>▄▄▄▄▄</p>
                <p>▄▄</p>
                <p>▄▄▄▄</p>
                <p>▄▄</p>
                <p>▄</p>
              </div>
            </div>
            <div
              id="main-tab"
              className="flex h-full w-4/5 flex-col rounded-br-lg bg-[#bfbfbf] dark:bg-[#374151]"
            >
              <div id="file-section" className="flex">
                <TabFile
                  withIcon={
                    <FolderIcon className="font mr-1 place-self-center dark:text-slate-500" />
                  }
                  title="Terminal"
                />
                <TabFile
                  withIcon={
                    <TerminalIcon className="left-0 w-5 place-self-center dark:text-slate-500" />
                  }
                  isActive
                  title="Terminal"
                />
              </div>
              <div
                id="file-2-code"
                className="inset-x-0 h-80 min-h-80 bg-[#e6e7e8] pl-2 dark:bg-[#1F2A37]"
              >
                {lines.map((line, index) => (
                  <TerminalLine
                    key={index}
                    line={line}
                    isVisible={index <= currentIndex}
                  />
                ))}
              </div>
              <div
                id="file-settings"
                className="m-0 h-6 w-full rounded-br-lg bg-[#bdbdbd] dark:bg-[#374151]"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
