import { useCallback, useEffect } from 'react';
import { useFormik } from 'formik';
import SuperButton from '../components/TestComponents/components/c2-SuperButton/SuperButton';
import { Navigate, useNavigate } from 'react-router-dom';
import { registerStatusAC } from '../store/reducers/registration-reducer';
import { useDispatch, useSelector } from 'react-redux';
import { RootReducerType } from '../store/store';
import styles from 'pages/Login/Login.module.scss';
import { InputType, UniversalInput } from '../components/Input/UniversalInput';

import { EMPTY_STRING } from '../constants';
import { registerMeTC } from '../store/thunks/registration';
import { PATH } from '../enums/Path';
import { BUTTON_TYPE } from '../enums/ButtonTyoe';
import { AuthData, validates } from '../utils/validates';
import { REGISTRATION_FORM_FIELDS } from 'constants/form';

export const Registration = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const registerStatus = useSelector<RootReducerType, boolean>(
    (state) => state.register.registerStatus
  );

  const formik = useFormik({
    initialValues: {
      email: EMPTY_STRING,
      password: EMPTY_STRING,
      confirmPassword: EMPTY_STRING,
    },

    validate: (values) => {
      const errors: AuthData = {};
      validates(values, errors);
      return errors;
    },

    onSubmit: (values) => {
      dispatch(registerMeTC(values.email, values.password));
      formik.resetForm();
    },
  });

  useEffect(() => {
    return () => {
      dispatch(registerStatusAC(false));
    };
  });

  const onCancelButtonClick = useCallback(() => {
    formik.resetForm();
    navigate(PATH.LOGIN);
  }, [formik, navigate]);

  if (registerStatus) {
    return <Navigate to={PATH.LOGIN} />;
  }

  return (
    <div className={styles.wrapper}>
      <h2>Sign up</h2>
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
              />
            )
          )}
        </div>

        <div className={styles.row}>
          <div className={styles.registrationBtns}>
            <SuperButton
              type={BUTTON_TYPE.BUTTON}
              onClick={onCancelButtonClick}
              className={styles.registerBtn}
            >
              Cancel
            </SuperButton>
            <SuperButton
              type={BUTTON_TYPE.SUBMIT}
              className={styles.registerBtn}
            >
              Register
            </SuperButton>
          </div>
        </div>
      </form>
    </div>
  );
};
