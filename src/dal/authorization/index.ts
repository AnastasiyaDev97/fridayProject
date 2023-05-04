import URI from 'urijs';

import { clientAPI } from '..';
import type { builderType } from '..';
import { newPassDataType } from '../packs/types';

import {
  AuthPayloadDataType,
  RegisterPayloadDataType,
  ResponseForgotPasswordType,
  ResponseLoginType,
  ResponseLogoutType,
  ResponseRegisterType,
} from './types';

/*
<!--https://nastyaZ23.github.io/fridayProject-->*!/*/

const authAPI = clientAPI.injectEndpoints({
  endpoints: (build: builderType) => ({
    register: build.mutation<ResponseRegisterType, AuthPayloadDataType>({
      query(data) {
        const URL = new URI(`auth/register`);

        return {
          url: URL.toString(),
          method: 'POST',
          body: data,
        };
      },
    }),
    login: build.mutation<ResponseLoginType, RegisterPayloadDataType>({
      query(data) {
        const URL = new URI(`auth/login`);

        return {
          url: URL.toString(),
          method: 'POST',
          body: data,
        };
      },
    }),
    logout: build.mutation<ResponseLogoutType, void>({
      query() {
        const URL = new URI(`auth/me`);

        return {
          url: URL.toString(),
          method: 'DELETE',
        };
      },
      transformResponse: (response: { data: ResponseRegisterType }) => response.data,
    }),
    auth: build.mutation<ResponseLoginType, void>({
      query() {
        const URL = new URI(`auth/me`);

        return {
          url: URL.toString(),
          method: 'POST',
        };
      },
    }),
    sendPassword: build.mutation<ResponseForgotPasswordType, string>({
      query(email) {
        const messageDataPassword = {
          email,
          from: 'test-front-admin <ai73a@yandex.by>',
          message: `<div style="background-color: lime; padding: 15px">
    password recovery link: <a href='http://nastyaz23.github.io/fridayProject/#/new-password/$token$'<!--https://nastyaz23.github.io/fridayProject/#new-password/$token$-->'>
    link</a></div>`,

          /* http://localhost:3000/#/new-password/$token$*/
        };

        const URL = new URI(`auth/forgot`);

        return {
          url: URL.toString(),
          method: 'POST',
          body: messageDataPassword,
        };
      },
      transformResponse: (response: { data: ResponseRegisterType }) => response.data,
    }),
    setNewPassword: build.mutation<ResponseLogoutType, newPassDataType>({
      query(data) {
        const URL = new URI(`auth/set-new-password`);

        return {
          url: URL.toString(),
          method: 'POST',
          body: data,
        };
      },
      transformResponse: (response: { data: ResponseLogoutType }) => response.data,
    }),
  }),
});

export const {
  useAuthMutation,
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useSendPasswordMutation,
  useSetNewPasswordMutation,
} = authAPI;
