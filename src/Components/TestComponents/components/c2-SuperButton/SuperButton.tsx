import { ButtonHTMLAttributes, DetailedHTMLProps, FC, memo } from 'react';
import style from './SuperButton.module.scss';

type DefaultButtonPropsType = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

type SuperButtonPropsType = DefaultButtonPropsType & {
  red?: boolean;
};

const SuperButton: FC<SuperButtonPropsType> = memo(
  ({ red, className, ...restProps }) => {
    let finalClassName = `${style.btn} ${red && style.red} ${className}`;
    return <button className={finalClassName} {...restProps} />;
  }
);

export default SuperButton;
