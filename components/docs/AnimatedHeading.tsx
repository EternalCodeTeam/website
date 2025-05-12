"use client";
import React, { useState } from "react";

function createAnimatedHeading(tag: keyof JSX.IntrinsicElements) {
  return function AnimatedHeading({
    children,
    id,
    ...props
  }: React.HTMLAttributes<HTMLElement> & { id?: string }) {
    const [copied, setCopied] = useState(false);
    const handleCopy = (e: React.MouseEvent) => {
      e.preventDefault();
      const headingId = id ?? "";
      if (navigator.clipboard) {
        navigator.clipboard.writeText(
          window.location.origin + window.location.pathname + `#${headingId}`
        );
      }
      window.location.hash = headingId;
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    };
    return React.createElement(
      tag,
      {
        id,
        className: "group relative hover:cursor-pointer",
        style: { textDecoration: "none" },
        ...props,
      },
      React.createElement(
        React.Fragment,
        null,
        <span
          style={{
            textDecoration: "none",
            display: "inline-flex",
            alignItems: "center",
          }}
        >
          {children}
          {id ? (
            <>
              <a
                href={`#${id}`}
                onClick={handleCopy}
                className="underline-none ml-2 inline-flex select-none items-center text-base text-gray-400 opacity-0 transition-opacity group-hover:opacity-100"
                aria-label="Copy link to heading"
                style={{
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  verticalAlign: "middle", 
                }}
              >
                #
              </a>
              {copied && (
                <span className="animate-fade-in ml-2 text-xs text-green-500">
                  Link copied!
                </span>
              )}
            </>
          ) : null}
        </span>
      )
    );
  };
}

export const H1 = createAnimatedHeading("h1");
export const H2 = createAnimatedHeading("h2");
export const H3 = createAnimatedHeading("h3");
export const H4 = createAnimatedHeading("h4");
export const H5 = createAnimatedHeading("h5");
export const H6 = createAnimatedHeading("h6");