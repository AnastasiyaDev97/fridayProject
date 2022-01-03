import {ActionsType, setAppStatusAC} from "./app-reducer";
import {cardsAPI} from "../../dal/api";

import {catchErrorHandler} from "../../utils/error-utils";
import {AppDispatch, RootReducerType} from "../store";
import {getPacksQueryParamsType, getPacksResponseType, PackType} from "../../dal/apiTypes";

type initialStateType = getPacksResponseType & { isMyCardShouldShown: boolean,min:number,max:number,
    sortPacks:sortingFilterType }
export type sortingFilterType= '0updated'|'1updated'|'0created'|'1created'

let initialState = {
    page:1,
    /*cardPacks: [] as Array<PackType>,
    cardPacksTotalCount: 0,
    maxCardsCount: 0,
    minCardsCount: 0,
    page: 0,
    pageCount: 0,
    isMyCardShouldShown: false,
    min:number,
    max:number*/
} as initialStateType


export const packsReducer = (state: initialStateType = initialState, action: ActionsType) => {
    switch (action.type) {
        case "SET-PACKS":
            return {...state, ...action.payload}
        case "CHANGE-PAGE":
        case "SET-RESPONSE-INFO-NEW-PASS":
        case "TOGGLE-SHOW-CARDS-MODE":
        case "SET-NEW-MIN-MAX-VALUE":
        case "SET-SORTING-FILTER":
            return {...state, ...action.payload}
        default:
            return state
    }
}

export const setPacksAC = (payload: getPacksResponseType) => {
    return {
        type: 'SET-PACKS',
        payload
    } as const
}


export const changePageAC = (page: number) =>
    ({
        type: 'CHANGE-PAGE',
        payload: {page}
    } as const)

export const setNewMinMaxValues = (min: number, max: number) => {
    return {
        type: 'SET-NEW-MIN-MAX-VALUE',
        payload: {min, max}
    } as const
}

export const setSortingFilter = (sortingFilter:sortingFilterType) => {
    return {
        type: 'SET-SORTING-FILTER',
        payload: {sortPacks:sortingFilter}
    } as const
}

export const toggleShowCardsModeAC = (isMyCardShouldShown: boolean) =>
    ({
        type: 'TOGGLE-SHOW-CARDS-MODE',
        payload: {isMyCardShouldShown}
    } as const)

export const getPacksTC = () => async (dispatch: AppDispatch, getState: () => RootReducerType) => {
    const {min, max, page, isMyCardShouldShown,sortPacks} = getState().packs
    const user_id = getState().profile._id

    let paramsForQuery = {
        min,
        max,
        sortPacks,
        page,
        pageCount: 10,
        user_id
    } as getPacksQueryParamsType

    if (!isMyCardShouldShown) {
        paramsForQuery = {
            min,
            max,
            sortPacks,
            page,
            pageCount: 10,
        }
    }
    try {
        dispatch(setAppStatusAC('loading'))
        const data = await cardsAPI.getPacks(paramsForQuery)
        dispatch(setPacksAC(data))

    } catch (err) {
        catchErrorHandler(dispatch, err)
    } finally {
        dispatch(setAppStatusAC('succeeded'))
    }
}