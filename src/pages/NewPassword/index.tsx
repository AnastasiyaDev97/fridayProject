import { useFormik } from 'formik';
import { Navigate, useParams } from 'react-router-dom';

import styles from '../Login/Login.module.scss';

import { SuperButton } from 'components/SuperButton';
import { UniversalInput } from 'components/UniversalInput';
import { EMPTY_STRING } from 'constants/index';
import { FORMIK_FIELDS_NAME } from 'enums/FormikFieldName';
import { PATH } from 'enums/Path';
import { useAppDispatch, useAppSelector } from 'store';
/* import { setNewPasswordTC } from 'store/thunks/passwordRecovery'; */
import { ReturnComponentType } from 'common/types/ReturnComponentType';
import { AuthData, validateNewPasswordForm } from 'utils/validates';

export const NewPassword = (): ReturnComponentType => {
  const dispatch = useAppDispatch();

  const { token } = useParams<string>();

  /*  const responseInfoNewPass = useAppSelector(
    state => state.passRecovery.responseInfoNewPass,
  ); */

  const formik = useFormik({
    initialValues: {
      password: EMPTY_STRING,
    },

    validate: values => {
      const errors: AuthData = {};

      validateNewPasswordForm(values, errors);

      return errors;
    },

    onSubmit: values => {
      const newPassDataType = {
        password: values.password,
        resetPasswordToken: token || EMPTY_STRING,
      };

      /* dispatch(setNewPasswordTC(newPassDataType)); */
      formik.resetForm();
    },
  });

  /* if (responseInfoNewPass) {
    return <Navigate to={PATH.LOGIN} />;
  } */

  return (
    <div className={styles.wrapper}>
      <h2>Create new password</h2>
      <form
        className={styles.form}
        onSubmit={e => {
          formik.handleSubmit(e);
        }}
      >
        <div className={styles.inputsWrapper}>
          <UniversalInput
            validationErr={
              (formik.touched.password && formik.errors.password) || EMPTY_STRING
            }
            formikProps={formik.getFieldProps(FORMIK_FIELDS_NAME.PASSWORD)}
            type="password"
          />
        </div>

        <SuperButton className={styles.submitBtn} type="submit">
          Create new password
        </SuperButton>
      </form>
    </div>
  );
};
