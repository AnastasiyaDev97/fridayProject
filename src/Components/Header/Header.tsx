import { memo } from 'react';

import { useSelector } from 'react-redux';

import styles from './Header.module.scss';

import useWindowDimensions from 'common/hooks/useWindowDimensions';
import { ReturnComponentType } from 'common/types/ReturnComponentType';
import { NavBar } from 'components/NavBar/NavBar';
import { AppRootStateType } from 'store/store';

export const Header = memo((): ReturnComponentType => {
  const { isMobile } = useWindowDimensions();

  const isLoggedIn = useSelector<AppRootStateType, boolean>(
    state => state.login.isLoggedIn,
  );

  return (
    <div className={`${styles.headerBlock} ${isMobile && styles.mobileHeaderBlock}`}>
      <div className={styles.container}>
        <h2 className={styles.logo}>CardsApp</h2>

        {isLoggedIn && <NavBar />}
      </div>
    </div>
  );
});
