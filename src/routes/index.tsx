import { lazy } from 'react';

import { Outlet } from 'react-router-dom';
import type { RouteObject } from 'react-router-dom';

import { PATH } from 'enums/Path';

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
  CHAT,
} = PATH;

const Cards = lazy(() => import('pages/Cards'));
const Chat = lazy(() => import('pages/Chat'));
const ForgotPassword = lazy(() => import('pages/ForgotPassword'));
const Register = lazy(() => import('pages/Register'));
const NewPassword = lazy(() => import('pages/NewPassword'));
const NotFound = lazy(() => import('pages/NotFound'));
const Packs = lazy(() => import('pages/Packs'));
const Login = lazy(() => import('pages/Login'));
const Profile = lazy(() => import('pages/Profile'));

export const routes: RouteObject[] = [
  {
    path: START,
    element: <Profile />,
  },
  {
    path: PROFILE,
    element: <Profile />,
  },
  {
    path: LOGIN,
    element: <Login />,
  },
  {
    path: REGISTER,
    element: <Register />,
  },
  {
    path: NOT_FOUND,
    element: <NotFound />,
  },
  {
    path: FORGOT_PASSWORD,
    element: <ForgotPassword />,
  },
  {
    path: ANY,
    element: <NotFound />,
  },
  {
    path: CHAT,
    element: <Chat />,
  },
  {
    path: CARDS,
    element: <Outlet />,
    children: [
      { path: '', element: <Cards /> },
      { path: ID, element: <Cards /> },
    ],
  },
  {
    path: PACKS,
    element: <Packs />,
  },
  {
    path: NEW_PASSWORD,
    element: <Outlet />,
    children: [
      {
        path: '',
        element: <NewPassword />,
      },
      {
        path: TOKEN,
        element: <NewPassword />,
      },
    ],
  },
];
