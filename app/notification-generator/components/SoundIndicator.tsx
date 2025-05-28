import React from 'react';

interface SoundIndicatorProps {
  sound: string;
  playSound: boolean;
}

const SoundIndicator = React.memo(({ sound, playSound }: SoundIndicatorProps) => {
  if (!sound || !playSound) return null;
  
  return (
    <div 
      className="absolute right-4 top-4 flex items-center rounded-md bg-black bg-opacity-50 px-3 py-1 text-sm text-white"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="mr-1 h-4 w-4"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM12.293 7.293a1 1 0 011.414 0L15 8.586l1.293-1.293a1 1 0 111.414 1.414L16.414 10l1.293 1.293a1 1 0 01-1.414 1.414L15 11.414l-1.293 1.293a1 1 0 01-1.414-1.414L13.586 10l-1.293-1.293a1 1 0 010-1.414z"
          clipRule="evenodd"
        />
      </svg>
      <span>
        {sound}
      </span>
    </div>
  );
});

SoundIndicator.displayName = 'SoundIndicator';

export default SoundIndicator; 