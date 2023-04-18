import { useEffect, useState } from 'react';

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

  const [isErrorShown, setIsErrorShown] = useState(false);

  useEffect(() => {
    if (errorText) {
      setIsErrorShown(true);
      setTimeout(() => setIsErrorShown(false), 3000);
    }
  }, [errorText]);

  return (
    <div className={styles.appWrapper}>
      <Header />
      <div className={styles.mainBlock}>
        {status === STATUS.LOADING && <Preloader />}
        <Outlet />
      </div>
      {isErrorShown && <div className={styles.err}>{errorText}</div>}
    </div>
  );
};
