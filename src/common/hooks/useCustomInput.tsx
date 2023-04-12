import { ChangeEvent, useState, useCallback } from 'react';

type useCustomInputReturnType = {
  state: string | undefined;
  resetState: () => void;
  onChangeInput: (e: ChangeEvent<HTMLInputElement>) => void;
};

export const useCustomInput = (defaultValue?: string): useCustomInputReturnType => {
  const [state, setState] = useState<string | undefined>(defaultValue);
  const onChangeInput = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setState(e.currentTarget.value);
  }, []);
  const resetState = useCallback(() => {
    setState('');
  }, []);

  return { state, resetState, onChangeInput };
};
