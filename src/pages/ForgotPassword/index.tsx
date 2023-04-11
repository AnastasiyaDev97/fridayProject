/* import { useCallback } from 'react'; */

import { useFormik } from 'formik';
import { NavLink /* , useNavigate  */ } from 'react-router-dom';
/* import {
  addEmailAC,
  SetResponseInfoForgotPassAC,
} from 'store/reducers/passwordRecovery-reducer'; */

import { SuperButton } from 'components/SuperButton';
import { UniversalInput } from 'components/UniversalInput';
import { EMPTY_STRING } from 'constants/index';
import { PATH } from 'enums/Path';
import styles from 'pages/Login/Login.module.scss';
/* import { useAppDispatch } from 'store'; */
/* import { sendPassword } from 'store/thunks/passwordRecovery'; */
import { ReturnComponentType } from 'common/types/ReturnComponentType';
import { AuthData, validateForgotPasswordForm } from 'utils/validates';

export const ForgotPassword = (): ReturnComponentType => {
  /*   const dispatch = useAppDispatch();

  const navigate = useNavigate(); */

  /*  const emailForRecovery = useAppSelector(state => state.passRecovery.emailForRecovery);
  const responseInfoForgotPass = useAppSelector(
    state => state.passRecovery.responseInfoForgotPass,
  ); */

  const formik = useFormik({
    initialValues: {
      email: EMPTY_STRING,
    },
    validate: values => {
      const errors: AuthData = {};

      validateForgotPasswordForm(values, errors);

      return errors;
    },

    onSubmit: values => {
      /* dispatch(sendPassword(values.email)); */
      formik.resetForm();
    },
  });

  /*   const onButtonTogglePasswordStatusClick = useCallback(() => {
    dispatch(SetResponseInfoForgotPassAC(EMPTY_STRING));
    dispatch(addEmailAC(EMPTY_STRING));
    navigate(PATH.LOGIN);
  }, [dispatch, navigate]); */

  return (
    <div className={styles.wrapper}>
      {/*   {responseInfoForgotPass ? (
        <div className={styles.sendMailBlock}>
          <h2>Check email</h2>
          <div className={styles.sendMailMessage}>
            We&apos;ve sent an Email with instructions to {emailForRecovery}
          </div>
          <SuperButton
            className={styles.sendMailBtn}
            type="button"
            onClick={onButtonTogglePasswordStatusClick}
          >
            Ok
          </SuperButton>
        </div>
      ) : ( */}
      <>
        <h2>Forgot your password?</h2>
        <form
          className={styles.form}
          onSubmit={e => {
            formik.handleSubmit(e);
          }}
        >
          <div className={styles.inputsWrapper}>
            <UniversalInput
              validationErr={
                (formik.touched.email && formik.errors.email) || EMPTY_STRING
              }
              formikProps={formik.getFieldProps('email')}
            />
          </div>

          <div>Enter your email address and we will send you further instructions</div>

          <SuperButton className={styles.submitBtn} type="submit">
            Send instructions
          </SuperButton>
        </form>
        <div>Do you remember your password?</div>
        <NavLink className={styles.registerLink} to={PATH.LOGIN}>
          Try logging in
        </NavLink>
      </>
      {/* )} */}
    </div>
  );
};