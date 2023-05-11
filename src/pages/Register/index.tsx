import { useCallback, useEffect } from 'react';

import { useFormik } from 'formik';
import { Navigate, useNavigate } from 'react-router-dom';

import { InputType } from 'common/types/InputType';
import { ReturnComponentType } from 'common/types/ReturnComponentType';
import { SuperButton, UniversalInput } from 'components';
import { REGISTRATION_FORM_FIELDS } from 'constants/form';
import { EMPTY_STRING } from 'constants/index';
import { ROUTES } from 'constants/routes';
import { useRegisterMutation } from 'dal/authorization';
import styles from 'pages/Login/Login.module.scss';
import { useAppDispatch, useAppSelector } from 'store';
import { setRegisterStatus } from 'store/reducers';
import { errorHandler, AuthData, validates } from 'utils';

const Register = (): ReturnComponentType => {
  const dispatch = useAppDispatch();

  const [register, { data: registerData, isError: isRegisterError }] =
    useRegisterMutation();

  const navigate = useNavigate();

  const registerStatus = useAppSelector(state => state.auth.isRegistered);

  const formik = useFormik({
    initialValues: {
      email: EMPTY_STRING,
      password: EMPTY_STRING,
      confirmPassword: EMPTY_STRING,
    },

    validate: values => {
      const errors: AuthData = {};

      validates(values, errors);

      return errors;
    },

    onSubmit: ({ email, password }) => {
      register({ email, password });
    },
  });

  const isRegisterButtonDisabled =
    Object.keys(formik.errors)?.length > 0 || Object.keys(formik.touched)?.length === 0;

  useEffect(() => {
    if (registerData) {
      dispatch(setRegisterStatus(true));
    }
    if (isRegisterError) {
      errorHandler(dispatch);
    }
  }, [registerData, dispatch, isRegisterError]);

  const onCancelButtonClick = useCallback(() => {
    formik.resetForm();
    navigate(ROUTES.LOGIN);
  }, [formik, navigate]);

  if (registerStatus) {
    return (
      <Navigate
        to={ROUTES.LOGIN}
        state={{ emailFromRegister: registerData?.addedUser?.email }}
        replace
      />
    );
  }

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Sign up</h2>
      <form onSubmit={formik.handleSubmit} className={styles.form}>
        <div className={styles.inputsWrapper}>
          {REGISTRATION_FORM_FIELDS.map(
            ({
              register,
              placeholder,
              type,
            }: {
              register: string;
              placeholder: string;
              type: InputType;
            }) => (
              <UniversalInput
                validationErr={
                  (formik.touched[register as keyof typeof formik.touched] &&
                    formik.errors[register as keyof typeof formik.touched]) ||
                  EMPTY_STRING
                }
                formikProps={formik.getFieldProps(register)}
                type={type}
                placeholder={placeholder}
                key={register}
              />
            ),
          )}
        </div>

        <div className={styles.row}>
          <div className={styles.registrationBtns}>
            <SuperButton
              type="submit"
              className={styles.registerBtn}
              disabled={isRegisterButtonDisabled}
            >
              Register
            </SuperButton>
            <SuperButton
              type="button"
              onClick={onCancelButtonClick}
              className={styles.registerBtn}
            >
              Cancel
            </SuperButton>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Register;
