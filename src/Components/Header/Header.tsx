import { memo } from 'react';
import styles from './Header.module.scss';
import { useSelector } from 'react-redux';
import { RootReducerType } from '../../store/store';
import { NavBar } from '../NavBar/NavBar';

import useWindowDimensions from 'common/hooks/useWindowDimensions';

export const Header = memo(() => {
  const { isMobile } = useWindowDimensions();

  let isLoggedIn = useSelector<RootReducerType, boolean>(
    (state) => state.login.isLoggedIn
  );

  return (
    <div
      className={`${styles.headerBlock} ${
        isMobile && styles.mobileHeaderBlock
      }`}
    >
      <div className={styles.container}>
        <h2 className={styles.logo}>CardsApp</h2>

        {isLoggedIn && <NavBar />}
      </div>
    </div>
  );
});
