import {setAppStatusAC} from "./app-reducer";
import {catchErrorHandler} from "../../utils/error-utils";
import {AppDispatch, RootReducerType, ThunkType} from "../store";
import {ActionsType} from "./AC types/types";
import {Nullable} from "../../types/Nullable";
import {packsAPI} from "../../dal/packs/packsAPI";
import {getPacksQueryParamsType, getPacksResponseType} from "../../dal/packs/types";


type initialStateType = getPacksResponseType & {
    isOnlyMyCardShouldShown: boolean
    min: number
    max: number
    sortPacks: string
    packName:Nullable<string>
    user_id:Nullable<string>
}
export type sortingFilterType = '0updated' | '1updated' | '0created' | '1created'

const INITIAL_CARDS_MAX_BORDER = 100
let initialState = {
    page: 1,
    /*   cardPacks: [] as Array<PackType>,*/
    /* cardPacksTotalCount: 0,*/
    maxCardsCount: 0,
    minCardsCount: 0,
    pageCount: 0,
    isOnlyMyCardShouldShown: false,
    min: 0,
    max: INITIAL_CARDS_MAX_BORDER,
    sortPacks: '0updated',
    packName:'',
    user_id:null,
} as initialStateType


export const packsReducer = (state: initialStateType = initialState, action: ActionsType) => {
    switch (action.type) {
        case "PACKS/CHANGE-SEARCH-PACK-NAME":
            return {...state, ...action.payload}
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

export const setSortingFilter = (sortPacks: string) => {
    return {
        type: 'SET-SORTING-FILTER',
        payload: {sortPacks}
    } as const
}

export const toggleShowCardsModeAC = (isOnlyMyCardShouldShown: boolean) =>{
    return({
        type: 'TOGGLE-SHOW-CARDS-MODE',
        payload: {isOnlyMyCardShouldShown}
    }as const)
}


export const changeSearchPackNameAC = (packName: string) =>{
    return({
        type: 'PACKS/CHANGE-SEARCH-PACK-NAME',
        payload: {packName}
    }as const)
}

export const toggleShowUserPacksAC = (user_id: string) =>{
    return({
        type: 'PACKS/TOGGLE-SHOW-USER-PACKS',
        payload: {user_id}
    }as const)
}

export const getPacksTC = () => async (dispatch: AppDispatch, getState: () => RootReducerType) => {
    const {min, max, page, user_id, sortPacks,packName} = getState().packs

    let paramsForQuery:getPacksQueryParamsType = {
        min,
        max,
        sortPacks,
        page,
        pageCount: 10,
        user_id,
        packName
    }

    try {

        const data = await packsAPI.getPacks(paramsForQuery)
        dispatch(setPacksAC(data))

    } catch (err) {
        catchErrorHandler(dispatch, err)
    } finally {
        dispatch(setAppStatusAC('succeeded', false))
    }
}

export const addPackTC = (name: string): ThunkType =>
    async (dispatch) => {
        try {
            const cardsPack = {
                name,
            }
            dispatch(setAppStatusAC('loading', true))
            await packsAPI.addPack({cardsPack})
            await dispatch(getPacksTC())
        } catch (err) {
            catchErrorHandler(dispatch, err)
        }
    }

export const deletePackTC = (packId: string): ThunkType =>
    async (dispatch) => {
        try {
            dispatch(setAppStatusAC('loading', true))
            await packsAPI.deletePack(packId)
            await dispatch(getPacksTC())
        } catch (err) {
            catchErrorHandler(dispatch, err)
        }
    }

export const updatePackTC = (packId: string,newName:string): ThunkType =>
    async (dispatch) => {
        try {
            const cardsPack = {
                _id:packId,
                name:newName,
            }
            dispatch(setAppStatusAC('loading', true))
            await packsAPI.updatePack({cardsPack})
            await dispatch(getPacksTC())
        } catch (err) {
            catchErrorHandler(dispatch, err)
        }
    }