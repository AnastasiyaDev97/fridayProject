import type { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.REACT_APP_BASE_URL || 'http://localhost:7542/2.0/',
  credentials: 'include',
});
const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);

  if (
    result.error &&
    result.error.status === 401 &&
    typeof args !== 'string' &&
    args?.url !== 'auth/me'
  ) {
    window.location.pathname = `/login`;
  }

  return result;
};

export const clientAPI = createApi({
  reducerPath: 'clientAPI',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Cards', 'Packs'],
  endpoints: () => ({}),
});

export type builderType = EndpointBuilder<
  BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError>,
  'Cards' | 'Packs',
  'clientAPI'
>;
