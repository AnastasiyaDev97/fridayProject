import { Nullable } from 'common/types/Nullable';

export type getUsersResponseType = {
  users: Array<UserType>;
  page: number;
  pageCount: number;
  usersTotalCount: number;
};
export type getUserResponseType = {
  user: UserType;
};
export interface UserType {
  avatar: string;
  email: string;
  name: string;
  publicCardPacksCount: number;
  _id?: string;
}

export type getUsersQueryParamsType = {
  userName?: Nullable<string>;
  min?: Nullable<number>;
  max?: Nullable<number>;
  sortUsers?: Nullable<string>;
  page?: Nullable<number>;
  pageCount?: number;
};

export type getUserQueryParamsType = {
  id?: string;
};
