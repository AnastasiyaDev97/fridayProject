/* import { ActionsType } from './AC types/types'; */

/* import { Nullable } from 'common/types/Nullable';
import { getUsersResponseType, UserType } from 'dal/users/types/index';

const initialState = {
  users: null,
  page: null,
  pageCount: 7,
  usersTotalCount: null,
  min: null,
  max: null,
  sortUsers: null,
  userName: null,
  user: null,
}; */

/* type InitialStateType = {
  users: Nullable<UserType[]>;
  page: Nullable<number>;
  pageCount: number;
  usersTotalCount: Nullable<number>;
  min: Nullable<number>;
  max: Nullable<number>;
  sortUsers: Nullable<string>;
  userName: Nullable<string>;
  user: Nullable<UserType>;
};
 */
/* export const usersReducer = (
  state: InitialStateType = initialState,
  action : ActionsType,
) => {
  switch (action.type) {
    case 'USERS/GET_USERS_DATA':
    case 'USERS/CHANGE-PAGE':
      return { ...state, ...action.payload };

    default:
      return state;
  }
}; */

/* export const getUsersDataAC = (usersData: getUsersResponseType) => {
  return {
    type: 'USERS/GET_USERS_DATA',
    payload: usersData,
  } as const;
};

export const changePageUsersAC = (page: number) =>
  ({
    type: 'USERS/CHANGE-PAGE',
    payload: { page },
  } as const); */

/* export const setNewMinMaxValues = (min: number, max: number) =>
  ({
    type: 'USERS/SET-NEW-MIN-MAX-VALUE',
    payload: { min, max },
  } as const);

export const setSortingFilter = (sortUsers: string) =>
  ({
    type: 'USERS/SET-SORTING-FILTER',
    payload: { sortUsers },
  } as const);

export const changeSearchPackNameAC = (userName: string) =>
  ({
    type: 'USERS/CHANGE-SEARCH-PACK-NAME',
    payload: { userName },
  } as const);
 */
