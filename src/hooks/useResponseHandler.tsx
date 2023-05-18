import { useEffect } from 'react';

import { STATUS } from 'constants/app';
import { useAppDispatch } from 'store';
import { setAppStatus, setErrorText } from 'store/reducers';

type UseResponsePropsType = {
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  errorText?: string;
};

export const useResponseHandler = ({
  isLoading,
  isSuccess,
  isError,
  errorText,
}: UseResponsePropsType): void => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isLoading) {
      dispatch(setAppStatus({ status: STATUS.LOADING }));
    }
    if (isSuccess) {
      dispatch(setAppStatus({ status: STATUS.SUCCEEDED }));
    }
    if (isError) {
      dispatch(setAppStatus({ status: STATUS.FAILED }));
      dispatch(setErrorText({ errorText: errorText || 'Something went wrong' }));
    }
  }, [dispatch, isLoading, isSuccess, isError, errorText]);
};
