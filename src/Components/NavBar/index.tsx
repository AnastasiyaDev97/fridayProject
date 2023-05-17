import { FC, createRef } from 'react';

import {
  faUser,
  faCirclePlay,
  faUsers,
  faArrowRightFromBracket,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink, useLocation, useOutlet, useSearchParams } from 'react-router-dom';
import { SwitchTransition } from 'react-transition-group';

import styles from './NavBar.module.scss';

import { ReturnComponentType } from 'common/types/ReturnComponentType';
import { ROUTES } from 'constants/routes';
import { RoutesType } from 'constants/routes/types';
import { useLogoutMutation } from 'dal/authorization';
import useWindowDimensions from 'hooks/useWindowDimensions';
import { useAppDispatch } from 'store';
import { setLoginStatus } from 'store/reducers/auth';

export const NavBar: FC = (): ReturnComponentType => {
  const dispatch = useAppDispatch();
  const { pathname: currentPath, state } = useLocation();
  const [searchParams] = useSearchParams();
  const { isMobile } = useWindowDimensions();

  const [logout] = useLogoutMutation();

  const itemName = currentPath.slice(1);

  const NavLinkDataArray = [
    {
      navlinkPath: ROUTES.PROFILE,
      title: 'Profile',
      icon: faUser,
      state: state?.profile,
      nodeRef: createRef(),
    },
    {
      navlinkPath: ROUTES.PACKS,
      title: 'Packs List',
      icon: faCirclePlay,
      state: state?.packs,
      nodeRef: createRef(),
    },
    {
      navlinkPath: ROUTES.USERS,
      title: 'Users',
      icon: faUsers,
      state: state?.users,
      nodeRef: createRef(),
    },
  ];

  const { nodeRef } =
    NavLinkDataArray.find(route => route.navlinkPath === location.pathname) ?? {};

  const logoutHandler = (): void => {
    logout();
    dispatch(setLoginStatus(false));
  };
  const currentOutlet = useOutlet();

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
            className={` ${currentPath === navlinkPath && styles.activeLink}`}
          >
            {isMobile ? <FontAwesomeIcon icon={icon} /> : title}
          </NavLink>
        );
      })}
      <span className={styles.logout} onClick={logoutHandler}>
        {isMobile ? <FontAwesomeIcon icon={faArrowRightFromBracket} /> : 'Logout'}
      </span>

      {/*   <SwitchTransition>
        <CSSTransition
          key={location.pathname}
          nodeRef={nodeRef}
          timeout={300}
          classNames="page"
          unmountOnExit
        >
          {state => (
            <div ref={nodeRef} className="page">
              {currentOutlet}
            </div>
          )}
        </CSSTransition>
      </SwitchTransition> */}
    </div>
  );
};
