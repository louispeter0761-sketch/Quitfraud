import React from 'react';

interface LottiePlayerProps {
  src: string;
  className?: string;
  title?: string;
}

export const LottiePlayer: React.FC<LottiePlayerProps> = ({
  src,
  className = 'w-full h-full',
  title = 'Security Animation'
}) => {
  return (
    <div className={`relative overflow-hidden flex items-center justify-center ${className}`}>
      <iframe
        src={src}
        title={title}
        className="w-full h-full border-0 pointer-events-none"
        allow="autoplay"
        loading="lazy"
      />
    </div>
  );
};
