import { NavLink } from 'react-router-dom';

import style from './NotFound.module.scss';

import { SuperButton } from 'components/SuperButton';
import { PATH } from 'enums/Path';
import { ReturnComponentType } from 'types/ReturnComponentType';

const NotFound = (): ReturnComponentType => {
  return (
    <div className={style.notFoundBackgr}>
      <div className={style.notFoundBlock}>
        <h2>Not Found &#128532;</h2>
        <SuperButton>
          <NavLink to={PATH.PROFILE} className={style.link}>
            Go Back
          </NavLink>
        </SuperButton>
      </div>
    </div>
  );
};

export default NotFound;
