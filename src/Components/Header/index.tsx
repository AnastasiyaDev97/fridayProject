import { memo } from 'react';

import styles from './Header.module.scss';

import { ReturnComponentType } from 'common/types/ReturnComponentType';
import { NavBar } from 'components/NavBar';
import useWindowDimensions from 'hooks/useWindowDimensions';
import { useAppSelector } from 'store';

export const Header = memo((): ReturnComponentType => {
  const { isMobile } = useWindowDimensions();

  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn);

  return (
    <div className={`${styles.headerBlock} ${isMobile && styles.mobileHeaderBlock}`}>
      <div className={styles.container}>
        <h2 className={styles.logo}>CardsApp</h2>

        {isLoggedIn && <NavBar />}
      </div>
    </div>
  );
});
