import {Dispatch} from "redux";
import {authorizationAPI} from "../../dal/api";
import {setAppStatusAC} from "./app-reducer";
import {setProfileAC} from "./profile-reducer";
import {AxiosError} from "axios";
import {catchErrorHandler} from "../../utils/error-utils";
import {ActionsType} from "./AC types/types";
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
        dispatch(setAppStatusAC('loading',true))
        authorizationAPI.loginMe(loginAuthData)
            .then((res)=>{
                dispatch(setAppStatusAC('succeeded',false))
                dispatch(isAuthToggleAC(true))
                dispatch(setProfileAC(res))
            })
            .catch((err: AxiosError) =>{
             catchErrorHandler(dispatch, err)})
    }
}

export const logoutTC=()=>{
    return (dispatch:Dispatch<ActionsType>)=>{
        dispatch(setAppStatusAC('loading',true))
        authorizationAPI.logoutMe()
            .then(()=>{
                dispatch(setAppStatusAC('succeeded',false))
                dispatch(isAuthToggleAC(false))

            })
            .catch((err: AxiosError) =>{
                catchErrorHandler(dispatch, err)})
    }
}