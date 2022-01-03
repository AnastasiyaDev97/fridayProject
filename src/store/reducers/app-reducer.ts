import {isAuthToggleAC} from "./login-reducer";
import {setProfileAC} from "./profile-reducer";
import {Dispatch} from "redux";
import {authorizationAPI} from "../../dal/api";
import {registerStatusAC} from "./registration-reducer";
import {
    addEmailAC,
    SetResponseInfoForgotPassAC,
    SetResponseInfoNewPassAC
} from "./passwordRecovery-reducer";
import {
    changePageAC,
    setNewMinMaxValues,
    setPacksAC, setSortingFilter,
    toggleShowCardsModeAC
} from "./packs-reducer";
import {catchErrorHandler} from "../../utils/error-utils";


export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
    status: 'idle' as RequestStatusType,
    isInitialized: false,
    error: null as null | string
}

type InitialStateType = typeof initialState

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
        case "SET-ERROR":
            return {...state, ...action.payload}
        case 'INITIALIZE': {
            return {...state, isInitialized: true}
        }

        default:
            return state
    }
}


export const setAppStatusAC = (status: RequestStatusType) => ({
    type: 'APP/SET-STATUS',
    payload: {
        status,
    }
} as const)

export const setIsInitializedAC = () => ({
    type: 'INITIALIZE'
} as const)

export const setErrorText = (error: null | string) => {
    return (
        {
            type: 'SET-ERROR',
            payload: {error}
        } as const)
}

export const initializeAppTC = () => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    authorizationAPI.authMe()
        .then((res) => {
            dispatch(isAuthToggleAC(true))
            dispatch(setProfileAC(res))
        })
        .catch((err) => {
            dispatch(isAuthToggleAC(false))
            catchErrorHandler(dispatch, err)
        })
        .finally(() => {
                dispatch(setAppStatusAC('succeeded'))
                dispatch(setIsInitializedAC())
            }
        )
}


export type ActionsType = ReturnType<typeof setAppStatusAC>
    | ReturnType<typeof isAuthToggleAC>
    | ReturnType<typeof setProfileAC>
    | ReturnType<typeof setIsInitializedAC>
    | ReturnType<typeof setErrorText>
    | ReturnType<typeof registerStatusAC>
    | ReturnType<typeof SetResponseInfoForgotPassAC>
    | ReturnType<typeof addEmailAC>
    | ReturnType<typeof SetResponseInfoNewPassAC>
    | ReturnType<typeof setPacksAC>
    | ReturnType<typeof changePageAC>
    | ReturnType<typeof setNewMinMaxValues>
    | ReturnType<typeof toggleShowCardsModeAC>
    | ReturnType<typeof setSortingFilter>

