import { ThunkType } from '../store';
import { STATUS } from '../../enum/StatusType';
import { authorizationAPI } from '../../dal/authorization/authorization';
import { isAuthToggleAC } from '../reducers/login-reducer';
import { setProfileAC } from '../reducers/profile-reducer';
import { setAppStatusAC, setIsInitializedAC } from '../reducers/app-reducer';

export const initializeAppTC = (): ThunkType => async (dispatch) => {
  try {
    dispatch(setAppStatusAC(STATUS.LOADING));
    const res = await authorizationAPI.authMe();
    dispatch(isAuthToggleAC(true));
    dispatch(setProfileAC(res));
  } catch (err) {
    dispatch(isAuthToggleAC(false));
  } finally {
    dispatch(setAppStatusAC(STATUS.SUCCEEDED));
    dispatch(setIsInitializedAC());
  }
};
