import type * as React from "react";

export function ArrowForward(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      aria-label="Arrow forward"
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <title>Arrow forward</title>
      <path
        clipRule="evenodd"
        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
        fillRule="evenodd"
      />
    </svg>
  );
}
