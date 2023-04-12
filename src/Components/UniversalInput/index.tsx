import { FC, memo, useState } from 'react';

import type { FieldInputProps } from 'formik';

import styles from './UniversalInput.module.scss';

import { ReturnComponentType } from 'common/types/ReturnComponentType';
import { SuperInputText } from 'components/SuperInputText';

export type InputType = 'password' | 'text' | 'email';

type UniversalInputPropsType = {
  validationErr: string;
  formikProps: FieldInputProps<any>;
  type?: InputType;
  placeholder?: string;
};

export const UniversalInput: FC<UniversalInputPropsType> = memo(
  ({
    validationErr,
    formikProps,
    placeholder,
    type,
  }: UniversalInputPropsType): ReturnComponentType => {
    const [passwordShown, setPasswordShown] = useState<boolean>(false);

    const typeForInput = !passwordShown && type ? 'password' : 'text';

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
