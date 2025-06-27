"use client";

import { useEffect } from "react";

import { cn } from "@/lib/utils";

const COPY_TIMEOUT = 1200;
const BUTTON_BASE_CLASSES =
  "absolute z-10 flex items-center gap-1 rounded-md bg-gray-800 text-gray-300 border border-gray-700 px-3 py-1 text-xs font-medium opacity-70 hover:opacity-100 hover:bg-gray-900 hover:text-white transition-all shadow pointer-events-auto top-3 right-4";

const copyIcon =
  '<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15V5a2 2 0 0 1 2-2h10" /></svg>';
const checkIcon =
  '<svg class="w-4 h-4 text-green-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7"/></svg>';

export default function DocCopyEnhancer() {
  useEffect(() => {
    const addCopyButtons = () => {
      document.querySelectorAll("pre").forEach((pre) => {
        if (pre.querySelector(".copy-btn")) return;
        const btn = document.createElement("button");
        btn.className = cn(BUTTON_BASE_CLASSES, "copy-btn");
        btn.type = "button";
        btn.innerHTML = `<span class="icon">${copyIcon}</span>Copy`;
        let timeout: NodeJS.Timeout | null = null;
        btn.onclick = async () => {
          const code = pre.querySelector("code");
          if (!code?.textContent) return;
          try {
            await navigator.clipboard.writeText(code.textContent);
            btn.innerHTML = `<span class="icon">${checkIcon}</span>Copied!`;
            if (timeout) clearTimeout(timeout);
            timeout = setTimeout(() => {
              btn.innerHTML = `<span class="icon">${copyIcon}</span>Copy`;
            }, COPY_TIMEOUT);
          } catch {}
        };
        pre.appendChild(btn);
      });
    };
    addCopyButtons();
    const observer = new MutationObserver(addCopyButtons);
    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, []);
  return null;
}
