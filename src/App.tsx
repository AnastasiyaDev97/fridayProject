import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';

import styles from './App.module.scss';

import { Header } from 'components/Header/Header';
import Preloader from 'components/Preloader/Preloader';
import { PATH } from 'enums/Path';
import { STATUS } from 'enums/StatusType';
import Cards from 'pages/Cards/Cards';
import { Chat } from 'pages/Chat/Chat';
import { ForgotPassword } from 'pages/ForgotPassword';
import { Login } from 'pages/Login/Login';
import { NewPassword } from 'pages/NewPassword/NewPassword';
import { NotFound } from 'pages/NotFound/NotFound';
import Packs from 'pages/Packs/Packs';
import Profile from 'pages/Profile/Profile';
import { Registration } from 'pages/Registration';
import { Users } from 'pages/Users/Users';
import { setErrorText } from 'store/reducers/app-reducer';
import { RootReducerType } from 'store/store';
import { initializeAppTC } from 'store/thunks/app';
import { Nullable } from 'types/Nullable';

const App = () => {
  const dispatch = useDispatch();

  const status = useSelector<RootReducerType, string>(state => state.app.status);
  const isInitialized = useSelector<RootReducerType, boolean>(
    state => state.app.isInitialized,
  );
  const isLoggedIn = useSelector<RootReducerType, boolean>(
    state => state.login.isLoggedIn,
  );
  const error = useSelector<RootReducerType, Nullable<string>>(state => state.app.error);

  const {
    PROFILE,
    REGISTRATION,
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
    CHAT,
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
        dispatch(setErrorText(null));
      }, 3000);
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
          <Route path={REGISTRATION} element={<Registration />} />
          <Route path={NOT_FOUND} element={<NotFound />} />
          <Route path={FORGOT_PASSWORD} element={<ForgotPassword />} />
          <Route path={USERS} element={<Users />} />
          <Route path={CHAT} element={<Chat />} />
          <Route path={NEW_PASSWORD} element={<NewPassword />}>
            <Route path={TOKEN} element={<NewPassword />} />
          </Route>
          <Route path={CARDS} element={<Cards />}>
            <Route path={ID} element={<Cards />} />
          </Route>
          <Route path={PACKS} element={<Packs />} />
          <Route path={LOGIN} element={<Login />} />
          <Route path={ANY} element={<Navigate to={NOT_FOUND} />} />
        </Routes>
      </div>
      {error && <div className={styles.err}>{error}</div>}
    </div>
  );
};

export default App;
