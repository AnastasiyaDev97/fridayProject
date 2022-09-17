import { useEffect } from 'react';

export const UseSetTimeoutEffect = (
  callBack: () => void,
  dependencies: any,
  ms: number
) => {
  useEffect(() => {
    let idOfTimeout = setTimeout(() => {
      callBack();
    }, ms);
    return () => {
      clearTimeout(idOfTimeout);
    };
  }, [dependencies, callBack, ms]);
};
