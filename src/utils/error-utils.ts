import { AppDispatch } from 'store';
import { setAppStatus, setErrorText } from 'store/reducers/app';

export const catchErrorHandler = (dispatch: AppDispatch, err: any): void => {
  dispatch(setErrorText({ errorText: err?.response ? err?.response?.data?.error : err }));
  dispatch(setAppStatus({ status: 'failed' }));
};
