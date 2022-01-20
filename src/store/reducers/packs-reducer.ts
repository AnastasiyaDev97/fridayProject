import {ActionsType} from "./AC types/types";
import {Nullable} from "../../types/Nullable";
import {getPacksResponseType} from "../../dal/packs/types";
import {EMPTY_STRING} from "../../constants";


type initialStateType = getPacksResponseType & {
    min: number
    max: number
    sortPacks: string
    packName: Nullable<string>
    user_id: Nullable<string>
}


const INITIAL_CARDS_MAX_BORDER = 100
let initialState = {
    page: 1,
    /*   cardPacks: [] as Array<PackType>,*/
    /* cardPacksTotalCount: 0,*/
    maxCardsCount: 0,
    minCardsCount: 0,
    pageCount: 0,
    min: 0,
    max: INITIAL_CARDS_MAX_BORDER,
    sortPacks: '0updated',
    packName: EMPTY_STRING,
    user_id: null,
} as initialStateType


export const packsReducer = (state: initialStateType = initialState, action: ActionsType) => {
    switch (action.type) {
        case "PACKS/CHANGE-SEARCH-PACK-NAME":
        case "PACKS/SET-PACKS":
        case "PACKS/CHANGE-PAGE":
        case "SET-RESPONSE-INFO-NEW-PASS":
        case "PACKS/TOGGLE-SHOW-USER-PACKS":
        case "PACKS/SET-NEW-MIN-MAX-VALUE":
        case "PACKS/SET-SORTING-FILTER":
            return {...state, ...action.payload}
        default:
            return state
    }
}

export const setPacksAC = (payload: getPacksResponseType) => ({
    type: 'PACKS/SET-PACKS',
    payload
} as const)


export const changePageAC = (page: number) => ({
    type: 'PACKS/CHANGE-PAGE',
    payload: {page}
} as const)

export const setNewMinMaxValues = (min: number, max: number) => ({
    type: 'PACKS/SET-NEW-MIN-MAX-VALUE',
    payload: {min, max}
} as const)

export const setSortingFilter = (sortPacks: string) => ({

    type: 'PACKS/SET-SORTING-FILTER',
    payload: {sortPacks}
} as const)

export const changeSearchPackNameAC = (packName: string) => ({
    type: 'PACKS/CHANGE-SEARCH-PACK-NAME',
    payload: {packName}
} as const)

export const toggleShowUserPacksAC = (user_id: string) => ({
    type: 'PACKS/TOGGLE-SHOW-USER-PACKS',
    payload: {user_id}
} as const)


