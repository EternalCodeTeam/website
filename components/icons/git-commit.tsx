import type { SVGProps } from "react";

export default function GitCommitIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      aria-label="Git commit"
      height="1em"
      viewBox="0 0 256 256"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <title>Git commit</title>
      <path
        d="M244 116h-57.21a60 60 0 0 0-117.58 0H12a12 12 0 0 0 0 24h57.21a60 60 0 0 0 117.58 0H244a12 12 0 0 0 0-24m-116 48a36 36 0 1 1 36-36a36 36 0 0 1-36 36"
        fill="currentColor"
      />
    </svg>
  );
}
