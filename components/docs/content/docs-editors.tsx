"use client";

import { m } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

interface DocEditor {
  login: string;
  avatarUrl: string;
  profileUrl: string;
}

interface DocsEditorsProps {
  editors: DocEditor[];
  historyUrl: string;
  edits: DocEdit[];
  className?: string;
}

interface DocEdit {
  sha: string;
  url: string;
  message: string;
  authorLogin: string | null;
  authorAvatarUrl: string | null;
  authorProfileUrl: string | null;
  authoredAt: string | null;
}

const getCommitTitle = (message: string) =>
  message.split("\n")[0]?.trim() || "Update documentation";

export const DocsEditors = ({ editors, historyUrl, edits, className }: DocsEditorsProps) => {
  const prefersReducedMotion = useReducedMotion();
  const renderEditAvatar = (edit: DocEdit) => {
    if (!edit.authorAvatarUrl) {
      return null;
    }

    if (edit.authorProfileUrl) {
      return (
        <a
          aria-label={`View ${edit.authorLogin ?? "contributor"}'s GitHub profile`}
          className="relative h-6 w-6 overflow-hidden rounded-full border border-white shadow-sm dark:border-gray-900"
          href={edit.authorProfileUrl}
          rel="noopener noreferrer"
          target="_blank"
          title={edit.authorLogin ? `@${edit.authorLogin}` : "View contributor"}
        >
          <Image
            alt={`Avatar of ${edit.authorLogin ?? "contributor"}`}
            fill
            sizes="24px"
            src={edit.authorAvatarUrl}
          />
        </a>
      );
    }

    return (
      <span className="relative h-6 w-6 overflow-hidden rounded-full border border-white shadow-sm dark:border-gray-900">
        <Image
          alt={`Avatar of ${edit.authorLogin ?? "contributor"}`}
          fill
          sizes="24px"
          src={edit.authorAvatarUrl}
        />
      </span>
    );
  };

  return (
    <m.section
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "relative overflow-hidden rounded-2xl border border-gray-200 bg-white/95 p-5 shadow-sm backdrop-blur-sm dark:border-gray-800 dark:bg-gray-900/60",
        className
      )}
      initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 8 }}
      transition={{ duration: prefersReducedMotion ? 0 : 0.4, ease: [0.4, 0, 0.2, 1] }}
    >
      <div className="flex flex-col gap-4">
        <div>
          <p className="font-semibold text-gray-500 text-xs uppercase tracking-[0.2em] dark:text-gray-400">
            This documentation page was created by volunteers.{" "}
            <Link
              className="text-blue-600 transition-colors hover:text-blue-700 dark:text-blue-300 dark:hover:text-blue-200"
              href="/contribute"
            >
              Learn how to contribute
            </Link>
          </p>
          <p className="mt-2 font-semibold text-gray-900 text-sm dark:text-gray-100">
            Recent editors for this page
          </p>
        </div>

        <details className="group rounded-xl border border-gray-200 bg-gray-50/80 px-4 py-3 text-gray-600 text-sm dark:border-gray-800 dark:bg-gray-900/70 dark:text-gray-300">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
            <div>
              <p className="font-semibold text-gray-900 text-sm dark:text-gray-100">Latest edits</p>
              <p className="text-gray-500 text-xs dark:text-gray-400">
                Expand to view recent commits.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center -space-x-2">
                {editors.map((editor) => (
                  <a
                    aria-label={`View ${editor.login}'s GitHub profile`}
                    className="relative h-8 w-8 overflow-hidden rounded-full border-2 border-white shadow-sm transition-transform hover:-translate-y-0.5 dark:border-gray-900"
                    href={editor.profileUrl}
                    key={editor.login}
                    rel="noopener noreferrer"
                    target="_blank"
                    title={`@${editor.login}`}
                  >
                    <Image
                      alt={`Avatar of ${editor.login}`}
                      fill
                      sizes="32px"
                      src={editor.avatarUrl}
                    />
                  </a>
                ))}
              </div>
              <span className="font-medium text-gray-500 text-xs group-open:hidden dark:text-gray-400">
                Show
              </span>
              <span className="hidden font-medium text-gray-500 text-xs group-open:inline dark:text-gray-400">
                Hide
              </span>
            </div>
          </summary>

          <div className="mt-3 border-gray-200/70 border-t pt-3 dark:border-gray-800/80">
            <ul className="flex flex-col gap-2">
              {edits.map((edit) => (
                <li className="flex flex-wrap items-center gap-x-2 gap-y-1" key={edit.sha}>
                  {renderEditAvatar(edit)}
                  <a
                    className="font-semibold text-gray-700 transition-colors hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-300"
                    href={edit.url}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    {getCommitTitle(edit.message)}
                  </a>
                  {edit.authorLogin ? (
                    <span className="text-gray-500 text-xs dark:text-gray-400">
                      by {edit.authorLogin}
                    </span>
                  ) : null}
                </li>
              ))}
            </ul>
            <a
              className="mt-3 inline-flex items-center gap-2 font-semibold text-gray-500 text-sm transition-colors hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-300"
              href={historyUrl}
              rel="noopener noreferrer"
              target="_blank"
            >
              View full history
              <span aria-hidden="true">↗</span>
            </a>
          </div>
        </details>
      </div>
    </m.section>
  );
};
