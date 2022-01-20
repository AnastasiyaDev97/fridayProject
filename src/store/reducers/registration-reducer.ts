import {ActionsType} from "./AC types/types";


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


