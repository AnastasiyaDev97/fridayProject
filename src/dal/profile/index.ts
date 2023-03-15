import URI from 'urijs';

import { clientAPI } from '..';

import { updateProfilePayloadtype, updateProfileResponseType } from './types';

/* export const profileAPI = {
  updateProfile(payload: updateProfilePayloadtype) {
    return instance.put<updateProfileResponseType>(`auth/me`, payload).then(res => {
      return res.data.updatedUser;
    });
  },
}; */

const profileAPI = clientAPI.injectEndpoints({
  endpoints: build => ({
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
