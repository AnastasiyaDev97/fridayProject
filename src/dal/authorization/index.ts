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
    setNewPassword: build.mutation<ResponseLogoutType, newPassDataType>({
      query(data) {
        const URL = new URI(`auth/set-new-password`);

        return {
          url: URL.toString(),
          method: 'POST',
          body: data,
        };
      },
    }),
  }),
});

const passworsAPI = clientAPI.injectEndpoints({
  endpoints: (build: builderType) => ({
    sendPassword: build.mutation<ResponseForgotPasswordType, string>({
      query(email) {
        const messageDataPassword = {
          email,
          from: 'test-front-admin <ai73a@yandex.by>',
          message: `<div style="padding: 15px">
password recovery link: <a href='https://anastasiyadev97.github.io/fridayProject/#/new-password/$token$'>
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
    }),
  }),
});

export const {
  useAuthMutation,
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useSetNewPasswordMutation,
} = authAPI;

export const { useSendPasswordMutation } = passworsAPI;
