import { FC } from 'react';

import {
  faUser,
  faCirclePlay,
  faUsers,
  faArrowRightFromBracket,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink, useLocation, useSearchParams } from 'react-router-dom';

import styles from './NavBar.module.scss';

import useWindowDimensions from 'common/hooks/useWindowDimensions';
import { ReturnComponentType } from 'common/types/ReturnComponentType';
import { EMPTY_STRING } from 'constants/index';
import { ROUTES } from 'constants/routes';
import { RoutesType } from 'constants/routes/types';
import { useLogoutMutation } from 'dal/authorization';
import { useAppDispatch } from 'store';
import { setLoginStatus } from 'store/reducers/auth';

export const NavBar: FC = (): ReturnComponentType => {
  const dispatch = useAppDispatch();
  const { pathname: currentPath, state } = useLocation();
  const [searchParams] = useSearchParams();
  const { isMobile } = useWindowDimensions();

  const [logout] = useLogoutMutation();

  const itemName = currentPath.slice(1);

  const classNameForLink = ({ isActive }: { isActive: boolean }): string =>
    isActive ? `${styles.active}` : EMPTY_STRING;

  const NavLinkDataArray = [
    {
      navlinkPath: ROUTES.PROFILE,
      title: 'Profile',
      icon: faUser,
      state: state?.profile,
    },
    {
      navlinkPath: ROUTES.PACKS,
      title: 'Packs List',
      icon: faCirclePlay,
      state: state?.packs,
    },
    { navlinkPath: ROUTES.USERS, title: 'Users', icon: faUsers, state: state?.users },
  ];

  const logoutHandler = (): void => {
    logout();
    dispatch(setLoginStatus(false));
  };

  return (
    <div className={`${styles.navBarContainer} `}>
      {NavLinkDataArray.map(({ navlinkPath, title, icon, state }) => {
        let linkPath: { pathname: RoutesType; search?: string } = {
          pathname: navlinkPath,
        };

        if (state) {
          linkPath = { ...linkPath, search: `?${state}` };
        }

        return (
          <NavLink
            key={title}
            to={linkPath}
            state={{ [itemName]: searchParams }}
            className={`${classNameForLink} ${
              currentPath === navlinkPath && styles.activeLink
            }`}
          >
            {isMobile ? <FontAwesomeIcon icon={icon} /> : title}
          </NavLink>
        );
      })}
      <span className={styles.logout} onClick={logoutHandler}>
        {isMobile ? <FontAwesomeIcon icon={faArrowRightFromBracket} /> : 'Logout'}
      </span>
    </div>
  );
};
