import { memo, FC, SVGProps } from 'react';

import sprite from 'common/assets/svg/sprite.svg';
import { ReturnComponentType } from 'common/types/ReturnComponentType';

type DefaultSvgPropsType = SVGProps<SVGSVGElement>;

type SuperSvgPropsType = DefaultSvgPropsType & {
  name: string;
};

export const Icon: FC<SuperSvgPropsType> = memo(
  ({ name, ...rest }): ReturnComponentType => (
    <svg {...rest}>
      <use href={`${sprite}#${name}`} />
    </svg>
  ),
);
