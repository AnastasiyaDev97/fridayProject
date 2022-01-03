
import {ActionsType} from "./app-reducer";
import {ResponseLoginType} from "../../dal/apiTypes";


const initialState = {
    created: null,
    email: '',
    isAdmin: false,
    name: '',
    publicCardPacksCount: 0,
    rememberMe: false,
    token: '',
    tokenDeathTime: 0,
    updated: null,
    verified: false,
    __v: 0,
    _id: '',
}



export const profileReducer = (state: ResponseLoginType = initialState, action: ActionsType): ResponseLoginType => {
    switch (action.type) {
        case 'SET-PROFILE':

            return {...state, ...action.payload.profile}
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

