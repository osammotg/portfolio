import React from 'react';

interface SplineViewerProps {
  url: string;
  className?: string;
}

const SplineViewer: React.FC<SplineViewerProps> = ({ url, className = '' }) => {
  return (
    <iframe
      src={url}
      className={className}
      frameBorder="0"
      allowFullScreen
      allow="autoplay"
      title="3D Robot Scene"
      style={{ background: 'transparent', border: 'none' }}
    />
  );
};

export default SplineViewer;
