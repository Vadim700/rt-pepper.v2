import { useRef, useEffect } from 'react';

export const useWindowWidth = () => {
  const windowWidthRef = useRef(window.innerWidth);

  useEffect(() => {
    const handleWindowResize = () => {
      windowWidthRef.current = window.innerWidth;
    };

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  return windowWidthRef;
};
