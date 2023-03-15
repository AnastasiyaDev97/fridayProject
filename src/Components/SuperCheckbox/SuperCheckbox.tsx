import { ChangeEvent, DetailedHTMLProps, FC, InputHTMLAttributes, memo } from 'react';

import s from './SuperCheckbox.module.css';

import { EMPTY_STRING } from 'constants/index';
import { ReturnComponentType } from 'common/types/ReturnComponentType';

type DefaultInputPropsType = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

type SuperCheckboxPropsType = DefaultInputPropsType & {
  onChangeChecked?: (checked: boolean) => void;
  spanClassName?: string;
};

export const SuperCheckbox: FC<SuperCheckboxPropsType> = memo(
  ({
    type, // достаём и игнорируем чтоб нельзя было задать другой тип инпута
    onChange,
    onChangeChecked,
    className,
    spanClassName,
    children, // в эту переменную попадёт текст, типизировать не нужно так как он затипизирован в React.FC

    ...restProps // все остальные пропсы попадут в объект restProps
  }): ReturnComponentType => {
    const onChangeCallback = (e: ChangeEvent<HTMLInputElement>): void => {
      onChange && onChange(e);
      onChangeChecked && onChangeChecked(e.currentTarget.checked);
    };

    const finalInputClassName = `${s.checkbox} ${className ? className : EMPTY_STRING}`;

    return (
      <label className={s.labelForCheckBox}>
        <input
          type={'checkbox'}
          onChange={onChangeCallback}
          className={finalInputClassName}
          {...restProps}
        />
        {children && <span className={s.spanClassName}>{children}</span>}
      </label>
    );
  },
);
