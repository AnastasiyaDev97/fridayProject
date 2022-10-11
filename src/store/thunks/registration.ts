import { AppDispatch } from '../store';
import { setAppStatusAC } from '../reducers/app-reducer';
import { STATUS } from '../../enums/StatusType';
import { authorizationAPI } from '../../dal/authorization/authorization';
import { catchErrorHandler } from '../../utils/error-utils';
import { registerStatusAC } from '../reducers/registration-reducer';

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
