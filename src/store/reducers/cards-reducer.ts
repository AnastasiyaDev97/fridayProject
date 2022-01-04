import {ActionsType} from "./AC types/types";


let initialState = {}
type InitialStateType = typeof initialState


export const cardsReducer = (state: InitialStateType = initialState, action: ActionsType) => {
    switch (action.type) {


        default:
            return state
    }
}


