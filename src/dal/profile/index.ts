import URI from 'urijs';

import { clientAPI } from '..';
import type { builderType } from '..';

import { UpdateProfilePayloadtype, UpdateProfileResponseType } from './types';

const profileAPI = clientAPI.injectEndpoints({
  endpoints: (build: builderType) => ({
    updateProfile: build.mutation<UpdateProfileResponseType, UpdateProfilePayloadtype>({
      query(data) {
        const URL = new URI(`auth/me`);

        return {
          url: URL.toString(),
          method: 'PUT',
          body: data,
        };
      },
    }),
  }),
  overrideExisting: false,
});

export const { useUpdateProfileMutation } = profileAPI;
