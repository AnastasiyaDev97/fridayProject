import {ActionsType} from "./AC types/types";
import {AppDispatch, RootReducerType} from "../store";
import {CardType, getCardsQueryParamsType, getCardsResponseType, getPacksQueryParamsType} from "../../dal/apiTypes";
import {setAppStatusAC} from "./app-reducer";
import {cardsAPI, packsAPI} from "../../dal/api";
import {catchErrorHandler} from "../../utils/error-utils";
import {setPacksAC} from "./packs-reducer";


let initialState = {
    /* cards: Array<CardType>
         cardsTotalCount: number
 maxGrade: number
 minGrade: number
 page: number
 pageCount: number
 packUserId: string*/
} as getCardsResponseType

type InitialStateType = getCardsResponseType


export const cardsReducer = (state: InitialStateType = initialState, action: ActionsType) => {
    switch (action.type) {
        case "CARDS/SET-CARDS":
            return {...state,...action.payload}

        default:
            return state
    }
}
export const setCardsAC = (cardsData: getCardsResponseType) => ({
    type: 'CARDS/SET-CARDS',
    payload: {cardsData}
} as const)

export const getCardsTC = (getCardsQueryParams: getCardsQueryParamsType) => async (dispatch: AppDispatch) => {
    try {
        dispatch(setAppStatusAC('loading', true))
        const data = await cardsAPI.getCards(getCardsQueryParams)
        dispatch(setCardsAC(data))

    } catch (err) {
        catchErrorHandler(dispatch, err)
    } finally {
        dispatch(setAppStatusAC('succeeded', false))
    }
}

