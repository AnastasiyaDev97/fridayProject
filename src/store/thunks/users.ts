import { AppDispatch, RootReducerType } from '../store';
import { setAppStatusAC } from '../reducers/app-reducer';
import { STATUS } from '../../enum/StatusType';
import { usersAPI } from 'dal/users/usersAPI';
import { catchErrorHandler } from '../../utils/error-utils';
import { getUsersAC } from 'store/reducers/users-reducer';

export const getUsersTC =
  (userName?: string) =>
  async (dispatch: AppDispatch, getState: () => RootReducerType) => {
    const { min, max, page, sortUsers, pageCount } = getState().users;
    try {
      dispatch(setAppStatusAC(STATUS.LOADING));
      let data = await usersAPI.getUsers({
        userName,
        min,
        max,
        page,
        sortUsers,
        pageCount,
      });
      dispatch(getUsersAC(data?.users));
      dispatch(setAppStatusAC(STATUS.SUCCEEDED));
    } catch (err) {
      catchErrorHandler(dispatch, err);
    }
  };
