import React from 'react';

interface InlineProps {
  children: React.ReactNode;
}

export const Inline: React.FC<InlineProps> = ({ children }) => {
  return (
    <div className="inline-block rounded-md border border-neutral-700 bg-[#161b22] px-1.5 py-0.5 text-sm text-neutral-300 font-mono">
      {children}
    </div>
  );
};
