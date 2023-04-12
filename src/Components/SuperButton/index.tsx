import { ButtonHTMLAttributes, DetailedHTMLProps, memo } from 'react';

import style from './SuperButton.module.scss';

import { ReturnComponentType } from 'common/types/ReturnComponentType';

type DefaultButtonPropsType = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

type SuperButtonPropsType = DefaultButtonPropsType & {
  red?: boolean;
};

export const SuperButton = memo(
  ({ red, className, ...restProps }: SuperButtonPropsType): ReturnComponentType => {
    const finalClassName = `${style.btn} ${red && style.red} ${className}`;

    return <button className={finalClassName} {...restProps} />;
  },
);
