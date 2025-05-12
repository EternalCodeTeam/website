"use client";
import { useEffect } from "react";

export default function DocCopyEnhancer() {
  useEffect(() => {
    const addCopyButton = (preEl: HTMLElement) => {
      if (preEl.querySelector(".copy-btn")) return;

      const btn = document.createElement("button");
      btn.className =
        "copy-btn absolute top-3 right-4 z-10 flex items-center gap-0 rounded-md bg-[#23272e] text-gray-300 border border-gray-700 px-3 py-1 text-xs font-medium opacity-70 hover:opacity-100 hover:bg-[#181c23] hover:text-white transition-all shadow pointer-events-auto";
      if (preEl.closest('.tab-panel-class, .tab-panel, [role="tabpanel"]')) {
        btn.className = btn.className.replace('top-3 right-4', 'top-2 right-2');
      }
      btn.innerHTML = `<svg class=\"w-4 h-4\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" viewBox=\"0 0 24 24\"><path d=\"M16 8v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8m4-4h6a2 2 0 0 1 2 2v2H4V6a2 2 0 0 1 2-2z\"/></svg>Copy`;
      btn.type = "button";
      btn.style.position = "absolute";
      btn.onclick = async () => {
        try {
          const code = preEl.querySelector("code");
          if (!code) return;
          await navigator.clipboard.writeText(code.textContent || "");
          btn.innerHTML = `<svg class=\"w-4 h-4\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" viewBox=\"0 0 24 24\"><path d=\"M5 13l4 4L19 7\"/></svg>Copied!`;
          setTimeout(() => {
            btn.innerHTML = `<svg class=\"w-4 h-4\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" viewBox=\"0 0 24 24\"><path d=\"M16 8v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8m4-4h6a2 2 0 0 1 2 2v2H4V6a2 2 0 0 1 2-2z\"/></svg>Copy`;
          }, 1200);
        } catch (err) {
          console.error("Failed to copy text:", err);
        }
      };
      preEl.appendChild(btn);
    };

    // Initial setup
    const setupCopyButtons = () => {
      document.querySelectorAll("pre").forEach((pre) => {
        if (pre instanceof HTMLElement) {
          addCopyButton(pre);
        }
      });
    };

    // Setup initial buttons
    setupCopyButtons();

    // Watch for dynamically added code blocks
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node instanceof HTMLElement) {
            if (node.matches("pre")) {
              addCopyButton(node);
            }
            node.querySelectorAll("pre").forEach((pre) => {
              if (pre instanceof HTMLElement) {
                addCopyButton(pre);
              }
            });
          }
        });
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => observer.disconnect();
  }, []);

  return null;
}
