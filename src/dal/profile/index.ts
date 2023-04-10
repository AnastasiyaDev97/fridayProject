import URI from 'urijs';

import { clientAPI } from '..';
import type { builderType } from '..';

import { updateProfilePayloadtype, updateProfileResponseType } from './types';

const profileAPI = clientAPI.injectEndpoints({
  endpoints: (build: builderType) => ({
    updateProfile: build.mutation<updateProfileResponseType, updateProfilePayloadtype>({
      query(data) {
        const URL = new URI(`auth/me`);

        return {
          url: URL.toString(),
          method: 'PUT',
          body: data,
        };
      },
      transformResponse: (response: { data: updateProfileResponseType }) => response.data,
    }),
  }),
});

export const { useUpdateProfileMutation } = profileAPI;
