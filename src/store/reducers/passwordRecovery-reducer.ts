import {Dispatch} from "redux";
import {setAppStatusAC} from "./app-reducer";
import {authorizationAPI} from "../../dal/api";
import {AxiosError} from "axios";
import {catchErrorHandler} from "../../utils/error-utils";
import {Nullable} from "../../types/Nullable";
import {newPassDataType} from "../../dal/apiTypes";
import {ActionsType} from "./AC types/types";

let initialState = {
    responseInfoForgotPass: '',
    responseInfoNewPass:'',
    emailForRecovery: null as Nullable<string>

}
type InitialStateType = typeof initialState


export const passwordRecoveryReducer = (state: InitialStateType = initialState, action: ActionsType) => {
    switch (action.type) {
        case "SET-RESPONSE-INFO-FORGOT-PASS":
        case "SET-RESPONSE-INFO-NEW-PASS":
        case "ADD-EMAIL":
            return {...state, ...action.payload}
        default:
            return state
    }
}

export const SetResponseInfoForgotPassAC = (responseInfoForgotPass: string) =>
    ({
        type: 'SET-RESPONSE-INFO-FORGOT-PASS',
        payload: {responseInfoForgotPass}
    } as const)
export const SetResponseInfoNewPassAC = (responseInfoNewPass: string) =>
    ({
        type: 'SET-RESPONSE-INFO-NEW-PASS',
        payload: {responseInfoNewPass}
    } as const)


export const addEmailAC = (emailForRecovery: string) =>
    ({
        type: 'ADD-EMAIL',
        payload: {emailForRecovery}
    } as const)

export const sendPassword = (email: string) => {
    return (dispatch: Dispatch<ActionsType>) => {
        dispatch(setAppStatusAC('loading',true))
        authorizationAPI.sendPassword(email)
            .then((res) => {
                dispatch(addEmailAC(email))
                res.info && dispatch(SetResponseInfoForgotPassAC(res.info))
            })
            .catch((err: AxiosError) => {
                catchErrorHandler(dispatch, err)
            })
            .finally(() => {
                dispatch(setAppStatusAC('succeeded',false))
            })
    }
}

export const setNewPasswordTC = (newPassData: newPassDataType) => {
    return (dispatch: Dispatch<ActionsType>) => {
        dispatch(setAppStatusAC('loading',true))
        authorizationAPI.setNewPassword(newPassData)
            .then((res) => {
                res.info && dispatch(SetResponseInfoNewPassAC(res.info))
            })
            .catch((err: AxiosError) => {
                catchErrorHandler(dispatch, err)
            })
            .finally(() => {
                dispatch(setAppStatusAC('succeeded',false))
            })
    }
}