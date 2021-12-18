import {Dispatch} from "redux";
import {authorizationAPI} from "../../dal/api";
import {ActionsType, setAppStatusAC} from "./app-reducer";
import {setProfileAC} from "./profile-reducer";
import {AxiosError} from "axios";
import {catchErrorHandler} from "../../utils/error-utils";
export type loginAuthDataType={
    email: string
    password:string
    rememberMe:boolean
}

let initialState = {
    isLoggedIn: false
}
type InitialStateType = typeof initialState


export const loginReducer = (state: InitialStateType=initialState, action: ActionsType) => {
    switch (action.type) {
        case "TOGGLE-IS-AUTH":
            return {...state,...action.payload}
        default:
            return state
    }
}

export const isAuthToggleAC = (isLoggedIn: boolean) =>
    ({
        type: 'TOGGLE-IS-AUTH',
        payload: {
            isLoggedIn
        }
    } as const)

export const loginTC=(loginAuthData:loginAuthDataType)=>{
    return (dispatch:Dispatch<ActionsType>)=>{
        dispatch(setAppStatusAC('loading'))
        authorizationAPI.loginMe(loginAuthData)
            .then((res)=>{
                dispatch(setAppStatusAC('succeeded'))
                dispatch(isAuthToggleAC(true))
                dispatch(setProfileAC(res))
            })
            .catch((err: AxiosError) =>{
                const error = err.response?err.response.data.error: (err.message + ', more details in the console')
             catchErrorHandler(dispatch, error)})
    }
}

export const logoutTC=()=>{
    return (dispatch:Dispatch<ActionsType>)=>{
        dispatch(setAppStatusAC('loading'))
        authorizationAPI.logoutMe()
            .then(()=>{
                dispatch(setAppStatusAC('succeeded'))
                dispatch(isAuthToggleAC(false))
            })
            .catch((err: AxiosError) =>{
                const error = err.response?err.response.data.error: (err.message + ', more details in the console')
                catchErrorHandler(dispatch, error)})
    }
}