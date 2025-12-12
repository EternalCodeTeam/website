import type { SVGProps } from "react";

export default function FolderIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      aria-label="Folder"
      height="1em"
      viewBox="0 0 24 24"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <title>Folder</title>
      <path
        d="M10.59 4.59C10.21 4.21 9.7 4 9.17 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8z"
        fill="currentColor"
      />
    </svg>
  );
}
