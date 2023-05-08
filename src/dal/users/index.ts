import URI from 'urijs';

import {
  getUserQueryParamsType,
  getUserResponseType,
  getUsersQueryParamsType,
  getUsersResponseType,
} from './types';

import { builderType, clientAPI } from 'dal';

const usersAPI = clientAPI.injectEndpoints({
  endpoints: (build: builderType) => ({
    getUsers: build.query<getUsersResponseType, getUsersQueryParamsType>({
      query(queryParams) {
        const URL = new URI(`social/users`);

        URL.addQuery({ ...queryParams });

        return {
          url: URL.toString(),
        };
      },
    }),
    getUser: build.query<getUserResponseType, getUserQueryParamsType>({
      query(queryParams) {
        const URL = new URI(`social/user`);

        URL.addQuery({ ...queryParams });

        return {
          url: URL.toString(),
        };
      },
    }),
  }),
});

export const { useGetUsersQuery, useGetUserQuery } = usersAPI;
