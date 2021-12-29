import {ActionsType, setAppStatusAC} from "./app-reducer";
import {cardsAPI, getPacksResponseType} from "../../dal/api";

import {catchErrorHandler} from "../../utils/error-utils";
import {AppDispatch, RootReducerType} from "../store";

type initialStateType = getPacksResponseType & { mode: boolean }

let initialState = {
    /*    cardPacks: [] as Array<PackType>,
        cardPacksTotalCount: 0,
        maxCardsCount: 0,
        minCardsCount: 0,
        page: 0,
        pageCount: 0,*/
} as initialStateType


export const packsReducer = (state: initialStateType = initialState, action: ActionsType) => {
    switch (action.type) {
        case "SET-PACKS":
        case "CHANGE-PAGE":
        case "SET-MAX-VALUE":
        case "SET-MIN-VALUE":
        case "TOGGLE-SHOW-CARDS-MODE":
            return {...state, ...action.payload}
        default:
            return state
    }
}

export const setPacksAC = (payload: getPacksResponseType) =>
    ({
        type: 'SET-PACKS',
        payload
    } as const)

export const changePageAC = (page: number) =>
    ({
        type: 'CHANGE-PAGE',
        payload: {page}
    } as const)

export const setMaxValue = (maxCardsCount: number) =>
    ({
        type: 'SET-MAX-VALUE',
        payload: {maxCardsCount}
    } as const)

export const setMinValue = (minCardsCount: number) =>
    ({
        type: 'SET-MIN-VALUE',
        payload: {minCardsCount}
    } as const)

export const toggleShowCardsModeAC = (mode: boolean) =>
    ({
        type: 'TOGGLE-SHOW-CARDS-MODE',
        payload: {mode}
    } as const)

export const getPacksTC = () => async (dispatch: AppDispatch, getState: () => RootReducerType) => {
    const packs = getState().packs
    const user_id = getState().profile.profile._id

    try {
        dispatch(setAppStatusAC('loading'))
        const data = await cardsAPI.getPacks(packs.mode,user_id, {
            min: packs.minCardsCount,
            max: packs.maxCardsCount,
            sortPacks: 'updated',
            page: packs.page,
            pageCount: 10
        })
        dispatch(setPacksAC(data))
    } catch (err) {
        catchErrorHandler(dispatch, err)
    } finally {
        dispatch(setAppStatusAC('succeeded'))
    }
}