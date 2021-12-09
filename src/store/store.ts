import {applyMiddleware, combineReducers, createStore} from "redux";
import {loginReducer} from "./reducers/login-reducer";
import {registrationReducer} from "./reducers/registration-reducer";
import {passwordRecoveryReducer} from "./reducers/passwordRecovery-reducer";
import thunk from "redux-thunk";


let rootReducer=combineReducers({
    login:loginReducer,
    registration:registrationReducer,
    passwordRecovery:passwordRecoveryReducer,
})

export const store=createStore(rootReducer,applyMiddleware(thunk))
export type RootReducerType = ReturnType<typeof rootReducer>;