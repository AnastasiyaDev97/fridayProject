import {ActionsType} from "./AC types/types";
import {ResponseLoginType} from "../../dal/authorization/types";
import {EMPTY_STRING, profileInitializeAvatarURL} from "../../constants";


const initialState = {
    avatar: profileInitializeAvatarURL,
    created: EMPTY_STRING,
    email: EMPTY_STRING,
    isAdmin: false,
    name: EMPTY_STRING,
    publicCardPacksCount: 0,
    rememberMe: false,
    token: EMPTY_STRING,
    tokenDeathTime: 0,
    updated: EMPTY_STRING,
    verified: false,
    __v: 0,
    _id: EMPTY_STRING,
}


export const profileReducer = (state: ResponseLoginType = initialState, action: ActionsType): ResponseLoginType => {
    switch (action.type) {
        case 'SET-PROFILE':
            return {...state, ...action.payload.profile}
        default:
            return state
    }
}


export const setProfileAC = (profile: ResponseLoginType) => ({
        type: 'SET-PROFILE',
        payload: {
            profile,}
    }
) as const







