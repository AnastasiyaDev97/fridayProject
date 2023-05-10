import { NavLink } from 'react-router-dom';

import style from './NotFound.module.scss';

import { ReturnComponentType } from 'common/types/ReturnComponentType';
import { SuperButton } from 'components';
import { ROUTES } from 'constants/routes';

const NotFound = (): ReturnComponentType => {
  return (
    <div className={style.notFoundBackgr}>
      <div className={style.notFoundBlock}>
        <h2>Not Found &#128532;</h2>
        <SuperButton>
          <NavLink to={ROUTES.PROFILE} className={style.link}>
            Go Back
          </NavLink>
        </SuperButton>
      </div>
    </div>
  );
};

export default NotFound;
