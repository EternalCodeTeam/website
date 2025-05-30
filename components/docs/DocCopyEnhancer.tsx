"use client";

import { useEffect, useCallback, useRef, useState } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";

interface CopyButtonProps {
  onClick: () => Promise<void>;
  isCopied: boolean;
  className?: string;
}

const COPY_TIMEOUT = 1200;
const BUTTON_BASE_CLASSES =
  "absolute z-10 flex items-center gap-1 rounded-md bg-[#23272e] text-gray-300 border border-gray-700 px-3 py-1 text-xs font-medium opacity-70 hover:opacity-100 hover:bg-[#181c23] hover:text-white transition-all shadow pointer-events-auto";

const CopyButton: React.FC<CopyButtonProps> = ({
  onClick,
  isCopied,
  className,
}) => (
  <motion.button
    type="button"
    onClick={onClick}
    className={cn(BUTTON_BASE_CLASSES, className)}
    aria-label={isCopied ? "Copied to clipboard" : "Copy to clipboard"}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    transition={{ type: "spring", stiffness: 400, damping: 10 }}
  >
    <AnimatePresence mode="wait">
      {isCopied ? (
        <motion.div
          key="check"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.5, opacity: 0 }}
          transition={{ type: "spring", stiffness: 500, damping: 10 }}
        >
          <Check className="h-4 w-4" aria-hidden="true" />
        </motion.div>
      ) : (
        <motion.div
          key="copy"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.5, opacity: 0 }}
          transition={{ type: "spring", stiffness: 500, damping: 10 }}
        >
          <Copy className="h-4 w-4" aria-hidden="true" />
        </motion.div>
      )}
    </AnimatePresence>
    <motion.span
      initial={{ opacity: 0, x: -5 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 5 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {isCopied ? "Copied!" : "Copy"}
    </motion.span>
  </motion.button>
);

export default function DocCopyEnhancer() {
  const [mounted, setMounted] = useState(false);
  const copyStatesRef = useRef<Map<HTMLElement, boolean>>(new Map());

  const copyToClipboard = useCallback(
    async (codeElement: HTMLElement | null) => {
      if (!codeElement?.textContent) return;

      try {
        await navigator.clipboard.writeText(codeElement.textContent);
        return true;
      } catch (error) {
        console.error("Failed to copy text:", error);
        return false;
      }
    },
    []
  );

  const addCopyButton = useCallback(
    (preEl: HTMLElement) => {
      if (preEl.querySelector(".copy-btn")) return;

      const buttonContainer = document.createElement("div");
      buttonContainer.className = "copy-btn";

      const isInTabPanel = preEl.closest(
        '.tab-panel-class, .tab-panel, [role="tabpanel"]'
      );
      const buttonPosition = isInTabPanel ? "top-2 right-2" : "top-3 right-4";

      const button = document.createElement("button");
      button.className = cn(BUTTON_BASE_CLASSES, buttonPosition);
      button.type = "button";
      button.style.position = "absolute";

      const updateButtonState = (isCopied: boolean) => {
        copyStatesRef.current.set(preEl, isCopied);
        const icon = isCopied
          ? '<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7"/></svg>'
          : '<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M16 8v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8m4-4h6a2 2 0 0 1 2 2v2H4V6a2 2 0 0 1 2-2z"/></svg>';
        button.innerHTML = `${icon}${isCopied ? "Copied!" : "Copy"}`;
      };

      button.onclick = async () => {
        const code = preEl.querySelector("code");
        const success = await copyToClipboard(code);

        if (success) {
          updateButtonState(true);
          setTimeout(() => {
            updateButtonState(false);
          }, COPY_TIMEOUT);
        }
      };


      updateButtonState(false);

      buttonContainer.appendChild(button);
      preEl.appendChild(buttonContainer);
    },
    [copyToClipboard]
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const setupCopyButtons = () => {
      document.querySelectorAll("pre").forEach((pre) => {
        if (pre instanceof HTMLElement) {
          addCopyButton(pre);
        }
      });
    };

    setupCopyButtons();

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


    const currentCopyStatesRef = copyStatesRef.current;

    return () => {
      observer.disconnect();
      currentCopyStatesRef.clear();
    };
  }, [addCopyButton, mounted]);

  return null;
}
