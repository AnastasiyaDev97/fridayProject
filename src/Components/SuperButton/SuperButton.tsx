import { ButtonHTMLAttributes, DetailedHTMLProps, FC, memo } from 'react';

import style from './SuperButton.module.scss';

import { ReturnComponentType } from 'common/types/ReturnComponentType';

type DefaultButtonPropsType = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

type SuperButtonPropsType = DefaultButtonPropsType & {
  red?: boolean;
};

export const SuperButton: FC<SuperButtonPropsType> = memo(
  ({ red, className, ...restProps }): ReturnComponentType => {
    const finalClassName = `${style.btn} ${red && style.red} ${className}`;

    return <button className={finalClassName} {...restProps} />;
  },
);
