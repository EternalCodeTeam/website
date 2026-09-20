"use client";

import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import { useScrollLock } from "@/hooks/use-scroll-lock";

export function MobileDocsNav({ children }: { readonly children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const renderedPath = useRef(pathname);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useScrollLock(open);

  useEffect(() => {
    if (open) {
      closeButtonRef.current?.focus();
    }
  }, [open]);

  // Documentation pages share one route, so the drawer has to close itself when
  // a link inside it changes the URL.
  useEffect(() => {
    if (renderedPath.current !== pathname) {
      renderedPath.current = pathname;
      setOpen(false);
    }
  }, [pathname]);

  useEffect(() => {
    if (!open) {
      return;
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        window.setTimeout(() => triggerRef.current?.focus(), 0);
      }
    }

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [open]);

  function close() {
    setOpen(false);
    window.setTimeout(() => triggerRef.current?.focus(), 0);
  }

  return (
    <>
      <button
        aria-controls="docs-mobile-drawer"
        aria-expanded={open}
        aria-haspopup="dialog"
        className="docs-mobile-trigger"
        onClick={() => setOpen(true)}
        ref={triggerRef}
        type="button"
      >
        <Menu aria-hidden="true" size={17} /> Browse docs
      </button>
      {open ? (
        <div className="docs-mobile-overlay" data-lenis-prevent>
          <button
            aria-label="Close navigation"
            className="docs-mobile-backdrop"
            onClick={close}
            type="button"
          />
          <div
            aria-label="Documentation navigation"
            aria-modal="true"
            className="docs-mobile-drawer"
            id="docs-mobile-drawer"
            role="dialog"
          >
            <button
              aria-label="Close navigation"
              onClick={close}
              ref={closeButtonRef}
              type="button"
            >
              <X aria-hidden="true" size={19} />
            </button>
            {children}
          </div>
        </div>
      ) : null}
    </>
  );
}
