import {setAppStatusAC} from "./app-reducer";
import {Dispatch} from "redux";
import {AxiosError} from "axios";
import {catchErrorHandler} from "../../utils/error-utils";
import { ActionsType } from "./AC types/types";
import {authorizationAPI} from "../../dal/authorization/authorization";


let initialState = {registerStatus: false}
type InitialStateType = typeof initialState


export const registrationReducer = (state: InitialStateType = initialState, action: ActionsType) => {
    switch (action.type) {

        case "SET-REGISTER-STATUS":
            return {...state, ...action.payload}
        default:
            return state
    }
}

export const registerStatusAC = (registerStatus: boolean) =>
    ({
        type: 'SET-REGISTER-STATUS',
        payload: {registerStatus}
    } as const)

export const registerMeTC = (email: string, password: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading',true))
    authorizationAPI.registerMe(email, password)
        .then(() => {
            dispatch(registerStatusAC(true))
        })
        .catch((err: AxiosError) => {
                catchErrorHandler(dispatch, err)
                dispatch(registerStatusAC(false))
            }
        )
        .finally(() => {
            dispatch(setAppStatusAC('succeeded',false))
        })
}
