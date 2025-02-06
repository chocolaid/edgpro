import React, { useState } from 'react';

export default function IFramer({ url, style = {}, setIsLoading, children }) {
  const [iframeLoaded, setIframeLoaded] = useState(false);

  const handleLoad = () => {
    setIframeLoaded(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 500); // Small delay for smooth transition
  };

  return (
    <div style={{ position: 'relative' }}>
      <img 
        // src={`/api/screenshot?url=${encodeURIComponent(url)}`}
        src={`https://api.screenshotmachine.com?key=82b098&url=${encodeURIComponent(url)}&dimension=1920x1080`}
        style={{ 
          width: '100vw', 
          height: '100vh', 
          objectFit: 'cover',
          pointerEvents: 'none',
          transition: 'opacity 0.3s ease',
          opacity: iframeLoaded ? '1' : '0',
          zIndex: 1,
          ...style 
        }}
        alt="page"
        onLoad={handleLoad}
        onError={() => setIsLoading(false)}
        loading="lazy"
      />
      <div 
        style={{ 
          position: 'absolute', 
          top: 0, 
          left: 0, 
          right: 0, 
          bottom: 0, 
          zIndex: 999,
          opacity: iframeLoaded ? 1 : 0,
          transition: 'opacity 0.3s ease',
          pointerEvents: iframeLoaded ? 'auto' : 'none'
        }}
      >
        {children}
      </div>
    </div>
  );
}
