import { useEffect, useState } from 'react';

import { Outlet } from 'react-router-dom';

import styles from './Layout.module.scss';

import { ReturnComponentType } from 'common/types/ReturnComponentType';
import { Header, Preloader } from 'components';
import { STATUS } from 'constants/app';
import { useAppDispatch, useAppSelector } from 'store';
import { setErrorText } from 'store/reducers';

export const Layout = (): ReturnComponentType => {
  const dispatch = useAppDispatch();

  const errorText = useAppSelector(state => state.app.errorText);
  const status = useAppSelector(state => state.app.status);

  const [isErrorShown, setIsErrorShown] = useState(false);

  useEffect(() => {
    const resetError = (): void => {
      setIsErrorShown(false);
      dispatch(setErrorText({ errorText: null }));
    };

    if (errorText) {
      setIsErrorShown(true);
      setTimeout(resetError, 3000);
    }
  }, [errorText, dispatch]);

  return (
    <>
      <div className={styles.bckgrImage} />
      <div className={styles.appWrapper}>
        <Header />
        <div className={styles.mainContainer}>
          <div className={styles.pageContainer}>
            <Outlet />
            {/* {status === STATUS.LOADING && <Preloader />} */}
          </div>
        </div>
        {isErrorShown && <div className={styles.defaultError}>{errorText} &#128123;</div>}
      </div>
    </>
  );
};
