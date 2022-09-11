import { ChangeEvent, useState, useCallback } from 'react';

export const useCustomInput = (defaultValue?: string) => {
  const [state, setState] = useState<string | undefined>(defaultValue);
  const onChangeInput = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setState(e.currentTarget.value);
  }, []);
  const resetState = useCallback(() => {
    setState('');
  }, []);
  return { state, resetState, onChangeInput };
};
