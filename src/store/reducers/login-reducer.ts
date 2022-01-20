import {ActionsType} from "./AC types/types";

export type loginAuthDataType = {
    email: string
    password: string
    rememberMe: boolean
}

let initialState = {
    isLoggedIn: false
}
type InitialStateType = typeof initialState


export const loginReducer = (state: InitialStateType = initialState, action: ActionsType) => {
    switch (action.type) {
        case "LOGIN/TOGGLE-IS-AUTH":
            return {...state, ...action.payload}
        default:
            return state
    }
}

export const isAuthToggleAC = (isLoggedIn: boolean) => ({
    type: 'LOGIN/TOGGLE-IS-AUTH',
    payload: {
        isLoggedIn
    }
} as const)

