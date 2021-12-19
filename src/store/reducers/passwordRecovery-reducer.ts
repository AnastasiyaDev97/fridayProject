import {Dispatch} from "redux";
import {ActionsType, setAppStatusAC} from "./app-reducer";
import {authorizationAPI, newPassDataType} from "../../dal/api";
import {AxiosError} from "axios";
import {catchErrorHandler} from "../../utils/error-utils";


let initialState = {
    responseInfo: '',
    emailForRecovery: null as null | string
}
type InitialStateType = typeof initialState


export const passwordRecoveryReducer = (state: InitialStateType = initialState, action: ActionsType) => {
    switch (action.type) {
        case "SET-RESPONSE-INFO":
        case "ADD-EMAIL":
            return {...state, ...action.payload}
        default:
            return state
    }
}

export const SetResponseInfoAC = (responseInfo: string) =>
    ({
        type: 'SET-RESPONSE-INFO',
        payload: {responseInfo}
    } as const)


export const addEmailAC = (emailForRecovery: string) =>
    ({
        type: 'ADD-EMAIL',
        payload: {emailForRecovery}
    } as const)

export const sendPassword = (email: string) => {
    return (dispatch: Dispatch<ActionsType>) => {
        dispatch(setAppStatusAC('loading'))
        authorizationAPI.sendPassword(email)
            .then((res) => {
                dispatch(addEmailAC(email))
                res.info && dispatch(SetResponseInfoAC(res.info))
            })
            .catch((err: AxiosError) => {
                const error = err.response ? err.response.data.error : (err.message + ', more details in the console')
                catchErrorHandler(dispatch, error)
            })
            .finally(() => {
                dispatch(setAppStatusAC('succeeded'))
            })
    }
}

export const setNewPasswordTC = (newPassData: newPassDataType) => {
    return (dispatch: Dispatch<ActionsType>) => {
        dispatch(setAppStatusAC('loading'))
        authorizationAPI.setNewPassword(newPassData)
            .then((res) => {
                res.info && dispatch(SetResponseInfoAC(res.info))
            })
            .catch((err: AxiosError) => {
                const error = err.response ? err.response.data.error : (err.message + ', more details in the console')
                catchErrorHandler(dispatch, error)
            })
            .finally(() => {
                dispatch(setAppStatusAC('succeeded'))
            })
    }
}