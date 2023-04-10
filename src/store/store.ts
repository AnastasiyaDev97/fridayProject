import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { useDispatch } from 'react-redux';

import { appReducer } from './reducers/app-reducer';
import { cardsReducer } from './reducers/cards-reducer';
import { loginReducer } from './reducers/login-reducer';
import { packsReducer } from './reducers/packs-reducer';
import { passwordRecoveryReducer } from './reducers/passwordRecovery-reducer';
import { profileReducer } from './reducers/profile-reducer';
import { registrationReducer } from './reducers/registration-reducer';
import { usersReducer } from './reducers/users-reducer';

type RootState = ReturnType<typeof store.getState>;

const store = configureStore({
  reducer: {
    app: appReducer,
    login: loginReducer,
    register: registrationReducer,
    profile: profileReducer,
    passRecovery: passwordRecoveryReducer,
    packs: packsReducer,
    cards: cardsReducer,
    users: usersReducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware({ serializableCheck: false }),
});

type AppDispatch = typeof store.dispatch;
const useAppDispatch: () => AppDispatch = useDispatch;

setupListeners(store.dispatch);

/* export const rootReducer = combineReducers({
  app: appReducer,
  login: loginReducer,
  register: registrationReducer,
  profile: profileReducer,
  passRecovery: passwordRecoveryReducer,
  packs: packsReducer,
  cards: cardsReducer,
  users: usersReducer,
}); */
/* export let store = createStore(rootReducer, applyMiddleware(thunk));
export type AppRootStateType = ReturnType<typeof rootReducer>;

export type ThunkType = ThunkAction<void, AppRootStateType, unknown, ActionsType>;
export type AppDispatch = typeof store.dispatch;

// @ts-ignore
window.store = store; */
