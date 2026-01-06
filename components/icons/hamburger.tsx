interface HamburgerProps {
  className?: string;
}

export default function Hamburger({ className = "" }: HamburgerProps) {
  return (
    <svg
      aria-label="Menu"
      className={className}
      fill="none"
      height="24"
      viewBox="0 0 24 24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Menu</title>
      <path
        d="M4 6H20M4 12H20M4 18H20"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}
