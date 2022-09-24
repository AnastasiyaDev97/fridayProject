import { memo, FC, SVGProps } from 'react';

import sprite from 'common/assets/svg/sprite.svg';

type DefaultSvgPropsType = SVGProps<SVGSVGElement>;

type SuperSvgPropsType = DefaultSvgPropsType & {
  name: string;
};

const Icon: FC<SuperSvgPropsType> = memo(({ name, ...rest }) => (
  <svg {...rest}>
    <use href={`${sprite}#${name}`} />
  </svg>
));

export default Icon;
