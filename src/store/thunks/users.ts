/* import { STATUS } from '../../enums/StatusType';
import { catchErrorHandler } from '../../utils/error-utils';
import { setAppStatusAC } from '../reducers/app-reducer';
import { AppDispatch, AppRootStateType } from '../store';

import { usersAPI } from 'dal/users/usersAPI';
import { getUsersDataAC } from 'store/reducers/users-reducer';

export const getUsersTC =
  (userName?: string) =>
  async (dispatch: AppDispatch, getState: () => AppRootStateType) => {
    const { min, max, page, sortUsers, pageCount } = getState().users;

    try {
      dispatch(setAppStatusAC(STATUS.LOADING));
      let {
        users,
        page: getPage,
        pageCount: getPageCount,
        usersTotalCount,
      } = await usersAPI.getUsers({
        userName,
        min,
        max,
        page,
        sortUsers,
        pageCount,
      });

      dispatch(
        getUsersDataAC({
          users,
          page: getPage,
          pageCount: getPageCount,
          usersTotalCount,
        }),
      );
      dispatch(setAppStatusAC(STATUS.SUCCEEDED));
    } catch (err) {
      catchErrorHandler(dispatch, err);
    }
  };
 */

export {};
