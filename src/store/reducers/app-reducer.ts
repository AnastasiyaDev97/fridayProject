import {Nullable} from "../../types/Nullable";
import {ActionsType} from "./AC types/types";
import {STATUS} from "../../enum/StatusType";


const initialState = {
    status: STATUS.IDLE,
    isInitialized: false,
    error: null as Nullable<string>,
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


export const setAppStatusAC = (status: string) => ({
    type: 'APP/SET-STATUS',
    payload: {
        status,
    }
} as const)


export const setIsInitializedAC = () => ({
    type: 'APP/INITIALIZE'
} as const)

export const setErrorText = (error: Nullable<string>) => ({
    type: 'APP/SET-ERROR',
    payload: {error}
} as const)







