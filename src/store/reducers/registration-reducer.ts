import {ActionsType, setAppStatusAC} from "./app-reducer";
import {Dispatch} from "redux";
import {authorizationAPI} from "../../dal/api";


let initialState = {registerStatus: false}
type InitialStateType = typeof initialState


export const registrationReducer = (state: InitialStateType = initialState, action: ActionsType) => {
    switch (action.type) {

        case "SET-REGISTER-STATUS":
            debugger
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
    dispatch(setAppStatusAC('loading'))
    authorizationAPI.registerMe(email, password)
        .then(() => {

            dispatch(registerStatusAC(true))
        })
        .catch(()=>{
            dispatch(registerStatusAC(false))
        })
        .finally(()=>{
            dispatch(setAppStatusAC('succeeded'))
        })
}
