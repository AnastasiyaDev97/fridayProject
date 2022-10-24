import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useParams } from 'react-router-dom';

import styles from '../Login/Login.module.scss';

import { SuperButton } from 'components/SuperButton';
import { UniversalInput } from 'components/UniversalInput';
import { EMPTY_STRING } from 'constants/index';
import { BUTTON_TYPE } from 'enums/ButtonTyoe';
import { FORMIK_FIELDS_NAME } from 'enums/FormikFieldNames';
import { INPUT_TYPE } from 'enums/InputType';
import { PATH } from 'enums/Path';
import { AppRootStateType } from 'store/store';
import { setNewPasswordTC } from 'store/thunks/passwordRecovery';
import { ReturnComponentType } from 'types/ReturnComponentType';
import { AuthData, validateNewPasswordForm } from 'utils/validates';

const NewPassword = (): ReturnComponentType => {
  const dispatch = useDispatch();

  const { token } = useParams<string>();

  const responseInfoNewPass = useSelector<AppRootStateType, string>(
    state => state.passRecovery.responseInfoNewPass,
  );

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
      let newPassDataType = {
        password: values.password,
        resetPasswordToken: token || EMPTY_STRING,
      };

      dispatch(setNewPasswordTC(newPassDataType));
      formik.resetForm();
    },
  });

  if (responseInfoNewPass) {
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
            type={INPUT_TYPE.PASSWORD}
          />
        </div>

        <SuperButton className={styles.submitBtn} type={BUTTON_TYPE.SUBMIT}>
          Create new password
        </SuperButton>
      </form>
    </div>
  );
};

export default NewPassword;
