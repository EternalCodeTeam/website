import { SVGProps } from "react";

export default function GitBranchIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 256 256"
      {...props}
    >
      <path
        fill="currentColor"
        d="M224 64a32 32 0 1 0-40 31v9a16 16 0 0 1-16 16H96a31.71 31.71 0 0 0-16 4.31V95a32 32 0 1 0-16 0v66a32 32 0 1 0 16 0v-9a16 16 0 0 1 16-16h72a32 32 0 0 0 32-32v-9a32.06 32.06 0 0 0 24-31M56 64a16 16 0 1 1 16 16a16 16 0 0 1-16-16m32 128a16 16 0 1 1-16-16a16 16 0 0 1 16 16M192 80a16 16 0 1 1 16-16a16 16 0 0 1-16 16"
      ></path>
    </svg>
  );
}
