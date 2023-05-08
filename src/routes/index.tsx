import { ReactElement, lazy } from 'react';

import { Navigate, Route, Routes, useLocation } from 'react-router-dom';

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
  PACKS,
  LOGIN,
  TOKEN,
  ANY,
  CHAT,
  USERS,
  ID,
} = PATH;

export const PrivateRoutes = ({ children }: any): ReactElement<any, any> => {
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn);
  const location = useLocation();

  return isLoggedIn ? children : <Navigate to={PATH.LOGIN} state={{ from: location }} />;
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
const Users = lazy(() => import('pages/Users'));

export const AppRoutes = (): ReturnComponentType => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route
          path="/"
          index
          element={
            <PrivateRoutes>
              <Packs />
            </PrivateRoutes>
          }
        />

        <Route
          path={PROFILE}
          element={
            <PrivateRoutes>
              <Profile />
            </PrivateRoutes>
          }
        />
        <Route
          path={CHAT}
          element={
            <PrivateRoutes>
              <Chat />
            </PrivateRoutes>
          }
        />
        <Route
          path={PACKS}
          element={
            <PrivateRoutes>
              <Packs />
            </PrivateRoutes>
          }
        />
        <Route
          path={USERS}
          element={
            <PrivateRoutes>
              <Users />
            </PrivateRoutes>
          }
        />
        <Route
          path={CARDS}
          element={
            <PrivateRoutes>
              <Cards />
            </PrivateRoutes>
          }
        >
          <Route
            path={ID}
            element={
              <PrivateRoutes>
                <Cards />
              </PrivateRoutes>
            }
          />
        </Route>

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
