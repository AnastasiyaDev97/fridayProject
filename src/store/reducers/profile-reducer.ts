import {ResponseLoginType} from "../../dal/api";
import {ActionsType} from "./app-reducer";


const initialState = {
    profile: {}  as ResponseLoginType
}

type InitialStateType = typeof initialState

export const profileReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'SET-PROFILE':
            debugger
            return {...state, ...action.payload}
        default:
            return state
    }
}


export const setProfileAC = (profile: ResponseLoginType ) => ({
    type: 'SET-PROFILE',
    payload: {
        profile,
    }
} as const)

