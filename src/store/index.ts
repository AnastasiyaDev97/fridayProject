import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { useDispatch, useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';

import app from './reducers/app';
import auth from './reducers/auth';
import cards from './reducers/cards';
import packs from './reducers/packs';
import profile from './reducers/profile';

import { clientAPI } from 'dal/index';
/* import { user } from './reducers/users'; */

export const store = configureStore({
  reducer: {
    [clientAPI.reducerPath]: clientAPI.reducer,

    app,
    auth,
    profile,
    packs,
    cards,
    /* user, */
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat([clientAPI.middleware]),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

setupListeners(store.dispatch);
