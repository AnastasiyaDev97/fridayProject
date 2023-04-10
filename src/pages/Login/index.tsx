import { useEffect } from 'react';

import { useFormik } from 'formik';
import { Navigate, NavLink } from 'react-router-dom';

import styles from './Login.module.scss';

import { ReturnComponentType } from 'common/types/ReturnComponentType';
import { SuperButton } from 'components/SuperButton';
import { SuperCheckbox } from 'components/SuperCheckbox';
import { UniversalInput } from 'components/UniversalInput';
import { EMPTY_STRING } from 'constants/index';
import { useLoginMutation } from 'dal/authorization';
import { FORMIK_FIELDS_NAME } from 'enums/FormikFieldName';
import { PATH } from 'enums/Path';
import { useAppDispatch, useAppSelector } from 'store';
import { setLoginStatus } from 'store/reducers/auth';
import { setProfileData } from 'store/reducers/profile';
import { AuthData, validateLoginForm } from 'utils/validates';

export const Login = (): ReturnComponentType => {
  const dispatch = useAppDispatch();

  const [login, { data: loginData /* , error: loginError */ }] = useLoginMutation();

  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn);

  useEffect(() => {
    if (loginData) {
      dispatch(setLoginStatus(true));
      dispatch(setProfileData(loginData));
    }
  }, [loginData, dispatch]);

  const formik = useFormik({
    initialValues: {
      email: /* (process.env.REACT_APP_EMAIL as string) ||  */ '',
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
    return <Navigate to={PATH.START} />;
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
