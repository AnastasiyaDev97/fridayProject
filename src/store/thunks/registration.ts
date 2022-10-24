import { authorizationAPI } from '../../dal/authorization/authorization';
import { STATUS } from '../../enums/StatusType';
import { catchErrorHandler } from '../../utils/error-utils';
import { setAppStatusAC } from '../reducers/app-reducer';
import { registerStatusAC } from '../reducers/registration-reducer';
import { AppDispatch } from '../store';

export const registerMeTC =
  (email: string, password: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(setAppStatusAC(STATUS.LOADING));
      await authorizationAPI.registerMe(email, password);
      dispatch(registerStatusAC(true));
      dispatch(setAppStatusAC(STATUS.SUCCEEDED));
    } catch (err) {
      catchErrorHandler(dispatch, err);
      dispatch(registerStatusAC(false));
    }
  };
