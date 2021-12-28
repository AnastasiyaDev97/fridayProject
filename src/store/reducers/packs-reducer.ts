import {ActionsType, setAppStatusAC} from "./app-reducer";
import {Dispatch} from "redux";
import {cardsAPI, PackType} from "../../dal/api";

import {AxiosError} from "axios";
import {catchErrorHandler} from "../../utils/error-utils";


let initialState = {
    packs: null as Array<PackType>|null
}
type InitialStateType = typeof initialState


export const packsReducer = (state: InitialStateType = initialState, action: ActionsType) => {
    switch (action.type) {
        case "SET-PACKS":
            return {...state,packs:[...action.packs]}
        default:
            return state
    }
}

export const setPacksAC = (packs: Array<PackType>) =>
    ({
        type: 'SET-PACKS',
        packs
    } as const)

export const getPacksTC = () => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    cardsAPI.getPacks()
        .then(res => {
            dispatch(setPacksAC(res.cardPacks))
        })
        .catch((err: AxiosError) => {
            const error = err.response ? err.response.data.error : (err.message + ', more details in the console')
            catchErrorHandler(dispatch, error)
        })
        .finally(() => {
                dispatch(setAppStatusAC('succeeded'))

            }
        )
}