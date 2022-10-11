import { AppDispatch } from '../store';
import { setAppStatusAC } from '../reducers/app-reducer';
import { STATUS } from '../../enums/StatusType';
import { profileAPI } from '../../dal/profile/profileAPI';
import { catchErrorHandler } from '../../utils/error-utils';
import { setProfileAC } from '../reducers/profile-reducer';

export const updateProfileTC =
  (name?: string, avatar?: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(setAppStatusAC(STATUS.LOADING));
      let updatedProfile = await profileAPI.updateProfile({ name, avatar });
      dispatch(setProfileAC(updatedProfile));
      dispatch(setAppStatusAC(STATUS.SUCCEEDED));
    } catch (err) {
      catchErrorHandler(dispatch, err);
    }
  };
