import { ERROR_MESSAGE } from 'constants/message';

export type AuthData = {
  email?: string;
  password?: string;
  confirmPassword?: string;
};

type valuesRegisterForm = {
  email?: string;
  password?: string;
  confirmPassword?: string;
};

const minPasswordLength = 8;
const passwordRegex = /(?=.*[0-9])/;
const checkEmail = (values: valuesRegisterForm, errors: AuthData): void => {
  if (!values.email) {
    errors.email = ERROR_MESSAGE.REQUIRED;
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = ERROR_MESSAGE.INVALID_EMAIL;
  }
};

const checkPassword = (values: valuesRegisterForm, errors: AuthData): void => {
  if (!values.password) {
    errors.password = ERROR_MESSAGE.REQUIRED;
  } else if (values.password.length < minPasswordLength) {
    errors.password = ERROR_MESSAGE.SHORT_PASSWORD;
  } else if (!passwordRegex.test(values.password)) {
    errors.password = ERROR_MESSAGE.NEED_NUMBER;
  }
};

const checkConfirmPassword = (values: valuesRegisterForm, errors: AuthData): void => {
  if (!values.confirmPassword) {
    errors.confirmPassword = ERROR_MESSAGE.REQUIRED;
  }
  if (values.password && values.confirmPassword) {
    if (values.password !== values.confirmPassword) {
      errors.confirmPassword = ERROR_MESSAGE.NOT_MATCHED;
    }
  }
};

export const validates = (values: valuesRegisterForm, errors: AuthData): void => {
  checkEmail(values, errors);
  checkPassword(values, errors);
  checkConfirmPassword(values, errors);
};

export const validateLoginForm = (values: valuesRegisterForm, errors: AuthData): void => {
  checkEmail(values, errors);
  checkPassword(values, errors);
};

export const validateForgotPasswordForm = (
  values: valuesRegisterForm,
  errors: AuthData,
): void => {
  checkEmail(values, errors);
};

export const validateNewPasswordForm = (
  values: valuesRegisterForm,
  errors: AuthData,
): void => {
  checkPassword(values, errors);
};
