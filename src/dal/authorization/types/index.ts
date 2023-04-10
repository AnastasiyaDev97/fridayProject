export type ResponseLoginType = {
  avatar: string;
  created: string;
  email: string;
  isAdmin: boolean;
  name: string;
  publicCardPacksCount: number;
  rememberMe: boolean;
  token: string;
  tokenDeathTime: number;
  updated: string;
  error?: string;
};

export type ResponseRegisterType = {
  addedUser: ResponseLoginType;
  error?: string;
};

export type RegisterErrorResponseType = {
  error?: string;
};
export type ResponseLogoutType = {
  info?: string;
  error?: string;
};

export type ResponseForgotPasswordType = {
  answer?: boolean;
  html?: boolean;
  info?: string;
  success?: boolean;
  error?: string;
};

export type AuthPayloadDataType = {
  email: string;
  password: string;
};

export type RegisterPayloadDataType = { rememberMe: boolean } & AuthPayloadDataType;
