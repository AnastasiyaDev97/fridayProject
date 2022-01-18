import {ActionsType} from "./AC types/types";
import {ResponseLoginType} from "../../dal/authorization/types";
import {ThunkType} from "../store";
import {setAppStatusAC} from "./app-reducer";
import {catchErrorHandler} from "../../utils/error-utils";
import { profileAPI } from "../../dal/profile/profileAPI";



const initialState = {
    avatar:'https://lh3.googleusercontent.com/DQj-gonAVTlhj5W7_DhBVmX-0P42rfvx8TSp1WfQeZ6iFIon6InIS8M4Nbqy7Ql5ahgEXSiRDiWD88v-bcPYIEAg3Q=w640-h400-e365-rj-sc0x00ffffff',
    created: '',
    email: '',
    isAdmin: false,
    name: '',
    publicCardPacksCount: 0,
    rememberMe: false,
    token: '',
    tokenDeathTime: 0,
    updated: '',
    verified: false,
    __v: 0,
    _id: '',
}



export const profileReducer = (state: ResponseLoginType = initialState, action: ActionsType): ResponseLoginType => {
    switch (action.type) {
        case 'SET-PROFILE':

            return {...state, ...action.payload.profile}
       /* case "UPDATE-PROFILE":
            debugger
            return {...state,...action.payload}*/
        default:
            return state
    }
}


export const setProfileAC = (profile: ResponseLoginType ) => {

    return ({
        type: 'SET-PROFILE',
        payload: {
            profile,
        }
    } as const)
}
/*export const updateProfileAC = (name:string,avatar:string ) => {
    debugger
    return ({
        type: 'UPDATE-PROFILE',
        payload: {
            name,
            avatar
        }
    } as const)
}*/



export const updatePackTC = (name: string,avatar:string): ThunkType =>
    async (dispatch) => {
        try {

            dispatch(setAppStatusAC('loading'))
            let updatedProfile = await profileAPI.updateProfile({name,avatar})
            debugger
            dispatch(setProfileAC(updatedProfile))
        } catch (err) {
            catchErrorHandler(dispatch, err)
        }
        finally {
            dispatch(setAppStatusAC('succeeded'))
        }
    }

