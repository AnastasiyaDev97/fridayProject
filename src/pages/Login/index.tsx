import { useEffect } from 'react';

import { useFormik } from 'formik';
import { Navigate, NavLink, useLocation } from 'react-router-dom';

import styles from './Login.module.scss';

import { ReturnComponentType } from 'common/types/ReturnComponentType';
import { SuperButton, SuperCheckbox, UniversalInput } from 'components';
import { EMPTY_STRING } from 'constants/index';
import { useLoginMutation } from 'dal/authorization';
import { FORMIK_FIELDS_NAME } from 'enums/FormikFieldName';
import { PATH } from 'enums/Path';
import { useAppDispatch, useAppSelector } from 'store';
import { setLoginStatus } from 'store/reducers/auth';
/* import { setProfileData } from 'store/reducers/profile'; */
import { setProfileData } from 'store/reducers/profile';
import { errorHandler } from 'utils/error-utils';
import { AuthData, validateLoginForm } from 'utils/validates';

const Login = (): ReturnComponentType => {
  const dispatch = useAppDispatch();
  const location = useLocation();

  const [login, { data: loginData, isError: isLoginError }] = useLoginMutation();

  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn);

  const fromPage = location?.state?.from?.pathname || '/';
  const userEmail: string = location?.state?.emailFromRegister;

  useEffect(() => {
    if (loginData) {
      dispatch(setLoginStatus(true));
      dispatch(setProfileData(loginData));
    }
    if (isLoginError) {
      errorHandler(dispatch);
    }
  }, [loginData, dispatch, isLoginError]);

  const formik = useFormik({
    initialValues: {
      email: userEmail || /* (process.env.REACT_APP_EMAIL as string) ||  */ '',
      password: /* (process.env.REACT_APP_PASSWORD as string) || */ '',
      rememberMe: false,
    },
    validate: values => {
      const errors: AuthData = {};

      validateLoginForm(values, errors);

      return errors;
    },
    onSubmit: values => {
      login(values);
    },
  });

  const conditionForDisableButton = !!(formik.errors.email || formik.errors.password);

  if (isLoggedIn) {
    return <Navigate to={fromPage} />;
  }

  return (
    <div className={styles.wrapper}>
      <h2>Welcome</h2>
      <form className={styles.form} onSubmit={formik.handleSubmit}>
        <div className={styles.inputsWrapper}>
          <UniversalInput
            validationErr={(formik.touched.email && formik.errors.email) || EMPTY_STRING}
            formikProps={formik.getFieldProps(FORMIK_FIELDS_NAME.EMAIL)}
          />

          <UniversalInput
            validationErr={
              (formik.touched.password && formik.errors.password) || EMPTY_STRING
            }
            formikProps={formik.getFieldProps(FORMIK_FIELDS_NAME.PASSWORD)}
            type="password"
          />
        </div>

        <SuperCheckbox
          checked={formik.values.rememberMe}
          {...formik.getFieldProps(FORMIK_FIELDS_NAME.REMEMBER_ME)}
        >
          Remember Me
        </SuperCheckbox>

        <SuperButton
          className={styles.submitBtn}
          type="submit"
          disabled={conditionForDisableButton}
        >
          Login
        </SuperButton>
      </form>
      <div className={styles.row}>
        <NavLink className={styles.registerLink} to={PATH.REGISTER}>
          Register
        </NavLink>
        <NavLink className={styles.registerLink} to={PATH.FORGOT_PASSWORD}>
          Lost Password?
        </NavLink>
      </div>
    </div>
  );
};

export default Login;
