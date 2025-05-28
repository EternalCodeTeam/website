import React from 'react';

const BackgroundImage = React.memo(() => {
  return (
    <img
      src="/mc-bg.png"
      alt="Minecraft background"
      className="pointer-events-none absolute inset-0 h-full w-full select-none object-cover"
      style={{ zIndex: 0 }}
    />
  );
});

BackgroundImage.displayName = 'BackgroundImage';

export default BackgroundImage; 