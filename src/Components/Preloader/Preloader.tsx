import style from './Preloader.module.scss';

import preloader from 'common/assets/svg/oval.svg';
import { ReturnComponentType } from 'common/types/ReturnComponentType';

export const Preloader = (): ReturnComponentType => {
  return <img src={preloader} className={style.loading} alt="loading" />;
};
