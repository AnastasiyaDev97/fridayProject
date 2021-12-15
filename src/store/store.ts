import {applyMiddleware, combineReducers, createStore} from "redux";

import thunk from 'redux-thunk';
import {appReducer} from "./reducers/app-reducer";
import {loginReducer} from "./reducers/login-reducer";
import {registrationReducer} from "./reducers/registration-reducer";
import {profileReducer} from "./reducers/profile-reducer";


export const rootReducer = combineReducers({
    app: appReducer,
    login: loginReducer,
    register: registrationReducer,
    profile: profileReducer,

});
export let store = createStore(rootReducer, applyMiddleware(thunk));
export type RootReducerType = ReturnType<typeof rootReducer>;
console.log(store)


// @ts-ignore
window.store=store