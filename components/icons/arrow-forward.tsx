import React from "react";

interface ArrowForwardProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
}

export const ArrowForward: React.FC<ArrowForwardProps> = ({ className = "", ...props }) => {
  return (
<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M16.175 13H4v-2h12.175l-5.6-5.6L12 4l8 8l-8 8l-1.425-1.4z"/></svg>
  );
};
