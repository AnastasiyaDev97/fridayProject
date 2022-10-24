import { FC, memo, useState } from 'react';

import { FieldInputProps } from 'formik';

import styles from './UniversalInput.module.scss';

import { SuperInputText } from 'components/SuperInputText';
import { INPUT_TYPE } from 'enums/InputType';
import { ReturnComponentType } from 'types/ReturnComponentType';

export type InputType = 'password' | 'text' | 'email';

type UniversalInputPropsType = {
  validationErr: string;
  formikProps: FieldInputProps<any>;
  type?: InputType;
  placeholder?: string;
};

export const UniversalInput: FC<UniversalInputPropsType> = memo(
  ({ validationErr, formikProps, placeholder, type }): ReturnComponentType => {
    let [passwordShown, setPasswordShown] = useState<boolean>(false);

    const typeForInput = !passwordShown && type ? INPUT_TYPE.PASSWORD : INPUT_TYPE.TEXT;

    const onSpanToggleShowPasswordClick = (): void => {
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
  },
);
