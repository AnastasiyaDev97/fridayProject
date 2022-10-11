import styles from './UniversalInput.module.scss';
import SuperInputText from '../TestComponents/components/c1-SuperInputText/SuperInputText';
import { FC, memo, useState } from 'react';
import { FieldInputProps } from 'formik';
import { INPUT_TYPE } from '../../enums/InputType';

export type InputType = 'password' | 'text' | 'email';

type universalInputPropsType = {
  validationErr: string;
  formikProps: FieldInputProps<any>;
  type?: InputType;
  placeholder?: string;
};

export const UniversalInput: FC<universalInputPropsType> = memo(
  ({ validationErr, formikProps, placeholder, type }) => {
    let [passwordShown, setPasswordShown] = useState<boolean>(false);

    const typeForInput =
      !passwordShown && type ? INPUT_TYPE.PASSWORD : INPUT_TYPE.TEXT;

    const onSpanToggleShowPasswordClick = () => {
      setPasswordShown(!passwordShown);
    };

    return (
      <div className={styles.inputWrapper}>
        <SuperInputText
          className={styles.input}
          placeholder={placeholder}
          {...formikProps}
          type={typeForInput}
        />
        {type === 'password' && (
          <span
            className={styles.togglePassBtn}
            onClick={onSpanToggleShowPasswordClick}
          />
        )}
        <div className={styles.error}>{validationErr}</div>
      </div>
    );
  }
);
