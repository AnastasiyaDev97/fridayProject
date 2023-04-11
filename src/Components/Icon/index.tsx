import { FC, SVGProps } from 'react';

import sprite from 'common/assets/svg/sprite.svg';
import { ReturnComponentType } from 'common/types/ReturnComponentType';

type DefaultSvgPropsType = SVGProps<SVGSVGElement>;

type SuperSvgPropsType = DefaultSvgPropsType & {
  name: string;
};

export const Icon: FC<SuperSvgPropsType> = ({
  name,
  className,
}: SuperSvgPropsType): ReturnComponentType => (
  <svg className={className}>
    <use href={`${sprite}#${name}`} />
  </svg>
);
