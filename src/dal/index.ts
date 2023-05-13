import type { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
} from '@reduxjs/toolkit/query/react';

const CLIENT_API_OPTIONS = {
  baseUrl: process.env.REACT_APP_BASE_URL,
};

/* 'http://localhost:7542/2.0/'  */
export const clientAPI = createApi({
  reducerPath: 'clientAPI',
  baseQuery: fetchBaseQuery({
    ...CLIENT_API_OPTIONS,
    credentials: 'include',
  }),

  tagTypes: ['Cards', 'Packs'],
  endpoints: () => ({}),
});

export type builderType = EndpointBuilder<
  BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError,
    Record<string, unknown>,
    FetchBaseQueryMeta
  >,
  'Cards' | 'Packs',
  'clientAPI'
>;
