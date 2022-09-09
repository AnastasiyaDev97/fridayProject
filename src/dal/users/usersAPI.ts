import { instance } from '../apiConfig';
import { Nullable } from '../../types/Nullable';
import {
  getUsersQueryParamsType,
  getUserQueryParamsType,
  getUsersResponseType,
  getUserResponseType,
} from './types';

export const usersAPI = {
  getUsers(getUsersQueryParams: Nullable<getUsersQueryParamsType>) {
    return instance
      .get<getUsersResponseType>(`social/users`, {
        params: getUsersQueryParams,
      })
      .then((res) => res.data);
  },
  getUser(getUserQueryParams: Nullable<getUserQueryParamsType>) {
    return instance
      .get<getUserResponseType>(`social/user`, {
        params: getUserQueryParams,
      })
      .then((res) => res.data);
  },
};
