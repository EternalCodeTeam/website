"use client";
import { useEffect } from "react";

export default function DocCopyEnhancer() {
  useEffect(() => {
    document.querySelectorAll(".prose pre").forEach((pre) => {
      const preEl = pre as HTMLElement;
      if (preEl.querySelector(".copy-btn")) return; // już jest
      const btn = document.createElement("button");
      btn.className =
        "copy-btn absolute top-3 right-4 z-10 flex items-center gap-1 rounded-md bg-[#23272e] text-gray-300 border border-gray-700 px-3 py-1 text-xs font-medium opacity-70 hover:opacity-100 hover:bg-[#181c23] hover:text-white transition-all shadow";
      btn.innerHTML = `<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M16 8v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8m4-4h6a2 2 0 0 1 2 2v2H4V6a2 2 0 0 1 2-2z"/></svg>Copy`;
      btn.type = "button";
      btn.style.position = "absolute";
      btn.onclick = async () => {
        await navigator.clipboard.writeText(preEl.innerText);
        btn.innerHTML = `<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7"/></svg>Copied!`;
        setTimeout(() => {
          btn.innerHTML = `<svg class=\"w-4 h-4\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" viewBox=\"0 0 24 24\"><path d=\"M16 8v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8m4-4h6a2 2 0 0 1 2 2v2H4V6a2 2 0 0 1 2-2z\"/></svg>Copy`;
        }, 1200);
      };
      preEl.style.position = "relative";
      preEl.appendChild(btn);
    });
  }, []);
  return null;
}
