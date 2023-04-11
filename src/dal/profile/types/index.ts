import { UserType } from 'dal/users/types';

export type updateProfilePayloadtype = {
  name?: string;
  avatar?: string;
};
export type updateProfileResponseType = {
  updatedUser: UserType;
  error?: string;
};
