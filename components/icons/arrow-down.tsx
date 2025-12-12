type ArrowDownProps = {
  className?: string;
};

export default function ArrowDown({ className = "" }: ArrowDownProps) {
  return (
    <svg
      aria-label="Arrow down"
      className={className}
      fill="none"
      height="24"
      viewBox="0 0 24 24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Arrow down</title>
      <path
        d="M6 9L12 15L18 9"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}
