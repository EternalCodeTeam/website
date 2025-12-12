import type { SVGProps } from "react";

export default function ArrowForwardHeroIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      aria-label="Arrow forward"
      height="1em"
      viewBox="0 0 24 24"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <title>Arrow forward</title>
      <path
        d="M17.079 12.5H5v-1h12.079l-5.792-5.792L12 5l7 7l-7 7l-.713-.708z"
        fill="currentColor"
      />
    </svg>
  );
}
