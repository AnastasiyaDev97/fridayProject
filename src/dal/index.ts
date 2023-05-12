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

const PASSWORD_CLIENT_API_OPTIONS = {
  baseUrl: process.env.REACT_APP_BASE_URL,
};

export const clientAPI = createApi({
  reducerPath: 'clientAPI',
  baseQuery: fetchBaseQuery({
    ...CLIENT_API_OPTIONS,
    credentials: 'include',
  }),
  tagTypes: ['Cards', 'Packs'],
  endpoints: () => ({}),
});

export const passwordClientAPI = createApi({
  reducerPath: 'passwordClientAPI',
  baseQuery: fetchBaseQuery({
    ...PASSWORD_CLIENT_API_OPTIONS,
    credentials: 'include',
  }),
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

export type PasswordBuilderType = EndpointBuilder<
  BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError,
    Record<string, unknown>,
    FetchBaseQueryMeta
  >,
  '',
  'passwordClientAPI'
>;
