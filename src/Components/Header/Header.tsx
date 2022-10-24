import { memo } from 'react';

import { useSelector } from 'react-redux';

import styles from './Header.module.scss';

import useWindowDimensions from 'common/hooks/useWindowDimensions';
import { NavBar } from 'components/NavBar/NavBar';
import { AppRootStateType } from 'store/store';
import { ReturnComponentType } from 'types/ReturnComponentType';

export const Header = memo((): ReturnComponentType => {
  const { isMobile } = useWindowDimensions();

  let isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.login.isLoggedIn);

  return (
    <div className={`${styles.headerBlock} ${isMobile && styles.mobileHeaderBlock}`}>
      <div className={styles.container}>
        <h2 className={styles.logo}>CardsApp</h2>

        {isLoggedIn && <NavBar />}
      </div>
    </div>
  );
});
