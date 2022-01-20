import {ActionsType} from "./AC types/types";
import {getCardsResponseType} from "../../dal/cards/types";
import {EMPTY_STRING} from "../../constants";



let initialState = {
    cards: [
        {
            answer: EMPTY_STRING,
            question: EMPTY_STRING,
            cardsPack_id: EMPTY_STRING,
            grade: 0,
            shots: 0,
            user_id: EMPTY_STRING,
            created: EMPTY_STRING,
            updated: EMPTY_STRING,
            _id: EMPTY_STRING,
        }
    ],
    cardsTotalCount: 0,
    maxGrade: 0,
    minGrade: 0,
    page: 1,
    pageCount: 0,
    packUserId: EMPTY_STRING,
    sortCards: '0updated'
} as InitialStateType

type InitialStateType = getCardsResponseType & { sortCards: string }


export const cardsReducer = (state: InitialStateType = initialState, action: ActionsType) => {
    switch (action.type) {
        case "CARDS/SET-CARDS":
        case 'CARDS/CHANGE-PAGE':
        case 'CARDS/SET-SORTING-FILTER':
            return {...state, ...action.payload}
        case 'CARDS/SET-CARDS-RATING':

            return {
                ...state,
                cards: [...state.cards.map(card => card._id === action._id ? {...card, ...action.payload} : card)]
            }
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
export const setCardsRatingAC = (_id: string, grade: number, shots: number) => {
    return ({
        type: 'CARDS/SET-CARDS-RATING',
        _id,
        payload: {grade, shots}
    }) as const
}



