import { authorizationAPI } from '../../dal/authorization/authorization';
import { newPassDataType } from '../../dal/packs/types';
import { STATUS } from '../../enums/StatusType';
import { catchErrorHandler } from '../../utils/error-utils';
import { setAppStatusAC } from '../reducers/app-reducer';
import {
  addEmailAC,
  SetResponseInfoForgotPassAC,
  SetResponseInfoNewPassAC,
} from '../reducers/passwordRecovery-reducer';
import { AppDispatch } from '../store';

export const sendPassword = (email: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setAppStatusAC(STATUS.LOADING));
    let res = await authorizationAPI.sendPassword(email);

    dispatch(addEmailAC(email));
    res.info && dispatch(SetResponseInfoForgotPassAC(res.info));
    dispatch(setAppStatusAC(STATUS.SUCCEEDED));
  } catch (err) {
    catchErrorHandler(dispatch, err);
  }
};

export const setNewPasswordTC =
  (newPassData: newPassDataType) => async (dispatch: AppDispatch) => {
    try {
      dispatch(setAppStatusAC(STATUS.LOADING));
      let res = await authorizationAPI.setNewPassword(newPassData);

      res.info && dispatch(SetResponseInfoNewPassAC(res.info));
      dispatch(setAppStatusAC(STATUS.SUCCEEDED));
    } catch (err) {
      catchErrorHandler(dispatch, err);
    }
  };
