import { Outlet } from 'react-router-dom';

import styles from './Layout.module.scss';

import { ReturnComponentType } from 'common/types/ReturnComponentType';
import { Header } from 'components/Header';
import { Preloader } from 'components/Preloader';
import { STATUS } from 'constants/app';
import { useAppSelector } from 'store';

export const Layout = (): ReturnComponentType => {
  const errorText = useAppSelector(state => state.app.errorText);
  const status = useAppSelector(state => state.app.status);

  return (
    <div className={styles.appWrapper}>
      <Header />
      <div className={styles.mainBlock}>
        {status === STATUS.LOADING && <Preloader />}
        <Outlet />
      </div>
      {errorText && <div className={styles.err}>{errorText}</div>}
    </div>
  );
};
