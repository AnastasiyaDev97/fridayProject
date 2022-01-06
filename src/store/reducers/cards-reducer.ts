import {ActionsType} from "./AC types/types";
import {AppDispatch,  ThunkType} from "../store";
import { getCardsQueryParamsType, getCardsResponseType} from "../../dal/apiTypes";
import {setAppStatusAC} from "./app-reducer";
import {cardsAPI} from "../../dal/api";
import {catchErrorHandler} from "../../utils/error-utils";



let initialState = {
    cards: [],
    cardsTotalCount: 0,
    maxGrade: 0,
    minGrade: 0,
    page: 1,
    pageCount: 0,
    packUserId: '',
    sortCards: '0updated'
} as InitialStateType

type InitialStateType = getCardsResponseType & { sortCards: string }


export const cardsReducer = (state: InitialStateType = initialState, action: ActionsType) => {
    switch (action.type) {
        case 'CARDS/CHANGE-PAGE':
            return {...state, ...action.payload}
        case "CARDS/SET-CARDS":
        case 'CARDS/SET-SORTING-FILTER':

            return {...state, ...action.payload}

        default:
            return state
    }
}
export const setCardsAC = (payload: getCardsResponseType) => ({
    type: 'CARDS/SET-CARDS',
    payload
} as const)

export const setSortingFilterCards = (sortCards: string) => {
    return {
        type: 'CARDS/SET-SORTING-FILTER',
        payload: {sortCards}
    } as const
}

export const changePageCardsAC = (page: number) => {
    return (
        {
            type: 'CARDS/CHANGE-PAGE',
            payload: {page}
        }) as const
}


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

export const addCardTC = (cardsPack_id: string, question: string): ThunkType =>
    async (dispatch) => {
        try {
            const card = {
                cardsPack_id,
                question
            }
            dispatch(setAppStatusAC('loading', true))
            await cardsAPI.addCard({card})
            await dispatch(getCardsTC({cardsPack_id}))
        } catch (err) {
            catchErrorHandler(dispatch, err)
        }
    }

export const deleteCardTC = (cardsPack_id: string,id: string): ThunkType =>
    async (dispatch) => {
        try {
            dispatch(setAppStatusAC('loading', true))
            await cardsAPI.deleteCard(id)
            await dispatch(getCardsTC({cardsPack_id}))
        } catch (err) {
            catchErrorHandler(dispatch, err)
        }
    }

export const updateCardTC = (cardsPack_id: string,id: string,newQuestion:string): ThunkType =>
    async (dispatch) => {
        try {
            const card = {
                _id:id,
                question:newQuestion,
            }
            dispatch(setAppStatusAC('loading', true))
            await cardsAPI.updateCard({card})
            await dispatch(getCardsTC({cardsPack_id}))
        } catch (err) {
            catchErrorHandler(dispatch, err)
        }
    }