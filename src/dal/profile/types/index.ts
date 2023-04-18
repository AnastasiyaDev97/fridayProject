import { UserType } from 'dal/users/types';

export type UpdateProfilePayloadtype = {
  name?: string;
  avatar?: string;
};
export type UpdateProfileResponseType = {
  updatedUser: UserType;
  error?: string;
};
