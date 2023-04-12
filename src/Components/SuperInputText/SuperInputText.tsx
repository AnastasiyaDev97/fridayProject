import {
  ChangeEvent,
  DetailedHTMLProps,
  InputHTMLAttributes,
  KeyboardEvent,
  memo,
} from 'react';

import { useDispatch } from 'react-redux';

import s from './SuperInputText.module.css';

import { InputType } from 'common/types/InputType';
import { Nullable } from 'common/types/Nullable';
import { ReturnComponentType } from 'common/types/ReturnComponentType';
import { setErrorText } from 'store/reducers/app';

type DefaultInputPropsType = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

type SuperInputTextPropsType = DefaultInputPropsType & {
  onChangeText?: (value: string) => void;
  onEnter?: (/* text: string */) => void;
  error?: Nullable<string>;
  spanClassName?: string;
  type: InputType;
};

export const SuperInputText = memo(
  ({
    type,
    onChange,
    onChangeText,
    /* spanClassName, */
    onKeyPress,
    onEnter,
    error,
    className,
    ...restProps
  }: SuperInputTextPropsType): ReturnComponentType => {
    const dispatch = useDispatch();

    const finalInputClassName = `${s.input} ${
      error ? s.errorInput : s.superInput
    } ${className} `;

    const onChangeCallback = (e: ChangeEvent<HTMLInputElement>): void => {
      onChange && onChange(e);
      onChangeText && onChangeText(e.currentTarget.value);
      dispatch(setErrorText({ errorText: null }));
    };

    const onKeyPressCallback = (e: KeyboardEvent<HTMLInputElement>): void => {
      onKeyPress && onKeyPress(e);
      onEnter && e.key === 'Enter' && onEnter();
    };

    return (
      <>
        <input
          type={type}
          onChange={onChangeCallback}
          onKeyPress={onKeyPressCallback}
          className={finalInputClassName}
          {...restProps}
        />
      </>
    );
  },
);
