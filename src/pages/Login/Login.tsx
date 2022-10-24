import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, NavLink } from 'react-router-dom';

import styles from './Login.module.scss';

import { SuperButton } from 'components/SuperButton';
import { SuperCheckbox } from 'components/SuperCheckbox';
import { UniversalInput } from 'components/UniversalInput';
import { EMPTY_STRING } from 'constants/index';
import { BUTTON_TYPE } from 'enums/ButtonTyoe';
import { FORMIK_FIELDS_NAME } from 'enums/FormikFieldNames';
import { INPUT_TYPE } from 'enums/InputType';
import { PATH } from 'enums/Path';
import { AppRootStateType } from 'store/store';
import { loginTC } from 'store/thunks/login';
import { ReturnComponentType } from 'types/ReturnComponentType';
import { AuthData, validateLoginForm } from 'utils/validates';

const Login = (): ReturnComponentType => {
  const dispatch = useDispatch();

  let isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.login.isLoggedIn);

  const formik = useFormik({
    initialValues: {
      email: (process.env.REACT_APP_EMAIL as string) || '',
      password: (process.env.REACT_APP_PASSWORD as string) || '',
      rememberMe: false,
    },
    validate: values => {
      const errors: AuthData = {};

      validateLoginForm(values, errors);

      return errors;
    },
    onSubmit: values => {
      dispatch(loginTC(values));
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
            type={INPUT_TYPE.PASSWORD}
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
          type={BUTTON_TYPE.SUBMIT}
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
