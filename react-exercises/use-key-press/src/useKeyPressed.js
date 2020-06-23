import { useState, useEffect, useCallback } from 'react';

const useKeyPress = (config) => {
  const currentKey = config.replace(/[<>]+/g, "");
  const [isKeyPressed, setIsKeyPressed] = useState(false);

  const handleKeyPress = useCallback((event) => {
    if (currentKey.toUpperCase() === event.key.toUpperCase()) {
      setIsKeyPressed(true);
    } else {
      setIsKeyPressed(false);
    }
  }, [currentKey]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress, true);

    return () => {
      document.removeEventListener('keydown', handleKeyPress, true);
    };
  }, [handleKeyPress]);

  return isKeyPressed;
};

export default useKeyPress;
