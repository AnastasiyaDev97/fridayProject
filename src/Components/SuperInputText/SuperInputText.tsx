import {
  ChangeEvent,
  DetailedHTMLProps,
  FC,
  InputHTMLAttributes,
  KeyboardEvent,
  memo,
} from 'react';

import { useDispatch } from 'react-redux';

import s from './SuperInputText.module.css';

import { Nullable } from 'common/types/Nullable';
import { ReturnComponentType } from 'common/types/ReturnComponentType';
import { setErrorText } from 'store/reducers/app-reducer';

type DefaultInputPropsType = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

type SuperInputTextPropsType = DefaultInputPropsType & {
  // и + ещё пропсы которых нет в стандартном инпуте
  onChangeText?: (value: string) => void;
  onEnter?: (/* text: string */) => void;
  error?: Nullable<string>;
  spanClassName?: string;
};

export const SuperInputText: FC<SuperInputTextPropsType> = memo(
  ({
    type,
    onChange,
    onChangeText,
    onKeyPress,
    onEnter,
    error,
    className,
    ...restProps
  }): ReturnComponentType => {
    const dispatch = useDispatch();

    const finalInputClassName = `${s.input} ${
      error ? s.errorInput : s.superInput
    } ${className} `;

    const onChangeCallback = (e: ChangeEvent<HTMLInputElement>): void => {
      onChange && onChange(e);
      onChangeText && onChangeText(e.currentTarget.value);
      dispatch(setErrorText(null));
    };

    const onKeyPressCallback = (e: KeyboardEvent<HTMLInputElement>): void => {
      onKeyPress && onKeyPress(e);
      onEnter &&
        e.key === 'Enter' && // и если нажата кнопка Enter
        onEnter(); // то вызвать его
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
