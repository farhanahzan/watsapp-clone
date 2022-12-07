import React, { useEffect, useState } from 'react';

export default function PregressiveImage({
  imgSrc,
  previewSrc,
  width,
  height,
}) {
  const [usedSrc, setUsedSrc] = useState(previewSrc);
  const [usedEffectStyle, setUsedEffectStyle] = useState({
    filter: 'blur(5px)',
    clipPath: 'inset(0)',
  });

  useEffect(() => {
    const img = new Image();
    img.src = imgSrc;
    img.onload = () => {
      setUsedSrc(img.src);
      setUsedEffectStyle({});
    };
  }, []);

  return (
    <img
      src={usedSrc}
      width={width}
      height={height}
      style={{
        pointerEvents: 'all',
        maxWidth: '250px',
        objectFit: 'scale-down',
        background: '#ffffff',
        transition: 'filter 0.1s ease-out',
        cursor: '-webkit-zoom-in',
        cursor: 'zoom-in',
        ...usedEffectStyle,
      }}
    />
  );
}
