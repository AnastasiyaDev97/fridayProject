import { useCallback, useEffect, useState } from 'react';

import { useFormik } from 'formik';
import { NavLink, useNavigate } from 'react-router-dom';

import { ReturnComponentType } from 'common/types/ReturnComponentType';
import { UniversalInput, SuperButton } from 'components';
import { EMPTY_STRING } from 'constants/index';
import { ROUTES } from 'constants/routes';
import { useSendPasswordMutation } from 'dal/authorization';
import { useResponseHandler } from 'hooks/useResponseHandler';
import styles from 'pages/Login/Login.module.scss';
import { useAppDispatch, useAppSelector } from 'store';
import { setProfileData } from 'store/reducers';
import { AuthData, validateForgotPasswordForm } from 'utils';

const ForgotPassword = (): ReturnComponentType => {
  const dispatch = useAppDispatch();

  const [
    sendPassword,
    { data: sendPasswordResponseData, isError, isLoading, isSuccess },
  ] = useSendPasswordMutation();

  const navigate = useNavigate();

  const emailForRecovery = useAppSelector(state => state.profile.email);

  const [isCheckEmailDataShow, setIsCheckEmailDataShow] = useState(false);

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
      sendPassword(values.email);
      dispatch(setProfileData({ email: values.email }));
      formik.resetForm();
    },
  });

  const onButtonTogglePasswordStatusClick = useCallback(() => {
    setIsCheckEmailDataShow(false);
    navigate(ROUTES.LOGIN);
  }, [navigate]);

  const isActionButtonDisabled = Object.keys(formik.errors)?.length > 0 || !formik.dirty;

  useEffect(() => {
    if (sendPasswordResponseData?.success) {
      setIsCheckEmailDataShow(true);
    }
  }, [sendPasswordResponseData]);

  useResponseHandler({
    isLoading,
    isSuccess,
    isError,
  });

  return (
    <div className={styles.wrapper}>
      {isCheckEmailDataShow ? (
        <div className={styles.sendMailBlock}>
          <h2 className={styles.title}>Check email</h2>
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
      ) : (
        <>
          <h2 className={styles.title}>Forgot your password?</h2>
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

            <SuperButton
              className={styles.submitBtn}
              type="submit"
              disabled={isActionButtonDisabled}
            >
              Send instructions
            </SuperButton>
          </form>
          <div>Do you remember your password?</div>
          <NavLink className={styles.registerLink} to={ROUTES.LOGIN}>
            Try logging in
          </NavLink>
        </>
      )}
    </div>
  );
};

export default ForgotPassword;
