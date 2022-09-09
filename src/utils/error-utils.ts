import { setAppStatusAC, setErrorText } from '../store/reducers/app-reducer';
import { AppDispatch } from '../store/store';
import { STATUS } from '../enum/StatusType';

export const catchErrorHandler = (dispatch: AppDispatch, err: any) => {
  dispatch(setErrorText(err?.response ? err?.response?.data?.error : err));
  dispatch(setAppStatusAC(STATUS.FAILED));
};
