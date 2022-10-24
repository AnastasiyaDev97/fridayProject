import React, { lazy } from 'react';


import { Navigate, Outlet } from 'react-router-dom';

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
  USERS,
  CHAT,
} = PATH;

// Import components for All users
const Cards = lazy(() => import('pages/Cards/Cards'));
const Chat = lazy(() => import('pages/Chat/Chat'));
const ForgotPassword = lazy(() => import('pages/ForgotPassword/ForgotPassword'));
const Login = lazy(() => import('pages/Login/Login'));
const Register = lazy(() => import('pages/Register/Register'));
const NewPassword = lazy(() => import('pages/NewPassword/NewPassword'));
const NotFound = lazy(() => import('pages/NotFound/NotFound'));
const Packs = lazy(() => import('pages/Packs/Packs'));
const Profile = lazy(() => import('pages/Profile/Profile'));
const Users = lazy(() => import('pages/Users/Users'));

/* <Route path={START} element={<Navigate to={PROFILE} />} />
          <Route path={PROFILE} element={<Profile />} />
          <Route path={REGISTRATION} element={<Register />} />
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
          <Route path={ANY} element={<Navigate to={NOT_FOUND} />} /> */

export const routes = [
  {
    path: START,
    title: 'CardsApp | Profile',
    element: <Profile />,
  },
  {
    path: PROFILE,
    element: <Profile />,
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
    path: USERS,
    element: <Users />,
  },
  {
    path: CHAT,
    element: <Chat />,
  },
  {
    path: NEW_PASSWORD,
    element: <NewPassword />,
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
  {
    path: ROUTES.CREATE_ACCOUNT,
    element: <CreateAccount />,
  },
  {
    path: ROUTES.NOT_FOUND,
    element: <NotFound />,
  },
];
