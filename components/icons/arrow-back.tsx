import React from "react";

interface ArrowBackProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
}

export const ArrowBack: React.FC<ArrowBackProps> = ({
  className = "",
  ...props
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="m7.825 13l5.6 5.6L12 20l-8-8l8-8l1.425 1.4l-5.6 5.6H20v2z"
      />
    </svg>
  );
};
