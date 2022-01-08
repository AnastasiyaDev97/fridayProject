import {isAuthToggleAC} from "./login-reducer";
import {setProfileAC} from "./profile-reducer";
import {Dispatch} from "redux";
import {Nullable} from "../../types/Nullable";
import {ActionsType} from "./AC types/types";
import {authorizationAPI} from "../../dal/authorization/authorization";


export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
    status: 'idle' as RequestStatusType,
    isInitialized: false,
    error: null as Nullable<string>,
    isDisabled:false,
}

type InitialStateType = typeof initialState

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
        case "APP/SET-ERROR":
            return {...state, ...action.payload}
        case 'APP/INITIALIZE': {
            return {...state, isInitialized: true}
        }

        default:
            return state
    }
}


export const setAppStatusAC = (status: RequestStatusType,isDisabled: boolean) => ({
    type: 'APP/SET-STATUS',
    payload: {
        status,
        isDisabled,
    }
} as const)


export const setIsInitializedAC = () => ({
    type: 'APP/INITIALIZE'
} as const)

export const setErrorText = (error: Nullable<string>) => {
    return (
        {
            type: 'APP/SET-ERROR',
            payload: {error}
        } as const)
}

export const initializeAppTC = () => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading',true))
    authorizationAPI.authMe()
        .then((res) => {
            dispatch(isAuthToggleAC(true))
            dispatch(setProfileAC(res))
        })
        .catch(() => {
            dispatch(isAuthToggleAC(false))
        })
        .finally(() => {
                dispatch(setAppStatusAC('succeeded',false))
                dispatch(setIsInitializedAC())
            }
        )
}




