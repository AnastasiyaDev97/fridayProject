import { ChangeEvent, DetailedHTMLProps, InputHTMLAttributes, memo } from 'react';

import style from './SuperCheckbox.module.scss';

import { ReturnComponentType } from 'common/types/ReturnComponentType';
import { EMPTY_STRING } from 'constants/index';

type DefaultInputPropsType = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

type SuperCheckboxPropsType = DefaultInputPropsType & {
  onChangeChecked?: (checked: boolean) => void;
  spanClassName?: string;
};

export const SuperCheckbox = memo(
  ({
    onChange,
    onChangeChecked,
    className,
    spanClassName,
    children, // в эту переменную попадёт текст, типизировать не нужно так как он затипизирован в React.FC

    ...restProps // все остальные пропсы попадут в объект restProps
  }: SuperCheckboxPropsType): ReturnComponentType => {
    const onChangeCallback = (e: ChangeEvent<HTMLInputElement>): void => {
      onChange && onChange(e);
      onChangeChecked && onChangeChecked(e.currentTarget.checked);
    };

    const finalInputClassName = `${style.checkbox} ${
      className ? className : EMPTY_STRING
    }`;

    return (
      <label className={style.labelForCheckBox}>
        <input
          type={'checkbox'}
          onChange={onChangeCallback}
          className={finalInputClassName}
          {...restProps}
        />
        {children && <span className={style[`${spanClassName}`]}>{children}</span>}
      </label>
    );
  },
);
