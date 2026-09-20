"use client";

import { useDocsSearch } from "fumadocs-core/search/client";
import { fetchClient } from "fumadocs-core/search/client/fetch";
import { ArrowRight, FileSearch, LoaderCircle, Search, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useScrollLock } from "@/hooks/use-scroll-lock";
import { getSearchProjectName, parseSearchResultContent } from "./search-utils";

const searchClient = fetchClient({ api: "/api/docs/search" });

export function DocsSearchDialog({
  onClose,
  open,
}: {
  readonly onClose: () => void;
  readonly open: boolean;
}) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { query, search, setSearch } = useDocsSearch({
    client: searchClient,
    delayMs: 80,
  });
  const results = Array.isArray(query.data) ? query.data : [];

  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
    }
  }, [open]);

  useScrollLock(open);

  // iOS keeps the layout viewport at full height when the keyboard opens, which
  // would push the result list behind it. Track the visual viewport instead and
  // expose it to CSS as `--ec-vvh`.
  useEffect(() => {
    if (!open) {
      return;
    }

    const viewport = window.visualViewport;
    const root = document.documentElement;

    function syncViewportHeight() {
      const height = viewport?.height ?? window.innerHeight;
      root.style.setProperty("--ec-vvh", `${Math.round(height)}px`);
    }

    syncViewportHeight();
    viewport?.addEventListener("resize", syncViewportHeight);
    viewport?.addEventListener("scroll", syncViewportHeight);
    window.addEventListener("resize", syncViewportHeight);

    return () => {
      viewport?.removeEventListener("resize", syncViewportHeight);
      viewport?.removeEventListener("scroll", syncViewportHeight);
      window.removeEventListener("resize", syncViewportHeight);
      root.style.removeProperty("--ec-vvh");
    };
  }, [open]);

  if (!open) {
    return null;
  }

  function openResult(url: string) {
    onClose();
    router.push(url);
  }

  return (
    <div className="docs-search-overlay" data-lenis-prevent>
      <button
        aria-label="Close search"
        className="docs-search-backdrop"
        onClick={onClose}
        type="button"
      />
      <section
        aria-label="Search documentation"
        aria-modal="true"
        className="docs-search-dialog"
        role="dialog"
      >
        <div className="docs-search-input-row">
          <Search aria-hidden="true" size={20} />
          <input
            aria-label="Search documentation"
            onChange={(event) => {
              setSelectedIndex(0);
              setSearch(event.target.value);
            }}
            onKeyDown={(event) => {
              if (event.key === "Escape") {
                onClose();
              }
              if (event.key === "ArrowDown" && results.length > 0) {
                event.preventDefault();
                setSelectedIndex((index) => (index + 1) % results.length);
              }
              if (event.key === "ArrowUp" && results.length > 0) {
                event.preventDefault();
                setSelectedIndex((index) => (index - 1 + results.length) % results.length);
              }
              if (event.key === "Enter" && results[selectedIndex]) {
                event.preventDefault();
                openResult(results[selectedIndex].url);
              }
            }}
            placeholder="Search guides, APIs, commands…"
            ref={inputRef}
            value={search}
          />
          {query.isLoading ? (
            <LoaderCircle aria-hidden="true" className="docs-search-spinner" size={18} />
          ) : null}
          <button aria-label="Close search" onClick={onClose} type="button">
            <X aria-hidden="true" size={18} />
          </button>
        </div>
        <div aria-live="polite" className="docs-search-results" data-lenis-prevent>
          {search ? null : (
            <div className="docs-search-empty">
              <FileSearch aria-hidden="true" size={22} />
              <p>Search across all 67 focused guides.</p>
              <span>Try “installation”, “commands”, or “API”.</span>
            </div>
          )}
          {search && !query.isLoading && results.length === 0 ? (
            <div className="docs-search-empty">
              <FileSearch aria-hidden="true" size={22} />
              <p>No matching documentation.</p>
              <span>Try a shorter or more general phrase.</span>
            </div>
          ) : null}
          {results.map((result, index) => (
            <button
              aria-selected={index === selectedIndex}
              className="docs-search-result"
              key={`${result.id}-${result.url}`}
              onClick={() => openResult(result.url)}
              onMouseEnter={() => setSelectedIndex(index)}
              role="option"
              type="button"
            >
              <span className="docs-search-result-project">{getSearchProjectName(result.url)}</span>
              <strong>
                {parseSearchResultContent(result.content).map((segment, segmentIndex) =>
                  segment.highlighted ? (
                    <mark key={`${segment.text}-${segmentIndex}`}>{segment.text}</mark>
                  ) : (
                    <span key={`${segment.text}-${segmentIndex}`}>{segment.text}</span>
                  )
                )}
              </strong>
              {result.breadcrumbs?.length ? <small>{result.breadcrumbs.join(" / ")}</small> : null}
              <ArrowRight aria-hidden="true" size={16} />
            </button>
          ))}
        </div>
        <footer className="docs-search-footer">
          <span>↑↓ navigate</span>
          <span>↵ open</span>
          <span>esc close</span>
        </footer>
      </section>
    </div>
  );
}
