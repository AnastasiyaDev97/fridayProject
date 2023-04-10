import { authorizationAPI } from '../../dal/authorization/authorization';

import { catchErrorHandler } from '../../utils/error-utils';
import { setAppStatusAC } from '../reducers/app-reducer';
import { isAuthToggleAC, loginAuthDataType } from '../reducers/login-reducer';
import { setProfileAC } from '../reducers/profile-reducer';
import { AppDispatch } from '../store';

export const loginTC =
  (loginAuthData: loginAuthDataType) => async (dispatch: AppDispatch) => {
    try {
      dispatch(setAppStatusAC(STATUS.LOADING));
      let res = await authorizationAPI.loginMe(loginAuthData);

      dispatch(setAppStatusAC(STATUS.SUCCEEDED));
      dispatch(isAuthToggleAC(true));
      dispatch(setProfileAC(res));
    } catch (err) {
      catchErrorHandler(dispatch, err);
    }
  };

export const logoutTC = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(setAppStatusAC(STATUS.LOADING));
    await authorizationAPI.logoutMe();
    dispatch(setAppStatusAC(STATUS.SUCCEEDED));
    dispatch(isAuthToggleAC(false));
  } catch (err) {
    catchErrorHandler(dispatch, err);
  }
};
