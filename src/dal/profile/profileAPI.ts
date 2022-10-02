import { instance } from '../apiConfig';
import { updateProfilePayloadtype, updateProfileResponseType } from './types';

export const profileAPI = {
  updateProfile(payload: updateProfilePayloadtype) {
    return instance
      .put<updateProfileResponseType>(`auth/me`, payload)
      .then((res) => {
        return res.data.updatedUser;
      });
  },
};
