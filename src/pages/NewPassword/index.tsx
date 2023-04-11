import { useFormik } from 'formik';
import { Navigate, useParams } from 'react-router-dom';

import styles from '../Login/Login.module.scss';

import { ReturnComponentType } from 'common/types/ReturnComponentType';
import { SuperButton } from 'components/SuperButton';
import { UniversalInput } from 'components/UniversalInput';
import { EMPTY_STRING } from 'constants/index';
import { useSetNewPasswordMutation } from 'dal/authorization';
import { FORMIK_FIELDS_NAME } from 'enums/FormikFieldName';
import { PATH } from 'enums/Path';
import { AuthData, validateNewPasswordForm } from 'utils/validates';

export const NewPassword = (): ReturnComponentType => {
  const [setNewPassword, { data: newPasswordData /* , error: loginError */ }] =
    useSetNewPasswordMutation();

  const { token } = useParams<string>();

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

      setNewPassword(newPassDataType);
      /* dispatch(setNewPasswordTC(newPassDataType)); */
      formik.resetForm();
    },
  });

  if (newPasswordData) {
    return <Navigate to={PATH.LOGIN} />;
  }

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