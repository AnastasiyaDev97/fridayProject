import { useState, useEffect } from 'react';

const getWindowDimensions = () => {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
};

const useWindowDimensions = () => {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );
  const [isMobile, setIsMobile] = useState<boolean>();
  const [isTablet, setIsTablet] = useState<boolean>();
  const [isDesktop, setIsDesktop] = useState<boolean>();

  useEffect(() => {
    const handleResize = () => {
      setWindowDimensions(getWindowDimensions());
      setIsMobile(getWindowDimensions().width < 575);
      setIsTablet(getWindowDimensions().width < 990);
      setIsDesktop(getWindowDimensions().width < 1200);
    };
    setIsMobile(getWindowDimensions().width < 575);
    setIsTablet(getWindowDimensions().width < 990);
    setIsDesktop(getWindowDimensions().width < 1200);

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return {
    width: windowDimensions.width,
    height: windowDimensions.height,
    isMobile,
    isTablet,
    isDesktop,
  };
};

export default useWindowDimensions;
