import { ReactNode } from "react";

import CodeHideIcon from "../../../icons/code-hide";
import GitBranchIcon from "../../../icons/git-branch";
import GitCommitIcon from "../../../icons/git-commit";
import GitHubIcon from "../../../icons/github";
import SharpMoreVertIcon from "../../../icons/sharp-more-vert";
import TerminalIcon from "../../../icons/terminal-fill";

interface TerminalTabProps {
  children: ReactNode;
}

export function TerminalTab({ children }: Readonly<TerminalTabProps>) {
  const icons = [GitBranchIcon, CodeHideIcon, GitCommitIcon, GitHubIcon, SharpMoreVertIcon];

  return (
    <div className="w-full overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700 md:mt-3 md:flex md:flex-row lg:mt-0">
      <div className="flex w-full flex-col">
        <div className="flex w-full rounded-t-lg border-b-2 border-rose-500 bg-[#d8dde6] dark:border-gray-900 dark:bg-[#4B5563]">
          <div className="h-6 select-none rounded-lg bg-[#d8dde6] dark:bg-[#4B5563]">
            <div className="ml-2 flex h-full select-none items-center justify-center space-x-1.5 rounded-lg bg-[#d8dde6] dark:bg-[#4B5563]">
              <div className="h-[12px] w-[12px] rounded-full bg-[#f9644e] transition-opacity hover:opacity-80"></div>
              <div className="h-[12px] w-[12px] rounded-full bg-[#ffb630] transition-opacity hover:opacity-80"></div>
              <div className="h-[12px] w-[12px] rounded-full bg-[#3cc548] transition-opacity hover:opacity-80"></div>
            </div>
          </div>
          <div className="text-2xs mx-auto select-none text-center text-gray-800 dark:text-gray-400">
            <span className="font-medium">EternalCode</span>
          </div>
        </div>
        <div className="flex flex-row">
          <div className="flex h-full w-1/5">
            <div className="center flex h-full w-1/4 flex-col items-center space-y-2 rounded-bl-lg bg-[#cfd0d1] px-2 py-2 dark:bg-[#374151]">
              {icons.map((Icon, i) => (
                <span key={i} className="cursor-pointer transition-colors hover:text-blue-500">
                  <Icon className="mb-[3px] dark:text-slate-500 hover:dark:text-blue-400" />
                </span>
              ))}
            </div>
            <div className="h-full w-3/4 select-none bg-[#d8dde6] pl-4 text-sm font-light text-gray-400 dark:bg-[#4B5563]">
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
          <div className="flex h-full w-4/5 flex-col rounded-br-lg bg-[#bfbfbf] dark:bg-[#374151]">
            <div className="flex">
              <div className="flex h-6 select-none flex-row bg-[#e6e7e8] pl-2 pr-4 dark:bg-[#1F2A37] dark:text-gray-400">
                <TerminalIcon className="left-0 w-5 place-self-center dark:text-slate-500" />
                <span className="ml-1 mr-auto font-mono">Terminal</span>
              </div>
            </div>
            {children}
            <div className="m-0 flex h-6 w-full items-center justify-end rounded-br-lg bg-[#bdbdbd] px-2 dark:bg-[#374151]">
              <span className="text-xs text-gray-600 dark:text-gray-400">EternalCode © 2025</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
