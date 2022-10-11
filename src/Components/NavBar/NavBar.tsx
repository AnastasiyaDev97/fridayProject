import { NavLink } from 'react-router-dom';
import styles from './NavBar.module.scss';
import { useDispatch } from 'react-redux';
import { EMPTY_STRING } from '../../constants';
import { PATH } from '../../enums/Path';
import { logoutTC } from '../../store/thunks/login';
import { ButtonHTMLAttributes, DetailedHTMLProps, FC } from 'react';
import { style } from '@mui/system';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useLocation } from 'react-router-dom';
import {
  faUser,
  faCirclePlay,
  faUsers,
  faMessage,
  faArrowRightFromBracket,
} from '@fortawesome/free-solid-svg-icons';

import useWindowDimensions from 'common/hooks/useWindowDimensions';

/* type DefaultNavBarPropsType = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>; */
type NavBarPropsType = {};

export const NavBar: FC<NavBarPropsType> = () => {
  const dispatch = useDispatch();
  const { pathname: currentPath } = useLocation();
  const { isMobile } = useWindowDimensions();

  const classNameForLink = ({ isActive }: { isActive: boolean }) =>
    isActive ? `${styles.active}` : EMPTY_STRING;

  const NavLinkDataArray = [
    {
      navlinkPath: PATH.PROFILE,
      title: 'Profile',
      icon: faUser,
    },
    { navlinkPath: PATH.PACKS, title: 'Packs List', icon: faCirclePlay },
    { navlinkPath: PATH.USERS, title: 'Users', icon: faUsers },
    { navlinkPath: PATH.CHAT, title: 'Dialogs', icon: faMessage },
  ];

  const logoutHandler = () => {
    dispatch(logoutTC());
  };

  return (
    <div className={`${styles.navBarContainer} `}>
      {NavLinkDataArray.map(({ navlinkPath, title, icon }) => (
        <NavLink
          key={title}
          to={navlinkPath}
          className={`${classNameForLink} ${
            currentPath === navlinkPath && styles.activeLink
          }`}
        >
          {isMobile ? <FontAwesomeIcon icon={icon} /> : title}
        </NavLink>
      ))}
      <span className={styles.logout} onClick={logoutHandler}>
        {isMobile ? (
          <FontAwesomeIcon icon={faArrowRightFromBracket} />
        ) : (
          'Logout'
        )}
      </span>
    </div>
  );
};
