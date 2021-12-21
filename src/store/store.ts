import {applyMiddleware, combineReducers, createStore} from "redux";

import thunk from 'redux-thunk';
import {appReducer} from "./reducers/app-reducer";
import {loginReducer} from "./reducers/login-reducer";
import {registrationReducer} from "./reducers/registration-reducer";
import {profileReducer} from "./reducers/profile-reducer";
import {passwordRecoveryReducer} from "./reducers/passwordRecovery-reducer";
import {decksReducer} from "./reducers/decks-reducer";
import {cardsReducer} from "./reducers/cards-reducer";


export const rootReducer = combineReducers({
    app: appReducer,
    login: loginReducer,
    register: registrationReducer,
    profile: profileReducer,
    passRecovery:passwordRecoveryReducer,
    decks:decksReducer,
    cards:cardsReducer,

});
export let store = createStore(rootReducer, applyMiddleware(thunk));
export type RootReducerType = ReturnType<typeof rootReducer>;
console.log(store)


// @ts-ignore
window.store=store