import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';

import styles from './App.module.scss';

import { AppStatusType } from 'common/types/AppStatus';
import { Nullable } from 'common/types/Nullable';
import { ReturnComponentType } from 'common/types/ReturnComponentType';
import { Header } from 'components/Header';
import { Preloader } from 'components/Preloader';
import { STATUS } from 'constants/app';
import { PATH } from 'enums/Path';
import {
  Cards,
  ForgotPassword,
  Login,
  NewPassword,
  NotFound,
  Packs,
  Profile,
  Register,
  Users,
} from 'pages';
import { RootState } from 'store';
import { setErrorText } from 'store/reducers/app';
import { initializeAppTC } from 'store/thunks/app';

const TIMER_VALUE = 3000;

const App = (): ReturnComponentType => {
  const dispatch = useDispatch();

  const status = useSelector<RootState, AppStatusType>(state => state.app.status);
  const isInitialized = useSelector<RootState, boolean>(state => state.app.isInitialized);
  const isLoggedIn = useSelector<RootState, boolean>(state => state.auth.isLoggedIn);
  const error = useSelector<RootState, Nullable<string>>(state => state.app.errorText);

  const {
    PROFILE,
    REGISTER,
    NOT_FOUND,
    FORGOT_PASSWORD,
    NEW_PASSWORD,
    CARDS,
    PACKS,
    LOGIN,
    START,
    TOKEN,
    ANY,
    ID,
    USERS,
    /*  CHAT, */
  } = PATH;

  useEffect(() => {
    if (isInitialized) {
      return;
    }
    dispatch(initializeAppTC());
  }, [dispatch, isInitialized]);

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        dispatch(setErrorText({ errorText: null }));
      }, TIMER_VALUE);
    }
  }, [error, dispatch]);

  if (!isInitialized) {
    return <Preloader />;
  }
  if (!isLoggedIn) <Navigate to={LOGIN} />;

  return (
    <div className={styles.appWrapper}>
      <Header />
      <div className={styles.mainBlock}>
        {status === STATUS.LOADING && <Preloader />}
        <Routes>
          <Route path={START} element={<Navigate to={PROFILE} />} />
          <Route path={PROFILE} element={<Profile />} />
          <Route path={REGISTER} element={<Register />} />
          <Route path={FORGOT_PASSWORD} element={<ForgotPassword />} />
          <Route path={USERS} element={<Users />} />
          <Route path={NEW_PASSWORD} element={<NewPassword />}>
            <Route path={TOKEN} element={<NewPassword />} />
          </Route>
          <Route path={CARDS} element={<Cards />}>
            <Route path={ID} element={<Cards />} />
          </Route>
          <Route path={PACKS} element={<Packs />} />
          <Route path={LOGIN} element={<Login />} />
          <Route path={NOT_FOUND} element={<NotFound />} />
          <Route path={ANY} element={<Navigate to={NOT_FOUND} />} />
        </Routes>
      </div>
      {error && <div className={styles.err}>{error}</div>}
    </div>
  );
};

export default App;
