import React, {
  ChangeEvent,
  DetailedHTMLProps,
  FC,
  InputHTMLAttributes,
  KeyboardEvent,
  memo,
} from 'react';
import s from './SuperInputText.module.css';
import { useDispatch } from 'react-redux';
import { setErrorText } from '../../../../store/reducers/app-reducer';
import { Nullable } from '../../../../types/Nullable';

type DefaultInputPropsType = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

type SuperInputTextPropsType = DefaultInputPropsType & {
  // и + ещё пропсы которых нет в стандартном инпуте
  onChangeText?: (value: string) => void;
  onEnter?: () => void;
  error?: Nullable<string>;
  spanClassName?: string;
};

const SuperInputText: FC<SuperInputTextPropsType> = memo(
  ({
    type, // достаём и игнорируем чтоб нельзя было задать другой тип инпута
    onChange,
    onChangeText,
    onKeyPress,
    onEnter,
    error,
    className,
    /*value*/
    ...restProps // все остальные пропсы попадут в объект restProps
  }) => {
    const dispatch = useDispatch();

    const finalInputClassName = `${s.input} ${
      error ? s.errorInput : s.superInput
    } ${className} `;

    const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
      onChange && // если есть пропс onChange
        onChange(e); // то передать ему е (поскольку onChange не обязателен)
      onChangeText && onChangeText(e.currentTarget.value);
      dispatch(setErrorText(null));
    };

    const onKeyPressCallback = (e: KeyboardEvent<HTMLInputElement>) => {
      onKeyPress && onKeyPress(e);
      onEnter && // если есть пропс onEnter
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
  }
);

export default SuperInputText;
