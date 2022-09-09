import { NavLink } from 'react-router-dom';
import styles from './NavBar.module.scss';
import { EMPTY_STRING } from '../../constants';
import { PATH } from '../../enum/Path';

export const NavBar = () => {
  const classNameForLink = ({ isActive }: { isActive: boolean }) =>
    isActive ? `${styles.active}` : EMPTY_STRING;
  const NavLinkDataArray = [
    { navlinkPath: PATH.PROFILE, title: 'Profile' },
    { navlinkPath: PATH.PACKS, title: 'Packs List' },
    { navlinkPath: PATH.USERS, title: 'Users' },
    { navlinkPath: PATH.CHAT, title: 'Dialogs' },
  ];
  return (
    <div className={styles.navBarContainer}>
      {NavLinkDataArray.map(({ navlinkPath, title }) => (
        <NavLink key={title} to={navlinkPath} className={classNameForLink}>
          {title}
        </NavLink>
      ))}
    </div>
  );
};
