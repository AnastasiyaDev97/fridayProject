import { ReactElement, /*  ReactNode, */ lazy } from 'react';

import { Navigate, /* Outlet, */ Route, Routes } from 'react-router-dom';

import { ReturnComponentType } from 'common/types/ReturnComponentType';
import { Layout } from 'components';
import { PATH } from 'enums/Path';
import { useAppSelector } from 'store';

const {
  PROFILE,
  REGISTER,
  NOT_FOUND,
  FORGOT_PASSWORD,
  NEW_PASSWORD,
  CARDS,
  /* PACKS, */
  LOGIN,
  TOKEN,
  ANY,
  CHAT,
  ID,
} = PATH;

export const PrivateRoutes = ({ children }: any): ReactElement<any, any> => {
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn);

  return isLoggedIn ? children : <Navigate to={PATH.LOGIN} />;
};

const Cards = lazy(() => import('pages/Cards'));
const Chat = lazy(() => import('pages/Chat'));
const ForgotPassword = lazy(() => import('pages/ForgotPassword'));
const Register = lazy(() => import('pages/Register'));
const NewPassword = lazy(() => import('pages/NewPassword'));
const NotFound = lazy(() => import('pages/NotFound'));
const Packs = lazy(() => import('pages/Packs'));
const Login = lazy(() => import('pages/Login'));
const Profile = lazy(() => import('pages/Profile'));

export const AppRoutes = (): ReturnComponentType => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" index element={<Packs />} />

        <Route path={PROFILE} element={<Profile />} />
        <Route path={CHAT} element={<Chat />} />
        <Route path={CARDS} element={<Cards />}>
          <Route path={ID} element={<Cards />} />
        </Route>
        {/*  <Route path={PACKS} element={<Packs />} /> */}

        <Route path={REGISTER} element={<Register />} />
        <Route path={FORGOT_PASSWORD} element={<ForgotPassword />} />
        {/*  <Route path={USERS} element={<Users />} /> */}
        <Route path={NEW_PASSWORD} element={<NewPassword />}>
          <Route path={TOKEN} element={<NewPassword />} />
        </Route>

        <Route path={LOGIN} element={<Login />} />
        <Route path={NOT_FOUND} element={<NotFound />} />
        <Route path={ANY} element={<Navigate to={NOT_FOUND} />} />
      </Route>
    </Routes>
  );
};
