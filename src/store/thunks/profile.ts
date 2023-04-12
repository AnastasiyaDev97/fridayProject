/* import { profileAPI } from '../../dal/profile/profileAPI';
import { STATUS } from '../../enums/StatusType';
import { catchErrorHandler } from '../../utils/error-utils';
import { setAppStatusAC } from '../reducers/app-reducer';
import { setProfileAC } from '../reducers/profile-reducer';
import { AppDispatch } from '../store';

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
 */

export {};
