import { useEffect } from 'react';
import { Registration } from './pages/Registration';
import { NotFound } from './pages/NotFound/NotFound';
import { ForgotPassword } from './pages/ForgotPassword';
import { NewPassword } from './pages/NewPassword/NewPassword';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Header } from './Components/Header/Header';
import styles from './App.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { RootReducerType } from './store/store';
import Preloader from './Components/Preloader/Preloader';
import Cards from './pages/Cards/Cards';
import { Users } from 'pages/Users/Users';
import { Chat } from 'pages/Chat/Chat';
import Profile from './pages/Profile/Profile';
import Packs from './pages/Packs/Packs';
import { initializeAppTC } from './store/thunks/app';
import { Nullable } from './types/Nullable';
import { STATUS } from './enum/StatusType';
import { PATH } from './enum/Path';
import { Login } from './pages/Login/Login';
import { setErrorText } from './store/reducers/app-reducer';

function App() {
  const dispatch = useDispatch();

  const status = useSelector<RootReducerType, string>(
    (state) => state.app.status
  );
  const isInitialized = useSelector<RootReducerType, boolean>(
    (state) => state.app.isInitialized
  );
  const isLoggedIn = useSelector<RootReducerType, boolean>(
    (state) => state.login.isLoggedIn
  );
  const error = useSelector<RootReducerType, Nullable<string>>(
    (state) => state.app.error
  );

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
}

export default App;
