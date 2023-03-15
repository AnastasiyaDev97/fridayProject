import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
/* import axios from 'axios'; */

/* export const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  withCredentials: true,
}); */

const CLIENT_API_OPTIONS = {
  baseUrl: 'http://localhost:7542/2.0/',
};

export const clientAPI = createApi({
  reducerPath: 'clientAPI',
  baseQuery: fetchBaseQuery({
    ...CLIENT_API_OPTIONS,
    credentials: 'include',
  }),
  endpoints: () => ({}),
});

/* export function providesList<R extends { id: string | number }[], T extends string>(
  resultsWithIds: R | undefined,
  tagType: T,
) {
  return resultsWithIds
    ? [
        { type: tagType, id: 'LIST' },
        ...resultsWithIds.map(({ id }) => ({ type: tagType, id })),
      ]
    : [{ type: tagType, id: 'LIST' }];
} */
